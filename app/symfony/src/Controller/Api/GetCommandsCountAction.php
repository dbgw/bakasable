<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Entity\User;
use App\Repository\CommandRepository;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\JsonResponse;

final class GetCommandsCountAction
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
        $result["commands_en_attente"] = 0;
        $result["commands_finished"] = 0;
        $result["commands_canceled"] = 0;

        /** @var User $user */
        $user = $this->security->getUser();

        if ($this->security->isGranted('ROLE_CLIENT')) {
            $result["commands_en_attente"] = $this->commandRepo->getClientCountCommandsByStatus($user->getId(), 1, "command");
            $result["commands_finished"] = $this->commandRepo->getClientCountCommandsByStatus($user->getId(), 5, "command");
            $result["commands_canceled"] = $this->commandRepo->getClientCountCommandsByStatus($user->getId(), 4, "command");
        } else if ($this->security->isGranted('ROLE_REPAIRMAN')) { 
            $result["commands_en_attente"] = $this->commandRepo->getRepCountCommandsByStatus($user->getId(), 1, "command");
            $result["commands_finished"] = $this->commandRepo->getRepCountCommandsByStatus($user->getId(), 5, "command");
            $result["commands_canceled"] = $this->commandRepo->getRepCountCommandsByStatus($user->getId(), 4, "command");
        } else if ($this->security->isGranted('ROLE_ADMIN')) {
            $result["commands_en_attente"] = $this->commandRepo->getAdminCountCommandsByStatus(1, "command");
            $result["commands_finished"] = $this->commandRepo->getAdminCountCommandsByStatus(5, "command");
            $result["commands_canceled"] = $this->commandRepo->getAdminCountCommandsByStatus(4, "command");
        }

        $result["count"] = $result["commands_en_attente"] + $result["commands_finished"] + $result["commands_canceled"];

        return new JsonResponse($result);
    }
}
