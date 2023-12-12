<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\Thread;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Thread|null find($id, $lockMode = null, $lockVersion = null)
 * @method Thread|null findOneBy(array $criteria, array $orderBy = null)
 * @method Thread[]    findAll()
 * @method Thread[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ThreadRepository extends ServiceEntityRepository
{
    /**
     * @var userRepository
     */
    private userRepository $userRepository;

    /**
     * @var EntityManagerInterface
     */
    private $em;

    public function __construct(ManagerRegistry $registry, UserRepository $userRepository, EntityManagerInterface $em)
    {
        parent::__construct($registry, Thread::class);
        $this->userRepository = $userRepository;
        $this->em = $em;
    }

    public function getThreadByUser($idUser1, $idUser2)
    {
        $threads = $this->createQueryBuilder('t')
            ->select('t.id')
            ->join('t.users', 'u')
            ->where('u.id IN (:users)')
            ->setParameter('users', array($idUser1, $idUser2))
            ->groupBy('t.id')
            ->having('count(t.id) >= 2')
            ->getQuery()
            ->getOneOrNullResult();

        if ($threads) {
            return $threads['id'];
        }else{
            
            $thread = new Thread();
            $thread->addUser($this->userRepository->find($idUser1));
            $thread->addUser($this->userRepository->find($idUser2));
            $this->em->persist($thread);
            $this->em->flush();
            if($thread->getId()){
                return $thread->getId();
            }
        }
        return null;
    }
}
