<?php


namespace App\EventListener;


use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationFailureEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Response\JWTAuthenticationFailureResponse;

class AuthenticationFailureListener
{
    /**
     * @param AuthenticationFailureEvent $event
     */
    public function onAuthenticationFailureResponse(AuthenticationFailureEvent $event)
    {
        $message = $event->getException()->getMessage();
        if ("Bad credentials." == $message) {
            $message = "Les identifiants sont incorrects";
        }

        $response = new JWTAuthenticationFailureResponse($message);

        $event->setResponse($response);
    }
}
