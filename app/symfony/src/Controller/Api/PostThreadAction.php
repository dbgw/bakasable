<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Entity\Thread;
use App\Entity\User;
use App\Repository\ThreadRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;

final class PostThreadAction
{
    /**
     * @var Security
     */
    private $security;

    /**
     * @var EntityManagerInterface
     */
    private $em;

    /**
     * @var ThreadRepository
     */
    private $threadRepository;

    public function __construct(EntityManagerInterface $em, ThreadRepository $threadRepository, Security $security)
    {
        $this->em = $em;
        $this->threadRepository = $threadRepository;
        $this->security = $security;
    }

    /**
     * @param Thread $data
     * @return Thread
     */
    public function __invoke(Thread $data, Request $request): Thread
    {
        /** @var User $user */
        $user = $this->security->getUser();
        
        $postData = json_decode($request->getContent());
        $id = $this->threadRepository->getThreadByUser($user->getId(), $postData->user);
        if ($id){
            return $this->em->getRepository(Thread::class)->find($id);
        }
            
        $data->addUser($user);
        $data->addUser($this->em->getRepository(User::class)->findOneById($postData->user));
        return $data;
    }
}
