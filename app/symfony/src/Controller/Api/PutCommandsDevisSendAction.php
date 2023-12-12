<?php

declare(strict_types=1);

namespace App\Controller\Api;

use DateTime;
use App\Entity\Command;
use App\Service\SendEmail;
use App\Service\PayRepairman;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;

final class PutCommandsDevisSendAction
{
    /**
     * @var SendEmail
     */
    private $mailer;
    /**
     * @var EntityManagerInterface
     */
    private $em;
    /**
     * @var PayRepairman
     */
    private $payRepairman;

    /**
     * @param EntityManagerInterface $em
     * @param SendEmail $mailer
     * @param PayRepairman $payRepairman
     */
    public function __construct(EntityManagerInterface $em, SendEmail $mailer, PayRepairman $payRepairman)
    {
        $this->em = $em;
        $this->mailer = $mailer;
        $this->payRepairman = $payRepairman;
    }

    /**
     * @param User $data
     */
    public function __invoke(Command $data)
    {
        if ($data->getStatus() !== 0) {
            throw new BadRequestException("Vous ne pouvez pas effectuer cette opération.");
        }

        $commands = $this->em->getRepository(Command::class)->findBy(["parent" => $data->getId(), "paidDevis" => true, "isCommand" => true]);

        foreach ($commands as $command) {
            $command->setStatus(5); //Set statut Terminer
            $command->setIsDevisSend(true);
            $this->em->persist($command);

            if ($command->getTotal() > 0) {
                
                $response = $this->payRepairman->execute($command);

                if (empty($response["status"]) || $response["status"] != "success") {
                    throw new BadRequestException("errorPayRepairman");
                }
            }
        }

        $data->setStatus(1); //Set statut En attente
        $data->setDateSend(new DateTime());

        $this->em->persist($data);
        $this->em->flush();

        $this->mailer->send(
            $data->getClient()->getEmail(),
            'Vous avez reçu un devis pour la prestation ' . $data->getBenefit()->getService()->getName(),
            'emails/client_received_devis.html.twig',
            [
                'command' => $data,
                'urlDevis' => $this->mailer->getDomainName() . $this->mailer->getPrefixBackend() . "/devis?id=" .$data->getId()
            ]
        );
        return $data;
    }
}
