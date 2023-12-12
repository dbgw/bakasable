<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Entity\Command;
use App\Service\SendEmailCommand;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;

final class PutCommandNewDevisAction
{
    /**
     * @var EntityManagerInterface
     */
    private $em;

    /**
     * @var SendEmailCommand
     */
    private $sendEmailCommand;

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
        if($data->getStatus() === 3 && $data->getNewDevis() && !$data->getIsCommand()){

            /** @var Command $newDevis*/
            $newDevis = clone $data;
            $newDevis->setStatus(0);
            $newDevis->setParent($data);
            $newDevis->setCreatedAt(new \DateTime());
            $newDevis->setNewDevis(NULL);
            $newDevis->setRejectRaison("");
            $newDevis->setValidationDate(NULL);
            $newDevis->setCancellationDate(NULL);
            $newDevis->setRejectionDate(NULL);
            $newDevis->setAcceptanceDate(NULL);
            $newDevis->setSendEmail(true);
            $this->em->persist($newDevis);

            $data->setNewDevis(NULL);
            $this->em->persist($data);
            $this->em->flush();

            $this->sendEmailCommand->new($newDevis);

            return $newDevis;

        }else{
            throw new BadRequestException("Vous ne pouvez pas effectuer cette opération.");
        }
        return $data;
    }
}
