<?php

declare(strict_types=1);

namespace App\Doctrine;

use App\Entity\Universe;
use App\Entity\User;
use Doctrine\ORM\QueryBuilder;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;
use Symfony\Component\Security\Core\Security;

class UniversesCollectionFilterExtension implements QueryCollectionExtensionInterface
{
    /**
     * @var Security
     */
    private Security $security;

    /**
     * @param Security $security
     */
    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, string $operationName = null, array $context = []): void
    {
        $this->addWhere($queryBuilder, $resourceClass, $operationName, $context);
    }

    public function applyToItem(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, array $identifiers, string $operationName = null, array $context = []): void
    {
        $this->addWhere($queryBuilder, $resourceClass, $operationName, $context);
    }

    private function addWhere(QueryBuilder $queryBuilder, string $resourceClass, string $operationName, array $context = [])
    {
        if (Universe::class === $resourceClass) {
            $rootAlias = $queryBuilder->getRootAliases()[0];

            if (in_array($operationName, ['get_all_universes_categories_details'])) {
                $queryBuilder
                    ->leftJoin(sprintf('%s.categories', $rootAlias), 'cat')
                    ->leftJoin('cat.children', 'subCat')
                    ->orderBy(sprintf('%s.position', $rootAlias), 'ASC')
                    ->addOrderBy('cat.position', 'ASC')
                    ->addOrderBy('subCat.position', 'ASC');

            }else if (in_array($operationName, ['get_universes_categories_details'])) {
                $queryBuilder
                    ->leftJoin(sprintf('%s.categories', $rootAlias), 'cat')
                    ->leftJoin('cat.children', 'subCat')
                    ->orderBy(sprintf('%s.position', $rootAlias), 'ASC')
                    ->addOrderBy('cat.position', 'ASC')
                    ->addOrderBy('subCat.position', 'ASC')
                    ->andWhere(sprintf('%s.enabled = 1', $rootAlias));
                    
            }else if(in_array($operationName, ['get_universes_categories_repairman','get_universes_categories'])){
                $queryBuilder
                    ->leftJoin(sprintf('%s.categories', $rootAlias), 'cat')
                    ->leftJoin('cat.children', 'subCat')
                    ->orderBy(sprintf('%s.name', $rootAlias), 'ASC')
                    ->addOrderBy('cat.name', 'ASC')
                    ->addOrderBy('subCat.name', 'ASC');
                if ($operationName === 'get_universes_categories_repairman') {
                    /** @var User $user */
                    $user = $this->security->getUser();
                    $queryBuilder->innerJoin(sprintf('%s.users', $rootAlias), 'u')
                        ->andWhere('u.id = :idUser')
                        ->setParameter('idUser', $user->getId());
                    $atLeastOne = !empty($context['filters']['atLeastOne']) ? $context['filters']['atLeastOne'] : null;
                    if ($atLeastOne) {
                        $queryBuilder->join('subCat.services', 's')
                            ->join('s.benefits', 'b')
                            ->addOrderBy('s.name', 'ASC');
                    }
                }
            }else if(in_array($operationName, ['get_universes'])){
                $queryBuilder->andWhere(sprintf('%s.enabled = 1', $rootAlias));
            }
        }
    }
}
