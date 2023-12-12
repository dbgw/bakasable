<?php

declare(strict_types=1);

namespace App\Doctrine;

use App\Entity\Service;
use App\Entity\User;
use Doctrine\ORM\QueryBuilder;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use App\Entity\Benefit;

class BenefitExtension implements QueryItemExtensionInterface
{
    public function applyToItem(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, array $identifiers, string $operationName = null, array $context = []): void
    {
        $this->addWhere($queryBuilder, $resourceClass, $operationName, $context);
    }

    private function addWhere(QueryBuilder $queryBuilder, string $resourceClass, string $operationName, array $context = [])
    {
        if (Benefit::class === $resourceClass) {
           $rootAlias = $queryBuilder->getRootAliases()[0];
            if($operationName == 'get_benefit_details'){
               $lat = !empty($context['filters']['latitude']) ? $context['filters']['latitude'] : null;
               $lng = !empty($context['filters']['longitude']) ? $context['filters']['longitude'] : null;
               if ($lat && $lng) {
                   $expDistance = "COALESCE((6371 * acos(cos(radians(:lat)) * cos(radians(u.latitude)) * cos(radians(u.longitude) - radians(:lng)) + sin(radians(:lat)) * sin(radians(u.latitude)))), 0)";
                   $queryBuilder
                       ->join(sprintf('%s.user', $rootAlias), 'u')
                       ->join(sprintf('%s.deliveryModes', $rootAlias), 'd')
                       ->addSelect($expDistance . " as HIDDEN distance")
                       ->setParameter('lat', $lat)
                       ->setParameter('lng', $lng)
                       ->andWhere('d.radius = 0 or (d.radius = 1 AND d.distance >= ' . $expDistance.')')
                       ->orderBy('d.price',"ASC");
                   //dd($queryBuilder->getQuery()->getSQL());
                   //dd($queryBuilder->getQuery()->getResult());
               } else {
                   //throw new BadRequestException('Vous devez renseigner votre localisation.');
               }
            }
        }
    }
}
