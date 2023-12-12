<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Entity\User;
use App\Service\SendEmail;
use App\Entity\MediaObject;
use App\Service\StripeProvider;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Lexik\Bundle\JWTAuthenticationBundle\Events;
use Symfony\Component\HttpFoundation\JsonResponse;
use Gesdinet\JWTRefreshTokenBundle\Entity\RefreshToken;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;
use Symfony\Component\Security\Core\Exception\InvalidArgumentException;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

final class PutUserAction
{
    /**
     * @var EntityManagerInterface
     */
    private $em;

    /**
     * 
     * @var JWTTokenManagerInterface
     */
    private $JWTManager;

    /**
     * @var Security
     */
    private $security;

    /**
     * @var EventDispatcherInterface
     */
    private $dispatcher;
    /**
     * @var StripeProvider
     */
    private StripeProvider $stripeProvider;

    /**
     * @var SendEmail
     */
    private SendEmail $mailer;

    public function __construct(UserPasswordHasherInterface $passwordHasher, EntityManagerInterface $em, JWTTokenManagerInterface $JWTManager, Security $security, EventDispatcherInterface $dispatcher, StripeProvider $stripeProvider, SendEmail $mailer)
    {
        $this->passwordHasher = $passwordHasher;
        $this->em = $em;
        $this->JWTManager = $JWTManager;
        $this->security = $security;
        $this->dispatcher = $dispatcher;
        $this->stripeProvider = $stripeProvider;
        $this->mailer = $mailer;
    }

    /**
     * @param User $data
     * @param Request $request
     * @return User
     */
    public function __invoke(User $data, Request $request): User
    {
        try {

            /** @var User $user */
            $user = $this->security->getUser();

            $email = $data->getEmail();
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                throw new BadRequestException("Le format du mail est incorrect.");
            }

            $isUsed = $this->em->getRepository(User::class)->checkEmailIsUsed($email, $data->getId());
            if ($isUsed) {
                throw new BadRequestException("Cet email est déjà utilisé par un autre compte.");
            }
            
            $postData = json_decode($request->getContent(), true);
            $plainPassword = !empty($postData['plainPassword']) ? $postData['plainPassword'] : null;
            if (!empty($plainPassword)) {
                $encoded = $this->passwordHasher->hashPassword($data, $plainPassword);
                if (in_array('ROLE_ADMIN', $user->getRoles()) && in_array('ROLE_REPAIRMAN', $data->getRoles())) {
                    $data->setPassword($encoded);
                } else {
                    $currentPassword = !empty($postData['currentPassword']) ? $postData['currentPassword'] : null;
                    $match = !empty($currentPassword) ? $this->passwordHasher->isPasswordValid($data, $currentPassword) : false;
                    if ($match) {
                        $data->setPassword($encoded);
                    } else {
                        throw new InvalidArgumentException('Le mot de passe actuel saisi est incorrect.');
                    }
                }
            }
            $results = $this->em->createQueryBuilder()
                ->from('App:User', 'u')
                ->select('u.picture, u.achievements, u.status, u.email')
                ->where('u.id = :id')
                ->setParameter('id', $data->getId())
                ->setMaxResults(1)
                ->getQuery()
                ->getOneOrNullResult();

            if ($results) {
                $picture = str_replace('/media/', '', $data->getPicture());
                $pictureOld = str_replace('/media/', '', $results['picture']);

                if (!empty($pictureOld) && $picture !== $pictureOld) {

                    $mediaObject = $this->em->getRepository(MediaObject::class)->findOneBy(['filePath' => $pictureOld]);

                    if ($mediaObject instanceof MediaObject) {
                        try {
                            $this->em->remove($mediaObject);
                            $this->em->flush();
                        } catch (\Exception $e) {
                            throw new InvalidArgumentException('Une erreur inattendue vous empêche de supprimer l\'image, ' . $e->getMessage());
                        }
                    }
                }

                $achievements = $data->getAchievements();
                $achievementsOld = $results['achievements'];

                if (is_array($achievementsOld) && count($achievementsOld) && count(array_diff($achievementsOld, $achievements))) {
                    foreach ($achievementsOld as $file) {
                        if (!in_array($file, $achievements)) {
                            $file = str_replace('/media/', '', $file);
                            $mediaObject = $this->em->getRepository(MediaObject::class)->findOneBy(['filePath' => $file]);

                            if ($mediaObject instanceof MediaObject) {
                                try {
                                    $this->em->remove($mediaObject);
                                    $this->em->flush();
                                } catch (\Exception $e) {
                                    throw new InvalidArgumentException('Une erreur inattendue vous empêche de supprimer l\'image, ' . $e->getMessage());
                                }
                            }
                        }
                    }
                }

                $requireUpdateToken = false;

                if (in_array('ROLE_REPAIRMAN', $user->getRoles()) && $user->getIsRegistrationCompleted() === false) {
                    $data->setIsRegistrationCompleted(true);
                    $requireUpdateToken = true;
                }

                if ($data->getEmail() !== $results['email'] || !empty($plainPassword)) {
                    $data->setUsername($data->getEmail());
                    $requireUpdateToken = true;
                }

                if ($requireUpdateToken) {
                    $this->em->flush();
                    $jwt = $this->JWTManager->create($data);
                    $oldRefreshToken = $this->em->getRepository(RefreshToken::class)->findOneBy(['username' => $data->getEmail()]);
                    if ($oldRefreshToken instanceof RefreshToken) {
                        $data->setPayload([
                            'token' => $jwt,
                            'refresh_token' => $oldRefreshToken->getRefreshToken()
                        ]);
                    } else {
                        $response = new JsonResponse();
                        $event    = new AuthenticationSuccessEvent(['token' => $jwt], $data, $response);
                        $this->dispatcher->dispatch($event, Events::AUTHENTICATION_SUCCESS);
                        $data->setPayload($event->getData());
                    }
                }
            }
        } catch (\Exception $e) {
            throw new BadRequestException($e->getMessage());
        }

        if (in_array('ROLE_ADMIN', $user->getRoles())) {

            if (in_array('ROLE_REPAIRMAN', $data->getRoles())) {

                if (1 === $data->getStatus()) {
                    if (!$data->getStripeAccountId()) {
                        if ($data->getStripeAccountToken()) {
                            try {
                                $account = $this->stripeProvider->createAccount($data);
                                if ($account) {
                                    $data->setStripeAccountId($account->id);
                                }
                            } catch (\Exception $e) {
                                throw new BadRequestException("Un problème est survenu Lors de la création du compte strip du réparateur " . $data->getEmail() . ".");
                            }
                        } else {
                            throw new BadRequestException("Un problème est survenu Lors de la création du compte strip du réparateur " . $data->getEmail() . ".");
                        }
                    }

                    if ($results) {
                        $statusOld = $results['status'];
                        if (0 === $statusOld) {
                            $this->mailer->send(
                                $data->getEmail(),
                                "Demande d'inscription à notre plateforme",
                                'emails/repairman_account_enabled.html.twig',
                                [
                                    'user' => $data,
                                    'urlHome' => $this->mailer->getDomainName(),
                                    'urlForgotPassword' => $this->mailer->getDomainName() . '?forgotPasswordRepairman=1',
                                    'contact' => $this->mailer->getMailerContact(),
                                    'phone' => $this->mailer->getMailerPhone(),
                                ]
                            );
                        }
                    }
                }
            }
        }

        return $data;
    }
}
