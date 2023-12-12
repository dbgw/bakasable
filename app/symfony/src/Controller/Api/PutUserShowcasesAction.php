<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Entity\User;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;

final class PutUserShowcasesAction
{
    /**
     * @param User $data
     * @return User
     */
    public function __invoke(User $data): User
    {
        $roles = $data->getRoles();
        if (in_array('ROLE_REPAIRMAN', $roles)) {
            return $data;
        } else {
            throw new BadRequestException('Ce compte ne possède pas le rôle réparateur pour lui renseigner des univers.');
        }
    }
}
