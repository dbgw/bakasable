<?php

declare(strict_types=1);

namespace App\Entity;

use App\Repository\UserRepository;
use DateTime;
use DateTimeInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use App\Entity\Traits\IdentifiableTrait;
use App\Entity\Traits\TimestampableTrait;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiFilter;
use App\Controller\Api\CreateRepairManAction;
use App\Controller\Api\CreateClientAction;
use App\Controller\Api\CreateAdminAction;
use App\Controller\Api\PutUserShowcasesAction;
use App\Controller\Api\PutUserAction;
use App\Controller\Api\PutUserLastSeenAction;
use App\Controller\Api\GetUsersRepairManAction;
use App\Controller\Api\GetUsersClientAction;
use App\Controller\Api\GetUserRepairManAction;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @ORM\HasLifecycleCallbacks()
 * @ApiResource(
 *     collectionOperations={
 *          "get_users_repairman" = {
 *              "pagination_items_per_page" = 20,
 *              "maximum_items_per_page" = 80,
 *              "method" = "get",
 *              "path" = "/users/repairman",
 *              "controller" = GetUsersRepairManAction::class,
 *              "normalization_context"={
 *                  "groups"={"read","read:user","read:user:repairman"}
 *              },
 *              "security" = "is_granted('ROLE_ADMIN')",
 *          },
 *          "get_users_client" = {
 *              "method" = "get",
 *              "path" = "/users/client",
 *              "normalization_context"={
 *                  "groups"={"read","read:user"}
 *              },
 *              "controller" = GetUsersClientAction::class,
 *              "security" = "is_granted('ROLE_ADMIN') or is_granted('ROLE_REPAIRMAN')",
 *          },
 *          "get_users_client_list" = {
 *              "method" = "get",
 *              "path" = "/users/client/list",
 *              "normalization_context"={
 *                  "groups"={"read","read:user:client"}
 *              },
 *              "security" = "is_granted('ROLE_ADMIN')",
 *          },
 *          "get_users_client_devis" = {
 *              "method" = "get",
 *              "path" = "/users/devis/clients",
 *              "normalization_context"={
 *                  "groups"={"read","read:user"}
 *              },
 *              "security" = "is_granted('ROLE_ADMIN') or is_granted('ROLE_REPAIRMAN')",
 *          },
 *          "get_users_client_commands" = {
 *              "method" = "get",
 *              "path" = "/users/commands/clients",
 *              "normalization_context"={
 *                  "groups"={"read","read:user"}
 *              },
 *              "security" = "is_granted('ROLE_ADMIN') or is_granted('ROLE_REPAIRMAN')",
 *          },
 *          "get_users_repairman_devis" = {
 *              "method" = "get",
 *              "path" = "/users/devis/repairmans",
 *              "normalization_context"={
 *                  "groups"={"read","read:user"}
 *              },
 *              "security" = "is_granted('ROLE_ADMIN') or is_granted('ROLE_CLIENT')",
 *          },
 *          "get_users_repairman_commands" = {
 *              "method" = "get",
 *              "path" = "/users/commands/repairmans",
 *              "normalization_context"={
 *                  "groups"={"read","read:user"}
 *              },
 *              "security" = "is_granted('ROLE_ADMIN') or is_granted('ROLE_CLIENT')",
 *          },
 *          "get_users_admin" = {
 *              "method" = "get",
 *              "path" = "/users/admin",
 *              "normalization_context"={
 *                  "groups"={"read","read:user"}
 *              },
 *              "security" = "is_granted('ROLE_ADMIN')",
 *          },
 *          "get_users_repairman_universes" = {
 *              "pagination_items_per_page" = 20,
 *              "maximum_items_per_page" = 80,
 *              "method" = "get",
 *              "path" = "/users/repairman/universes",
 *              "normalization_context"={
 *                  "groups"={"read","read:user:gender","read:user:enterprise","read:user:firstName","read:user:lastName","read:user:showcases"}
 *              },
 *              "security" = "is_granted('ROLE_ADMIN')",
 *          },
 *          "post_repairman" = {
 *              "method" = "post",
 *              "path" = "/anonymous/user/repairman",
 *              "controller" = CreateRepairManAction::class,
 *              "normalization_context" = {
 *                  "groups" = {"read","read:user","read:user:repairman"}
 *              },
 *              "denormalization_context" = {
 *                  "groups" = {"write:user","write:user:repairman"}
 *              },
 *               "validation_groups"={"validation:user:create","validation:user:create:password","validation:user:repairman:create"},
 *          },
 *          "post_admin_repairman" = {
 *              "method" = "post",
 *              "path" = "/user/admin/repairman",
 *              "controller" = CreateRepairManAction::class,
 *              "normalization_context" = {
 *                  "groups" = {"read","read:user","read:user:repairman","read:user:status"}
 *              },
 *              "denormalization_context" = {
 *                  "groups" = {"write:user","write:user:repairman","write:user:status"}
 *              },
 *              "validation_groups"={"validation:user:create","validation:user:repairman:create"},
 *              "security" = "is_granted('ROLE_ADMIN')",
 *          },
 *          "post_client" = {
 *              "method" = "post",
 *              "path" = "/anonymous/user/client",
 *              "controller" = CreateClientAction::class,
 *              "normalization_context" = {
 *                  "groups" = {"read","read:user"}
 *              },
 *              "denormalization_context" = {
 *                  "groups" = {"write:user"}
 *              },
 *              "validation_groups"={"validation:user:create","validation:user:create:password"},
 *          },
 *          "post_admin" = {
 *              "method" = "post",
 *              "path" = "/user/admin",
 *              "controller" = CreateAdminAction::class,
 *              "normalization_context" = {
 *                  "groups" = {"read","read:user"}
 *              },
 *              "denormalization_context" = {
 *                  "groups" = {"write:user","write:user:status"}
 *              },
 *              "validation_groups"={"validation:user:create"},
 *              "security" = "is_granted('ROLE_ADMIN')",
 *          }
 *     },
 *     itemOperations={
 *          "get_user" = {
 *              "method" = "get",
 *              "path" = "/user/{id}",
 *              "normalization_context"={
 *                  "groups"={"read:user"}
 *              },
 *              "security" = "is_granted('ROLE_ADMIN')",
 *          },
 *          "get_user_repairman" = {
 *              "method" = "get",
 *              "path" = "/user/{id}/repairman",
 *              "controller" = GetUserRepairManAction::class,
 *              "normalization_context"={
 *                  "groups"={"read", "read:user", "read:user:repairman","read:user:showcases"}
 *              },
 *              "security" = "is_granted('ROLE_REPAIRMAN') and object.getId() == user.getId() and user.getStatus() == 1",
 *          },
 *          "get_user_repairman_benefits" = {
 *              "method" = "get",
 *              "path" = "/anonymous/user/repairman/{id}/benefits",
 *              "normalization_context"={
 *                  "groups"={"read", "read:user:benefits"}
 *              },
 *          },
 *          "get_user_client" = {
 *              "method" = "get",
 *              "path" = "/user/{id}/client",
 *              "normalization_context"={
 *                  "groups"={"read", "read:user"}
 *              },
 *              "security" = "is_granted('ROLE_CLIENT') and object.getId() == user.getId() and user.getStatus() == 1",
 *          },
 *          "get_user_admin" = {
 *              "method" = "get",
 *              "path" = "/user/{id}/admin",
 *              "normalization_context"={
 *                  "groups"={"read", "read:user"}
 *              },
 *              "security" = "is_granted('ROLE_ADMIN') and object.getId() == user.getId() and user.getStatus() == 1",
 *          },
 *          "put_user_last_seen" = {
 *              "method" = "put",
 *              "path" = "/user/{id}/lastseen",
 *              "normalization_context"={
 *                  "groups"={"read","read:lastseen" }
 *              },
 *              "controller" = PutUserLastSeenAction::class,
 *          },
 *          "put_user_showcases" = {
 *              "method" = "put",
 *              "path" = "/user/{id}/showcases",
 *              "controller" = PutUserShowcasesAction::class,
 *              "normalization_context"={
 *                  "groups"={"read:user","read:user:showcases"}
 *              },
 *              "denormalization_context" = {
 *                  "groups" = {"edit:user:showcases"}
 *              },
 *              "security" = "is_granted('ROLE_ADMIN')",
 *          },
 *          "put_user_repairman" = {
 *              "method" = "put",
 *              "path" = "/user/{id}/repairman",
 *              "controller" = PutUserAction::class,
 *              "normalization_context"={
 *                  "groups"={"read:user","read:user:repairman","read:user:showcases"}
 *              },
 *              "denormalization_context" = {
 *                  "groups" = {"edit:user:repairman","edit:user:showcases"}
 *              },
 *              "validation_groups"={"validation:user:edit","validation:user:repairman:edit"},
 *              "security" = "is_granted('ROLE_REPAIRMAN') and object.getId() == user.getId() and user.getStatus() == 1",
 *          },
 *          "put_user_client" = {
 *              "method" = "put",
 *              "path" = "/user/{id}/client",
 *              "controller" = PutUserAction::class,
 *              "normalization_context"={
 *                  "groups"={"read","read:user"}
 *              },
 *              "denormalization_context" = {
 *                  "groups" = {"edit:user:client"}
 *              },
 *              "validation_groups"={"validation:user:edit"},
 *              "security" = "is_granted('ROLE_ADMIN') or (is_granted('ROLE_CLIENT') and object.getId() == user.getId() and user.getStatus() == 1)",
 *          },
 *          "put_user_admin" = {
 *              "method" = "put",
 *              "path" = "/user/{id}/admin",
 *              "controller" = PutUserAction::class,
 *              "normalization_context"={
 *                  "groups"={"read","read:user"}
 *              },
 *              "denormalization_context" = {
 *                  "groups" = {"edit:user:admin"}
 *              },
 *              "validation_groups"={"validation:user:edit"},
 *              "security" = "is_granted('ROLE_ADMIN') and object.getId() == user.getId() and user.getStatus() == 1",
 *          },
 *          "put_user_client_addresses" = {
 *              "method" = "put",
 *              "path" = "/user/{id}/addresses",
 *              "normalization_context"={
 *                  "groups"={"read","read:user"}
 *              },
 *              "denormalization_context" = {
 *                  "groups" = {"edit:user:addresses"}
 *              },
 *              "security" = "is_granted('ROLE_CLIENT') and object.getId() == user.getId() and user.getStatus() == 1",
 *          },
 *          "put_admin_repairman" = {
 *              "method" = "put",
 *              "path" = "/user/admin/repairman/{id}",
 *              "controller" = PutUserAction::class,
 *              "security" = "is_granted('ROLE_ADMIN')",
 *          },
 *     },
 * )
 * @ApiFilter(OrderFilter::class, properties={"firstName", "lastName", "email", "enterprise", "phone", "status"})
 * @ApiFilter(SearchFilter::class, properties={"id": "exact", "status": "exact"})
 * @method string getUserIdentifier()
 */
class User implements UserInterface
{
    use IdentifiableTrait;
    use TimestampableTrait;

    const TYPES_STATUS = ['0' => 'En attente', '1' => 'En ligne',  '2' => 'Hors ligne'];

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Groups({"write:user","read:user","read:command:user","edit:user:repairman","edit:user:client"})
     */
    private ?string $username;

    /**
     * @ORM\Column(type="array")
     * @Groups({"read:user","read:command:user"})
     */
    private ?array $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     * @Assert\NotBlank(groups={"validation:user:create:password","validation:user:edit"})
     * @Groups({"write:user","edit:user:repairman","edit:user:client"})
     */
    private string $password;

    /**
     * @Assert\NotBlank(groups={"validation:user:create:password"})
     * @Assert\Regex(
     *     pattern="/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*([^\w\s]|[_]))\S{8,}$/",
     *     message="Votre mot de passe doit contenir au moins 8 caractères, 1 majuscule, 1 chiffre et 1 caractère spécial.",
     *     groups={"validation:user:create:password","validation:user:edit"}
     * )
     * @Assert\Length(max=4096)
     * @Groups({"write:user","edit:user:repairman","edit:user:client"})
     */
    private string $plainPassword = "";

    /**
     * @ORM\ManyToMany(targetEntity=Universe::class, inversedBy="users")
     * @Groups({"read:user:showcases","edit:user:showcases"})
     */
    private $showcases;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(groups={"validation:user:create","validation:user:edit"})
     * @Groups({"write:user", "read:user","read:command:user","read:user:firstName","read:benefit:user","read:user:repairman:list","edit:user:repairman","edit:user:client","edit:user:admin","read:user:client"})
     */
    private ?string $firstName;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(groups={"validation:user:create","validation:user:edit"})
     * @Groups({"write:user", "read:user","read:command:user","read:user:lastName","read:benefit:user","read:user:repairman:list","edit:user:repairman","edit:user:client","edit:user:admin","read:user:client"})
     */
    private ?string $lastName;

    /**
     * @ORM\Column(type="string", length=255, unique=true)
     * @Assert\NotBlank(groups={"validation:user:create","validation:user:edit"})
     * @Groups({"write:user", "read:user","read:command:user","read:user:repairman:list","edit:user:repairman","edit:user:client","edit:user:admin"})
     */
    private ?string $email;

    /**
     * @ORM\OneToMany(targetEntity=NewService::class, mappedBy="user")
     */
    private $newServices;

    /**
     * @ORM\OneToMany(targetEntity=Benefit::class, mappedBy="user")
     * @Groups({"read:user:benefits"})
     */
    private $benefits;

    /**
     * @ORM\Column(type="string", length=30)
     * @Assert\NotBlank(groups={"validation:user:create","validation:user:edit"})
     * @Groups({"write:user", "read:user","read:command:user","read:user:gender","edit:user:repairman","edit:user:client","edit:user:admin","read:user:client"})
     */
    private ?string $gender;

    /**
     * @ORM\Column(type="smallint", options={"default" : 0})
     * @Groups({"write:user:status", "read:user", "read:command:user","read:user:status", "read:user:repairman","edit:user:client","edit:user:admin"})
     */
    private ?int $status = 0;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"read:user","read:command:user","read:user:repairman"})
     */
    private ?DateTime $lastConnection;

    /**
     * @ORM\Column(type="string", length=30, nullable=true)
     * @Assert\NotBlank(groups={"validation:user:repairman:create","validation:user:repairman:edit"})
     * @Groups({"write:user:repairman", "read:user:repairman","edit:user:repairman"})
     */
    private ?string $SIRET;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Assert\NotBlank(groups={"validation:user:repairman:create","validation:user:repairman:edit"})
     * @Groups({"write:user:repairman", "read:user:repairman","edit:user:repairman","read:benefit:user","read:user:enterprise","read:user","read:command:user"})
     */
    private ?string $enterprise;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Assert\NotBlank(groups={"validation:user:repairman:create","validation:user:repairman:edit"})
     * @Groups({"read:user","read:command:user","write:user:repairman","edit:user:repairman"})
     */
    private ?string $address;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"write:user:repairman", "read:user:repairman","edit:user:repairman"})
     */
    private ?string $additionalAddress;

    /**
     * @ORM\Column(type="string", length=30, nullable=true)
     * @Assert\NotBlank(groups={"validation:user:repairman:create","validation:user:repairman:edit"})
     * @Groups({"read:user","read:command:user","write:user:repairman","edit:user:repairman","read:user:postalCode"})
     */
    private ?string $postalCode;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Assert\NotBlank(groups={"validation:user:repairman:create","validation:user:repairman:edit"})
     * @Groups({"read:user","read:command:user","write:user:repairman","edit:user:repairman","read:user:city"})
     */
    private  ?string $city;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"write:user:repairman", "read:user:repairman","edit:user:repairman"})
     */
    private $addressBilling;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"write:user:repairman", "read:user:repairman","edit:user:repairman"})
     */
    private ?string $additionalAddressBilling;

    /**
     * @ORM\Column(type="string", length=30, nullable=true)
     * @Groups({"write:user:repairman", "read:user:repairman","edit:user:repairman"})
     */
    private ?string $postalCodeBilling;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"write:user:repairman", "read:user:repairman","edit:user:repairman"})
     */
    private  ?string $cityBilling;

    /**
     * @ORM\Column(type="string", length=30, nullable=true)
     * @Groups({"write:user:repairman", "read:user:repairman","edit:user:repairman"})
     */
    private ?string $intraCommunityVAT;

    /**
     * @ORM\Column(type="string", length=30, nullable=true)
     * @Groups({"write:user", "read:user","read:command:user","edit:user:repairman","edit:user:admin"})
     */
    private ?string $phone;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Assert\NotBlank(groups={})
     * @Groups({"write:user", "read:user","read:command:user","edit:user:repairman","read:benefit:user"})
     */
    private ?float $latitude;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Assert\NotBlank(groups={})
     * @Groups({"write:user", "read:user","read:command:user","edit:user:repairman","read:benefit:user"})
     */
    private ?float $longitude;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Assert\NotBlank(groups={})
     * @Groups({"write:user", "read:user","read:command:user","edit:user:repairman","read:benefit:user"})
     */
    private ?float $latitudeBilling;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Assert\NotBlank(groups={})
     * @Groups({"write:user", "read:user","read:command:user","edit:user:repairman","read:benefit:user"})
     */
    private ?float $longitudeBilling;

    /**
     * @ORM\ManyToOne(targetEntity=TypeCompany::class, inversedBy="users")
     * @Assert\NotBlank(groups={"validation:user:repairman:create","validation:user:repairman:edit"})
     * @Groups({"write:user:repairman", "read:user:repairman","edit:user:repairman"})
     */
    private ?TypeCompany $TypeCompany;

    /**
     * @ORM\Column(type="boolean", options={"default" : true})
     * @Groups({"read:user:repairman"})
     */
    private ?bool $isRegistrationCompleted = true;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"write:user:repairman", "read:user:repairman","edit:user:repairman"})
     */
    private ?string $description;

    /**
     * @ORM\Column(type="array", nullable=true)
     * @Groups({"write:user:repairman", "read:user:repairman","edit:user:repairman","read:user:achievements"})
     */
    private ?array $achievements;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"write:user:repairman", "read:user:repairman","edit:user:repairman"})
     */
    private ?string $website;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"write:user:repairman", "read:user:repairman","edit:user:repairman"})
     */
    private ?string $twitter;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"write:user:repairman", "read:user:repairman","edit:user:repairman"})
     */
    private ?string $facebook;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"write:user:repairman", "read:user:repairman","edit:user:repairman"})
     */
    private ?string $instagram;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"write:user:repairman", "read:user:repairman","edit:user:repairman"})
     */
    private ?string $linkedIn;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"write:user:repairman", "read:user:repairman","edit:user:repairman"})
     */
    private ?string $youTube;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"read:service:details", "read:benefit:service","read:benefit:user","read:user:repairman","edit:user:repairman","write:user","read:user","read:command:user"}) 
     */
    private ?string $picture = null;

    /**
     * @ORM\OneToMany(targetEntity=Command::class, mappedBy="client", orphanRemoval=true)
     * @Groups({"read:command:related"})
     */
    private $commands;

    /**
     * @Groups({"read:user","read:command:user"})
     */
    private ?array $payload = [];

    /**
     * @Groups({"read:user","read:command:user"})
     */
    private ?int $totalCommands = 0;

    /**
     * @Groups({"read:user","read:command:user"})
     */
    private ?int $totalDevis = 0;

    /**
     * @ORM\ManyToMany(targetEntity=Thread::class, mappedBy="users")
     */
    private $threads;

    /**
     * @ORM\OneToMany(targetEntity=Message::class, mappedBy="user", orphanRemoval=true)
     */
    private $messages;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"read:lastseen", "read:user","read:command:user"})
     */
    private $lastSeen;

    /**
     * @ORM\OneToMany(targetEntity=Address::class, mappedBy="user", orphanRemoval=true,cascade={"persist", "remove"})
     * @Groups({"write:user", "read:user","edit:user:addresses"})
     */
    private $addresses;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $stripeCustomerId;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $stripeAccountId;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $stripeAccountLink;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"read:user","read:command:user"})
     */
    private $stripeAccountToken;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"write:user", "read:user","read:command:user","edit:user:repairman","read:benefit:user"})
     */
    private $placeId = null;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"write:user", "read:user","read:command:user","edit:user:repairman","read:benefit:user"})
     */
    private $placeIdBilling = null;

    /**
     * @Groups({"read:benefit:user","read:user:repairman"})
     */
    private $googleRating;

    /**
     * @Groups({"read:benefit:user","read:user:repairman"})
     */
    private $googleReviews = [];

    /**
     * @Groups({"write:user", "read:user"})
     */
    private $captcha = null;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"read:user","read:command:user"})
     */
    private $stripePersonToken;

    public function __construct()
    {
        $this->showcases = new ArrayCollection();
        $this->newServices = new ArrayCollection();
        $this->benefits = new ArrayCollection();
        $this->commands = new ArrayCollection();
        $this->adresses = new ArrayCollection();
        $this->threads = new ArrayCollection();
        $this->messages = new ArrayCollection();
        $this->addresses = new ArrayCollection();
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->username;
    }

    public function setUsername(string $username)
    {
        $this->username = empty($username) ? $this->email : $username;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles)
    {
        $this->roles = $roles;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password)
    {
        $this->password = $password;
    }

    /**
     * Returning a salt is only needed, if you are not using a modern
     * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
     *
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    /**
     * @return Collection|Universe[]
     */
    public function getShowcases(): Collection
    {
        return $this->showcases;
    }

    public function addShowcase(Universe $showcase)
    {
        if (!$this->showcases->contains($showcase)) {
            $this->showcases[] = $showcase;
        }
    }

    public function removeShowcase(Universe $showcase)
    {
        $this->showcases->removeElement($showcase);
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstname(string $firstName)
    {
        $this->firstName = $firstName;
    }

    public function getlastName(): ?string
    {
        return $this->lastName;
    }

    public function setlastName(string $lastName)
    {
        $this->lastName = $lastName;
    }

    public function getFullName(): ?string
    {
        return `{$this->firstName} {$this->lastName}`;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email)
    {
        $this->email = $email;
    }

    /**
     * @return Collection|NewService[]
     */
    public function getNewServices(): Collection
    {
        return $this->newServices;
    }

    public function addNewService(NewService $newService)
    {
        if (!$this->newServices->contains($newService)) {
            $this->newServices[] = $newService;
            $newService->setUser($this);
        }
    }

    public function removeNewService(NewService $newService)
    {
        if ($this->newServices->removeElement($newService)) {
            // set the owning side to null (unless already changed)
            if ($newService->getUser() === $this) {
                $newService->setUser(null);
            }
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
            $benefit->setUser($this);
        }
    }

    public function removeBenefit(Benefit $benefit)
    {
        if ($this->benefits->removeElement($benefit)) {
            // set the owning side to null (unless already changed)
            if ($benefit->getUser() === $this) {
                $benefit->setUser(null);
            }
        }
    }

    public function getGender(): ?string
    {
        return $this->gender;
    }

    public function setGender(string $gender)
    {
        $this->gender = $gender;
    }

    public function getStatus(): ?int
    {
        return $this->status;
    }

    public function setStatus(int $status)
    {
        $this->status = $status;
    }

    public function getLastConnection(): ?DateTimeInterface
    {
        return $this->lastConnection;
    }

    public function setLastConnection(?DateTimeInterface $lastConnection)
    {
        $this->lastConnection = $lastConnection;
    }

    public function getSIRET(): ?string
    {
        return $this->SIRET;
    }

    public function setSIRET(string $SIRET)
    {
        $this->SIRET = $SIRET;
    }

    public function getEnterprise(): ?string
    {
        return $this->enterprise;
    }

    public function setEnterprise(?string $enterprise)
    {
        $this->enterprise = $enterprise;
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
    public function getAddressBilling(): ?string
    {
        return $this->addressBilling;
    }

    public function setAddressBilling(?string $addressBilling)
    {
        $this->addressBilling = $addressBilling;
    }

    public function getAdditionalAddressBilling(): ?string
    {
        return $this->additionalAddressBilling;
    }

    public function setAdditionalAddressBilling(?string $additionalAddressBilling)
    {
        $this->additionalAddressBilling = $additionalAddressBilling;
    }

    public function getPostalCodeBilling(): ?string
    {
        return $this->postalCodeBilling;
    }

    public function setPostalCodeBilling(?string $postalCodeBilling)
    {
        $this->postalCodeBilling = $postalCodeBilling;
    }

    public function getCityBilling(): ?string
    {
        return $this->cityBilling;
    }

    public function setCityBilling(?string $cityBilling)
    {
        $this->cityBilling = $cityBilling;
    }

    public function getIntraCommunityVAT(): ?string
    {
        return $this->intraCommunityVAT;
    }

    public function setIntraCommunityVAT(?string $intraCommunityVAT)
    {
        $this->intraCommunityVAT = $intraCommunityVAT;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(?string $phone)
    {
        $this->phone = $phone;
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

    public function getLatitudeBilling(): ?float
    {
        return $this->latitudeBilling;
    }

    public function setLatitudeBilling(?float $latitudeBilling)
    {
        $this->latitudeBilling = $latitudeBilling;
    }

    public function getLongitudeBilling(): ?float
    {
        return $this->longitudeBilling;
    }

    public function setLongitudeBilling(?float $longitudeBilling)
    {
        $this->longitudeBilling = $longitudeBilling;
    }

    public function getTypeCompany(): ?TypeCompany
    {
        return $this->TypeCompany;
    }

    public function setTypeCompany(?TypeCompany $TypeCompany)
    {
        $this->TypeCompany = $TypeCompany;
    }

    public function getPlainPassword(): string
    {
        return $this->plainPassword;
    }

    public function setPlainPassword($password)
    {
        $this->plainPassword = $password;
    }

    public function __call($name, $arguments)
    {
        // TODO: Implement @method string getUserIdentifier()
    }

    public function getIsRegistrationCompleted(): ?bool
    {
        return $this->isRegistrationCompleted;
    }

    public function setIsRegistrationCompleted(bool $isRegistrationCompleted)
    {
        $this->isRegistrationCompleted = $isRegistrationCompleted;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description)
    {
        $this->description = $description;
    }

    public function getAchievements(): ?array
    {
        return $this->achievements;
    }

    public function setAchievements(?array $achievements)
    {
        $this->achievements = $achievements;
    }

    public function getWebsite(): ?string
    {
        return $this->website;
    }

    public function setWebsite(?string $website)
    {
        $this->website = $website;
    }

    public function getTwitter(): ?string
    {
        return $this->twitter;
    }

    public function setTwitter(?string $twitter)
    {
        $this->twitter = $twitter;
    }

    public function getFacebook(): ?string
    {
        return $this->facebook;
    }

    public function setFacebook(?string $facebook)
    {
        $this->facebook = $facebook;
    }

    public function getInstagram(): ?string
    {
        return $this->instagram;
    }

    public function setInstagram(?string $instagram)
    {
        $this->instagram = $instagram;
    }

    public function getLinkedIn(): ?string
    {
        return $this->linkedIn;
    }

    public function setLinkedIn(?string $linkedIn)
    {
        $this->linkedIn = $linkedIn;
    }

    public function getYouTube(): ?string
    {
        return $this->youTube;
    }

    public function setYouTube(?string $youTube)
    {
        $this->youTube = $youTube;
    }

    public function getPicture(): ?string
    {
        return $this->picture;
    }

    public function setPicture(?string $picture)
    {
        $this->picture = $picture;
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
            $command->setClient($this);
        }
    }

    public function removeCommand(Command $command)
    {
        if ($this->commands->removeElement($command)) {
            // set the owning side to null (unless already changed)
            if ($command->getClient() === $this) {
                $command->setClient(null);
            }
        }
    }

    public function getPayload(): ?array
    {
        return $this->payload;
    }

    public function setPayload(?array $payload)
    {
        $this->payload = $payload;
    }

    public function getTotalCommands(): ?int
    {
        return $this->totalCommands;
    }

    public function setTotalCommands(int $totalCommands)
    {
        $this->totalCommands = $totalCommands;
    }

    public function getTotalDevis(): ?int
    {
        return $this->totalDevis;
    }

    public function setTotalDevis(int $totalDevis)
    {
        $this->totalDevis = $totalDevis;
    }

    /**
     * @return Collection|Address[]
     */
    public function getAddresses(): Collection
    {
        return $this->addresses;
    }

    public function addAddress(Address $address)
    {
        if (!$this->addresses->contains($address)) {
            $this->addresses[] = $address;
            $address->setUser($this);
        }
    }

    public function removeAddress(Address $address)
    {
        if ($this->addresses->removeElement($address)) {
            // set the owning side to null (unless already changed)
            if ($address->getUser() === $this) {
                $address->setUser(null);
            }
        }
    }

    /**
     * @return Collection|Thread[]
     */
    public function getThreads(): Collection
    {
        return $this->threads;
    }

    public function addThread(Thread $thread)
    {
        if (!$this->threads->contains($thread)) {
            $this->threads[] = $thread;
            $thread->addUser($this);
        }
    }

    public function removeThread(Thread $thread)
    {
        if ($this->threads->removeElement($thread)) {
            $thread->removeUser($this);
        }
    }

    /**
     * @return Collection|Message[]
     */
    public function getMessages(): Collection
    {
        return $this->messages;
    }

    public function addMessage(Message $message)
    {
        if (!$this->messages->contains($message)) {
            $this->messages[] = $message;
            $message->setUser($this);
        }
    }

    public function removeMessage(Message $message)
    {
        if ($this->messages->removeElement($message)) {
            // set the owning side to null (unless already changed)
            if ($message->getUser() === $this) {
                $message->setUser(null);
            }
        }
    }

    public function getLastSeen(): ?\DateTimeInterface
    {
        return $this->lastSeen;
    }

    public function setLastSeen(?\DateTimeInterface $lastSeen)
    {
        $this->lastSeen = $lastSeen;
    }

    public function getStripeCustomerId(): ?string
    {
        return $this->stripeCustomerId;
    }

    public function setStripeCustomerId(?string $stripeCustomerId)
    {
        $this->stripeCustomerId = $stripeCustomerId;
    }

    public function getStripeAccountId(): ?string
    {
        return $this->stripeAccountId;
    }

    public function setStripeAccountId(?string $stripeAccountId)
    {
        $this->stripeAccountId = $stripeAccountId;
    }

    public function getStripeAccountLink(): ?string
    {
        return $this->stripeAccountLink;
    }

    public function setStripeAccountLink(?string $stripeAccountLink)
    {
        $this->stripeAccountLink = $stripeAccountLink;
    }

    public function getStripeAccountToken(): ?string
    {
        return $this->stripeAccountToken;
    }

    public function setStripeAccountToken(?string $stripeAccountToken)
    {
        $this->stripeAccountToken = $stripeAccountToken;
    }

    public function getPlaceId(): ?string
    {
        return $this->placeId;
    }

    public function setPlaceId(?string $placeId)
    {
        $this->placeId = $placeId;
    }

    public function getPlaceIdBilling(): ?string
    {
        return $this->placeIdBilling;
    }

    public function setPlaceIdBilling(?string $placeIdBilling)
    {
        $this->placeIdBilling = $placeIdBilling;
    }

    public function getGoogleRating(): ?float
    {
        return $this->googleRating;
    }

    public function setGoogleRating(?float $googleRating)
    {
        $this->googleRating = $googleRating;
    }

    public function getGoogleReviews(): ?array
    {
        return $this->googleReviews;
    }

    public function setGoogleReviews(?array $googleReviews)
    {
        $this->googleReviews = $googleReviews;
    }
    
    public function setCaptcha(?string $captcha)
    {
        $this->captcha = $captcha;
    }

    public function getCaptcha(): ?string
    {
        return $this->captcha;
    }

    public function getStripePersonToken(): ?string
    {
        return $this->stripePersonToken;
    }

    public function setStripePersonToken(?string $stripePersonToken)
    {
        $this->stripePersonToken = $stripePersonToken;
    }
}
