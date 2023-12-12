<?php

declare(strict_types=1);

namespace App\Doctrine;

use App\Entity\Command;
use Doctrine\ORM\QueryBuilder;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Security;

class CommandsCollectionFilterExtension implements QueryCollectionExtensionInterface
{
    private $security;
    private $em;

    public function __construct(Security $security, EntityManagerInterface $em)
    {
        $this->security = $security;
        $this->em = $em;
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
        /** @var User $user */
        $user = $this->security->getUser();

        $rootAlias = $queryBuilder->getRootAliases()[0];

        if (Command::class === $resourceClass) {

            if ($operationName !== 'get_commands_devis_count' && $operationName !== 'get_commands_count') {

                if ($this->security->isGranted('ROLE_CLIENT')) {
                    $queryBuilder
                        ->andWhere(sprintf('IDENTITY(%s.client) = :idClient', $rootAlias))
                        ->setParameter('idClient', $user->getId());
                } else if ($this->security->isGranted('ROLE_REPAIRMAN')) {

                    $query = $this->em->createQueryBuilder()
                        ->from('App\Entity\Benefit', 'b')
                        ->select("b.id")
                        ->andWhere('IDENTITY(b.user) = :idUser')
                        ->setParameter('idUser', $user->getId());
                    $results = $query->getQuery()->getResult();

                    $ids = [0];
                    foreach ($results as $r) {
                        $ids[] = $r['id'];
                    }

                    $queryBuilder->andWhere(sprintf('IDENTITY(%s.benefit) IN (:ids)', $rootAlias))
                        ->setParameter('ids', $ids);
                }
            }

            if ($operationName === 'get_commands' || $operationName === 'get_commands_ids') {
                $queryBuilder->andWhere(sprintf(' %s.isCommand = 1 ', $rootAlias));
            } elseif ($operationName === 'get_commands_devis' || $operationName === 'get_commands_devis_ids') {
                $queryBuilder->andWhere(sprintf(' %s.isCommand IS NULL ', $rootAlias));
            }
            $queryBuilder->andWhere(sprintf(' %s.stepsCompleted = 1 ', $rootAlias));
        }
    }
}
