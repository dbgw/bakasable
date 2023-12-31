<?php

declare(strict_types=1);

namespace App\Filter;

use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use ApiPlatform\Core\Exception\InvalidArgumentException;
use Doctrine\ORM\Query\Parameter;
use Doctrine\ORM\QueryBuilder;

class OrSearchFilter extends SearchFilter
{
    protected function filterProperty(string $property, $values, QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, string $operationName = null): void
    {
        // Just use this filter for `or` query parameter
        if ($property !== 'or') {
            return;
        }
        $queryJoinParts = [];
        $ors = [];
        // Loop through every time the parameter is used
        // fields will be comma delimited string if used as described or[field1,field2]
        foreach ($values as $fields=>$value) {
            // Clone and empty the where part of the query builder
            $subQueryBuilder = clone $queryBuilder;
            $subQueryBuilder->resetDQLPart('where');

            // create array of all fields we want to query
            $orProperties = explode(',', $fields);
            foreach ($orProperties as $orProperty) {
                // this will include all the nice stuff that the parent class implements before using our adapted `addWhereByStrategy`
                parent::filterProperty($orProperty, $value, $subQueryBuilder, $queryNameGenerator, $resourceClass, $operationName);
            }

            // This could result in further join queries so we should add them into our main QueryBuilder
            $queryJoinParts[] = $subQueryBuilder->getDQLPart('join');
            $ors[] = $subQueryBuilder->getDQLPart('where');

            // Include updated parameters, we will still have parameters from the original query builder
            foreach ($subQueryBuilder->getParameters() as $parameter) {
                /** @var Parameter $parameter */
                $queryBuilder->setParameter($parameter->getName(), $parameter->getValue(), $parameter->getType());
            }
        }
        $queryBuilder->resetDQLPart('join');
        foreach ($queryJoinParts as $joinParts) {
            foreach ($joinParts as $alias=>$joins) {
                foreach ($joins as $join) {
                    $queryBuilder->add('join', [$alias=>$join], true);
                }
            }
        }
        // Add the `or` queries we have generated into our main queryBuilder DQL parts in a single `and`
        $queryBuilder->andWhere($queryBuilder->expr()->andX(...$ors));
    }

    /**
     * This method is copied straight from the extended class, swapping `andWhere` for `orWhere`
     */
    protected function addWhereByStrategy(string $strategy, QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $alias, string $field, $values, bool $caseSensitive): void
    {
        if (!\is_array($values)) {
            $values = [$values];
        }

        $wrapCase = $this->createWrapCase($caseSensitive);
        $valueParameter = ':'.$queryNameGenerator->generateParameterName($field);
        $aliasedField = sprintf('%s.%s', $alias, $field);

        if (null === $strategy || self::STRATEGY_EXACT === $strategy) {
            if (1 === \count($values)) {
                $queryBuilder
                    ->orWhere($queryBuilder->expr()->eq($wrapCase($aliasedField), $wrapCase($valueParameter)))
                    ->setParameter($valueParameter, $values[0]);

                return;
            }

            $queryBuilder
                ->orWhere($queryBuilder->expr()->in($wrapCase($aliasedField), $valueParameter))
                ->setParameter($valueParameter, $caseSensitive ? $values : array_map('strtolower', $values));

            return;
        }

        $ors = [];
        $parameters = [];
        foreach ($values as $key => $value) {
            $keyValueParameter = sprintf('%s_%s', $valueParameter, $key);
            $parameters[$caseSensitive ? $value : strtolower($value)] = $keyValueParameter;

            switch ($strategy) {
                case self::STRATEGY_PARTIAL:
                    $ors[] = $queryBuilder->expr()->like(
                        $wrapCase($aliasedField),
                        $wrapCase((string) $queryBuilder->expr()->concat("'%'", $keyValueParameter, "'%'"))
                    );
                    break;
                case self::STRATEGY_START:
                    $ors[] = $queryBuilder->expr()->like(
                        $wrapCase($aliasedField),
                        $wrapCase((string) $queryBuilder->expr()->concat($keyValueParameter, "'%'"))
                    );
                    break;
                case self::STRATEGY_END:
                    $ors[] = $queryBuilder->expr()->like(
                        $wrapCase($aliasedField),
                        $wrapCase((string) $queryBuilder->expr()->concat("'%'", $keyValueParameter))
                    );
                    break;
                case self::STRATEGY_WORD_START:
                    $ors[] = $queryBuilder->expr()->orX(
                        $queryBuilder->expr()->like($wrapCase($aliasedField), $wrapCase((string) $queryBuilder->expr()->concat($keyValueParameter, "'%'"))),
                        $queryBuilder->expr()->like($wrapCase($aliasedField), $wrapCase((string) $queryBuilder->expr()->concat("'% '", $keyValueParameter, "'%'")))
                    );
                    break;
                default:
                    throw new InvalidArgumentException(sprintf('strategy %s does not exist.', $strategy));
            }
        }

        $queryBuilder->orWhere($queryBuilder->expr()->orX(...$ors));
        array_walk($parameters, [$queryBuilder, 'setParameter']);
    }
}