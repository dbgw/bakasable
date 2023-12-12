<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\DeliveryMode;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method DeliveryMode|null find($id, $lockMode = null, $lockVersion = null)
 * @method DeliveryMode|null findOneBy(array $criteria, array $orderBy = null)
 * @method DeliveryMode[]    findAll()
 * @method DeliveryMode[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class DeliveryModeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, DeliveryMode::class);
    }
}
