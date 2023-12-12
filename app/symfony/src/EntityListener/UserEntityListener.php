<?php

declare(strict_types=1);

namespace App\EntityListener;

use App\Entity\User;
use App\Service\SendEmail;
use App\Service\StripeProvider;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\NonUniqueResultException;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;

class UserEntityListener
{
    /**
     * @var SendEmail
     */
    private SendEmail $mailer;

    /**
     * @var Security
     */
    private Security $security;

    /**
     * @var EntityManagerInterface
     */
    private EntityManagerInterface $em;

    /**
     * @param SendEmail $mailer
     * @param Security $security
     * @param EntityManagerInterface $em
     */
    public function __construct(SendEmail $mailer, Security $security, EntityManagerInterface $em)
    {
        $this->mailer = $mailer;
        $this->security = $security;
        $this->em = $em;
    }

    public function prePersist(User $user)
    {
        $roles = $user->getRoles();
        if (in_array('ROLE_REPAIRMAN', $roles)) {
            if (!($this->security->getUser() instanceof User && in_array('ROLE_ADMIN', $this->security->getUser()->getRoles()))) {
                $this->mailer->send(
                    $user->getEmail(),
                    'Demande d’inscription à notre plateforme',
                    'emails/registration_repairman.html.twig',
                    [
                        'urlHome' => $this->mailer->getDomainName(),
                    ]
                );
                $this->mailer->send(
                    $this->mailer->getMailerTo(),
                    'Demande d’inscription d’un réparateur',
                    'emails/demand_registration_repairman.html.twig',
                    [
                        'url' => $this->mailer->getDomainName() . $this->mailer->getPrefixBackend() . "/reparateurs",
                        'user' => $user
                    ]
                ); 
            }
        }
    }

    /**
     * @throws NonUniqueResultException
     */
    public function preUpdate(User $user)
    {
    }
}
