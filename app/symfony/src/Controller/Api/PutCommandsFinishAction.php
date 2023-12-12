<?php

declare(strict_types=1);

namespace App\Controller\Api;

use DateTime;
use App\Entity\Command;
use App\Service\SendEmail;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;

final class PutCommandsFinishAction
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

    public function __construct(Security $security, EntityManagerInterface $em, SendEmail $mailer)
    {
        $this->security = $security;
        $this->em = $em;
        $this->mailer = $mailer;
    }

    /**
     * @param User $data
     */
    public function __invoke(Command $data, Request $request)
    {
        if ($data->getStatus() !== 1) {
            throw new BadRequestException("Vous ne pouvez pas effectuer cette opération.");
        }

        $postData = json_decode($request->getContent());

        $data->setStatus(5); //Set finished
        $data->setCompletionDate(new DateTime());
        $data->setFacture($postData->file);
        $data->setUpdatedBy($this->security->getUser());

        $this->mailer->send(
            $data->getClient()->getEmail(),
            "La prestation pour la commande N° {$data->getId()} a été effectuée",
            'emails/command_finish_client.html.twig',
            [
                'command' => $data,
                'urlCommand' => $this->mailer->getDomainName() . $this->mailer->getPrefixBackend() . "/commandes?id=".$data->getId()
            ]
        );
        $this->mailer->send(
            $data->getBenefit()->getUser()->getEmail(),
            "La prestation pour la commande N° {$data->getId()} a été effectuée",
            'emails/command_finish_repairman.html.twig',
            [
                'command' => $data,
                'urlCommand' => $this->mailer->getDomainName() . $this->mailer->getPrefixBackend() . "/commandes?id=".$data->getId()
            ]
        );
        
        $this->em->persist($data);
        $this->em->flush();
        return $data;
    }
}
