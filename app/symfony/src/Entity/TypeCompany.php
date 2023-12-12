<?php

declare(strict_types=1);

namespace App\Entity;

use App\Repository\TypeCompanyRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\Traits\IdentifiableTrait;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=TypeCompanyRepository::class)
 * @ORM\HasLifecycleCallbacks()
 * @ApiResource(
 *     collectionOperations={
 *          "get" = {
 *              "method" = "get",
 *              "path" = "/anonymous/type_companies",
 *              "normalization_context"={
 *                  "groups"={"read","read:typeCompany"}
 *              }
 *          },
 *          "post" = {
 *              "method" = "post",
 *              "path" = "/type_company",
 *              "security" = "is_granted('ROLE_ADMIN')",
 *          },
 *     },
 *     itemOperations = {
 *          "get" = {
 *              "method" = "get",
 *              "path" = "/anonymous/type_company/{id}",
 *              "normalization_context"={
 *                  "groups"={"read","read:typeCompany"}
 *              }
 *          },
 *          "delete" = {
 *              "method" = "delete",
 *              "path" = "/type_company/{id}",
 *              "security" = "is_granted('ROLE_ADMIN')",
 *          },
 *          "put" = {
 *              "method" = "put",
 *              "path" = "/type_company/{id}",
 *              "security" = "is_granted('ROLE_ADMIN')",
 *          },
 *     },
 * )
 */
class TypeCompany
{
    use IdentifiableTrait;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read:typeCompany","read:user:repairman"})
     */
    private ?string $name;

    /**
     * @ORM\OneToMany(targetEntity=User::class, mappedBy="TypeCompany")
     */
    private $users;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     * @Groups({"read:typeCompany","read:user:repairman"})
     */
    private $requireNoTva;

    public function __construct()
    {
        $this->users = new ArrayCollection();
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name)
    {
        $this->name = $name;
    }

    /**
     * @return Collection|User[]
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user)
    {
        if (!$this->users->contains($user)) {
            $this->users[] = $user;
            $user->setTypeCompany($this);
        }
    }

    public function removeUser(User $user)
    {
        if ($this->users->removeElement($user)) {
            // set the owning side to null (unless already changed)
            if ($user->getTypeCompany() === $this) {
                $user->setTypeCompany(null);
            }
        }
    }

    public function getRequireNoTva(): ?bool
    {
        return $this->requireNoTva;
    }

    public function setRequireNoTva(?bool $requireNoTva)
    {
        $this->requireNoTva = $requireNoTva;
    }
}
