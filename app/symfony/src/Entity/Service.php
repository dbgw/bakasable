<?php

declare(strict_types=1);

namespace App\Entity;

use App\Filter\OrSearchFilter;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\ServiceRepository;
use Gedmo\Mapping\Annotation as Gedmo;
use App\Controller\Api\GetServiceAction;
use App\Controller\Api\PutServiceAction;
use App\Entity\Traits\IdentifiableTrait;
use App\Entity\Traits\TimestampableTrait;
use ApiPlatform\Core\Annotation\ApiFilter;
use App\Controller\Api\DeleteServiceAction;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\Api\SearchServicesAction;
use App\Controller\Api\GetServicesPricesAction;
use App\Controller\Api\GetServicesCatalogAction;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ORM\Entity(repositoryClass=ServiceRepository::class)
 * @ORM\HasLifecycleCallbacks()
 * @ApiResource(
 *     collectionOperations={
 *          "get_services" = {
 *              "method" = "get",
 *              "path" = "/anonymous/services",
 *              "normalization_context"={
 *                  "groups"={"read","read:service","read:service:categories","read:service:benefits:user"}
 *              }
 *          },
 *          "get_services_details" = {
 *              "pagination_items_per_page" = 20,
 *              "maximum_items_per_page" = 80,
 *              "method" = "get",
 *              "path" = "/anonymous/services/details",
 *              "normalization_context"={
 *                  "groups"={"read","read:service","read:service:details"}
 *              }
 *          },
 *          "get_services_prices" = {
 *              "pagination_items_per_page" = 20,
 *              "maximum_items_per_page" = 80,
 *              "method" = "get",
 *              "path" = "/anonymous/services/prices",
 *              "controller" = GetServicesPricesAction::class,
 *              "normalization_context"={
 *                  "groups"={"read","read:service","read:service:details","read:service:price","read:service:categories","read:service:categories:parent"}
 *              }
 *          },
 *          "get_services_catalog" = {
 *              "pagination_items_per_page" = 20,
 *              "maximum_items_per_page" = 80,
 *              "method" = "get",
 *              "path" = "/anonymous/services/catalog",
 *              "controller" = GetServicesCatalogAction::class,
 *              "normalization_context"={
 *                  "groups"={"read","read:service","read:service:details","read:service:price","read:service:categories","read:service:categories:parent"}
 *              }
 *          },
 *          "get_services_repairman" = {
 *              "method" = "get",
 *              "path" = "/services/repairman",
 *              "controller" = GetServicesPricesAction::class,
 *              "normalization_context"={
 *                  "groups"={"read","read:service","read:service:details","read:service:categories","read:service:categories:parent","read:service:price","read:service:benefits"}
 *              },
 *              "security" = "is_granted('ROLE_REPAIRMAN')",
 *          },
 *          "get_search_services" = {
 *              "method" = "get",
 *              "path" = "/anonymous/search/services",
 *              "controller" = SearchServicesAction::class,
 *              "normalization_context"={
 *                  "groups"={"read","read:service:search","read:service:categories:parent"}
 *              },
 *          },
 *          "post_service" = {
 *              "method" = "post",
 *              "path" = "/service",
 *              "validation_groups" = {"validation:service:create"},
 *              "security" = "is_granted('ROLE_ADMIN')",
 *          },
 *     },
 *     itemOperations={
 *          "get_service" = {
 *              "method" = "get",
 *              "path" = "/anonymous/service/{id}",
 *              "controller" = GetServiceAction::class,
 *              "normalization_context"={
 *                  "groups"={"read","read:service","read:service:details","read:service:categories","read:service:price"}
 *              },
 *          },
 *          "delete_service" = {
 *              "method" = "delete",
 *              "path" = "/service/{id}",
 *              "controller" = DeleteServiceAction::class,
 *              "security" = "is_granted('ROLE_ADMIN')",
 *          },
 *          "put_service" = {
 *              "method" = "put",
 *              "path" = "/service/{id}",
 *              "controller" =  PutServiceAction::class,
 *              "security" = "is_granted('ROLE_ADMIN')",
 *          }
 *     }
 * )
 * @ApiFilter(OrderFilter::class, properties={"id", "name", "minPrice", "maxPrice","createdAt"})
 * @ApiFilter(OrSearchFilter::class, properties={"categories.parent.universe.id": "exact","categories.parent.id": "exact","categories.id": "exact","name": "partial","categories.name": "partial","categories.parent.name": "partial","description": "partial"})
 * @ApiFilter(SearchFilter::class, properties={"id": "exact", "categories.parent.universe.id": "exact","categories.parent.id": "exact","categories.id": "exact","name": "partial","categories.name": "partial","categories.parent.name": "partial","description": "partial"})
 */
class Service
{
    use IdentifiableTrait;
    use TimestampableTrait;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(groups={"validation:service:create"})
     * @Groups({"read:service","read:service:search","read:benefit:service","read:command:benefit"}) 
     */
    private ?string $name;

    /**
     * @ORM\Column(type="string", length=255)
     * @Gedmo\Slug(fields={"name"})
     * @Groups({"read:service","read:service:search","read:benefit:service","read:command:benefit"}) 
     */
    private $slug;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"read:service:details", "read:benefit:service","read:command:benefit"}) 
     */
    private ?string $picture = null;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"read:service:details","read:service:search","read:benefit:service","read:command:benefit"}) 
     */
    private ?string $description = null;

    /**
     * @Groups({"read:service:price","read:benefit:service","read:command:benefit"}) 
     */
    private ?float $minPrice = 0;

    /**
     * @Groups({"read:service:price","read:benefit:service","read:command:benefit"}) 
     */
    private ?float $maxPrice = 0;

    /**
     * @Groups({"read:service:price","read:benefit:service","read:command:benefit"}) 
     */
    private ?float $averagePrice = 0;

    /**
     * @ORM\ManyToMany(targetEntity=Category::class, mappedBy="services")
     * @Groups({"read:service:categories","read:service:categories:parent","read:benefit:service","read:user:benefits"}) 
     */
    private $categories;

    /**
     * @ORM\OneToMany(targetEntity=Benefit::class, mappedBy="service")
     * @Groups({"read:service:benefits","read:service:benefits:user"}) 
     */
    private $benefits;

    /**
     * @Groups({"read:service:price"}) 
     */
    private ?int $totalBenefits = 0;

    /**
     * @Groups({"read:service:price"}) 
     */
    private ?int $totalCommands = 0;

    /**
     * @ORM\ManyToOne(targetEntity=Universe::class, inversedBy="services")
     * @Groups({"read:service"}) 
     */
    private $universe;

    public function __construct()
    {
        $this->categories = new ArrayCollection();
        $this->benefits = new ArrayCollection();
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


    public function getPicture(): ?string
    {
        return $this->picture;
    }

    public function setPicture(?string $picture)
    {
        $this->picture = $picture;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description)
    {
        $this->description = $description;
    }

    public function getMinPrice(): ?float
    {
        return $this->minPrice;
    }

    public function setMinPrice(float $minPrice)
    {
        $this->minPrice = $minPrice;
    }

    public function getMaxPrice(): ?float
    {
        return $this->maxPrice;
    }

    public function setMaxPrice(?float $maxPrice)
    {
        $this->maxPrice = $maxPrice;
    }

    public function getAveragePrice(): ?float
    {
        return $this->averagePrice;
    }

    public function setAveragePrice(?float $averagePrice)
    {
        $this->averagePrice = $averagePrice;
    }

    /**
     * @return Collection|Category[]
     */
    public function getCategories(): Collection
    {
        return $this->categories;
    }

    public function addCategory(Category $category)
    {
        if (!$this->categories->contains($category)) {
            $this->categories[] = $category;
            $category->addService($this);
        }
    }

    public function removeCategory(Category $category)
    {
        if ($this->categories->removeElement($category)) {
            $category->removeService($this);
        }
    }

    /**
     * @return Collection|Benefit[]
     */
    public function getBenefits(): Collection
    {
        return $this->benefits;
    }

    public function addBenefit(Benefit $benefit)
    {
        if (!$this->benefits->contains($benefit)) {
            $this->benefits[] = $benefit;
            $benefit->setService($this);
        }
    }

    public function removeBenefit(Benefit $benefit)
    {
        if ($this->benefits->removeElement($benefit)) {
            if ($benefit->getService() === $this) {
                $benefit->setService(null);
            }
        }
    }

    public function getTotalBenefits(): ?int
    {
        return $this->totalBenefits;
    }

    public function setTotalBenefits(int $totalBenefits)
    {
        $this->totalBenefits = $totalBenefits;
    }

    public function getTotalCommands(): ?int
    {
        return $this->totalCommands;
    }

    public function setTotalCommands(int $totalCommands)
    {
        $this->totalCommands = $totalCommands;
    }

    public function getUniverse(): ?Universe
    {
        return $this->universe;
    }

    public function setUniverse(?Universe $universe)
    {
        $this->universe = $universe;
    }
}
