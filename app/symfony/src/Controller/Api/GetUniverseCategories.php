<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Entity\Universe;
use App\Entity\Service;
use App\Entity\Category;

final class GetUniverseCategories
{
    /**
     * @param Universe $data
     * @return Universe
     */
    public function __invoke(Universe $data): Universe
    {
        $idsServices = [];
        /**
         * @var Category $category
         */
        foreach ($data->getCategories() as $category) {
            /**
             * @var Category $subCategory
             */
            foreach ($category->getChildren() as $subCategory) {
                /**
                 * @var Service $service
                 */
                foreach ($subCategory->getServices() as $service) {
                    if (count($service->getBenefits()) && !in_array($service->getId(), $idsServices)) {
                        $idsServices[] = $service->getId();
                    }
                }
            }
        }
        $data->setTotalServices(count($idsServices));
        return $data;
    }
}
