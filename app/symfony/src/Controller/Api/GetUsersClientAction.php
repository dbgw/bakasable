<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Entity\Command;
use App\Entity\User;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Paginator;

final class GetUsersClientAction
{
    /**
     * @param Request $request
     * @param Paginator $data
     * @return Paginator
     */
    public function __invoke(Paginator $data): Paginator
    {
        /**
         * @var User $client
         */
        foreach ($data as $client) {
            $totalCommands =  0;
            $totalDevis =  0;
            /**
             * @var Command $command
             */
            foreach ($client->getCommands() as $command) {
                if ($command->getStepsCompleted()) {
                    if ($command->getIsCommand()) {
                        $totalCommands++;
                    } else {
                        $totalDevis++;
                    }
                }
            }
            $client->setTotalCommands($totalCommands);
            $client->setTotalDevis($totalDevis);
        }
        return $data;
    }
}
