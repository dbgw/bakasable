<?php

declare(strict_types=1);

namespace App\Controller\Api;

use ApiPlatform\Core\Validator\Exception\ValidationException;
use App\Entity\MediaObject;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Validator\ConstraintViolation;

final class CreateMediaObjectAction
{
    public function __invoke(Request $request): MediaObject
    {
        $uploadedFile = $request->files->get('file');
        if (!$uploadedFile) {
            throw new BadRequestHttpException("Le fichier téléchargé n'est pas valide, veuillez télécharger un fichier valide.");
        }

        if (!$uploadedFile->isReadable()) {
            throw new BadRequestException("Le fichier téléchargé est trop volumineux ou illisible.");
        }

        $mimeType = @$uploadedFile->getMimeType();
        if ($request->request->get('type') !== "alltypes" && !in_array($mimeType, ['image/png', 'image/jpeg'])) {
            throw new BadRequestException("Le fichier téléchargé n'est pas valide, formats acceptés : jpg, jpeg, png.");
        }

        if ($uploadedFile->getSize() > 4000000) {
            throw new BadRequestException("Le fichier téléchargé est trop volumineux. La taille maximale autorisée est de 4 Mo.");
        }

        $mediaObject = new MediaObject();
        $mediaObject->file = $uploadedFile;
        $mediaObject->propertyType = 'image';

        return $mediaObject;
    }
}
