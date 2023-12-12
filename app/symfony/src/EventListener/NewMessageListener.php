<?php

namespace App\EventListener;

use App\Entity\Message;
use App\Service\SendEmail;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Serializer\SerializerInterface;

class NewMessageListener
{

  /**
   * @var EntityManagerInterface
   */
  private $em;
  /**
   * @var SendEmail
   */
  private SendEmail $mailer;

  /**
   * @var string
   */
  private $public_url;

  /**
   * @var HubInterface
   */
  private $hub;

  /**
   * @var SerializerInterface
   */
  private $serializer;

  /**
   * NewMessageListener constructor.
   */
  public function __construct(EntityManagerInterface $em, HubInterface $hub, SerializerInterface $serializer, string $public_url, SendEmail $mailer)
  {
    $this->em = $em;
    $this->public_url = $public_url;
    $this->hub = $hub;
    $this->serializer = $serializer;
    $this->mailer = $mailer;
  }

  public function postPersist(Message $message, LifecycleEventArgs $event)
  {
    $messageToPublish = json_decode($this->serializer->serialize($message, 'json', ["read", "read:thread", "read:message", "read:user"]), TRUE);
    $messageToPublish['user'] = json_decode($this->serializer->serialize($message->getUser(), 'json', ["read", "read:user"]), true);

    try {
      $update = new Update(
        $this->public_url . '/' . $message->getThread()->getId(),
        json_encode([
          "type" => "new_message",
          "message" => $messageToPublish
        ])
      );
      $this->hub->publish($update);
    } catch (\Exception $e) {
      throw new BadRequestException($e->getMessage());
    }

    $otherUser = false;
    foreach ($message->getThread()->getUsers() as $user) {
      if ($message->getUser()->getId() !== $user->getId()) {
        $otherUser = $user;
        break;
      }
    }
    if ($otherUser) {
      $this->mailer->send(
        $otherUser->getEmail(),
        'Nouveau message dans votre messagerie interne',
        'emails/new_message.html.twig',
        [
          'user' => $otherUser,
          'urlMessagerie' => $this->mailer->getDomainName() . $this->mailer->getPrefixBackend() . "/messagerie/" . $message->getThread()->getId()
        ]
      );
    }
  }
}
