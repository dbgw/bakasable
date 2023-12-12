<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Entity\Benefit;
use App\Entity\Service;
use App\Entity\DeliveryMode;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Paginator;

final class GetBenefitsAction
{
    /**
     * @param Paginator $data
     * @return Paginator
     */
    public function __invoke(Paginator $data): Paginator
    {
        /**
         * @var Benefit $benefit
         */
        foreach ($data as $benefit) {
            if ($benefit->getService() instanceof Service) {
                $prices =  [];
                /**
                 * @var Benefit $benefitService
                 */
                foreach ($benefit->getService()->getBenefits() as $benefitService) {
                    if ($benefitService->getTypeService() === 'forfait') {
                        /**
                         * @var DeliveryMode $deliveryMode
                         */
                        foreach ($benefitService->getDeliveryModes() as $deliveryMode) {
                            if ($deliveryMode->getPrice()) $prices[] = floatval($deliveryMode->getPrice());
                        }
                    }
                }

                if (Count($prices)) {
                    $benefit->getService()->setMinPrice(min($prices));
                    $benefit->getService()->setMaxPrice(max($prices));
                    $benefit->getService()->setAveragePrice(array_sum($prices) / count($prices));
                }

                $pricesBenefit =  [];
                /**
                 * @var DeliveryMode $deliveryMode
                 */
                foreach ($benefit->getDeliveryModes() as $deliveryMode) {
                    if ($deliveryMode->getPrice()) $pricesBenefit[] = floatval($deliveryMode->getPrice());
                }

                if (Count($pricesBenefit)) {
                    $benefit->setMinPrice(min($pricesBenefit));
                }
            }
        }
        return $data;
    }
}
