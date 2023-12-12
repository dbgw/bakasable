<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\NewServiceRepository;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\Traits\TimestampableTrait;
use App\Entity\Traits\IdentifiableTrait;
use Symfony\Component\Validator\Constraints as Assert;
use App\Controller\Api\CreateNewServiceAction;
use Symfony\Component\Serializer\Annotation\Groups;

/** 
 * @ORM\Entity(repositoryClass=NewServiceRepository::class)
 * @ORM\HasLifecycleCallbacks
 * @ApiResource(
 *      collectionOperations = {
 *          "post_new_service" = {
 *              "method" = "post",
 *              "path" = "/new_service",
 *              "validation_groups" = {"validation:newservice:create"},
 *              "controller" = CreateNewServiceAction::class,
 *              "normalization_context"={
 *                  "groups"={"read:newservice"}
 *              },
 *              "denormalization_context"={
 *                  "groups"={"write:newservice"}
 *              },
 *              "security" = "is_granted('ROLE_REPAIRMAN')",
 *          }
 *      },
 *     itemOperations = {
 *          "get" = {
 *              "security" = "is_granted('ROLE_ADMIN')",
 *          }
 *     }
 * )
 */
class NewService
{
    use IdentifiableTrait;
    use TimestampableTrait;

    /**
     * @ORM\Column(type="text")
     * @Assert\NotBlank(groups={"validation:newservice:create"})
     * @Groups({"read:newservice","write:newservice"}) 
     */
    private ?string $object;

    /**
     * @ORM\Column(type="text")
     * @Assert\NotBlank(groups={"validation:newservice:create"})
     * @Groups({"read:newservice","write:newservice"}) 
     */
    private ?string $description;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="newServices")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"read:newservice"}) 
     */
    private ?User $user;

    /**
     * @ORM\Column(type="boolean", options={"default" : false})
     */
    private ?bool $status=false;

    public function getObject(): ?string
    {
        return $this->object;
    }

    public function setObject(string $object)
    {
        $this->object = $object;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description)
    {
        $this->description = $description;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user)
    {
        $this->user = $user;
    }

    public function getStatus(): ?bool
    {
        return $this->status;
    }

    public function setStatus(?bool $status)
    {
        $this->status = $status;
    }
}
