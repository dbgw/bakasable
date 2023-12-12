<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\Universe;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Universe|null find($id, $lockMode = null, $lockVersion = null)
 * @method Universe|null findOneBy(array $criteria, array $orderBy = null)
 * @method Universe[]    findAll()
 * @method Universe[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UniverseRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Universe::class);
    }
}
