<?php

declare(strict_types=1);

namespace App\Entity;

use App\Repository\CategoryRepository;
use App\Controller\Api\CreateCategoryAction;
use App\Controller\Api\DeleteCategoryAction;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\Traits\IdentifiableTrait;
use App\Entity\Traits\TimestampableTrait;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiFilter;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use PhpParser\Node\Expr\Cast\Int_;
use Symfony\Component\Validator\Constraints as Assert;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * @ORM\Entity(repositoryClass=CategoryRepository::class)
 * @ORM\HasLifecycleCallbacks()
 * @ApiResource(
 *     attributes = {
 *          "order" = {"level": "ASC","position": "ASC"},
 *          "pagination_enabled" = false,
 *     },
 *     collectionOperations={
 *          "get_categories" = {
 *              "method" = "get",
 *              "path" = "/anonymous/categories",
 *              "normalization_context"={
 *                  "groups"={"read","read:category"}
 *              }
 *          },
 *          "get_categories_subcategories" = {
 *              "method" = "get",
 *              "path" = "/anonymous/categories/subCategories",
 *              "normalization_context"={
 *                  "groups"={"read","read:category","read:category:children"}
 *              }
 *          },
 *          "post_category" = {
 *              "method" = "post",
 *              "path" = "/category",
 *              "controller" = CreateCategoryAction::class,
 *              "validation_groups"={"validation:category:create"},
 *              "security" = "is_granted('ROLE_ADMIN')",
 *          },
 *     },
 *     itemOperations = {
 *          "get_category" = {
 *              "method" = "get",
 *              "path" = "/anonymous/category/{id}",
 *              "normalization_context"={
 *                  "groups"={"read","read:category"}
 *              },
 *          },
 *          "get_category_categories" = {
 *              "method" = "get",
 *              "path" = "/anonymous/category/{id}/categories",
 *              "normalization_context" = {
 *                  "groups"={"read","read:category","read:category:children"}
 *              },
 *          },
 *          "delete_category" = {
 *              "method" = "delete",
 *              "path" = "/category/{id}",
 *              "controller" = DeleteCategoryAction::class,
 *              "security" = "is_granted('ROLE_ADMIN')",
 *          },
 *          "put_category" = {
 *              "method" = "put",
 *              "path" = "/category/{id}",
 *              "validation_groups"={"validation:category:edit"},
 *              "normalization_context" = {
 *                  "groups"={"read","read:category","read:category:children"}
 *              },
 *              "denormalization_context" = {
 *                  "groups"={"edit:category"}
 *              },
 *              "security" = "is_granted('ROLE_ADMIN')",
 *          },
 *     },
 * )
 * @ApiFilter(OrderFilter::class, properties={"createdAt", "name", "children.name"})
 * @ApiFilter(SearchFilter::class, properties={"universe.id": "exact","level": "exact"})
 */
class Category
{
    use IdentifiableTrait;
    use TimestampableTrait;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(groups={"validation:category:create","validation:category:edit"})
     * @Groups({"read:category","write:category","edit:category","read:service:categories","read:service:categories:parent","read:benefit:service","read:universe:categories","read:universe:categories:details","read:user:benefits"})
     */
    private ?string $name;

    /**
     * @ORM\Column(type="string", length=255)
     * @Gedmo\Slug(fields={"name"})
     * @Groups({"read:category","write:category","edit:category","read:service:categories","read:service:categories:parent","read:benefit:service","read:universe:categories","read:universe:categories:details"})
     */
    private $slug;

    /**
     * @ORM\Column(type="smallint", nullable=true)
     * @Groups({"read:category","read:universe:categories:details"})
     */
    private ?int $level = 0;

    /**
     * @ORM\Column(type="smallint", nullable=true)
     * @Groups({"read:category","write:category","edit:category","read:universe:categories:details"})
     */
    private ?int $position = 0;

    /**
     * @ORM\ManyToMany(targetEntity=Service::class, inversedBy="categories")
     * @Groups({"read:category:services"})
     */
    private $services;

    /**
     * @ORM\ManyToOne(targetEntity=Universe::class, inversedBy="categories")
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"read:category:universe","read:user:benefits"})
     */
    private ?Universe $universe = null;

    /**
     * @ORM\ManyToOne(targetEntity=Category::class, inversedBy="children")
     * @Groups({"read:service:categories:parent","read:benefit:service","read:user:benefits"})
     */
    private ?Category $parent = null;

    /**
     * @ORM\OneToMany(targetEntity=Category::class, mappedBy="parent")
     * @Groups({"read:category:children","read:universe:categories:children"})
     */
    private $children;

    /**
     * @Groups({"read:universe:categories:details"}) 
     */
    private ?int $totalServices = 0;

    public function __construct()
    {
        $this->services = new ArrayCollection();
        $this->children = new ArrayCollection();
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name)
    {
        $this->name = $name;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug)
    {
        $this->slug = $slug;
    }


    public function getLevel(): ?int
    {
        return $this->level;
    }

    public function setLevel(?int $level)
    {
        $this->level = $level;
    }

    public function getPosition(): ?int
    {
        return $this->position;
    }

    public function setPosition(?int $position)
    {
        $this->position = $position;
    }

    /**
     * @return Collection|Service[]
     */
    public function getServices(): Collection
    {
        return $this->services;
    }

    public function addService(Service $service)
    {
        if (!$this->services->contains($service)) {
            $this->services[] = $service;
        }
    }

    public function removeService(Service $service)
    {
        $this->services->removeElement($service);
    }

    public function getUniverse(): ?Universe
    {
        return $this->universe;
    }

    public function setUniverse(?Universe $universe): self
    {
        $this->universe = $universe;

        return $this;
    }

    public function getParent()
    {
        return $this->parent;
    }

    public function setParent(?self $parent)
    {
        $this->parent = $parent;
    }

    /**
     * @return Collection|self[]
     */
    public function getChildren(): Collection
    {
        return $this->children;
    }

    public function addChild(self $child)
    {
        if (!$this->children->contains($child)) {
            $this->children[] = $child;
            $child->setParent($this);
        }
    }

    public function removeChild(self $child)
    {
        if ($this->children->removeElement($child)) {
            // set the owning side to null (unless already changed)
            if ($child->getParent() === $this) {
                $child->setParent(null);
            }
        }
    }

    public function getTotalServices(): ?int
    {
        return $this->totalServices;
    }

    public function setTotalServices(int $totalServices)
    {
        $this->totalServices = $totalServices;
    }
}
