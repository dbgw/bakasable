<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Entity\Benefit;
use App\Entity\Service;
use App\Entity\Command;
use App\Entity\DeliveryMode;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Paginator;
use App\Repository\BenefitRepository;
use Doctrine\ORM\EntityManagerInterface;

final class GetServicesPricesAction
{
    /**
     * @var EntityManagerInterface
     */
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    /**
     * @param Paginator $data
     * @return Paginator
     */
    public function __invoke(Paginator $data, BenefitRepository $benefitRepository=null): Paginator
    {
        /**
         * @var Service $service
         */
        foreach ($data as $service) {
            $prices =  [];
            $totalCommands = 0;
            
            //Get all the benefits for this service 
            $benefits = $benefitRepository->findByService($service->getId());
            /**
             * @var Benefit $benefit
             */
            foreach ($benefits as $benefit) {
                if ($benefit->getTypeService() === 'forfait') {
                    /**
                     * @var DeliveryMode $deliveryMode
                     */
                    foreach ($benefit->getDeliveryModes() as $deliveryMode) {
                        if($deliveryMode->getPrice()>0)$prices[] = floatval($deliveryMode->getPrice());
                    }
                }
                /**
                 * @var Command $command
                 */
                foreach ($benefit->getCommands() as $command) {
                    if ($command->getIsCommand() && $command->getStepsCompleted()) {
                        $totalCommands++;
                    }
                }
            }
            if (Count($prices)) {
                $service->setMinPrice(min($prices));
                $service->setMaxPrice(max($prices));
                $service->setAveragePrice(array_sum($prices) / count($prices));
            }
            $service->setTotalCommands($totalCommands);
            $service->setTotalBenefits(count($service->getBenefits()));
        }
        return $data;
    }
}
