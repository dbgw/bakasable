<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Entity\Universe;
use App\Entity\Category;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Paginator;

final class GetUniversesCategoriesDetailsAction
{
    public function __invoke($data)
    {
        /**
         * @var Universe $universe
         */
        foreach ($data as $universe) {
            /**
             * @var Category $category
             */
            foreach ($universe->getCategories() as $category) {
                $total = 0;
                /**
                 * @var Category $subCategory
                 */
                foreach ($category->getChildren() as $subCategory) {
                    $subTotal = count($subCategory->getServices());
                    $subCategory->setTotalServices($subTotal);
                    $total += $subTotal;
                }
                $category->setTotalServices($total);
            }
        }
        return $data;
    }
}
