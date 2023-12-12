<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Serializer\SerializerInterface;

final class PutUserLastSeenAction extends AbstractController
{
    /**
     * @var EntityManagerInterface
     */
    private $em;

    /**
     * @var Security
     */
    private $security;

    /**
     * @var HubInterface
     */
    private $hub;

    /**
     * @var SerializerInterface
     */
    private $serializer;

    public function __construct(EntityManagerInterface $em, HubInterface $hub, Security $security, SerializerInterface $serializer)
    {
        $this->em = $em;
        $this->security = $security;
        $this->hub = $hub;
        $this->serializer = $serializer;
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

            if ($data->getId() === $user->getId()) {
                $data->setLastSeen(new \DateTime());
                $this->em->persist($data);
                $this->em->flush();
                $public_url = $this->getParameter("mercure_public_url");
                $update = new Update(
                    $public_url . '/lastseen' . $data->getId(),
                    json_encode([
                        "type" => "lastseen",
                        'user' => json_decode($this->serializer->serialize($this->getUser(), 'json', ['groups' => ["read", "read:user"]]))
                    ])
                );

                $this->hub->publish($update);
            }
        } catch (\Exception $e) {
            throw new BadRequestException($e->getMessage());
        }
        return $data;
    }
}
