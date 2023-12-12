<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Entity\Command;
use App\Service\SendEmailCommand;
use Doctrine\ORM\EntityManagerInterface;

final class CreateCommandAction
{
    /**
     * @var EntityManagerInterface
     */
    private $em;

    /**
     * @var SendEmailCommand
     */
    private $sendEmailCommand;

    /**
     * @param EntityManagerInterface $em
     */
    public function __construct(EntityManagerInterface $em, SendEmailCommand $sendEmailCommand)
    {
        $this->em = $em;
        $this->sendEmailCommand = $sendEmailCommand;
    }

    /**
     * @param Command $data
     * @return Command
     */
    public function __invoke(Command $data): Command
    {
        $total = NULL;
        $isDevis = false;
        if ('forfait' === $data->getBenefit()->getTypeService()) {
            $total = $data->getDeliveryMode()->getPrice();
            $data->setIsCommand(true);
            $data->setStepsCompleted(false);
        } else if ('devis' === $data->getBenefit()->getTypeService()) {
            if ($data->getBenefit()->getPriceQuote()) {
                $total = $data->getBenefit()->getPriceQuote();
                $data->setStepsCompleted(false);
            }
            $isDevis = true;
        }
        $data->setType($data->getBenefit()->getTypeService());
        $data->setTitle($data->getBenefit()->getService()->getName());
        $data->setTotal($total);
        $data->setStatus(0);
        $data->setSendEmail(true);
        $this->em->persist($data);
        $this->em->flush();

        if($data->getStepsCompleted()){
            $this->sendEmailCommand->new($data);
        }

        if ($isDevis) {
            /** @var Command $newCommand*/
            $newCommand = clone $data;
            if ($total) {
                $newCommand->setStatus(0);
                $newCommand->setStepsCompleted(false);
            } else {
                $newCommand->setStatus(1);
            }
            $newCommand->setParent($data);
            $newCommand->setIsCommand(true);
            $newCommand->setPaidDevis(true);
            $newCommand->setCreatedAt(new \DateTime());
            $newCommand->setSendEmail(false);
            $this->em->persist($newCommand);
            $this->em->flush();
            return $newCommand;
        }

        return $data;
    }
}
