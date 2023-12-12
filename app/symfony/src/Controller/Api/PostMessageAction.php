<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Entity\Message;
use App\Entity\User;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;

final class PostMessageAction
{
    /**
     * @var Security
     */
    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    /**
     * @param Message $data
     * @return Message
     */
    public function __invoke(Message $data, Request $request): Message
    {
        /** @var User $user */
        $user = $this->security->getUser();

        $data->setUser($user);
        return $data;
    }
}
