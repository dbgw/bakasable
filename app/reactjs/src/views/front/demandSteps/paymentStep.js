import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import Checkout from "../../../components/checkout";
import Proposition from "../../../components/proposition";
import SingleCheckbox from "../../../components/ui-elements/singleCheckBox";
import endPoints from "../../../config/endPoints";
import connector from "../../../connector";
import { clearErrors, validForm } from "../../../helper/form";
import { scrollTop } from "../../../helper/functions";
import { STRIPE_PUBLIC_KEY } from "../../../vars";

export default function PaymentStep({
  benefit = {},
  deliveryMode = {},
  state,
  setState = () => {},
  message = false,
  setMessage = () => {},
  isPending = false,
  setIsPending = () => {},
  saveAddresses = () => {},
  savePaiement = () => {},
  command = false,
  defaultCommand,
  checkCardPayment = false,
  setCheckCardPayment = () => {},
}) {
  const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

  const checkInfos = () => {
    const cpState = { ...state };
    setMessage(null);
    setCheckCardPayment(false);

    cpState.payment = clearErrors(cpState.payment);
    setState(cpState);

    const form = validForm(cpState.payment);
    if (form.valid) {
      let amount = null;
      if (command && command.totalDevisLines) {
        amount = parseFloat(command.totalDevisLines);
      } else {
        if (benefit.typeService === "forfait") {
          amount = parseFloat(deliveryMode.price);
        } else if (benefit.typeService === "devis" && benefit.priceQuote) {
          amount = parseFloat(benefit.priceQuote);
        }
      }

      if (amount) {
        if (!state.payment.acceptCommercialConditions.value) {
          msgErrors({ msg: "Veuillez accepter nos conditions commerciales." });
          cpState.payment.acceptCommercialConditions.error = true;
          setState(cpState);
        } else {
          createPaymentIntents(amount);
        }
      } else {
        msgErrors({ msg: "Montant total invalide." });
      }
    } else {
      msgErrors({ msg: "Vérifier si les champs obligatoires sont remplis." });
      cpState.payment = form.form;
      cpState.payment.acceptCommercialConditions.error =
        !state.payment.acceptCommercialConditions.value;
      setState(cpState);
    }
  };

  const createPaymentIntents = (amount) => {
    if (state.payment.paymentIntent.value) {
       saveAddresses(true);
    }else{
      setIsPending(true);
      amount = parseInt(amount * 100);
      connector({
        method: "post",
        url: `${endPoints.CREATE_PAYMENT_INTENTS}`,
        data: { amount },
        success: (response) => {
          if (response.data.status == 200) {
            const cpState = { ...state };
            cpState.payment.clientSecret.value = response.data.clientSecret;
            cpState.payment.amount.value = amount;
            setState(cpState);
            saveAddresses(true);
          } else {
            msgErrors({ msg: response.data.message });
          }
        },
        catch: (error) => {
          console.log(error);
          msgErrors({ msg: "Paiement échoué." });
        },
      });
    }
  };

  const msgErrors = (e) => {
    if (e.msg !== undefined) setMessage({ type: "error", text: e.msg });
    setIsPending(false);
    scrollTop();
  };

  return (
    <>
      <div className="left-content-detail">
        <div className="bloc-payment-step">
          {message && message.type && message.text ? (
            <span
              className={`${
                message.type === "error" ? "text-danger" : "text-success"
              } bloc-message`}
            >
              {message.text}
            </span>
          ) : (
            ""
          )}

          <div className="payment-note">
            C'est la dernière étape. Après la réservation de votre prestation,
            vous pourrez entrer en contact avec l'artisan réparateur que vous
            avez choisi via la messagerie FINGZ.
          </div>

          <div className="payment-bloc">
            <Elements stripe={stripePromise}>
              <Checkout
                checkCardPayment={checkCardPayment}
                setCheckCardPayment={setCheckCardPayment}
                command={command}
                setMessage={setMessage}
                state={state}
                setState={setState}
                savePaiement={savePaiement}
                isPending={isPending}
                setIsPending={setIsPending}
              />
            </Elements>
          </div>
          <SingleCheckbox
            {...state.payment.acceptCommercialConditions}
            onChange={(e) => {
              const cpState = { ...state };
              cpState.payment.acceptCommercialConditions.value =
                e.target.checked;
              cpState.payment.acceptCommercialConditions.error = false;
              setState(cpState);
            }}
          />
        </div>
      </div>
      <div className="right-content-detail">
        <Proposition
          textButton={
            benefit.typeService === "forfait" || defaultCommand
              ? "Valider la commande"
              : "Valider la demande de devis"
          }
          benefit={benefit}
          deliveryMode={deliveryMode}
          checkInfos={checkInfos}
          isPending={isPending}
          command={command}
        />
      </div>
    </>
  );
}
