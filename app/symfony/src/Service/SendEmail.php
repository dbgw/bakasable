<?php

declare(strict_types=1);

namespace App\Service;

use Negotiation\Exception\InvalidArgument;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class SendEmail extends AbstractController
{
    /**
     * @var MailerInterface
     */
    private MailerInterface $mailer;
    /**
     * @var string
     */
    private string $mailer_name;
    /**
     * @var string
     */
    private string $mailer_from;
    /**
     * @var string
     */
    private string $mailer_domain;
    /**
     * @var string
     */
    private string $mailer_to;
    /**
     * @var string
     */
    private string $prefix_backend;
        /**
     * @var string
     */
    private string $mailer_admin;
        /**
     * @var string
     */
    private string $mailer_strip;
        /**
     * @var string
     */
    private string $mailer_contact;
        /**
     * @var string
     */
    private string $mailer_phone;



    /**
     * SendEmail constructor.
     * @param MailerInterface $mailer
     * @param string $mailer_name
     * @param string $mailer_from
     * @param string $mailer_domain
     * @param string $mailer_to
     * @param string $prefix_backend
     * @param string $mailer_admin
     * @param string $mailer_strip
     * @param string $mailer_contact
     * @param string $mailer_phone
     */
    public function __construct(MailerInterface $mailer, string $mailer_name, string $mailer_from, string $mailer_domain, string $mailer_to, string $prefix_backend, string $mailer_admin, string $mailer_strip, string $mailer_contact, string $mailer_phone)
    {
        $this->mailer = $mailer;
        $this->mailer_name = $mailer_name;
        $this->mailer_from = $mailer_from;
        $this->mailer_domain = $mailer_domain;
        $this->mailer_to = $mailer_to;
        $this->prefix_backend = $prefix_backend;
        $this->mailer_admin = $mailer_admin;
        $this->mailer_strip = $mailer_strip;
        $this->mailer_contact = $mailer_contact;
        $this->mailer_phone = $mailer_phone;
    }

    public function send(string $to, string $subject = '', string $tpl = '', array $vars = []): bool
    {
        if (empty($to) || empty($subject) || empty($tpl)) {
            throw new InvalidArgument('Required arguments are empty.', 400);
        }

        $vars["domaine"] = $this->mailer_domain;

        $message = (new TemplatedEmail())
            ->from(new Address($this->mailer_from, $this->mailer_name))
            ->to($to)
            ->subject('Fingz : ' . $subject)
            ->htmlTemplate($tpl)
            ->context($vars);

        try {
            $this->mailer->send($message);
            return true;
        } catch (TransportExceptionInterface $e) {
            return false;
        }
    }

    public function getDomainName()
    {
        return $this->mailer_domain;
    }

    public function getMailerTo()
    {
        return $this->mailer_to;
    }

    public function getPrefixBackend()
    {
        return $this->prefix_backend;
    }

    public function getAdminEmail()
    {
        return $this->mailer_admin;
    }

    public function getStripEmail()
    {
        return $this->mailer_strip;
    }

    public function getMailerContact()
    {
        return $this->mailer_contact;
    }

    public function getMailerPhone()
    {
        return $this->mailer_phone;
    }
}
