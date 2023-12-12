<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Entity\Traits\IdentifiableTrait;
use App\Entity\Traits\TimestampableTrait;
use App\Repository\PaiementRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Controller\Api\CreatePaiementAction;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\HasLifecycleCallbacks()
 * @ApiResource(
 *     collectionOperations = { 
 *          "get" = {
 *              "security" = "is_granted('ROLE_ADMIN')",
 *              "normalization_context"={
 *                  "groups"={"read","read:paiement"}
 *              },
 *          },
 *          "post" = { 
 *              "path" = "/paiement",
 *              "controller" = CreatePaiementAction::class,
 *              "validation_groups" = {"validation:paiement:create"},
 *              "denormalization_context"={
 *                  "groups"={"create:paiement"}
 *              }, 
 *              "normalization_context"={
 *                  "groups"={"read","read:paiement","read:command:parent","read:command:type"}
 *              }, 
 *              "security" = "is_granted('ROLE_CLIENT')",
 *          }
 *     },
 *     itemOperations = {
 *          "get" = {
 *              "normalization_context"={
 *                  "groups"={"read","read:paiement"}
 *              },
 *              "security" = "is_granted('ROLE_ADMIN')",
 *          }
 *     }
 * )
 * @ORM\Entity(repositoryClass=PaiementRepository::class)
 */
class Paiement
{
    use IdentifiableTrait;
    use TimestampableTrait;

    /**
     * @ORM\ManyToOne(targetEntity=Command::class, inversedBy="paiements")
     * @ORM\JoinColumn(nullable=false)
     * @Assert\NotBlank(groups={"validation:paiement:create"})
     * @Groups({"read:paiement","create:paiement"}) 
     */
    private $command;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(groups={"validation:paiement:create"})
     * @Groups({"read:paiement"}) 
     */
    private $object;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"read:paiement"}) 
     * @Assert\NotBlank(groups={"validation:paiement:create"})
     */
    private $amount;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $chargeId;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $tokenId;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $paymentMethodId;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $balanceId;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $transferId;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $paymentIntentId;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user)
    {
        $this->user = $user;
    }

    public function getCommand(): ?Command
    {
        return $this->command;
    }

    public function setCommand(?Command $command)
    {
        $this->command = $command;
    }

    public function getObject(): ?string
    {
        return $this->object;
    }

    public function setObject(string $object)
    {
        $this->object = $object;
    }

    public function getAmount(): ?int
    {
        return $this->amount;
    }

    public function setAmount(int $amount)
    {
        $this->amount = $amount;
    }

    public function getChargeId(): ?string
    {
        return $this->chargeId;
    }

    public function setChargeId(string $chargeId)
    {
        $this->chargeId = $chargeId;
    }

    public function getTokenId(): ?string
    {
        return $this->tokenId;
    }

    public function setTokenId(?string $tokenId)
    {
        $this->tokenId = $tokenId;
    }

    public function getPaymentMethodId(): ?string
    {
        return $this->paymentMethodId;
    }

    public function setPaymentMethodId(string $paymentMethodId)
    {
        $this->paymentMethodId = $paymentMethodId;
    }

    public function getBalanceId(): ?string
    {
        return $this->balanceId;
    }

    public function setBalanceId(?string $balanceId)
    {
        $this->balanceId = $balanceId;
    }
    
    public function getTransferId(): ?string
    {
        return $this->transferId;
    }

    public function setTransferId(?string $transferId)
    {
        $this->transferId = $transferId;
    }

    public function getPaymentIntentId(): ?string
    {
        return $this->paymentIntentId;
    }

    public function setPaymentIntentId(?string $paymentIntentId)
    {
        $this->paymentIntentId = $paymentIntentId;
    }
}
