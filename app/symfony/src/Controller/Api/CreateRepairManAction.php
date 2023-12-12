<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ContainerBagInterface;

final class CreateRepairManAction
{
    /**
     * @var UserPasswordHasherInterface
     */
    private UserPasswordHasherInterface $passwordHasher;

    /**
     * @var EntityManagerInterface
     */
    private $em;

    /**
     * @var Security
     */
    private $security;

    public function __construct(UserPasswordHasherInterface $passwordHasher, EntityManagerInterface $em, Security $security)
    {
        $this->passwordHasher = $passwordHasher;
        $this->em = $em;
        $this->security = $security;
    }

    /**
     * @return User
     */
    public function __invoke(User $data, ContainerBagInterface $params): User
    {
        /** @var User $user */
        $user = $this->security->getUser();

        if (!in_array('ROLE_ADMIN', $user->getRoles())) {
            $captcha =  $data->getCaptcha();

            if (!$captcha) {
                throw new BadRequestException("Veuillez vérifier le formulaire captcha.");
            }

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, "https://www.google.com/recaptcha/api/siteverify");
            curl_setopt($ch, CURLOPT_HEADER, 0);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, [
                'secret' => $params->get('recaptcha_key'),
                'response' => $captcha,
                'remoteip' => $_SERVER['REMOTE_ADDR']
            ]);

            $resp = json_decode(curl_exec($ch));
            curl_close($ch);

            if ($resp->success) {
                // Success
            } else {
                // failure
                throw new BadRequestException("ReCaptcha non valide.");
            }
        }

        try {
            $email = $data->getEmail();
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

            $data->setUsername($email);
            $data->setRoles(['ROLE_REPAIRMAN']);
            $plainPassword = $data->getPlainPassword();
            if (empty($plainPassword)) {
                $plainPassword = uniqid();
            }
            $encoded = $this->passwordHasher->hashPassword($data, $plainPassword);
            $data->setPassword($encoded);
            $data->setIsRegistrationCompleted(false);
        } catch (\Exception $e) {
            throw new BadRequestException($e->getMessage());
        }

        return $data;
    }
}
