<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Command;
use App\Service\SendEmail;
use App\Service\StripeProvider;
use App\Repository\UserRepository;
use Symfony\Component\Mercure\Update;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\UrlHelper;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class MainController extends AbstractController
{
    private SendEmail $mailer;

    public function __construct(SendEmail $mailer)
    {
        $this->mailer = $mailer;
    }

    /**
     * @Route("/api/anonymous/contact", name="send_contact")
     */
    public function sendContact(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent());
        $this->mailer->send(
            $_ENV['MAILER_FROM'],
            'Demande de contact',
            'emails/contact.html.twig',
            [
                'data' => $data,
            ]
        );
        $response = new JsonResponse();
        $response->setContent(json_encode(["status" => "send"]));
        return $response;
    }

    /**
     * @Route("/api/forgot_password", name="forgot_password", methods={"POST"})
     */
    public function forgotPassword(
        Request $request,
        UserRepository $userRepository,
        UserPasswordHasherInterface $passwordHasher,
        EntityManagerInterface $em
    ): JsonResponse {
        $data = json_decode($request->getContent());
        $theuser = $userRepository->findOneByEmail($data->email);
        $response = new JsonResponse();
        if ($theuser instanceof User) {
            $alphabet = "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
            for ($i = 0; $i < 10; $i++) {
                $n = rand(0, strlen($alphabet) - 1);
                $plainPassword[$i] = $alphabet[$n];
            }
            $plainPassword = implode('', $plainPassword) . '_An1';
            $encoded = $passwordHasher->hashPassword($theuser, $plainPassword);

            $conn = $em->getConnection();

            // $theuser->setPassword($encoded);
            // $em->persist($em);
            // $em->flush();

            // flush is not working here and i don't know whey so i wrote this to ublock the ticket
            $conn->executeQuery("UPDATE user SET password = :password WHERE id = :id", ["password" => $encoded, "id" => $theuser->getId()]);

            $this->mailer->send(
                $theuser->getEmail(),
                'Nouveau mot de passe',
                'emails/forgot_password.html.twig',
                [
                    'user' => $theuser,
                    "plainPassword" => $plainPassword,
                    "url" => $this->mailer->getDomainName()
                ]
            );
            $response->setContent(json_encode(["status" => "send"]));
        } else
            $response->setContent(json_encode(["status" => false, "noAccount" => true]));
        return $response;
    }

    /**
     * @Route("/api/is-typing", name="is_typing", methods={"POST"})
     */
    public function isTyping(HubInterface $hub, Request $request, SerializerInterface $serializer): Response
    {
        try{
            $public_url = $this->getParameter("mercure_public_url");
            $data = json_decode($request->getContent());
            $update = new Update(
                $public_url . '/' . $data->thread,
                json_encode([
                    "type" => "typing",
                    'length' => $data->length,
                    'user' => json_decode($serializer->serialize($this->getUser(), 'json', ['groups' => ["read", "read:user"]]))
                ])
            );

            $hub->publish($update);
        }catch(\Exception $e){
            throw new BadRequestException($e->getMessage());
        }

        return new Response('published!');
    }

    /**
     * @Route("/api/paiement/create-payment-intents", name="paiement_create_payment_intents", methods={"POST"})
     */
    public function paiementCreatePaymentIntents(Request $request,StripeProvider $stripeProvider): Response
    {
        $data = json_decode($request->getContent());
        $response = new JsonResponse();
       
        try{
            $paymentIntents = $stripeProvider->createPaymentIntents($data->amount);
            if($paymentIntents){
                $response->setContent(json_encode(["status" => "200", "message"=>"Payment Initiated","clientSecret"=> $paymentIntents->client_secret]));
            }else{
                $response->setContent(json_encode(["status" => "400", "message"=>"Internal server error"]));
            }
        }catch(\Exception $e){
            $response->setContent(json_encode(["status" => "400", "message"=>$e->getMessage()]));
        }

        return $response;
    }
}
