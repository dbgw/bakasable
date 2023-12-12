<?php

declare(strict_types=1);

namespace App\Entity\Traits;

use DateTime;
use DateTimeInterface;
use Doctrine\ORM\Mapping as ORM;
use Exception;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * Trait TimestampableTrait
 * @package App\Entity\Trait
 */
trait TimestampableTrait
{
    /**
     * @ORM\Column(type="datetime")
     * @Groups({"read"})
     */
    private ?DateTime $createdAt;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"read"})
     */
    private ?DateTime $updatedAt;

    /**
     * @return DateTimeInterface|null
     * @throws Exception
     */
    public function getCreatedAt(): ?DateTimeInterface
    {
        return $this->createdAt ?? new DateTime();
    }

    /**
     * @param DateTimeInterface $createdAt
     */
    public function setCreatedAt(DateTimeInterface $createdAt)
    {
        $this->createdAt = $createdAt;
    }

    /**
     * @return DateTimeInterface|null
     */
    public function getUpdatedAt(): ?DateTimeInterface
    {
        return $this->updatedAt ?? new DateTime();
    }

    /**
     * @param DateTimeInterface $updatedAt
     */
    public function setUpdatedAt(DateTimeInterface $updatedAt)
    {
        $this->updatedAt = $updatedAt;
    }

    /**
     * @ORM\PrePersist()
     * @ORM\PreUpdate()
     */
    public function updateTimestamps(): void
    {
        $now = new DateTime();
        $this->setUpdatedAt($now);
        if ($this->getId() === null) {
            $this->setCreatedAt($now);
        }
    }
}
