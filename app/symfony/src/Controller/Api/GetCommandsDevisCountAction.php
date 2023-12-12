<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Entity\User;
use App\Repository\CommandRepository;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\JsonResponse;

final class GetCommandsDevisCountAction
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
        $result["new_commandes"] = 0;
        $result["devis_en_attente"] = 0;
        $result["devis_accepte"] = 0;

        /** @var User $user */
        $user = $this->security->getUser();

        if ($this->security->isGranted('ROLE_CLIENT')) {
            $result["new_commandes"] = $this->commandRepo->getClientCountCommandsByStatus($user->getId(), 0 , "devis");
            $result["devis_en_attente"] = $this->commandRepo->getClientCountCommandsByStatus($user->getId(), 1, "devis");
            $result["devis_accepte"] = $this->commandRepo->getClientCountCommandsByStatus($user->getId(), 2, "devis");
        } else if ($this->security->isGranted('ROLE_REPAIRMAN')) {
            $result["new_commandes"] = $this->commandRepo->getRepCountCommandsByStatus($user->getId(), 0, "devis");
            $result["devis_en_attente"] = $this->commandRepo->getRepCountCommandsByStatus($user->getId(), 1, "devis");
            $result["devis_accepte"] = $this->commandRepo->getRepCountCommandsByStatus($user->getId(), 2, "devis");
        } else if ($this->security->isGranted('ROLE_ADMIN')) {
            $result["new_commandes"] = $this->commandRepo->getAdminCountCommandsByStatus(0, "devis");
            $result["devis_en_attente"] = $this->commandRepo->getAdminCountCommandsByStatus(1, "devis");
            $result["devis_accepte"] = $this->commandRepo->getAdminCountCommandsByStatus(2, "devis");
        }

        $result["count"] = $result["new_commandes"] + $result["devis_en_attente"] + $result["devis_accepte"];

        return new JsonResponse($result);
    }
}
