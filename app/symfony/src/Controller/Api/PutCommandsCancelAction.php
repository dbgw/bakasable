<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Entity\Command;
use App\Service\SendEmail;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Security;
use App\Service\StripeProvider;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;

final class PutCommandsCancelAction
{
    private $security;
    /**
     * @var SendEmail
     */
    private $mailer;
    /**
     * @var EntityManagerInterface
     */
    private $em;
    /**
     * @var StripeProvider
     */
    private $stripeProvider;

    public function __construct(Security $security, EntityManagerInterface $em, SendEmail $mailer, StripeProvider $stripeProvider)
    {
        $this->security = $security;
        $this->em = $em;
        $this->mailer = $mailer;
        $this->stripeProvider = $stripeProvider;
    }

    /**
     * @param User $data
     */
    public function __invoke(Command $data)
    {
        if ($this->security->isGranted('ROLE_ADMIN')) {
            if (($data->getStatus() !== 1 && $data->getStatus() !== 5) || $data->getAdjust()) {
                throw new BadRequestException("Nous ne pouvons pas annuler le paiement.");
            }
        } else if ($data->getStatus() !== 1) {
            throw new BadRequestException("Nous ne pouvons pas annuler le paiement.");
        }

        // FINGZ-329
        /* if ($this->security->isGranted('ROLE_CLIENT')) {
            if (!$data->getRightToCancel()) {
                if ($data->getPastDay() > 14) {
                    throw new BadRequestException("Nous ne pouvons pas annuler le paiement, le délai de rétractation est expiré.");
                }
            } else {
                throw new BadRequestException("Nous ne pouvons pas annuler le paiement, vous avez renonce expressément à votre  droit de rétractation.");
            }
        } */

        if ($data->getIsCommand() && !$data->getIsDevisSend()) {
            /**
             * @var Paiement $paiement
             */
            foreach ($data->getPaiements() as $paiement) {
                if ($paiement->getObject() != "refund") {
                    $row = $this->stripeProvider->refundsPaymentIntent($paiement->getPaymentIntentId());
                    if ($row && $row->status === "succeeded") {
                        $paiement->setObject($row->object);
                    } else {
                        throw new BadRequestException("Nous ne pouvons pas annuler le paiement.");
                    }
                } else {
                    throw new BadRequestException("Paiement a déjà été annulée.");
                }
            }
        } else {
            throw new BadRequestException("Vous ne pouvez pas annuler cette commande.");
        }

        if ($data->getPaidDevis()) {
            /** @var Command $command*/
            $command = $this->em->getRepository(Command::class)->find($data->getParent());
            if ($command instanceof Command) {
                $command->setStatus(4);
                $command->setCancellationDate(new DateTime());
                $this->em->persist($command);
            }
        }

        $data->setStatus(4); //Set annuler
        $data->setCancellationDate(new DateTime());
        $data->setUpdatedBy($this->security->getUser());
        
        $this->em->persist($data);
        $this->em->flush();

        $cancelBy = "";
        if ($this->security->isGranted('ROLE_ADMIN')) {
            $cancelBy = "admin";
        }else if ($this->security->isGranted('ROLE_CLIENT')) {
            $cancelBy = "client";
        }else if ($this->security->isGranted('ROLE_REPAIRMAN')) {
            $cancelBy = "repairman";
         }

        $this->mailer->send(
            $data->getClient()->getEmail(),
            "La commande N° {$data->getId()} a été annulée",
            'emails/command_cancel_client.html.twig',
            [
                'command' => $data,
                'cancelBy' => $cancelBy,
                'urlCommand' => $this->mailer->getDomainName() . $this->mailer->getPrefixBackend() . "/commandes?id=".$data->getId()
            ]
        );
        $this->mailer->send(
            $data->getBenefit()->getUser()->getEmail(),
            "La commande N° {$data->getId()} a été annulée",
            'emails/command_cancel_repairman.html.twig',
            [
                'command' => $data,
                'cancelBy' => $cancelBy,
                'urlCommand' => $this->mailer->getDomainName() . $this->mailer->getPrefixBackend() . "/commandes?id=".$data->getId()
            ]
        );

        return $data;
    }
}
