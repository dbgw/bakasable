<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Entity\Traits\IdentifiableTrait;
use App\Entity\Traits\TimestampableTrait;
use App\Repository\ThreadRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Controller\Api\PostThreadAction;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\HasLifecycleCallbacks()
 * @ApiResource(
 *      collectionOperations={
 *          "get" = {
 *              "normalization_context"={
 *                  "groups"={"read","read:thread","read:message","read:user"}
 *              },
 *          },
 *          "post_thread" = {
 *              "method" = "post",
 *              "path" = "/threads",
 *              "controller" = PostThreadAction::class,
 *              "normalization_context"={
 *                  "groups"={"read","read:thread","read:message","read:user"}
 *              },
 *          },
 *      },
 *      itemOperations={
 *          "get" = {
 *              "normalization_context"={
 *                  "groups"={"read","read:thread","read:message","read:user"}
 *              },
 *          },
 *      }
 * )
 * @ORM\Entity(repositoryClass=ThreadRepository::class)
 */
class Thread
{
    use IdentifiableTrait;
    use TimestampableTrait;

    /**
     * @ORM\ManyToMany(targetEntity=User::class, inversedBy="threads")
     * @Groups({"read:thread"}) 
     */
    private $users;

    /**
     * @ORM\OneToMany(targetEntity=Message::class, mappedBy="thread", orphanRemoval=true)
     * @Groups({"read:thread"}) 
     */
    private $messages;

    public function __construct()
    {
        $this->users = new ArrayCollection();
        $this->messages = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection|User[]
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user)
    {
        if (!$this->users->contains($user)) {
            $this->users[] = $user;
        }
    }

    public function removeUser(User $user)
    {
        $this->users->removeElement($user);
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
            $message->setThread($this);
        }
    }

    public function removeMessage(Message $message)
    {
        if ($this->messages->removeElement($message)) {
            // set the owning side to null (unless already changed)
            if ($message->getThread() === $this) {
                $message->setThread(null);
            }
        }
    }
}
