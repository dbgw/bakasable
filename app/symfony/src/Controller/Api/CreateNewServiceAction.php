<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Entity\User;
use App\Entity\NewService;
use Symfony\Component\Security\Core\Security;

final class CreateNewServiceAction
{
    /**
     * @var Security
     */
    private $security;

    /**
     * @param Security $security
     */
    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    /**
     * @param NewService $data
     * @return NewService
     */
    public function __invoke(NewService $data): NewService
    {
        /** @var User $user */
        $user = $this->security->getUser();
        $data->setUser($user);
        return $data;
    }
}
