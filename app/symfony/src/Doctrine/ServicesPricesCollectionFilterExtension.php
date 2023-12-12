<?php

declare(strict_types=1);

namespace App\Doctrine;

use App\Entity\Service;
use Doctrine\ORM\QueryBuilder;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Security;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;

class ServicesPricesCollectionFilterExtension implements QueryCollectionExtensionInterface
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

    private function addWhere(QueryBuilder $queryBuilder, string $resourceClass, string $operationName = null, array $context = []): void
    {
        if (Service::class === $resourceClass && ($operationName == 'get_services_prices')) {

            if (isset($context['filters'], $context['filters']['order'])) {
                $sortParams = array_keys($context['filters']['order'])[0];
                $orderParams = array_values($context['filters']['order'])[0];

                if (in_array($sortParams, ['minPrice', 'maxPrice', 'averagePrice'])) {
                    $query = $this->em->createQuery(
                        "SELECT s.id ,
                            (SELECT MIN(dm1.price)
                            FROM App\Entity\Benefit b1
                            INNER JOIN App\Entity\DeliveryMode dm1
                            WHERE b1.service=s.id AND b1.typeService = 'forfait' AND b1.id = dm1.benefit AND dm1.price IS NOT NULL) AS minPrice,
        
                            (SELECT MAX(dm2.price)
                            FROM App\Entity\Benefit b2
                            INNER JOIN App\Entity\DeliveryMode dm2
                            WHERE b2.service=s.id AND b2.typeService = 'forfait' AND b2.id = dm2.benefit AND dm2.price IS NOT NULL) AS maxPrice,
                            
                            (SELECT AVG(dm3.price)
                            FROM App\Entity\Benefit b3
                            INNER JOIN App\Entity\DeliveryMode dm3
                            WHERE b3.service=s.id AND b3.typeService = 'forfait' AND b3.id = dm3.benefit AND dm3.price IS NOT NULL) AS averagePrice
                        FROM App\Entity\Service s
                        ORDER BY  " . $sortParams . "  " . $orderParams
                    );
                    $results = $query->getResult();
                    $ids = [];
                    foreach ($results as $r) {
                        $ids[] = $r['id'];
                    }
                    if (count($ids)) {
                        $rootAlias = $queryBuilder->getRootAliases()[0];
                        $queryBuilder->addSelect(sprintf("FIELD(%s.id,%s) as HIDDEN field", $rootAlias, implode(',', $ids)));
                        $queryBuilder->orderBy('field', 'ASC');
                    }
                } else if (in_array($sortParams, ['commands'])) {
                    $query = $this->em->createQuery(
                        "SELECT s.id ,
                            (SELECT count(c.id)
                            FROM App\Entity\Benefit b
                            INNER JOIN App\Entity\Command c
                            WHERE b.service=s.id AND c.benefit = b.id AND c.isCommand = 1 AND c.stepsCompleted = 1
                            GROUP BY s.id
                            ) AS commands
                        FROM App\Entity\Service s
                        ORDER BY  " . $sortParams . "  " . $orderParams
                    );

                    $results = $query->getResult();

                    $ids = [];
                    foreach ($results as $r) {
                        $ids[] = $r['id'];
                    }
                    if (count($ids)) {
                        $rootAlias = $queryBuilder->getRootAliases()[0];
                        $queryBuilder->addSelect(sprintf("FIELD(%s.id,%s) as HIDDEN field", $rootAlias, implode(',', $ids)));
                        $queryBuilder->orderBy('field', 'ASC');
                    }
                }
            }
        }
    }
}
