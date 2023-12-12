<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Entity\Service;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Paginator;
use Symfony\Component\HttpFoundation\Request;
use App\Repository\BenefitRepository;

final class GetServicesCatalogAction
{
    /**
     * @param Paginator $data
     * @param Request $request
     * @return Paginator
     */
    public function __invoke(Paginator $data, Request $request, BenefitRepository $benefitRepository): Paginator
    {
        $lat = $request->query->get('latitude', '');
        $lng = $request->query->get('longitude', '');

        /**
         * @var Service $service
         */
        foreach ($data as $service) {
            $results = $benefitRepository->getBenefitsServiceByDistance($lat, $lng, $service->getId());
            if ($results === false) {
                $service->setTotalBenefits(count($service->getBenefits()));
            } else {
                $service->setTotalBenefits(count($results));
            }
        }
        //dd($data);
        return $data;
    }
}
