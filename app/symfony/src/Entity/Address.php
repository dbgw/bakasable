<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Entity\Traits\IdentifiableTrait;
use App\Repository\AddressRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\HasLifecycleCallbacks()
 * @ORM\Entity(repositoryClass=AddressRepository::class)
 * @ApiResource(
 *     collectionOperations = { 
 *          "get",
 *          "post",
 *     },
 *     itemOperations = {
 *          "get",
 *          "put"
 *     }
 * )
 */
class Address
{
    use IdentifiableTrait;

    const TYPES_ADDRESSES = ["invoice", "delivery"];

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="addresses")
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"write:user", "read:user","edit:user:addresses"})
     */
    private $firstName;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"write:user", "read:user","edit:user:addresses"})
     */
    private $lastName;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"write:user", "read:user","edit:user:addresses"})
     */
    private $address;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"write:user", "read:user","edit:user:addresses"})
     */
    private $additionalAddress;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"write:user", "read:user","edit:user:addresses"})
     */
    private $postalCode;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"write:user", "read:user","edit:user:addresses"})
     */
    private $city;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"write:user", "read:user","edit:user:addresses"})
     */
    private $type;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     * @Groups({"write:user", "read:user","edit:user:addresses"})
     */
    private $sameAsInvoice;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Groups({"write:user", "read:user","edit:user:addresses"})
     */
    private $latitude;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Groups({"write:user", "read:user","edit:user:addresses"})
     */
    private $longitude;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"write:user", "read:user","edit:user:addresses"})
     */
    private $placeId = null;

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user)
    {
        $this->user = $user;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(?string $firstName)
    {
        $this->firstName = $firstName;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(?string $lastName)
    {
        $this->lastName = $lastName;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(?string $address)
    {
        $this->address = $address;
    }

    public function getAdditionalAddress(): ?string
    {
        return $this->additionalAddress;
    }

    public function setAdditionalAddress(?string $additionalAddress)
    {
        $this->additionalAddress = $additionalAddress;
    }

    public function getPostalCode(): ?string
    {
        return $this->postalCode;
    }

    public function setPostalCode(?string $postalCode)
    {
        $this->postalCode = $postalCode;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(?string $city)
    {
        $this->city = $city;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type)
    {
        $this->type = $type;
    }

    public function getSameAsInvoice(): ?bool
    {
        return $this->sameAsInvoice;
    }

    public function setSameAsInvoice(?bool $sameAsInvoice)
    {
        $this->sameAsInvoice = $sameAsInvoice;
    }

    public function getLatitude(): ?float
    {
        return $this->latitude;
    }

    public function setLatitude(?float $latitude)
    {
        $this->latitude = $latitude;
    }

    public function getLongitude(): ?float
    {
        return $this->longitude;
    }

    public function setLongitude(?float $longitude)
    {
        $this->longitude = $longitude;
    }

    public function getPlaceId(): ?string
    {
        return $this->placeId;
    }

    public function setPlaceId(?string $placeId)
    {
        $this->placeId = $placeId;
    }
}
