<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Entity\MediaObject;
use App\Entity\Service;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Exception\InvalidArgumentException;

final class PutServiceAction
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
     * @param Service $data
     * @return Service
     */
    public function __invoke(Service $data): Service
    {
        $results = $this->em->createQueryBuilder()
            ->from('App:Service', 's')
            ->select('s.picture')
            ->where('s.id = :id')
            ->setParameter('id', $data->getId())
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();

        if ($results) {
            $picture = str_replace('/media/', '', $data->getPicture());
            $pictureOld = str_replace('/media/', '', $results['picture']);

            if (!empty($pictureOld) && $picture !== $pictureOld) {
                $mediaObject = $this->em->getRepository(MediaObject::class)->findOneBy(['filePath' => $pictureOld]);
                if ($mediaObject instanceof MediaObject) {
                    try {
                        $this->em->remove($mediaObject);
                        $this->em->flush();
                    } catch (\Exception $e) {
                        throw new InvalidArgumentException('Une erreur inattendue vous empêche de supprimer l\'image.');
                    }
                }
            }
        }
        return $data;
    }
}
