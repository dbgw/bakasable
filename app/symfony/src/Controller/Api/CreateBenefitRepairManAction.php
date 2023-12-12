<?php

declare(strict_types=1);

namespace App\Controller\Api;

use Exception;
use App\Entity\User;
use App\Entity\Benefit;
use App\Entity\Service;
use App\Entity\Category;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;

final class CreateBenefitRepairManAction
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
     */
    public function __invoke(Benefit $data): Benefit
    {
        try {

            /** @var User $user */
            $user = $this->security->getUser();

            /** @var Service $service */
            $service = $data->getService();

            $idsUniverseRepairman = [];
            if (count($user->getShowcases())) {
                foreach ($user->getShowcases() as $showcase) {
                    $idsUniverseRepairman[] = $showcase->getId();
                }
            }

            $idsUniverseService = [];
            /** @var Category $category */
            foreach ($service->getCategories() as $category) {
                if($category->getParent() && $category->getParent()->getUniverse()){
                    $idsUniverseService[] = $category->getParent()->getUniverse()->getId();
                }
            }
            
            if (count(array_intersect($idsUniverseRepairman,$idsUniverseService))) {

                $benefit = $this->em->getRepository(Benefit::class)->findOneBy(['user' => $user->getId(), "service" => $service->getId(), "archive"=>0]);
                if ($benefit instanceof Benefit) {
                    throw new BadRequestException('Vous avez déjà une prestation pour ce service.');
                }

                $data->setUser($user);
                $data->setTypeService('non défini');
            } else {
                throw new BadRequestException('Vous ne pouvez pas ajouter une prestation pour ce service, il n\'appartient pas aux univers renseignés sur votre fiche vitrine.');
            }
        } catch (Exception $e) {
            throw new BadRequestException($e->getMessage());
        }

        return $data;
    }
}
