<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\Api\GetCommandsDevisCountAction;
use App\Controller\Api\GetCommandsCountAction;
use App\Controller\Api\PutCommandsDevisSendAction;
use App\Controller\Api\PutCommandsDevisRejectAction;
use App\Controller\Api\PutCommandsCancelAction;
use App\Controller\Api\PutCommandsFinishAction;
use App\Controller\Api\GetLastCommandAction;
use App\Controller\Api\GetCommandClientAction;
use App\Controller\Api\CreateCommandAction;
use App\Controller\Api\PutCommandNewDevisAction;
use App\Entity\Traits\IdentifiableTrait;
use App\Entity\Traits\TimestampableTrait;
use App\Repository\CommandRepository;
use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ORM\Entity(repositoryClass=CommandRepository::class)
 * @ORM\HasLifecycleCallbacks()
 * @ApiResource(
 *      collectionOperations={
 *          "post_command" = {
 *              "method" = "post",
 *              "path" = "/command",
 *              "denormalization_context"={
 *                  "groups"={"write:command"}
 *              },
 *              "controller" = CreateCommandAction::class,
 *              "security" = "is_granted('ROLE_CLIENT')",
 *          },
 *          "get_commands_ids" = {
 *              "method" = "get",
 *              "path" = "/commands/ids",
 *              "normalization_context"={
 *                  "groups"={"read"}
 *              },
 *          },
 *          "get_commands" = {
 *              "pagination_items_per_page" = 20,
 *              "method" = "get",
 *              "path" = "/commands",
 *              "normalization_context"={
 *                  "groups"={"read","read:command","read:command:benefit","read:command:user","read:devisline"}
 *              },
 *          },
 *          "get_commands_devis" = {
 *              "pagination_items_per_page" = 20,
 *              "method" = "get",
 *              "path" = "/commands/devis",
 *              "normalization_context"={
 *                  "groups"={"read","read:command","read:command:benefit","read:command:user","read:devisline"}
 *              },
 *          },
 *          "get_commands_devis_ids" = {
 *              "method" = "get",
 *              "path" = "/commands/devis/ids",
 *              "normalization_context"={
 *                  "groups"={"read"}
 *              },
 *          },
 *          "get_commands_devis_count" = {
 *              "method" = "get",
 *              "path" = "/commands/devis/count",
 *              "controller" = GetCommandsDevisCountAction::class
 *          },
 *          "get_commands_count" = {
 *              "method" = "get",
 *              "path" = "/commands/count",
 *              "controller" = GetCommandsCountAction::class
 *          },
 *          "get_last_command" = {
 *              "method" = "get",
 *              "controller" = GetLastCommandAction::class,
 *              "path" = "/commands/lastcommand",
 *              "normalization_context"={
 *                  "groups"={"read","read:command","read:command:benefit","read:command:user","read:devisline"}
 *              }
 *          },
 *     },
 *     itemOperations = {
 *          "put",
 *          "delete",
 *          "get" = {
 *              "normalization_context"={
 *                  "groups"={"read","read:command","read:command:benefit","read:command:user","read:devisline","read:benefit:service"}
 *              }
 *          },
 *          "get_command_client" = {
 *              "method" = "get",
 *              "path" = "/command/{id}/client",
 *              "controller" = GetCommandClientAction::class,
 *              "normalization_context"={
 *                  "groups"={"read","read:command"}
 *              },
 *              "security" = "is_granted('ROLE_CLIENT')",
 *          },
 *          "put_send_devis" = {
 *              "method" = "put",
 *              "path" = "/commands/devis/send/{id}",
 *              "controller" = PutCommandsDevisSendAction::class,
 *              "normalization_context"={
 *                  "groups"={"read","read:command","read:command:benefit","read:command:user","read:devisline","read:benefit:service"}
 *              }
 *          },
 *          "put_new_devis" = {
 *              "method" = "put",
 *              "path" = "/commands/devis/{id}/new",
 *              "controller" = PutCommandNewDevisAction::class,
 *              "normalization_context"={
 *                  "groups"={"read","read:command","read:command:benefit","read:command:user","read:devisline","read:benefit:service"}
 *               },
 *              "security" = "is_granted('ROLE_ADMIN') or is_granted('ROLE_REPAIRMAN')",
 *          },
 *          "put_reject_devis" = {
 *              "method" = "put",
 *              "path" = "/commands/devis/reject/{id}",
 *              "controller" = PutCommandsDevisRejectAction::class,
 *              "normalization_context"={
 *                  "groups"={"read","read:command","read:command:benefit","read:command:user","read:devisline","read:benefit:service"}
 *              }
 *          },
 *          "put_cancel_command" = {
 *              "method" = "put",
 *              "path" = "/commands/cancel/{id}",
 *              "controller" = PutCommandsCancelAction::class,
 *              "normalization_context"={
 *                  "groups"={"read","read:command","read:command:benefit","read:command:user","read:devisline","read:benefit:service"}
 *              }
 *          },
 *          "put_finish_command" = {
 *              "method" = "put",
 *              "path" = "/commands/finish/{id}",
 *              "controller" = PutCommandsFinishAction::class,
 *              "normalization_context"={
 *                  "groups"={"read","read:command","read:command:benefit","read:command:user","read:devisline","read:benefit:service"}
 *              }
 *          },
 *          "put_edit_devis" = {
 *              "method" = "put",
 *              "path" = "/commands/devis/{id}",
 *              "normalization_context"={
 *                  "groups"={"read","read:command","read:command:benefit","read:command:user","read:devisline","read:benefit:service"}
 *               },
 *              "validation_groups" = {"validation:command:edit"},
 *              "denormalization_context"={
 *                  "groups"={"edit:command"}
 *              },
 *              "security" = "is_granted('ROLE_ADMIN') or is_granted('ROLE_REPAIRMAN')",
 *          },
 *          "put_command" = {
 *              "method" = "put",
 *              "path" = "/command/{id}",
 *              "security" = "is_granted('ROLE_ADMIN')",
 *          },
 *     }
 * )
 * @ApiFilter(OrderFilter::class, properties={"id", "type", "total", "client.firstName", "benefit.typeService", "benefit.service.name", "benefit.user.id", "benefit.user.enterprise", "createdAt","validationDate","status","title","total"})
 * @ApiFilter(SearchFilter::class, properties={"id": "exact", "client.id": "exact", "benefit.user.id": "exact", "status": "exact"})
 */
class Command
{
    use IdentifiableTrait;
    use TimestampableTrait;

    const TYPES_STATUS = ['0' => 'Nouveau', '1' => 'En attente', '2' => 'Accepté', '3' => 'Refusé', '4' => 'Annuler', '5' => "Finished"];

    /**
     * @ORM\ManyToOne(targetEntity=Benefit::class, inversedBy="commands")
     * @ORM\JoinColumn(nullable=false)
     * @Assert\NotBlank(groups={"validation:command:create","validation:command:edit"})
     * @Groups({"read:command","write:command"})
     */
    private $benefit;

    /**
     * @ORM\Column(type="smallint", options={"default" : 0})
     * @Assert\NotBlank(groups={"validation:command:create","validation:command:edit"})
     * @Groups({"read:command"})
     */
    private ?int $status = 0;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="commands")
     * @ORM\JoinColumn(nullable=false)
     * @Assert\NotBlank(groups={"validation:command:create","validation:command:edit"})
     * @Groups({"read:command","write:command"})
     */
    private ?User $client;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Assert\NotBlank(groups={"validation:command:edit"})
     * @Groups({"read:command","edit:command"})
     */
    private ?DateTime $validationDate;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"read:command","write:command"})
     */
    private ?string $description;

    /**
     * @ORM\Column(type="array", nullable=true)
     * @Groups({"read:command","write:command"})
     */
    private ?array $files = [];

    /**
     * @ORM\ManyToOne(targetEntity=DeliveryMode::class, inversedBy="commands")
     * @Assert\NotBlank(groups={"validation:command:create"})
     * @Groups({"read:command","write:command"})
     */
    private ?DeliveryMode $deliveryMode;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"read:command","write:command"})
     */
    private ?string $firstName;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"read:command","write:command"})
     */
    private ?string $lastName;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"read:command","write:command"})
     */
    private ?string $address;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"read:command","write:command"})
     */
    private ?string $additionalAddress;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"read:command","write:command"})
     */
    private ?string $postalCode;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"read:command","write:command"})
     */
    private ?string $city;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"read:command","write:command"})
     */
    private ?string $firstNameInvoice;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"read:command","write:command"})
     */
    private ?string $lastNameInvoice;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"read:command","write:command"})
     */
    private ?string $addressInvoice;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"read:command","write:command"})
     */
    private ?string $additionalAddressInvoice;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"read:command","write:command"})
     */
    private ?string $postalCodeInvoice;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"read:command","write:command"})
     */
    private ?string $cityInvoice;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"read:command","write:command"})
     */
    private ?string $noteLivreur;

    /**
     * @ORM\OneToMany(targetEntity=DevisLine::class, mappedBy="command", orphanRemoval=true,cascade={"persist", "remove"})
     * @Groups({"read:command","edit:command"})
     */
    private $devisLines;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"read:command"})
     */
    private ?DateTime $dateSend;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     * @Groups({"read:command"})
     */
    private ?bool $newDevis;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"read:command"})
     */
    private ?string $rejectRaison;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"read:command","edit:command"})
     */
    private $extraNote;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Assert\NotBlank(groups={"validation:command:create","validation:command:edit"})
     * @Groups({"read:command","edit:command"})
     */
    private $title;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Groups({"read:command"})
     */
    private $total;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     * @Groups({"read:command","write:command"})
     */
    private $rightToCancel;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"read:command"})
     */
    private $facture;

    /**
     * @ORM\OneToMany(targetEntity=Paiement::class, mappedBy="command", orphanRemoval=true)
     * @Groups({"read:command"})
     */
    private $paiements;

    /**
     * @Groups({"read:command"})
     */
    private ?float $totalDevisLines = 0;

    /**
     * @Groups({"read:command"})
     */
    private ?int $pastDay = 0;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     * @Groups({"read:command"})
     */
    private $adjust;

    /**
     * @ORM\ManyToOne(targetEntity=Command::class, inversedBy="children")
     * @Groups({"read:command:parent"})
     */
    private $parent;

    /**
     * @Groups({"read:command"})
     */
    private ?int $idParent;

    /**
     * @ORM\OneToMany(targetEntity=Command::class, mappedBy="parent")
     */
    private $children;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     * @Groups({"read:command"})
     */
    private $isCommand;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     * @Groups({"read:command"})
     */
    private $paidDevis;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     * @Groups({"read:command"})
     */
    private $isDevisSend;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read:command","read:command:type"})
     */
    private $type;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"read:command"})
     */
    private $acceptanceDate;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"read:command"})
     */
    private $rejectionDate;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"read:command"})
     */
    private $cancellationDate;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"read:command"})
     */
    private $adjustDate;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"read:command"})
     */
    private $completionDate;

    /**
     * @Groups({"read:command"})
     */
    private $urlBenefit;

    /**
     * @Groups({"read:command"})
     */
    private ?bool $sendEmail = false;

    /**
     * @ORM\ManyToOne(targetEntity=User::class)
     * @Groups({"read:command"})
     */
    private $updatedBy;

    /**
     * @ORM\Column(type="boolean", options={"default" : true})
     * @Groups({"read:command"})
     */
    private $stepsCompleted = true;

    public function __construct()
    {
        $this->devisLines = new ArrayCollection();
        $this->paiements = new ArrayCollection();
        $this->children = new ArrayCollection();
    }

    public function getBenefit(): ?Benefit
    {
        return $this->benefit;
    }

    public function setBenefit(?Benefit $benefit)
    {
        $this->benefit = $benefit;
    }

    public function getStatus(): ?int
    {
        return $this->status;
    }

    public function setStatus(int $status)
    {
        $this->status = $status;
    }

    public function getClient(): ?User
    {
        return $this->client;
    }

    public function setClient(?User $client)
    {
        $this->client = $client;
    }

    public function getValidationDate(): ?\DateTimeInterface
    {
        return $this->validationDate;
    }

    public function setValidationDate(?\DateTimeInterface $validationDate)
    {
        $this->validationDate = $validationDate;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description)
    {
        $this->description = $description;
    }

    public function getFiles(): ?array
    {
        return $this->files;
    }

    public function setFiles(?array $files)
    {
        $this->files = $files;
    }

    public function getDeliveryMode(): ?DeliveryMode
    {
        return $this->deliveryMode;
    }

    public function setDeliveryMode(?DeliveryMode $deliveryMode)
    {
        $this->deliveryMode = $deliveryMode;
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

    public function getFirstNameInvoice(): ?string
    {
        return $this->firstNameInvoice;
    }

    public function setFirstNameInvoice(?string $firstNameInvoice)
    {
        $this->firstNameInvoice = $firstNameInvoice;
    }

    public function getLastNameInvoice(): ?string
    {
        return $this->lastNameInvoice;
    }

    public function setLastNameInvoice(?string $lastNameInvoice)
    {
        $this->lastNameInvoice = $lastNameInvoice;
    }

    public function getAddressInvoice(): ?string
    {
        return $this->addressInvoice;
    }

    public function setAddressInvoice(?string $addressInvoice)
    {
        $this->addressInvoice = $addressInvoice;
    }

    public function getAdditionalAddressInvoice(): ?string
    {
        return $this->additionalAddressInvoice;
    }

    public function setAdditionalAddressInvoice(?string $additionalAddressInvoice)
    {
        $this->additionalAddressInvoice = $additionalAddressInvoice;
    }

    public function getPostalCodeInvoice(): ?string
    {
        return $this->postalCodeInvoice;
    }

    public function setPostalCodeInvoice(?string $postalCodeInvoice)
    {
        $this->postalCodeInvoice = $postalCodeInvoice;
    }
    public function getCityInvoice(): ?string
    {
        return $this->cityInvoice;
    }

    public function setCityInvoice(?string $cityInvoice)
    {
        $this->cityInvoice = $cityInvoice;
    }

    public function getNoteLivreur(): ?string
    {
        return $this->noteLivreur;
    }

    public function setNoteLivreur(?string $noteLivreur)
    {
        $this->noteLivreur = $noteLivreur;
    }

    /**
     * @return Collection|DevisLine[]
     */
    public function getDevisLines(): Collection
    {
        return $this->devisLines;
    }

    public function addDevisLine(DevisLine $devisLine)
    {
        if (!$this->devisLines->contains($devisLine)) {
            $this->devisLines[] = $devisLine;
            $devisLine->setCommand($this);
        }
    }

    public function removeDevisLine(DevisLine $devisLine)
    {
        if ($this->devisLines->removeElement($devisLine)) {
            // set the owning side to null (unless already changed)
            if ($devisLine->getCommand() === $this) {
                $devisLine->setCommand(null);
            }
        }
    }

    public function getDateSend(): ?\DateTimeInterface
    {
        return $this->dateSend;
    }

    public function setDateSend(?\DateTimeInterface $dateSend)
    {
        $this->dateSend = $dateSend;
    }

    public function getNewDevis(): ?bool
    {
        return $this->newDevis;
    }

    public function setNewDevis(?bool $newDevis)
    {
        $this->newDevis = $newDevis;
    }

    public function getRejectRaison(): ?string
    {
        return $this->rejectRaison;
    }

    public function setRejectRaison(?string $rejectRaison)
    {
        $this->rejectRaison = $rejectRaison;
    }

    public function getExtraNote(): ?string
    {
        return $this->extraNote;
    }

    public function setExtraNote(?string $extraNote)
    {
        $this->extraNote = $extraNote;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(?string $title)
    {
        $this->title = $title;
    }

    public function getTotal(): ?float
    {
        return $this->total;
    }

    public function setTotal(?float $total)
    {
        $this->total = $total;
    }

    public function getRightToCancel(): ?bool
    {
        return $this->rightToCancel;
    }

    public function setRightToCancel(?bool $rightToCancel)
    {
        $this->rightToCancel = $rightToCancel;
    }

    public function getFacture(): ?string
    {
        return $this->facture;
    }

    public function setFacture(?string $facture)
    {
        $this->facture = $facture;
    }

    /**
     * @return Collection|Paiement[]
     */
    public function getPaiements(): Collection
    {
        return $this->paiements;
    }

    public function addPaiement(Paiement $paiement)
    {
        if (!$this->paiements->contains($paiement)) {
            $this->paiements[] = $paiement;
            $paiement->setCommand($this);
        }
    }

    public function removePaiement(Paiement $paiement)
    {
        if ($this->paiements->removeElement($paiement)) {
            // set the owning side to null (unless already changed)
            if ($paiement->getCommand() === $this) {
                $paiement->setCommand(null);
            }
        }
    }

    public function getTotalDevisLines(): ?float
    {
        return $this->totalDevisLines;
    }

    public function setTotalDevisLines(?float $totalDevisLines)
    {
        $this->totalDevisLines = $totalDevisLines;
    }

    public function getPastDay(): ?int
    {
        if ($this->getCreatedAt()) {
            return intval((new DateTime())->diff($this->getCreatedAt())->format("%a"));
        }
        return $this->pastDay;
    }

    public function setPastDay(?int $pastDay)
    {
        $this->pastDay = $pastDay;
    }

    public function getAdjust(): ?bool
    {
        return $this->adjust;
    }

    public function setAdjust(?bool $adjust)
    {
        $this->adjust = $adjust;
    }

    public function getIdParent(): ?int
    {
        if ($this->parent instanceof Command) {
            return $this->parent->getId();
        }
        return NULL;
    }

    public function getParent(): ?self
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

    public function getIsCommand(): ?bool
    {
        return $this->isCommand;
    }

    public function setIsCommand(?bool $isCommand)
    {
        $this->isCommand = $isCommand;
    }

    public function getPaidDevis(): ?bool
    {
        return $this->paidDevis;
    }

    public function setPaidDevis(?bool $paidDevis)
    {
        $this->paidDevis = $paidDevis;
    }

    public function getIsDevisSend(): ?bool
    {
        return $this->isDevisSend;
    }

    public function setIsDevisSend(?bool $isDevisSend)
    {
        $this->isDevisSend = $isDevisSend;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type)
    {
        $this->type = $type;
    }

    public function getAcceptanceDate(): ?\DateTimeInterface
    {
        return $this->acceptanceDate;
    }

    public function setAcceptanceDate(?\DateTimeInterface $acceptanceDate)
    {
        $this->acceptanceDate = $acceptanceDate;
    }

    public function getRejectionDate(): ?\DateTimeInterface
    {
        return $this->rejectionDate;
    }

    public function setRejectionDate(?\DateTimeInterface $rejectionDate)
    {
        $this->rejectionDate = $rejectionDate;
    }

    public function getCancellationDate(): ?\DateTimeInterface
    {
        return $this->cancellationDate;
    }

    public function setCancellationDate(?\DateTimeInterface $cancellationDate)
    {
        $this->cancellationDate = $cancellationDate;
    }

    public function getAdjustDate(): ?\DateTimeInterface
    {
        return $this->adjustDate;
    }

    public function setAdjustDate(?\DateTimeInterface $adjustDate)
    {
        $this->adjustDate = $adjustDate;
    }

    public function getCompletionDate(): ?\DateTimeInterface
    {
        return $this->completionDate;
    }

    public function setCompletionDate(?\DateTimeInterface $completionDate)
    {
        $this->completionDate = $completionDate;
    }

    public function getSendEmail(): ?bool
    {
        return $this->sendEmail;
    }

    public function setSendEmail(?bool $sendEmail)
    {
        $this->sendEmail = $sendEmail;
    }

    public function getUrlBenefit(): ?string
    {
        $slugIdUniverse = $this->getBenefit()->getService()->getCategories()[0]->getParent()->getUniverse()->getSlug() . "-" . $this->getBenefit()->getService()->getCategories()[0]->getParent()->getUniverse()->getId();
        $slugIdService = $this->getBenefit()->getService()->getSlug() . "-" . $this->getBenefit()->getService()->getId();
        $slugIdBenefit = $this->getBenefit()->getUser()->getEnterprise() . "-" . $this->getBenefit()->getId();
        return $slugIdUniverse . "/" . $slugIdService . "/" . $slugIdBenefit;
    }

    public function getUpdatedBy(): ?User
    {
        return $this->updatedBy;
    }

    public function setUpdatedBy(?User $updatedBy): self
    {
        $this->updatedBy = $updatedBy;

        return $this;
    }

    public function getStepsCompleted(): ?bool
    {
        return $this->stepsCompleted;
    }

    public function setStepsCompleted(bool $stepsCompleted)
    {
        $this->stepsCompleted = $stepsCompleted;
    }
}
