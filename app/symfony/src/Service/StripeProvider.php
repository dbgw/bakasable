<?php

declare(strict_types=1);

namespace App\Service;

use App\Entity\User;
use App\Entity\Command;
use Stripe\StripeClient;

class StripeProvider
{
  private $stripe;
  private $currency = "eur";

  public function __construct(string $publickey, string $secretkey)
  {
    $this->stripe = new StripeClient($secretkey);
  }

  public function creatCustomer(User $user, $token, string $description = "Fingz customer")
  {
    return $this->stripe->customers->create([
      'source' => $token->id,
      'description' => $description,
      'email' => $user->getEmail(),
      'name' => $user->getFullName()
    ]);
  }

  public function checkCustomerByEmail(User $user)
  {
    $data = $this->stripe->customers->all(['limit' => 1, 'email' => $user->getEmail()]);
    if (isset($data, $data->data) && count($data->data) && !empty($data->data[0]->id)) {
      return $data->data[0]->id;
    }
    return false;
  }

  public function createTokens(string $number, int $month, int $year, int $cvc)
  {
    return $this->stripe->tokens->create([
      'card' => [
        'number' => $number,
        'exp_month' => $month,
        'exp_year' => $year,
        'cvc' => $cvc,
      ],
    ]);
  }

  public function createPaymentMethods(User $user, string $number, int $month, int $year, int $cvc)
  {
    if (!$user->getStripeCustomerId()) return false;

    $paymentMethods = $this->stripe->paymentMethods->all([
      'customer' => $user->getStripeCustomerId(),
      'type' => 'card',
    ]);

    if ($paymentMethods->data) {
      foreach ($paymentMethods->data as $row) {
        if ($row->card->last4 == substr($number, -4) && $row->card->exp_month == $month && intval(substr((string)$row->card->exp_year, -2)) == $year) {
          return $row;
        }
      }
    }
    return $this->stripe->paymentMethods->create([
      'type' => 'card',
      'card' => [
        'number' => $number,
        'exp_month' => $month,
        'exp_year' => $year,
        'cvc' => $cvc,
      ],
    ]);
  }

  public function createAccount(User $user)
  {
    if (!$user->getStripeAccountToken()) return false;
    return $this->stripe->accounts->create([
      'type' => 'custom',
      'country' => 'FR',
      'email' => $user->getEmail(),
      'capabilities' => [
        'card_payments' => ['requested' => true],
        'transfers' => ['requested' => true],
      ],
      'default_currency' => $this->currency,
      "account_token" => $user->getStripeAccountToken()
    ]);
  }

  public function attachPayment(User $user, string $paymentMethodId)
  {
    if (!$user->getStripeCustomerId()) return false;
    return $this->stripe->paymentMethods->attach(
      $paymentMethodId,
      ['customer' => $user->getStripeCustomerId()]
    );
  }

  public function createCharge(User $user, Command $command, float $amount, $source)
  {
    if (!$user->getStripeCustomerId()) return false;
    $transferGroup = ($command->getType() === "devis" ? "devis" : "commande") . '_' . $command->getId();
    return $this->stripe->charges->create([
      'amount' => $amount,
      'currency' => $this->currency,
      'customer' => $user->getStripeCustomerId(),
      'source' => $source->id,
      'description' => 'Charge client',
      'transfer_group' => $transferGroup
    ]);
    //pour faire le transfert directe vers un account
    //'transfer_data'=> ["destination"=>$command->getBenefit()->getUser()->getStripeAccountId()]
  }

  public function createTransfer(User $user, Command $command, float $amount)
  {
    if (!$user->getStripeAccountId()) return false;

    $transferGroup = ($command->getType() === "devis" ? "devis" : "commande") . '_' . $command->getId();
    $transfers = $this->stripe->transfers->all(['limit' => 1, 'transfer_group' => $transferGroup]);

    if ($transfers->data && count($transfers->data) > 0) {
      return $transfers->data[0];
    }

    return $this->stripe->transfers->create([
      'amount' => $amount,
      'currency' => $this->currency,
      'destination' => $user->getStripeAccountId(),
      'transfer_group' => $transferGroup
    ]);
  }

  public function createBalanceTransaction(User $user, float $amount)
  {
    if (!$user->getStripeCustomerId()) return false;
    return $this->stripe->customers->createBalanceTransaction(
      $user->getStripeCustomerId(),
      ['amount' => $amount,  'currency' => $this->currency]
    );
  }

  public function accountLink($accountId)
  {
    return $this->stripe->accounts->createLoginLink(
      $accountId,
      []
    );
  }

  public function createAccountLink($accountId)
  {
    return $this->stripe->accountLinks->create([
      'account' => $accountId,
      'refresh_url' => 'https://fingz.feelandclic.dev',
      'return_url' => 'https://fingz.feelandclic.dev',
      'type' => 'account_onboarding',
    ]);
  }

  public function captureCharge($chargeId)
  {
    return $this->stripe->charges->capture(
      $chargeId,
      []
    );
  }

  public function refundsCharge($chargeId)
  {
    return $this->stripe->refunds->create([
      'charge' => $chargeId,
    ]);
  }

  public function refundsPaymentIntent($paymentIntentId)
  {
    return $this->stripe->refunds->create([
      'payment_intent' => $paymentIntentId,
    ]);
  }

  public function retrieveCustomer(User $user)
  {
    if (!$user->getStripeCustomerId()) return false;
    return $this->stripe->customers->retrieve(
      $user->getStripeCustomerId(),
      []
    );
  }

  public function retrieveCharge($chargeId)
  {
    return $this->stripe->charges->retrieve(
      $chargeId,
      []
    );
  }

  public function retrieveAccount($accountId)
  {
    return $this->stripe->accounts->retrieve(
      $accountId,
      []
    );
  }

  public function createSource(User $user, $token)
  {
    if (!$user->getStripeCustomerId()) return false;

    return $this->stripe->customers->createSource(
      $user->getStripeCustomerId(),
      ['source' => $token->id]
    );
  }

  public function createPaymentIntents(float $amount)
  {
    return $this->stripe->paymentIntents->create([
      'amount' => $amount,
      'currency' => $this->currency,
      'payment_method_types' => ['card'],
    ]);
  }

  public function retrievePaymentIntents($paymentIntentId)
  {
    return $this->stripe->paymentIntents->retrieve(
      $paymentIntentId,
      []
    );
  }
}
