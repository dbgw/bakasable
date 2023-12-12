<?php

declare(strict_types=1);

namespace App\Entity;

use App\Controller\Api\CreateBenefitRepairManAction;
use App\Controller\Api\PutBenefitRepairManAction;
use App\Controller\Api\DeleteBenefitRepairManAction;
use App\Controller\Api\GetBenefitsAction;
use App\Controller\Api\GetBenefitsServiceAction;
use App\Controller\Api\GetBenefitDetailsAction;
use App\Repository\BenefitRepository;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\Traits\TimestampableTrait;
use App\Entity\Traits\IdentifiableTrait;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\RangeFilter;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=BenefitRepository::class)
 * @ORM\HasLifecycleCallbacks
 * @ApiResource(  
 *     collectionOperations = {
 *        "get_benefits_repairman" = {
 *          "pagination_items_per_page" = 20,
 *          "maximum_items_per_page" = 80,
 *          "method" = "get",
 *          "path" = "/benefits/repairman",
 *          "controller" = GetBenefitsAction::class,
 *          "normalization_context"={
 *              "groups"={"read","read:benefit","read:benefit:service"}
 *          },
 *          "security" = "is_granted('ROLE_REPAIRMAN') ",
 *       },
 *        "get_benefits_service" = {
 *          "method" = "get",
 *          "path" = "/anonymous/benefits/service",
 *          "controller" = GetBenefitsServiceAction::class,
 *          "normalization_context"={
 *              "groups"={"read","read:benefit","read:benefit:user","read:deliveryModeType","read:user:city","read:user:postalCode"}
 *          },
 *       },
 *       "get_benefits_admin" = {
 *          "pagination_items_per_page" = 20,
 *          "maximum_items_per_page" = 80,
 *          "method" = "get",
 *          "path" = "/benefits/admin",
 *          "controller" = GetBenefitsAction::class,
 *          "normalization_context"={
 *              "groups"={"read","read:benefit","read:benefit:service","read:benefit:user"}
 *          },
 *          "security" = "is_granted('ROLE_ADMIN')",
 *       },
 *       "post_benefit_repairman" = {
 *          "method" = "post",
 *          "path" = "/benefit/repairman",
 *          "normalization_context"={
 *              "groups"={"read","read:benefit"}
 *          }, 
 *          "denormalization_context"={
 *              "groups"={"write:benefit"}
 *          },
 *          "validation_groups" = {"validation:benefit:create"},
 *          "controller" = CreateBenefitRepairManAction::class,
 *          "security" = "is_granted('ROLE_REPAIRMAN')",
 *       }     
 *     },
 *     itemOperations = {
 *          "get_benefit" = {
 *              "method" = "get",
 *              "path" = "/anonymous/benefit/{id}",
 *              "normalization_context"={
 *                  "groups"={"read","read:benefit"}
 *               },
 *          },
 *          "get_benefit_details" = {
 *              "method" = "get",
 *              "path" = "/anonymous/benefit/{id}/details",
 *              "controller" = GetBenefitDetailsAction::class,
 *              "normalization_context"={
 *                  "groups"={"read","read:benefit","read:benefit:service","read:service","read:service:details","read:service:categories","read:benefit:user","read:user","read:user:repairman","read:deliveryModeType"}
 *               },
 *          },
 *          "put_benefit" = {
 *              "method" = "put",
 *              "path" = "/benefit/{id}/repairman",
 *              "controller" = PutBenefitRepairManAction::class,
 *              "normalization_context"={
 *                  "groups"={"read","read:benefit","read:benefit:service","read:benefit:user"}
 *               },
 *              "validation_groups" = {"validation:benefit:repairman:edit"},
 *              "denormalization_context"={
 *                  "groups"={"edit:benefit:repairman"}
 *              },
 *              "security" = "is_granted('ROLE_ADMIN') or is_granted('ROLE_REPAIRMAN')",
 *          },
 *          "delete_benefit" = {
 *              "method" = "delete",
 *              "path" = "/benefit/{id}/repairman",
 *              "controller" = DeleteBenefitRepairManAction::class,
 *              "security" = "is_granted('ROLE_ADMIN') or is_granted('ROLE_REPAIRMAN')",
 *          }
 *     }
 * )
 * @ApiFilter(OrderFilter::class, properties={"createdAt" = "DESC", "updatedAt" = "DESC", "deliveryModes.price" = "ASC", "distance" = "ASC"})
 * @ApiFilter(SearchFilter::class, properties={"service.id": "exact","service.categories.id": "exact","service.categories.parent.id": "exact","service.categories.parent.universe.id": "exact","user.id": "exact","deliveryModes.deliveryModeType.id": "exact"})
 * @ApiFilter(RangeFilter::class, properties={"deliveryModes.price"})
 */
class Benefit
{
    const TYPES_SERVICES = ['forfait', 'devis'];

    use IdentifiableTrait;
    use TimestampableTrait;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(groups={"validation:benefit:repairman:edit"})
     * @Assert\Choice(choices=Benefit::TYPES_SERVICES) 
     * @Groups({"read:benefit","read:command:benefit","edit:benefit:repairman"})
     */
    private ?string $typeService;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Groups({"read:benefit","read:command:benefit","edit:benefit:repairman"}) 
     */
    private ?float $priceQuote = null;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"read:benefit","read:command:benefit","edit:benefit:repairman"}) 
     */
    private ?string $precisionQuote = null;

    /**
     * @ORM\ManyToOne(targetEntity=Service::class, inversedBy="benefits")
     * @ORM\JoinColumn(nullable=false)
     * @Assert\NotBlank(groups={"validation:benefit:create"})
     * @Groups({"write:benefit","read:benefit:service","read:user:benefits"}) 
     */
    private ?Service $service;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="benefits")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"read:benefit:user","read:command:benefit","read:service:benefits:user"})
     */
    private ?User $user;

    /**
     * @ORM\OneToMany(targetEntity=DeliveryMode::class, mappedBy="benefit",cascade={"persist", "remove"})
     * @Groups({"read:benefit","read:command:benefit","edit:benefit:repairman"}) 
     */
    private $deliveryModes;

    /**
     * @ORM\OneToMany(targetEntity=Command::class, mappedBy="benefit", orphanRemoval=true)
     */
    private $commands;

    /**
     * @Groups({"read:benefit","read:command:benefit"}) 
     */
    private ?float $minPrice = 0;

    /**
     * @ORM\Column(type="smallint", options={"default" : 0})
     * @Groups({"read:benefit","read:command:benefit"}) 
     */
    private $archive = 0;

    public function __construct()
    {
        $this->deliveryModes = new ArrayCollection();
        $this->commands = new ArrayCollection();
    }

    public function getTypeService(): ?string
    {
        return $this->typeService;
    }

    public function setTypeService(string $typeService)
    {
        $this->typeService = $typeService;
    }

    public function getPriceQuote(): ?float
    {
        return $this->priceQuote;
    }

    public function setPriceQuote(?float $priceQuote)
    {
        $this->priceQuote = $priceQuote;
    }

    public function getPrecisionQuote(): ?string
    {
        return $this->precisionQuote;
    }

    public function setPrecisionQuote(?string $precisionQuote)
    {
        $this->precisionQuote = $precisionQuote;
    }

    public function getService(): ?Service
    {
        return $this->service;
    }

    public function setService(?Service $service)
    {
        $this->service = $service;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user)
    {
        $this->user = $user;
    }

    /**
     * @return Collection|DeliveryMode[]
     */
    public function getDeliveryModes(): Collection
    {
        return $this->deliveryModes;
    }

    public function setDeliveryModes($deliveryModes)
    {
        return $this->deliveryModes = $deliveryModes;
    }

    public function addDeliveryMode(DeliveryMode $deliveryMode)
    {
        if (!$this->deliveryModes->contains($deliveryMode)) {
            $this->deliveryModes[] = $deliveryMode;
            $deliveryMode->setBenefit($this);
        }
    }

    public function removeDeliveryMode(DeliveryMode $deliveryMode)
    {
        if ($this->deliveryModes->removeElement($deliveryMode)) {
            // set the owning side to null (unless already changed)
            if ($deliveryMode->getBenefit() === $this) {
                $deliveryMode->setBenefit(null);
            }
        }
    }

    /**
     * @return Collection|Command[]
     */
    public function getCommands(): Collection
    {
        return $this->commands;
    }

    public function addCommand(Command $command): self
    {
        if (!$this->commands->contains($command)) {
            $this->commands[] = $command;
            $command->setBenefit($this);
        }
        return $this;
    }

    public function removeCommand(Command $command): self
    {
        if ($this->commands->removeElement($command)) {
            // set the owning side to null (unless already changed)
            if ($command->getBenefit() === $this) {
                $command->setBenefit(null);
            }
        }
        return $this;
    }

    public function getMinPrice(): ?float
    {
        return $this->minPrice;
    }

    public function setMinPrice(float $minPrice)
    {
        $this->minPrice = $minPrice;
    }

    public function getArchive(): ?int
    {
        return $this->archive;
    }

    public function setArchive(?int $archive): self
    {
        $this->archive = $archive;

        return $this;
    }
}
