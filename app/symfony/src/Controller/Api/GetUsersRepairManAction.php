<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Entity\Command;
use App\Entity\User;
use App\Entity\Benefit;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Paginator;

final class GetUsersRepairManAction
{
    /**
     * @param Request $request
     * @param Paginator $data
     * @return Paginator
     */
    public function __invoke(Paginator $data): Paginator
    {
        /**
         * @var User $user
         */
        foreach ($data as $user) {
            $totalCommands =  0;
            $totalDevis =  0;
            /**
             * @var Benefit $benefit
             */
            foreach ($user->getBenefits() as $benefit) {
                /**
                 * @var Command $command
                 */
                foreach ($benefit->getCommands() as $command) {
                    if ($command->getStepsCompleted()) {
                        if ($command->getIsCommand()) {
                            $totalCommands++;
                        } else {
                            $totalDevis++;
                        }
                    }
                }
            }
            $user->setTotalCommands($totalCommands);
            $user->setTotalDevis($totalDevis);
        }
        return $data;
    }
}
