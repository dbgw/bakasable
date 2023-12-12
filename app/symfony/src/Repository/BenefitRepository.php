<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\Benefit;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Benefit|null find($id, $lockMode = null, $lockVersion = null)
 * @method Benefit|null findOneBy(array $criteria, array $orderBy = null)
 * @method Benefit[]    findAll()
 * @method Benefit[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BenefitRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Benefit::class);
    }

    public function getBenefitsServiceByDistance($lat, $lng, $idService)
    {
        if ($lat && $lng) {
            $expDistance = "COALESCE((6371 * acos(cos(radians(:lat)) * cos(radians(u.latitude)) * cos(radians(u.longitude) - radians(:lng)) + sin(radians(:lat)) * sin(radians(u.latitude)))), 0)";
            $queryBuilder = $this->createQueryBuilder('b')
                ->join('b.user', 'u')
                ->join('b.deliveryModes', 'd')
                ->addSelect($expDistance . " as HIDDEN distance")
                ->setParameter('lat', $lat)
                ->setParameter('lng', $lng)
                ->andwhere('d.radius = 0 or (d.radius = 1 AND d.distance >= ' . $expDistance . ')')
                ->andWhere('u.status = 1')
                ->andWhere('b.archive = 0')
                ->andWhere('IDENTITY(b.service) = :idService')
                ->setParameter('idService', $idService)
                ->orderBy('distance')
                ->distinct('b.id');
            return $queryBuilder->getQuery()->getResult();
        } else {
            return false;
        }
    }

    public function getDeliveryModesByDistance($lat, $lng, $idBenefit)
    {
        if ($lat && $lng) {
            $expDistance = "COALESCE((6371 * acos(cos(radians(:lat)) * cos(radians(u.latitude)) * cos(radians(u.longitude) - radians(:lng)) + sin(radians(:lat)) * sin(radians(u.latitude)))), 0)";
            $queryBuilder = $this->createQueryBuilder('b')
                ->join('b.user', 'u')
                ->leftJoin('b.deliveryModes', 'd')
                ->select('d.id')
                ->setParameter('lat', $lat)
                ->setParameter('lng', $lng)
                ->andwhere('d.radius = 0 or (d.radius = 1 AND d.distance >= ' . $expDistance . ')')
                ->andWhere('u.status = 1')
                ->andWhere('b.archive = 0')
                ->andWhere('b.id = :idBenefit')
                ->setParameter('idBenefit', $idBenefit);
            return $queryBuilder->getQuery()->getResult();
        } else {
            return [];
        }
    }
}
