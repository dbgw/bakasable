<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Entity\User;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Doctrine\ORM\EntityManagerInterface;

final class CreateAdminAction
{
    /**
     * @var EntityManagerInterface
     */
    private $em;

    public function __construct(UserPasswordHasherInterface $passwordHasher, EntityManagerInterface $em)
    {
        $this->passwordHasher = $passwordHasher;
        $this->em = $em;
    }

    /**
     * @param User $data
     * @param UserPasswordHasherInterface $encoder
     * @return User
     */
    public function __invoke(User $data, UserPasswordHasherInterface $encoder): User
    {
        try {
            $email = $data->getEmail();
            $data->setUsername($email);
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                throw new BadRequestException("Le format du mail est incorrect.");
            }

            $user = $this->em->getRepository(User::class)->findOneBy(['email' => $email]);
            if ($user instanceof User) {
                if (0 == $user->getStatus()) {
                    throw new BadRequestException("Cet email dispose déjà d'un compte en attente de validation sur notre site.");
                } else if (2 == $user->getStatus()) {
                    throw new BadRequestException("Cet email dispose déjà d'un compte désactivé sur notre site.");
                }
                throw new BadRequestException("Cet email dispose déjà d'un compte en ligne sur notre site.");
            }

            $data->setRoles(['ROLE_ADMIN']);
            $plainPassword = $data->getPlainPassword();
            $encoded = $this->passwordHasher->hashPassword($data, $plainPassword);
            $data->setPassword($encoded);
            $data->setStatus(1);
        } catch (\Exception $e) {
            throw new BadRequestException($e->getMessage());
        }

        return $data;
    }
}
