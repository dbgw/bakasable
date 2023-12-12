<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Entity\Category;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;

class DeleteCategoryAction
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
        $category = $this->em->getRepository(Category::class)->find($id);

        if ($category instanceof Category) {
            $subCategory = $this->em->getRepository(Category::class)->findOneBy(['parent'=>$id]);

            if ($subCategory instanceof Category) {
                throw new BadRequestException('Cette catégorie est rattachée à d\'autres catégories.');
            }

            if (count($category->getServices())) {
                throw new BadRequestException('Cette catégorie est rattachée à des services.');
            }

            try {
                $this->em->remove($category);
                $this->em->flush();
                return new Response();
            } catch (\Exception $e) {
                throw new BadRequestException('Une erreur inattendue vous empêche de supprimer la catégorie #'.$id);
            }
        }
        throw new BadRequestException('La catégorie #'.$id.' n\'existe pas.');
    }
}
