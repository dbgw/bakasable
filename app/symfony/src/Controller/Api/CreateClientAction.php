<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Entity\User;
use App\Service\SendEmail;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Events;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ContainerBagInterface;

final class CreateClientAction
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
     * @var SendEmail
     */
    private $mailer;

    /**
     * 
     * @var JWTTokenManagerInterface
     */
    private JWTTokenManagerInterface $JWTManager;

    /**
     * @var EventDispatcherInterface
     */
    private EventDispatcherInterface $dispatcher;

    public function __construct(UserPasswordHasherInterface $passwordHasher,  SendEmail $mailer, EntityManagerInterface $em, JWTTokenManagerInterface $JWTManager, EventDispatcherInterface $dispatcher)
    {
        $this->passwordHasher = $passwordHasher;
        $this->em = $em;
        $this->mailer = $mailer;
        $this->JWTManager = $JWTManager;
        $this->dispatcher = $dispatcher;
    }

    /**
     * @return User
     */
    public function __invoke(User $data, ContainerBagInterface $params): User
    {
        $captcha =  $data->getCaptcha();

        if(!$captcha){
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
            $data->setRoles(['ROLE_CLIENT']);
            $plainPassword = $data->getPlainPassword();
            $encoded = $this->passwordHasher->hashPassword($data, $plainPassword);
            $data->setPassword($encoded);
            $data->setUsername($data->getEmail());
            $data->setStatus(1);
            $this->em->persist($data);
            $this->em->flush();

            //create new jwt token
            $jwt = $this->JWTManager->create($data);
            $response = new JsonResponse();
            $event    = new AuthenticationSuccessEvent(['token' => $jwt], $data, $response);
            $this->dispatcher->dispatch($event, Events::AUTHENTICATION_SUCCESS);
            $data->setPayload($event->getData());

            // Send email validation
            $this->mailer->send(
                $data->getEmail(),
                'Bienvenue sur notre site ',
                'emails/welcome.html.twig',
                [
                    'user' => $data,
                    'urlHome' => $this->mailer->getDomainName(),
                ]
            );
        } catch (\Exception $e) {
            throw new BadRequestException($e->getMessage());
        }

        return $data;
    }
}
