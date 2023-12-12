<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Entity\MediaObject;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;

class DeleteMediaObjectAction
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

    public function __invoke($filepath): Response
    {
        $mediaObject = $this->em->getRepository(MediaObject::class)->findOneBy(['filePath' => $filepath]);

        if ($mediaObject instanceof MediaObject) {
            try {
                $this->em->remove($mediaObject);
                $this->em->flush();
                return new Response();
            } catch (\Exception $e) {
                throw new BadRequestException('Une erreur inattendue vous empêche de supprimer l\'image, ' . $e->getMessage());
            }
        }
        throw new BadRequestException('L\'image n\'existe pas.');
    }
}
