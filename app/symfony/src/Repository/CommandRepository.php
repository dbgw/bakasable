<?php

namespace App\Repository;

use App\Entity\Command;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Command|null find($id, $lockMode = null, $lockVersion = null)
 * @method Command|null findOneBy(array $criteria, array $orderBy = null)
 * @method Command[]    findAll()
 * @method Command[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CommandRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Command::class);
    }

    public function getLastCommandAddress(int $idUser)
    {
        return $this->createQueryBuilder('c')
            ->join('c.benefit', 'benef')
            ->join('c.client', 'us')
            ->andWhere('us.id = :idUser')
            ->setParameter('idUser', $idUser)
            ->andWhere('c.firstName != :vide')
            ->andWhere('c.stepsCompleted = 1')
            ->setParameter('vide', "")
            ->orderBy("c.id", "DESC")
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function getRepCountCommandsByStatus(int $idRepar, $status, $type)
    {
        $qb = $this->createQueryBuilder('c')
            ->select('COUNT(c.id) as nbr')
            ->join('c.benefit', 'benef')
            ->join('benef.user', 'us')
            ->andWhere('us.id = :idRepar')
            ->setParameter('idRepar', $idRepar)
            ->andWhere('c.status = :status')
            ->setParameter('status', $status);

        if ($type == "devis") {
            $qb->andWhere('c.isCommand IS NULL');
        } else {
            $qb->andWhere('c.isCommand = 1');
        }
        $qb->andWhere('c.stepsCompleted = 1');
        return intval($qb->getQuery()
            ->getSingleScalarResult());
    }

    public function getClientCountCommandsByStatus(int $idClient, $status, $type)
    {
        $qb = $this->createQueryBuilder('c')
            ->select('COUNT(c.id) as nbr')
            ->join('c.client', 'client')
            ->andWhere('client.id = :idClient')
            ->setParameter('idClient', $idClient)
            ->andWhere('c.status = :status')
            ->setParameter('status', $status);

        if ($type == "devis") {
            $qb->andWhere('c.isCommand IS NULL');
        } else {
            $qb->andWhere('c.isCommand = 1');
        }
        $qb->andWhere('c.stepsCompleted = 1');
        return intval($qb->getQuery()
            ->getSingleScalarResult());
    }

    public function getAdminCountCommandsByStatus($status, $type)
    {
        $qb = $this->createQueryBuilder('c')
            ->select('COUNT(c.id) as nbr')
            ->andWhere('c.status = :status')
            ->setParameter('status', $status);

        if ($type == "devis") {
            $qb->andWhere('c.isCommand IS NULL');
        } else {
            $qb->andWhere('c.isCommand = 1');
        }
        $qb->andWhere('c.stepsCompleted = 1');
        return intval($qb->getQuery()
            ->getSingleScalarResult());
    }
}
