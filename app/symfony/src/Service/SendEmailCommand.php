<?php

declare(strict_types=1);

namespace App\Service;

use App\Entity\Command;
use App\Repository\ThreadRepository;
use App\Service\SendEmail;

class SendEmailCommand
{
    /**
     * @var SendEmail
     */
    private SendEmail $mailer;

    /**
     * @var ThreadRepository
     */
    private ThreadRepository $threadRepository;
    

    /**
     * @param SendEmail $mailer
     * @param ThreadRepository $threadRepository
     */
    public function __construct(SendEmail $mailer, ThreadRepository $threadRepository)
    {
        $this->mailer = $mailer;
        $this->threadRepository = $threadRepository;
    }

    public function new(Command $command)
    {
        if ($command->getSendEmail()) {

            if ($command->getType() === "forfait") {
                //Email client
                $this->mailer->send(
                    $command->getClient()->getEmail(),
                    'Confirmation de votre commande',
                    'emails/command_client_validation.html.twig',
                    [
                        'urlCommand' => $this->mailer->getDomainName() . $this->mailer->getPrefixBackend() . "/commandes?id=" . $command->getId(),
                        'command' => $command
                    ]
                );
                //Email repairman
                $this->mailer->send(
                    $command->getBenefit()->getUser()->getEmail(),
                    "Nouvelle commande pour votre prestation “" . $command->getBenefit()->getService()->getName() . "”",
                    'emails/command_repairman_validation.html.twig',
                    [
                        'urlCommand' => $this->mailer->getDomainName() . $this->mailer->getPrefixBackend() . "/commandes?id=" . $command->getId(),
                        'command' => $command
                    ]
                );
            } elseif ($command->getType() === "devis") {
                $idThread = $this->threadRepository->getThreadByUser($command->getClient()->getId(), $command->getBenefit()->getUser()->getId());

                //Email client
                $this->mailer->send(
                    $command->getClient()->getEmail(),
                    'Confirmation de votre demande de devis',
                    'emails/devis_client_validation.html.twig',
                    [
                        'urlDevis' => $this->mailer->getDomainName() . $this->mailer->getPrefixBackend() . "/devis?id=" . $command->getId(),
                        'urlMessagerie' => $this->mailer->getDomainName() . $this->mailer->getPrefixBackend() . "/messagerie/" . $idThread,
                        'command' => $command
                    ]
                );
                //Email repairman
                $this->mailer->send(
                    $command->getBenefit()->getUser()->getEmail(),
                    "Nouvelle demande de devis pour votre prestation “" . $command->getBenefit()->getService()->getName() . "”",
                    'emails/devis_repairman_validation.html.twig',
                    [
                        'urlDevis' => $this->mailer->getDomainName() . $this->mailer->getPrefixBackend() . "/devis?id=" . $command->getId(),
                        'command' => $command,
                    ]
                );
            }
        }
    }
}
