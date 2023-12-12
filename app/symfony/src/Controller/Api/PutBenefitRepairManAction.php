<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Entity\Benefit;
use App\Entity\DeliveryMode;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\NonUniqueResultException;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;

final class PutBenefitRepairManAction
{
    /**
     * @var EntityManagerInterface
     */
    private $em;

    /**
     * @var Security
     */
    private $security;

    /**
     * @param EntityManagerInterface $em
     * @param Security $security
     */
    public function __construct(EntityManagerInterface $em, Security $security)
    {
        $this->em = $em;
        $this->security = $security;
    }

    /**
     * @param Benefit $data
     * @return Benefit
     * @throws NonUniqueResultException
     */
    public function __invoke(Benefit $data): Benefit
    {
        /** @var User $user */
        $user = $this->security->getUser();

        $roles = $user->getRoles();
        $conditions = ['id' => $data->getId()];
        if (!in_array('ROLE_ADMIN', $roles)) {
            $conditions['user'] = $user->getId();
        }

        $benefit = $this->em->getRepository(Benefit::class)->findOneBy($conditions);
        if ($benefit instanceof Benefit) {

            $typeService = $data->getTypeService();

            $results = $this->em->createQueryBuilder()
                ->from('App:Benefit', 'b')
                ->select('b.typeService')
                ->where('b.id = :id')
                ->setParameter('id', $data->getId())
                ->setMaxResults(1)
                ->getQuery()
                ->getOneOrNullResult();

            if ($results) {
                $typeServiceOld = reset($results);
                if (in_array($typeServiceOld, Benefit::TYPES_SERVICES) && $typeServiceOld != $typeService) {
                    throw new BadRequestException('Vous ne pouvez pas modifier le type de prestation.');
                }
            }

            if (count($data->getDeliveryModes())) {

                $idsDeliveryModes = array();
                /** @var DeliveryMode $deliveryMode */
                foreach ($data->getDeliveryModes() as $deliveryMode) {
                    if ($typeService === 'forfait' && empty($deliveryMode->getPrice()) && !is_numeric($deliveryMode->getPrice())) {
                        throw new BadRequestException('le prix est obligatoire et il doit être numérique.');
                    }
                    $idsDeliveryModes[] = $deliveryMode->getId();
                }

                $results = $this->em->createQueryBuilder()
                ->from('App:DeliveryMode', 'd')
                ->select('d')
                ->where('d.benefit = :idBenefit')
                ->andWhere('d.id NOT IN (:idsDeliveryModes)')
                ->setParameter('idBenefit', $data->getId())
                ->setParameter('idsDeliveryModes', $idsDeliveryModes)
                ->getQuery()
                ->getResult();

                 /** @var DeliveryMode $deliveryMode */
                 foreach ($results as $deliveryMode){
                    $this->em->remove($deliveryMode);
                    $this->em->flush();
                 }
            }else{
                throw new BadRequestException('Vous devez au moins cocher un mode de délivrance.');
            }

            return $data;
        } else {
            throw new BadRequestException('Vous n\'avez pas le droite de modifier cette prestation');
        }
    }
}
