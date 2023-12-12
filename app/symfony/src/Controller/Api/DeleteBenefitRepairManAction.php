<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Entity\Benefit;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;
use App\Service\SendEmail;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Security\Core\Security;


class DeleteBenefitRepairManAction
{
    /**
     * @var SendEmail
     */
    private $mailer;

    /**
     * @var EntityManagerInterface
     */
    private EntityManagerInterface $em;

    /**
     * @var Security
     */
    private Security $security;

    /**
     * ForgotPasswordEventSubscriber constructor.
     * @param SendEmail $mailer
     * @param EntityManagerInterface $em
     * @param Security $security
     */
    public function __construct(SendEmail $mailer, EntityManagerInterface $em, Security $security)
    {
        $this->mailer = $mailer;
        $this->em = $em;
        $this->security = $security;
    }

    public function __invoke($id, Request $request)
    {
        /** @var User $user */
        $user = $this->security->getUser();
        $roles = $user->getRoles();
        $conditions = ['id' => $id];
        $isAdmin = false;
        if (in_array('ROLE_ADMIN', $roles)) {
            $isAdmin = true;
        } else {
            $conditions['user'] = $user->getId();
        }

        /** @var Benefit $benefit */
        $benefit = $this->em->getRepository(Benefit::class)->findOneBy($conditions);
        if ($benefit instanceof Benefit) {

            if ($isAdmin) {

                $motif = $request->query->get('motif', null);
                if (empty($motif)) {
                    throw new \RuntimeException("Veuillez svp renseigner le motif de suppression de cette prestation.");
                }

                try {
                    $this->mailer->send(
                        $benefit->getUser()->getEmail(),
                        'Suppression de votre prestation',
                        'emails/admin_delete_benefit.html.twig',
                        [
                            'firstName' => $benefit->getUser()->getFirstName(),
                            'lastName' => $benefit->getUser()->getLastName(),
                            'service' => $benefit->getService()->getName(),
                            'motif' => $motif,
                        ]
                    );
                } catch (TransportExceptionInterface $e) {
                    throw new \RuntimeException("Une erreur s'est produite lors de l'envoi d'un e-mail, veuillez réessayer plus tard.");
                }
            }

            if (count($benefit->getCommands())>0) {
                $benefit->setArchive(1);
                $this->em->persist($benefit);
            } else {
                $this->em->remove($benefit);
            }

            $this->em->flush();

            return new Response();
        } else {
            throw new BadRequestException('Vous n\'avez pas le droite de supprimer cette prestation');
        }
    }
}
