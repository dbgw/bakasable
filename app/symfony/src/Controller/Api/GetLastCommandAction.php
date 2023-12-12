<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Entity\User;
use App\Repository\CommandRepository;
use Symfony\Component\Security\Core\Security;

final class GetLastCommandAction
{
    private $security;
    private $commandRepo;

    public function __construct(Security $security, CommandRepository $commandRepo)
    {
        $this->security = $security;
        $this->commandRepo = $commandRepo;
    }

    public function __invoke()
    {
        /** @var User $user */
        $user = $this->security->getUser();
        
        return $this->commandRepo->getLastCommandAddress($user->getId());
    }
}
