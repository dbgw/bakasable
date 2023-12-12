<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Entity\Service;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;
use App\Entity\MediaObject;

class DeleteServiceAction
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
        $service = $this->em->getRepository(Service::class)->find($id);

        if ($service instanceof Service) {

            if (count($service->getBenefits())) {
                throw new BadRequestException('Ce service est lié à des prestations.');
            }
            try {

                $picture = str_replace('/media/', '', $service->getPicture());
                if (!empty($picture)) {
                    $mediaObject = $this->em->getRepository(MediaObject::class)->findOneBy(['filePath' => $picture]);
                    if ($mediaObject instanceof MediaObject) {
                        $this->em->remove($mediaObject);
                    }
                }

                $this->em->remove($service);
                $this->em->flush();
                return new Response();
            } catch (\Exception $e) {
                throw new BadRequestException('Une erreur inattendue vous empêche de supprimer le service #'.$id);
            }
        }else{
            throw new BadRequestException('Le service #'.$id.' n\'existe pas.');
        }
        
    }
}
