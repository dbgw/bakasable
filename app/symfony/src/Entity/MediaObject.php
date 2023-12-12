<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\Api\CreateMediaObjectAction;
use App\Controller\Api\DeleteMediaObjectAction;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use App\Entity\Traits\IdentifiableTrait;

/**
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks()
 * @ApiResource(
 *     iri="http://schema.org/MediaObject",
 *     normalizationContext={
 *         "groups"={"media_object_read"}
 *     },
 *     collectionOperations={
 *         "post"={
 *             "path" = "/anonymous/media_object",
 *             "controller"=CreateMediaObjectAction::class,
 *             "deserialize"=false,
 *             "validation_groups"={"Default", "media_object_create"},
 *             "openapi_context"={
 *                 "requestBody"={
 *                     "content"={
 *                         "multipart/form-data"={
 *                             "schema"={
 *                                 "type"="object",
 *                                 "properties"={
 *                                     "file"={
 *                                         "type"="string",
 *                                         "format"="binary"
 *                                     }
 *                                 }
 *                             }
 *                         }
 *                     }
 *                 }
 *             },
 *         },
 *         "get",
 *     },
 *     itemOperations={
 *         "get" = {
 *             "path" = "/media_object/{id}",
 *         },
 *         "delete" = {
 *             "path" = "/media_object/{id}",
 *             "security" = "is_granted('ROLE_ADMIN')",
 *         },
 *         "delete_media_object" = {
 *             "delete_by_filepath"={
 *                   "openapi_context" = {
 *                      "summary" = "delete media via filepath",
 *                      "parameters" = {
 *                           {
 *                               "name" = "filepath",
 *                               "in" = "path",
 *                               "required" = "true",
 *                               "type" = "string"
 *                           }
 *                      }
 *                  }
 *             },
 *             "read"=false,
 *             "method" = "delete",
 *             "path" = "/anonymous/delete/media_object/{filepath}",
 *             "controller" = DeleteMediaObjectAction::class,
 *         },
 *     }
 * )
 * @Vich\Uploadable
 */
class MediaObject
{
    use IdentifiableTrait;

    const TYPES = ['image'];

    /**
     * @var string|null
     *
     * @ApiProperty(iri="http://schema.org/contentUrl")
     * @Groups({"media_object_read"})
     */
    public ?string $contentUrl;

    /**
     * @var string|null
     * @Assert\NotBlank
     * @Assert\Choice(
     *     choices=MediaObject::TYPES,
     *     message="La valeur doit être l'un des choix valides.",
     *     groups={"media_object_create"}
     * )
     * @Groups({"media_object_read"})
     */
    public ?string $propertyType;

    /**
     * @var File|null
     *
     * @Assert\File(
     *     groups={"media_object_create"}
     * )
     * @Vich\UploadableField(
     *     mapping="media_object",
     *     fileNameProperty="filePath",
     * )
     */
    public ?File $file;

    /**
     * @var string|null
     *
     * @ORM\Column(nullable=true)
     */
    public ?string $filePath;
}
