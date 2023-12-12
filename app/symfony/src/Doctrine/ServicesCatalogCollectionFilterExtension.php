<?php

declare(strict_types=1);

namespace App\Doctrine;

use App\Entity\Service;
use Doctrine\ORM\QueryBuilder;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;

class ServicesCatalogCollectionFilterExtension implements QueryCollectionExtensionInterface
{
    /**
     * @var EntityManagerInterface 
     */
    private EntityManagerInterface $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, string $operationName = null, array $context = []): void
    {
        $this->addWhere($queryBuilder, $resourceClass, $operationName, $context);
    }

    private function addWhere(QueryBuilder $queryBuilder, string $resourceClass, string $operationName, array $context = [])
    {
        if (Service::class === $resourceClass && ($operationName == 'get_services_catalog')) {
            $rootAlias = $queryBuilder->getRootAliases()[0];

            $lat = !empty($context['filters']['latitude']) ? $context['filters']['latitude'] : null;
            $lng = !empty($context['filters']['longitude']) ? $context['filters']['longitude'] : null;

            if ($lat && $lng) {

                //services with benefits condition distance
                $expDistance = "COALESCE((6371 * acos(cos(radians(:lat)) * cos(radians(u.latitude)) * cos(radians(u.longitude) - radians(:lng)) + sin(radians(:lat)) * sin(radians(u.latitude)))), 0)";
                $query1 = $this->em->createQueryBuilder()
                    ->from('App\Entity\Benefit', 'b')
                    ->join('b.user', 'u')
                    ->join('b.deliveryModes', 'd')
                    ->select("IDENTITY(b.service) as id, " . $expDistance . " as HIDDEN distance")
                    ->setParameter('lat', $lat)
                    ->setParameter('lng', $lng)
                    ->where('d.radius = 0 or (d.radius = 1 AND d.distance >= ' . $expDistance . ')')
                    ->andWhere('u.status = 1')
                    ->andWhere('b.archive = 0')
                    ->orderBy('distance')
                    ->addOrderBy('id', 'ASC')
                    ->distinct('b.id');
                $results1 = $query1->getQuery()->getResult();

                $ids = [0];
                foreach ($results1 as $r) {
                    $ids[] = $r['id'];
                }

                //other services
                $query2 = $this->em->createQueryBuilder()
                    ->from('App\Entity\Service', 's')
                    ->select("s.id")
                    ->where('s.id NOT IN (:ids)')
                    ->setParameter('ids', $ids)
                    ->orderBy('s.id','ASC');
                $results2 = $query2->getQuery()->getResult();

                foreach ($results2 as $r) {
                    $ids[] = $r['id'];
                }

                $rootAlias = $queryBuilder->getRootAliases()[0];
                $queryBuilder->addSelect(sprintf("FIELD(%s.id,%s) as HIDDEN field", $rootAlias, implode(',', $ids)))
                    ->orderBy('field', 'ASC')
                    ->addOrderBy(sprintf("%s.id", $rootAlias), 'ASC')
                    ->andWhere(sprintf('%s.id IN (:ids)', $rootAlias))
                    ->setParameter('ids', $ids);
            } else {
                //throw new BadRequestException('Vous devez renseigner votre localisation.');
            }
        }
    }
}
