<?php

namespace App\Entity;

use App\Repository\DeliveryModeTypeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\Traits\IdentifiableTrait;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=DeliveryModeTypeRepository::class)
 * @ORM\HasLifecycleCallbacks
 * @ApiResource( 
 *     collectionOperations = { 
 *          "get_delivery_mode_types" = {
 *              "method" = "get",
 *              "path" = "/anonymous/delivery_mode_types",
 *              "normalization_context"={
 *                  "groups"={"read","read:deliveryModeType"}
 *              },
 *          },
 *          "post" = { 
 *              "security" = "is_granted('ROLE_ADMIN')",
 *          }
 *     },
 *     itemOperations = {
 *          "get_delivery_mode_type" = {
 *              "method" = "get",
 *              "path" = "/anonymous/delivery_mode_type/{id}",
 *              "normalization_context"={
 *                  "groups"={"read","read:deliveryModeType"}
 *              },
 *          },
 *          "put" = {
 *              "security" = "is_granted('ROLE_ADMIN')",
 *          }
 *     }
 * )
 */
class DeliveryModeType
{
    use IdentifiableTrait;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read:deliveryModeType","read:command:benefit"}) 
     */
    private $name;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     * @Groups({"read:deliveryModeType","read:command:benefit"}) 
     */
    private $requireDeliveryAddress;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     * @Groups({"read:deliveryModeType","read:command:benefit"}) 
     */
    private $requireKilometerRadius;

    /**
     * @ORM\OneToMany(targetEntity=DeliveryMode::class, mappedBy="deliveryModeType")
     */
    private $DeliveryModes;

    public function __construct()
    {
        $this->DeliveryModes = new ArrayCollection();
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name)
    {
        $this->name = $name;
    }

    public function getRequireDeliveryAddress(): ?bool
    {
        return $this->requireDeliveryAddress;
    }

    public function setRequireDeliveryAddress(bool $requireDeliveryAddress)
    {
        $this->requireDeliveryAddress = $requireDeliveryAddress;
    }

    public function getRequireKilometerRadius(): ?bool
    {
        return $this->requireKilometerRadius;
    }

    public function setRequireKilometerRadius(?bool $requireKilometerRadius)
    {
        $this->requireKilometerRadius = $requireKilometerRadius;
    }

    /**
     * @return Collection|DeliveryMode[]
     */
    public function getDeliveryModes(): Collection
    {
        return $this->DeliveryModes;
    }

    public function addDeliveryMode(DeliveryMode $deliveryMode)
    {
        if (!$this->DeliveryModes->contains($deliveryMode)) {
            $this->DeliveryModes[] = $deliveryMode;
            $deliveryMode->setDeliveryModeType($this);
        }
    }

    public function removeDeliveryMode(DeliveryMode $deliveryMode)
    {
        if ($this->DeliveryModes->removeElement($deliveryMode)) {
            // set the owning side to null (unless already changed)
            if ($deliveryMode->getDeliveryModeType() === $this) {
                $deliveryMode->setDeliveryModeType(null);
            }
        }
    }

   
}
