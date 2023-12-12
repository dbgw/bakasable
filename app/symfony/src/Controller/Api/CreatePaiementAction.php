<?php

declare(strict_types=1);

namespace App\Controller\Api;

use DateTime;
use App\Entity\User;
use App\Entity\Command;
use App\Entity\Paiement;
use App\Entity\DevisLine;
use App\Service\StripeProvider;
use App\Service\SendEmailCommand;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;

final class CreatePaiementAction
{
    /**
     * @var Security
     */
    private $security;

    /**
     * @var EntityManagerInterface
     */
    private $em;

    /**
     * @var StripeProvider
     */
    private $stripeProvider;

    /**
     * @var SendEmailCommand
     */
    private $sendEmailCommand;

    public function __construct(Security $security, EntityManagerInterface $em, StripeProvider $stripeProvider, SendEmailCommand $sendEmailCommand)
    {
        $this->security = $security;
        $this->em = $em;
        $this->stripeProvider = $stripeProvider;
        $this->sendEmailCommand = $sendEmailCommand;
    }

    /**
     * @param Paiement $data
     * @param Request $request
     * @return Paiement
     */
    public function __invoke(Paiement $data, Request $request): Paiement
    {
        $postData = json_decode($request->getContent());
        $currentUser = $this->security->getUser();
        if ($currentUser instanceof User) {

            if (!$data->getCommand() instanceof Command) {
                throw new BadRequestException("Commande invalide");
            }

            $results = $this->em->createQueryBuilder()
                ->from('App:Command', 'c')
                ->join('c.paiements', 'p')
                ->select('c.id')
                ->where('c.id = :id')
                ->setParameter('id', $data->getCommand()->getId())
                ->andwhere("p.object = 'payment_intent'")
                ->andwhere("c.isCommand = 1")
                ->setMaxResults(1)
                ->getQuery()
                ->getOneOrNullResult();
            if ($results) {
                throw new BadRequestException("Le paiement a déjà été effectué pour cette commande.");
            }

            $results = $this->em->createQueryBuilder()
                ->from('App:Command', 'c')
                ->join('c.paiements', 'p')
                ->select('c.id')
                ->where('c.parent = :id')
                ->setParameter('id', $data->getCommand()->getId())
                ->andwhere("p.object = 'payment_intent'")
                ->andwhere("c.isCommand = 1 and c.paidDevis IS NULL")
                ->setMaxResults(1)
                ->getQuery()
                ->getOneOrNullResult();
            if ($results) {
                throw new BadRequestException("Le paiement a déjà été effectué pour cette commande.");
            }

            if (!isset($postData->paymentIntent)) {
                throw new BadRequestException("PaymentIntent invalide.");
            }

            $rightToCancel = isset($postData->rightToCancel) ? $postData->rightToCancel : false;

            try {

                // get paymentIntent
                $paymentIntent = $this->stripeProvider->retrievePaymentIntents($postData->paymentIntent);
                if (!$paymentIntent) {
                    throw new BadRequestException("PaymentIntent not existe.");
                }

                // Calc the amount for this command
                $total = 0;

                if ("devis" === $data->getCommand()->getBenefit()->getTypeService() && count($data->getCommand()->getDevisLines()) > 0) {
                    /** @var DevisLine $devisLine */
                    foreach ($data->getCommand()->getDevisLines() as $devisLine) {
                        $subTotal = floatval($devisLine->getUnityPrice()) * floatval($devisLine->getQte());
                        $subTotalR = $subTotal * (1 - (floatval($devisLine->getReduction()) / 100));
                        $total += $subTotalR * (1 + (floatval($devisLine->getTva()) / 100));
                    }
                } else {
                    $total = $data->getCommand()->getTotal();
                }

                // convert to cent
                $amount = intval($total * 100);

                if($amount!=$paymentIntent->amount){
                    throw new BadRequestException("Total invalide.");
                }

                /** @var Command $command */
                $command = $data->getCommand();
                $isNewCommand = false;

                if ($data->getCommand()->getIsCommand()) {
                    $command->setStatus(1);
                } else {
                    $command->setStatus(2);
                    $isNewCommand = true;
                }

                /** @var Command $parent */
                if($data->getCommand()->getParent()){
                    $parent = $data->getCommand()->getParent();
                    if( !$parent->getStepsCompleted()){
                        $parent->setSendEmail(true);
                        $this->sendEmailCommand->new($parent);
                    } 
                    $parent->setStepsCompleted(true);
                    $command->setParent($parent);
                }else{
                    if( !$command->getStepsCompleted()){
                        $command->setSendEmail(true);
                        $this->sendEmailCommand->new($command);
                    } 
                }

                $command->setStepsCompleted(true);

                $command->setAcceptanceDate(new DateTime());
                $command->setRightToCancel($rightToCancel);
                $this->em->persist($command);
                $this->em->flush();


                if ($isNewCommand) {
                    /** @var Command $newCommand */
                    $newCommand = clone $command;
                    $newCommand->setStatus(1);
                    $newCommand->setAdjust(false);
                    $newCommand->setParent($command);
                    $newCommand->setTotal($total);
                    $newCommand->setIsCommand(true);
                    $newCommand->setCreatedAt(new DateTime());
                    $newCommand->setDateSend(NULL);
                    $newCommand->setValidationDate(NULL);
                    $newCommand->setCancellationDate(NULL);
                    $newCommand->setRejectionDate(NULL);
                    $newCommand->setAdjustDate(NULL);
                    $newCommand->setType("forfait");
                    $newCommand->setSendEmail(true);
                    $this->em->persist($newCommand);
                    $this->em->flush();
                    $data->setCommand($newCommand);
                    $this->sendEmailCommand->new($newCommand);
                }

                $data->setPaymentIntentId($paymentIntent->id);
                $data->setPaymentMethodId($paymentIntent->payment_method);
                $data->setObject($paymentIntent->object);
                $data->setAmount($amount);
            } catch (\Exception $e) {
                throw new BadRequestException("Désolé, un problème est survenu. Merci de vérifier vos informations.");
            }
        }
        return $data;
    }
}
