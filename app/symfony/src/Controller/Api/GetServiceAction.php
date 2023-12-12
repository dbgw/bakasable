<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Entity\Benefit;
use App\Entity\Service;
use App\Entity\DeliveryMode;
use Symfony\Component\HttpFoundation\Request;
use App\Repository\BenefitRepository;

final class GetServiceAction
{
    /**
     * @param Service $service
     * @param Request $request
     * @param BenefitRepository $benefitRepository
     * @return Service
     */
    public function __invoke(Service $data, Request $request,  BenefitRepository $benefitRepository): Service
    {
        $prices = [];
        $countForfait = 0;
        $benefits = [];

        $lat = $request->query->get('latitude', '');
        $lng = $request->query->get('longitude', '');
        if ($lat && $lng) {
            $benefits = $benefitRepository->getBenefitsServiceByDistance($lat, $lng, $data->getId());
        } else {
            $benefits = $data->getBenefits();
        }

        /**
         * @var Benefit $benefit
         */
        foreach ($benefits as $benefit) {
            if ($benefit->getTypeService() === 'forfait') {
                $countForfait++;
                /**
                 * @var DeliveryMode $deliveryMode
                 */
                foreach ($benefit->getDeliveryModes() as $deliveryMode) {
                    if ($deliveryMode->getPrice() > 0) {
                        $prices[] = floatval($deliveryMode->getPrice());
                    }
                }
            }
        }

        if (Count($prices)) {
            $data->setMinPrice(floor(min($prices)));
            $data->setMaxPrice(ceil(max($prices)));
        }
        $data->setTotalBenefits(Count($benefits));
        return $data;
    }
}
