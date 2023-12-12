<?php

declare(strict_types=1);

namespace App\Doctrine;

use App\Entity\User;
use Doctrine\ORM\QueryBuilder;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use Symfony\Component\Security\Core\Security;

class UsersCollectionFilterExtension implements QueryCollectionExtensionInterface
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

    private function addWhere(QueryBuilder $queryBuilder, string $resourceClass, string $operationName = null, array $context = []): void
    {
        /** @var User $user */
        $user = $this->security->getUser();

        $rootAlias = $queryBuilder->getRootAliases()[0];
        if (User::class === $resourceClass) {

            if ($operationName == 'get_users_repairman' || $operationName == 'get_users_repairman_universes') {

                $queryBuilder->where(sprintf('%s.roles', $rootAlias) . " LIKE  '%ROLE_REPAIRMAN%'");
                if ($operationName == 'get_users_repairman_universes') {
                    $queryBuilder->andWhere(sprintf('%s.status=1', $rootAlias));
                }
            } else if ($operationName == 'get_users_client' || $operationName == 'get_users_client_list') {

                $queryBuilder->where(sprintf('%s.roles', $rootAlias) . " LIKE  '%ROLE_CLIENT%'");
            } else if ($operationName == 'get_users_admin') {

                $queryBuilder->andWhere(sprintf('%s.roles', $rootAlias) . " LIKE  '%ROLE_ADMIN%'");
            } else if ($operationName == 'get_users_client_devis' || $operationName == 'get_users_client_commands') {

                $queryBuilder->andWhere(sprintf('%s.roles', $rootAlias) . " LIKE  '%ROLE_ADMIN%'")
                    ->orWhere(sprintf('%s.roles', $rootAlias) . " LIKE  '%ROLE_CLIENT%'");
                $queryBuilder->join(sprintf('%s.commands', $rootAlias), "com");
                if ($this->security->isGranted("ROLE_REPAIRMAN")) {
                    $queryBuilder->join('com.benefit', 'benef')
                        ->join("benef.user", "us")
                        ->andWhere("us.id = :idRep")
                        ->setParameter("idRep", $user->getId());
                }
                $queryBuilder->andWhere('com.stepsCompleted = 1');
            } else if ($operationName == 'get_users_repairman_devis' || $operationName == 'get_users_repairman_commands') {

                $queryBuilder->andWhere(sprintf('%s.roles', $rootAlias) . " LIKE  '%ROLE_ADMIN%'")
                    ->orWhere(sprintf('%s.roles', $rootAlias) . " LIKE  '%ROLE_REPAIRMAN%'");
                $queryBuilder->join(sprintf('%s.benefits', $rootAlias), "benef");
                $queryBuilder->join("benef.commands", "com");

                if ($this->security->isGranted("ROLE_REPAIRMAN")) {
                    $queryBuilder->andWhere("IDENTITY(com.user) = :idUser")->setParameter('idUser', $user->getId());
                }else if ($this->security->isGranted("ROLE_CLIENT")) {
                    $queryBuilder->andWhere("IDENTITY(com.client) = :idUser")->setParameter('idUser', $user->getId());
                }

                if ($operationName == 'get_users_repairman_commands') {
                    $queryBuilder->andWhere('com.isCommand = 1');
                } elseif ($operationName == 'get_users_repairman_devis') {
                    $queryBuilder->andWhere('com.isCommand IS NULL ');
                }
                $queryBuilder->andWhere('com.stepsCompleted = 1');
            }

            if (isset($context['filters'], $context['filters']['active'])) {
                $queryBuilder->addSelect(sprintf("FIELD(%s.id,%s) as HIDDEN field", $rootAlias, $context['filters']['active']));
                $queryBuilder->orderBy('field', 'DESC');
            }
        }
    }
}
