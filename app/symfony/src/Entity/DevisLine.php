<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Entity\Traits\IdentifiableTrait;
use App\Entity\Traits\TimestampableTrait;
use App\Repository\DevisLineRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource()
 * @ORM\HasLifecycleCallbacks
 * @ORM\Entity(repositoryClass=DevisLineRepository::class)
 */
class DevisLine
{
    use IdentifiableTrait;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"read:devisline","edit:command"})
     */
    private ?int $qte;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read:devisline","edit:command"})
     */
    private ?string $description;

    /**
     * @ORM\Column(type="float")
     * @Groups({"read:devisline","edit:command"})
     */
    private ?float $unityPrice;

    /**
     * @ORM\Column(type="float")
     * @Groups({"read:devisline","edit:command"})
     */
    private ?float $reduction;

    /**
     * @ORM\Column(type="float")
     * @Groups({"read:devisline","edit:command"})
     */
    private ?float $tva;

    /**
     * @ORM\ManyToOne(targetEntity=Command::class, inversedBy="devisLines")
     * @ORM\JoinColumn(nullable=false)
     */
    private ?Command $command;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getQte(): ?int
    {
        return $this->qte;
    }

    public function setQte(int $qte)
    {
        $this->qte = $qte;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description)
    {
        $this->description = $description;
    }

    public function getUnityPrice(): ?float
    {
        return $this->unityPrice;
    }

    public function setUnityPrice(float $unityPrice)
    {
        $this->unityPrice = $unityPrice;
    }

    public function getReduction(): ?float
    {
        return $this->reduction;
    }

    public function setReduction(float $reduction)
    {
        $this->reduction = $reduction;
    }

    public function getTva(): ?float
    {
        return $this->tva;
    }

    public function setTva(float $tva)
    {
        $this->tva = $tva;
    }

    public function getCommand(): ?Command
    {
        return $this->command;
    }

    public function setCommand(?Command $command)
    {
        $this->command = $command;
    }
}
