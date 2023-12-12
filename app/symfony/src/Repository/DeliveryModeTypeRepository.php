<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\DeliveryModeType;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method DeliveryModeType|null find($id, $lockMode = null, $lockVersion = null)
 * @method DeliveryModeType|null findOneBy(array $criteria, array $orderBy = null)
 * @method DeliveryModeType[]    findAll()
 * @method DeliveryModeType[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class DeliveryModeTypeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, DeliveryModeType::class);
    }
}
