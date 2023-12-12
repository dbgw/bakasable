<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Entity\Traits\IdentifiableTrait;
use App\Entity\Traits\TimestampableTrait;
use App\Repository\MessageRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Controller\Api\PostMessageAction;

/**
 * @ORM\HasLifecycleCallbacks()
 * @ApiResource(
 *      collectionOperations={
 *          "get"= {
 *              "normalization_context"={
 *                  "groups"={"read","read:thread","read:message","read:user"}
 *              },
 *          },
 *          "post_message" = {
 *              "method" = "post",
 *              "path" = "/messages",
 *              "controller" = PostMessageAction::class,
 *              "denormalization_context"={
 *                  "groups"={"write:message"}
 *              },
 *          },
 *      },
 * )
 * @ORM\Entity(repositoryClass=MessageRepository::class)
 */
class Message
{
    use IdentifiableTrait;
    use TimestampableTrait;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="messages")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"read:message"}) 
     */
    private $user;

    /**
     * @ORM\Column(type="text")
     * @Groups({"read:message","write:message"}) 
     */
    private $text;

    /**
     * @ORM\ManyToOne(targetEntity=Thread::class, inversedBy="messages")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"write:message"}) 
     */
    private $thread;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     * @Groups({"read:message"}) 
     */
    private $seen;

    /**
     * @ORM\Column(type="array", nullable=true)
     * @Groups({"read:message","write:message"}) 
     */
    private $files = [];

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

    public function getText(): ?string
    {
        return $this->text;
    }

    public function setText(string $text)
    {
        $this->text = $text;
    }

    public function getThread(): ?Thread
    {
        return $this->thread;
    }

    public function setThread(?Thread $thread)
    {
        $this->thread = $thread;
    }

    public function getSeen(): ?bool
    {
        return $this->seen;
    }

    public function setSeen(?bool $seen)
    {
        $this->seen = $seen;
    }

    public function getFiles(): ?array
    {
        return $this->files;
    }

    public function setFiles(?array $files)
    {
        $this->files = $files;
    }
}
