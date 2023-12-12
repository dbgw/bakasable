<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\NewService;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method NewService|null find($id, $lockMode = null, $lockVersion = null)
 * @method NewService|null findOneBy(array $criteria, array $orderBy = null)
 * @method NewService[]    findAll()
 * @method NewService[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class NewServiceRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, NewService::class);
    }
}
