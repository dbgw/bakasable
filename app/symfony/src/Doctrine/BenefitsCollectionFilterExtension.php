<?php

declare(strict_types=1);

namespace App\Doctrine;

use App\Entity\Service;
use App\Entity\User;
use Doctrine\ORM\QueryBuilder;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use App\Entity\Benefit;
use Symfony\Component\Security\Core\Security;

class BenefitsCollectionFilterExtension implements QueryCollectionExtensionInterface
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

    private function addWhere(QueryBuilder $queryBuilder, string $resourceClass, string $operationName, array $context = [])
    {
        if (Benefit::class === $resourceClass) {
            $rootAlias = $queryBuilder->getRootAliases()[0];

            /** @var User $user */
            $user = $this->security->getUser();

            $queryBuilder->innerJoin(sprintf('%s.user', $rootAlias), 'u')
                ->andWhere('u.status = 1');

            if ($operationName == 'get_benefits_repairman') {

                $queryBuilder->andWhere('u.id = :idUser');
                $queryBuilder->setParameter('idUser', $user->getId());
            } else if ($operationName == 'get_benefits_service') {

                $lat = !empty($context['filters']['latitude']) ? $context['filters']['latitude'] : null;
                $lng = !empty($context['filters']['longitude']) ? $context['filters']['longitude'] : null;
                if ($lat && $lng) {
                    $expDistance = "COALESCE((6371 * acos(cos(radians(:lat)) * cos(radians(u.latitude)) * cos(radians(u.longitude) - radians(:lng)) + sin(radians(:lat)) * sin(radians(u.latitude)))), 0)";
                    $queryBuilder
                        ->join(sprintf('%s.deliveryModes', $rootAlias), 'd')
                        ->addSelect($expDistance . " as HIDDEN distance")
                        ->setParameter('lat', $lat)
                        ->setParameter('lng', $lng)
                        ->andwhere('d.radius = 0 or (d.radius = 1 AND d.distance >= ' . $expDistance . ')')
                        ->orderBy('distance')
                        ->distinct(sprintf('%s.id', $rootAlias));
                    //dd($queryBuilder->getQuery()->getSQL());
                    //dd($queryBuilder->getQuery()->getResult());
                } else {
                    //throw new BadRequestException('Vous devez renseigner votre localisation.');
                }
            }
            $queryBuilder->andWhere(sprintf('%s.archive = 0', $rootAlias));
        }
    }
}
