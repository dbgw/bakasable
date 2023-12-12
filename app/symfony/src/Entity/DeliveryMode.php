<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\DeliveryModeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\Traits\IdentifiableTrait;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=DeliveryModeRepository::class)
 * @ORM\HasLifecycleCallbacks
 * @ApiResource( 
 *     collectionOperations = { 
 *          "get",
 *          "post" = { 
 *              "validation_groups" = {"validation:deliverymode:create"},
 *              "security" = "is_granted('ROLE_REPAIRMAN')",
 *          }
 *     },
 *     itemOperations = {
 *          "get",
 *          "put" = {
 *              "denormalization_context"={
 *                  "groups"={"edit:deliverymode"}
 *              },
 *              "security" = "is_granted('ROLE_ADMIN') or is_granted('ROLE_REPAIRMAN')",
 *          }
 *     }
 * )
 */
class DeliveryMode
{
    use IdentifiableTrait;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     * @Groups({"read:benefit","read:command:benefit","edit:benefit:repairman","edit:deliverymode"}) 
     */
    private ?bool $radius;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Groups({"read:benefit","read:command:benefit","edit:benefit:repairman","edit:deliverymode"}) 
     */
    private ?float $distance;

    /**
     * @ORM\ManyToOne(targetEntity=Benefit::class, inversedBy="deliveryModes")
     * @Assert\NotBlank(groups={"validation:deliverymode:create"}) 
     * @ORM\JoinColumn(nullable=false)
     */
    private ?Benefit $benefit;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Assert\NotBlank(groups={"validation:benefit:repairman:edit"})     
     * @Groups({"read:benefit","read:command:benefit","edit:benefit:repairman","edit:deliverymode"})
     */
    private ?float $price;

    /**
     * @ORM\OneToMany(targetEntity=Command::class, mappedBy="deliveryMode")
     */
    private $commands;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     * @Groups({"read:benefit","read:command:benefit","edit:benefit:repairman","edit:deliverymode"}) 
     */
    private $requiredAdress;

    /**
     * @ORM\ManyToOne(targetEntity=DeliveryModeType::class, inversedBy="DeliveryModes")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"read:benefit","read:command:benefit","edit:benefit:repairman","edit:deliverymode"}) 
     */
    private $deliveryModeType;


    public function __construct()
    {
        $this->commands = new ArrayCollection();
    }

    public function getRadius(): ?bool
    {
        return $this->radius;
    }

    public function setRadius(?bool $radius)
    {
        $this->radius = $radius;
    }

    public function getDistance(): ?float
    {
        return $this->distance;
    }

    public function setDistance(?float $distance)
    {
        $this->distance = $distance;
    }

    public function getBenefit(): ?Benefit
    {
        return $this->benefit;
    }

    public function setBenefit(?Benefit $benefit)
    {
        $this->benefit = $benefit;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(?float $price)
    {
        $this->price = $price;
    }

    /**
     * @return Collection|Command[]
     */
    public function getCommands(): Collection
    {
        return $this->commands;
    }

    public function addCommand(Command $command)
    {
        if (!$this->commands->contains($command)) {
            $this->commands[] = $command;
            $command->setDeliveryMode($this);
        }
    }

    public function removeCommand(Command $command)
    {
        if ($this->commands->removeElement($command)) {
            // set the owning side to null (unless already changed)
            if ($command->getDeliveryMode() === $this) {
                $command->setDeliveryMode(null);
            }
        }
    }

    public function getRequiredAdress(): ?bool
    {
        return $this->requiredAdress;
    }

    public function setRequiredAdress(?bool $requiredAdress)
    {
        $this->requiredAdress = $requiredAdress;
    }

    public function getDeliveryModeType(): ?DeliveryModeType
    {
        return $this->deliveryModeType;
    }

    public function setDeliveryModeType(?DeliveryModeType $deliveryModeType)
    {
        $this->deliveryModeType = $deliveryModeType;
    }

}
