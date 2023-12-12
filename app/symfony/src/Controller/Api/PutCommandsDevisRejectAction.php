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

final class PutCommandsDevisRejectAction
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
     * @var Security
     */
    private $security;

    public function __construct(EntityManagerInterface $em, SendEmail $mailer, Security $security)
    {
        $this->em = $em;
        $this->mailer = $mailer;
        $this->security = $security;
    }

    /**
     * @param User $data
     */
    public function __invoke(Command $data, Request $request)
    {
        if ($data->getStatus() !== 1) {
            throw new BadRequestException("Vous ne pouvez pas effectuer cette opération.");
        }

        $post_data = json_decode($request->getContent());

        $data->setStatus(3); //Set refusée
        $data->setNewDevis($post_data->newDevis);
        $data->setRejectRaison($post_data->rejectRaison);
        $data->setRejectionDate(new DateTime());
        $data->setUpdatedBy($this->security->getUser());

        $this->em->persist($data);
        $this->em->flush();

        $this->mailer->send(
            $data->getClient()->getEmail(),
            'Devis refusé pour la prestation ' . $data->getBenefit()->getService()->getName(),
            'emails/devis_reject_client.html.twig',
            [
                'command' => $data,
                'urlDevis' => $this->mailer->getDomainName() . $this->mailer->getPrefixBackend() . "/devis?id=".$data->getId()
            ]
        );

        $this->mailer->send(
            $data->getBenefit()->getUser()->getEmail(),
            'Devis refusé pour la prestation ' . $data->getBenefit()->getService()->getName(),
            'emails/devis_reject_repairman.html.twig',
            [
                'command' => $data,
                'urlDevis' => $this->mailer->getDomainName() . $this->mailer->getPrefixBackend() . "/devis?id=".$data->getId()
            ]
        );
        return $data;
    }
}
