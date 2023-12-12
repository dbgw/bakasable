<?php

declare(strict_types=1);

namespace App\Doctrine;

use App\Entity\Service;
use App\Entity\User;
use Doctrine\ORM\QueryBuilder;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use Symfony\Component\Security\Core\Security;
use Doctrine\ORM\Query\Expr;

class ServicesCollectionFilterExtension implements QueryCollectionExtensionInterface
{
    /**
     * @var Security 
     */
    private Security $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, string $operationName = null, array $context = []): void
    {
        $this->addWhere($queryBuilder, $resourceClass, $operationName, $context);
    }

    private function addWhere(QueryBuilder $queryBuilder, string $resourceClass, string $operationName = null, array $context = []): void
    {
        if (Service::class === $resourceClass) {
            $rootAlias = $queryBuilder->getRootAliases()[0];
            if ($operationName == 'get_services_repairman') {

                $benefit = !empty($context['filters']['benefit']) ? intval($context['filters']['benefit']) : null;

                /** @var User $user */
                $user = $this->security->getUser();

                $idsUniverse = [];
                if (count($user->getShowcases())) {
                    foreach ($user->getShowcases() as $showcase) {
                        $idsUniverse[] = $showcase->getId();
                    }
                }
                $queryBuilder->join(sprintf('%s.categories', $rootAlias), 'subCat');
                $queryBuilder->leftJoin('subCat.parent', 'cat');
                $queryBuilder->andWhere('IDENTITY(cat.universe) IN (:idsUniverse)');
                $queryBuilder->setParameter('idsUniverse', $idsUniverse);

                $queryBuilder->leftJoin(sprintf('%s.benefits', $rootAlias), 'b', Expr\Join::WITH, 'IDENTITY(b.user) = :idUser and b.archive = 0');
                $queryBuilder->setParameter('idUser', $user->getId());

                if($benefit === -1){
                    $queryBuilder->groupBy( sprintf('%s.id', $rootAlias)); 
                    $queryBuilder->having( 'count(b.id) = 0');
                }else if($benefit === 1){
                    $queryBuilder->groupBy( sprintf('%s.id', $rootAlias)); 
                    $queryBuilder->having( 'count(b.id) > 0');
                }
            
            } else if ($operationName == 'get_services') {
                $atLeastOne = !empty($context['filters']['atLeastOne']) ? $context['filters']['atLeastOne'] : null;
                if ($atLeastOne) {
                    $queryBuilder->innerJoin(sprintf('%s.benefits', $rootAlias), 'b');
                }
            }
        }
    }
}
