<?php

declare(strict_types=1);

namespace App\Controller\Api;

use FOS\ElasticaBundle\Finder\TransformedFinder;
use Elastica\Util;
use function Symfony\Component\String\u;
use Symfony\Component\HttpFoundation\Request;

final class SearchUniversesAction
{
    const MIN_CHAR_MDR = 3;
    const LIMIT_MDR = 10;

    public function __invoke(TransformedFinder $universeFinder, Request $request): array
    {
        $q = u((string) $request->query->get('q', ''))->trim()->toString();
        $results = [];
        if (strlen($q) >= Self::MIN_CHAR_MDR) {
            $results = $universeFinder->find(Util::escapeTerm($q), Self::LIMIT_MDR);
        }
        return $results;
    }
}
