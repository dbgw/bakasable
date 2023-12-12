<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Entity\Universe;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;

class DeleteUniverseAction
{
    /**
     * @var EntityManagerInterface
     */
    private $em;

    /**
     * @param EntityManagerInterface $em
     */
    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function __invoke($id): Response
    {
        /** @var Universe $universe */
        $universe = $this->em->getRepository(Universe::class)->find($id);
        if($universe instanceof Universe){

            if (count($universe->getCategories())) {
                throw new BadRequestException('Cette univers est rattachée à d\'autres catégories.');
            }

            try {
                $this->em->remove($universe);
                $this->em->flush();
                return new Response();
            } catch (\Exception $e) {
                throw new BadRequestException('Une erreur inattendue vous empêche de supprimer l’\univers #'.$id.', '.$e->getMessage());
            }
        }
        throw new BadRequestException('L\'univers #'.$id.' n\'existe pas.');
    }
}
