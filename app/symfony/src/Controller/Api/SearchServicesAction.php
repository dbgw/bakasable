<?php

declare(strict_types=1);

namespace App\Controller\Api;

use FOS\ElasticaBundle\Finder\TransformedFinder;
use Elastica\Util;
use function Symfony\Component\String\u;
use Symfony\Component\HttpFoundation\Request;

final class SearchServicesAction
{
    const MIN_CHAR_MDR = 3;
    const LIMIT_MDR = 10;

    public function __invoke(TransformedFinder $serviceFinder, Request $request): array
    {
        $q = u((string) $request->query->get('q', ''))->trim()->toString();
        $results = [];
        if (strlen($q) >= Self::MIN_CHAR_MDR) {
            $results = $serviceFinder->find(Util::escapeTerm($q), Self::LIMIT_MDR, array("fields"=> ["name","categories.parent.name","categories.name","description"]));
        }
        return $results;
    }
}
