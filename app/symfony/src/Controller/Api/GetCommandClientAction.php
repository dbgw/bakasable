<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Entity\Command;

final class GetCommandClientAction
{
    /**
     * @param Command $data
     * @return Command
     */
    public function __invoke(Command $data): Command
    {
        $total = 0;
        /** @var DevisLine $devisLine */
        foreach ($data->getDevisLines() as $devisLine) {
            $subTotal = floatval($devisLine->getUnityPrice()) * floatval($devisLine->getQte());
            $subTotalR = $subTotal * (1 - (floatval($devisLine->getReduction()) / 100));
            $total += $subTotalR * (1 + (floatval($devisLine->getTva()) / 100));
        }
        $data->setTotalDevisLines($total);
        return $data;
    }
}
