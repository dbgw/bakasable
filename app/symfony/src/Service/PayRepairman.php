<?php

declare(strict_types=1);

namespace App\Service;

use Exception;
use App\Entity\User;
use App\Entity\Command;
use App\Entity\Paiement;
use App\Service\SendEmail;
use App\Service\StripeProvider;
use Doctrine\ORM\EntityManagerInterface;
use Stripe\Exception\InvalidRequestException;

class PayRepairman
{
    /**
     * @var EntityManagerInterface
     */
    private $em;

    /**
     * @var StripeProvider
     */
    private $stripeProvider;

    /**
     * @var SendEmail
     */
    private $mailer;

    /**
     * @param EntityManagerInterface $em
     * @param StripeProvider $stripeProvider
     * @param SendEmail $mailer
     */
    public function __construct(EntityManagerInterface $em, StripeProvider $stripeProvider, SendEmail $mailer)
    {
        $this->em = $em;
        $this->stripeProvider = $stripeProvider;
        $this->mailer = $mailer;
    }

    public function execute(Command $command)
    {
        $response = array("status" => "error", "message" => "", "code" => "");

        try {
            $nameUser = $command->getBenefit()->getUser()->getEmail() . " #" . $command->getId();
            $nameCommand = ($command->getType() === "devis" ? " le devis " : " la commande ") . "#" . $command->getId();

            /**
             * @var User $user
             */
            $user = $command->getBenefit()->getUser();

            if (!$user->getStripeAccountId() && $user->getStripeAccountToken()) {
                $account = $this->stripeProvider->createAccount($user);
                if ($account && $account->id) {
                    $user->setStripeAccountId($account->id);
                    $this->em->persist($user);
                    $this->em->flush();
                }
            }

            if (!$user->getStripeAccountId() || !$user->getStripeAccountToken()) {
                $response['message'] = "Impossible de créer ce réparateur " . $nameUser . " sur strip.";
                return $response;
            }

            //create link if account type express 
            //dd($this->stripeProvider->createAccountLink($user->getStripeAccountId()));

            $resultsTransfer = $this->em->createQueryBuilder()
                ->from('App:Command', 'c')
                ->join('c.paiements', 'p')
                ->select('c.id, p.amount, p.transferId')
                ->where('c.id = :id')
                ->setParameter('id', $command->getId())
                ->andwhere("p.object = 'transfer'")
                ->andwhere("c.isCommand = 1")
                ->setMaxResults(1)
                ->getQuery()
                ->getOneOrNullResult();

            if ($resultsTransfer) {
                $response['message'] = "Le réparateur " . $nameUser . " a été déjà régle avec le montant " . $resultsTransfer['amount'] . " c€ lié au transfert #" . $resultsTransfer['transferId'] . " pour " . $nameCommand . ".";
                return $response;
            }

            $resultsPayment = $this->em->createQueryBuilder()
                ->from('App:Command', 'c')
                ->join('c.paiements', 'p')
                ->select('c.id, p.amount')
                ->where('c.id = :id')
                ->setParameter('id', $command->getId())
                ->andWhere('c.adjust = 0 or c.adjust IS NULL')
                ->andwhere("p.object = 'payment_intent'")
                ->andwhere("c.isCommand = 1")
                ->setMaxResults(1)
                ->getQuery()
                ->getOneOrNullResult();

            if (!$resultsPayment) {
                $response['message'] = "Le réparateur " . $nameUser . " ne peut pas être régle, " . $nameCommand . " n'est pas lié(e) à aucun paiment ou déjà règle.";
                return $response;
            }

            $amount = $resultsPayment['amount'];

            $transfer = $this->stripeProvider->createTransfer($user, $command, $amount);

            if (!$transfer || !$transfer->id) {
                $response['message'] = "Nous ne pouvons pas effectuer le transfer pour ce réparateur " . $nameUser . ".";
                return $response;
            }
            $paiement = new Paiement();
            $paiement->setAmount($amount);
            $paiement->setObject($transfer->object);
            $paiement->setTransferId($transfer->id);
            $paiement->setCommand($command);
            $this->em->persist($paiement);

            $command->setAdjust(true);
            $command->setAdjustDate(new \DateTime());
            $this->em->persist($command);

            $this->em->flush();

            $response['status'] = 'success';
            $response['message'] = "Le réparateur " . $nameUser . " vient d'être régle avec le montant " . $amount . " c€ pour " . $nameCommand . ".";
            return $response;
        } catch (InvalidRequestException $e) {

            if ($e->getError() && $e->getError()["code"]) {
                $response['code'] = $e->getError()["code"];
            }

            //Email strip
            $this->mailer->send(
                $this->mailer->getStripEmail(),
                'Un réparateur ne peut pas être réglé',
                $response['code'] === "balance_insufficient" ? 'emails/repairman_balance_insufficient.html.twig' : 'emails/repairman_not_settled.html.twig',
                [
                    'user' => $user
                ]
            );

            $response['message'] = "Erreur : " . $e->getMessage();
            return $response;
        }
    }
}
