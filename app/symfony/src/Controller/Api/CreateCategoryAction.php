<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Entity\Category;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;

final class CreateCategoryAction
{
    /**
     * @param Category $data
     * @return Category
     */
    public function __invoke(Category $data): Category
    {
        $level = 0;
        $parent = $data->getParent();
        if ($parent instanceof Category) {
            $level = $parent->getLevel() + 1;
            $data->setUniverse(NULL);
        }else if(empty($data->getUniverse())){
            throw new BadRequestException('univers : cette valeur ne doit pas être nulle.');
        }
        $data->setLevel($level);
        return $data;
    }
}
