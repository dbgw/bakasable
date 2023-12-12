<?php

declare(strict_types=1);

namespace App\EntityListener;

use App\Entity\User;
use App\Entity\NewService;
use App\Service\SendEmail;
use Symfony\Component\Security\Core\Security;

class NewServiceEntityListener
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
     * @param SendEmail $mailer
     * @param Security $security
     */
    public function __construct(SendEmail $mailer, Security $security)
    {
        $this->mailer = $mailer;
        $this->security = $security;
    }

    public function prePersist(NewService $newService)
    {
        /** @var User $user */
        $user = $this->security->getUser();

        $this->mailer->send(
            $this->mailer->getMailerTo(),
            'Demande de création d’un nouveau service',
            'emails/new_service_repairman.html.twig',
            [
                'companyName' => $user->getEnterprise(),
                'emailRepairMan' => $user->getEmail(),
                'object' => $newService->getObject(),
                'description' => $newService->getDescription(),
                'urlServices' => $this->mailer->getDomainName() . $this->mailer->getPrefixBackend() . "/services",
            ]
        );
    }
}
