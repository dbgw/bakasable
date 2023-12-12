<?php

declare(strict_types=1);

namespace App\Doctrine;

use App\Entity\Thread;
use App\Entity\User;
use Doctrine\ORM\QueryBuilder;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;
use Symfony\Component\Security\Core\Security;

class ThreadsCollectionFilterExtension implements QueryCollectionExtensionInterface
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
        if (
            Thread::class === $resourceClass
        ) {
            $rootAlias = $queryBuilder->getRootAliases()[0];
            $user = $this->security->getUser();
            $queryBuilder
                ->leftJoin(sprintf('%s.users', $rootAlias), 'us')
                ->andWhere('us.id = :idUser')
                ->setParameter("idUser", $user->getId());
        }
    }
}
