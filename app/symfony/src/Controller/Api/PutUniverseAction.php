<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Entity\MediaObject;
use App\Entity\Universe;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Exception\InvalidArgumentException;

final class PutUniverseAction
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
     * @param Universe $data
     * @return Universe
     */
    public function __invoke(Universe $data): Universe
    {
        $results = $this->em->createQueryBuilder()
            ->from('App:Universe', 'u')
            ->select('u.image, u.pictures')
            ->where('u.id = :id')
            ->setParameter('id', $data->getId())
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();

        if ($results) {
            $image = str_replace('/media/', '', $data->getImage());
            $imageOld = str_replace('/media/', '', $results['image']);

            if (!empty($imageOld) && $image !== $imageOld) {
                $mediaObject = $this->em->getRepository(MediaObject::class)->findOneBy(['filePath' => $imageOld]);
                if ($mediaObject instanceof MediaObject) {
                    try {
                        $this->em->remove($mediaObject);
                        $this->em->flush();
                    } catch (\Exception $e) {
                        throw new InvalidArgumentException('Une erreur inattendue vous empêche de supprimer l\'image.');
                    }
                }
            }

            $pictures = $data->getPictures();
            $picturesOld = $results['pictures'];

            if (is_array($picturesOld) && count($picturesOld) && count(array_diff($picturesOld, $pictures))) {

                foreach ($picturesOld as $file) {
                    if (!in_array($file, $pictures)) {
                        $file = str_replace('/media/', '', $file);
                        $mediaObject = $this->em->getRepository(MediaObject::class)->findOneBy(['filePath' => $file]);

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
            }
        }
        return $data;
    }
}
