import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Proposition from "../../../components/proposition";
import { Input, SingleCheckbox } from "../../../components/ui";
import { scrollTop } from "../../../helper/functions";
import { clearErrors, validForm } from "../../../helper/form";
import { newObject, distanceTwoPoints } from "../../../helper/functions";
import InputAddress from "../../../components/ui-elements/inputAddress";

export default function AdresseStep({
  benefit = {},
  deliveryMode = {},
  activeIndex,
  setActiveIndex,
  state,
  setState,
  isPending = false,
  setIsPending,
  ...props
}) {
  const [message, setMessage] = useState(null);

  const checkInfos = () => {
    let msg = null;
    const cpState = { ...state };
    setMessage(null);
    cpState.invoice = clearErrors(newObject(cpState.invoice));
    cpState.delivery = clearErrors(newObject(cpState.delivery));
    setState(cpState);

    const formInvoice = validForm(cpState.invoice);
    const formDelivery = validForm(cpState.delivery);

    if (formInvoice.valid && formDelivery.valid) {
      if (
        cpState.invoice.placeIsSelected.value &&
        (state.invoice.sameAsInvoice.value ||
          cpState.delivery.placeIsSelected.value)
      ) {
        const p0 = {
          latitude: benefit.user.latitude,
          longitude: benefit.user.longitude,
        };
        const p1 = {
          latitude: cpState.invoice.latitude.value,
          longitude: cpState.invoice.longitude.value,
        };
        const p2 = {
          latitude: cpState.delivery.latitude.value,
          longitude: cpState.delivery.longitude.value,
        };

        const distanceI = distanceTwoPoints(p0, p1);
        const distanceD = distanceTwoPoints(p0, p2);

        const isValidDistanceInvoice =
          distanceI && deliveryMode.distance >= distanceI;
        const isValidDistanceDelivery =
          state.invoice.sameAsInvoice.value ||
          (distanceD && deliveryMode.distance >= distanceD);

        if (
          !deliveryMode.radius ||
          (isValidDistanceInvoice && isValidDistanceDelivery)
        ) {
          setActiveIndex(activeIndex + 1);
          return;
        } else {
          msg = `Veuillez sélectionner une adresse valide qui respecte le rayon kilométrique ${
            deliveryMode.distance ? `(${deliveryMode.distance} km)` : ""
          } proposé par le réparateur pour ce mode de délivrance.`;
          cpState.invoice.address.error = !isValidDistanceInvoice;
          cpState.delivery.address.error = !isValidDistanceDelivery;
        }
      } else {
        msg = "Veuillez sélectionner une adresse valide dans la liste.";
        cpState.invoice.address.error = !cpState.invoice.placeIsSelected.value;
        if (!state.invoice.sameAsInvoice.value) {
          cpState.delivery.address.error =
            !cpState.delivery.placeIsSelected.value;
        }
      }
    } else {
      msg = "Vérifier si les champs obligatoires sont remplis.";
      cpState.invoice = formInvoice.form;
      if (!state.invoice.sameAsInvoice.value) {
        cpState.delivery = formDelivery.form;
      }
    }
    msgErrors({ msg });
    setState(cpState);
  };

  const msgErrors = (e) => {
    if (e.msg !== undefined) setMessage({ type: "error", text: e.msg });
    scrollTop();
  };

  return (
    <>
      <div className="left-content-detail">
        <div className="bloc-adresse-step">
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

          <div className="bloc-addresse-facture">
            <h1 className="title-step-tunnel">Adresse de facturation</h1>
            <Row>
              <Col md={6}>
                <Input
                  {...state.invoice.lastName}
                  onChange={(e) => {
                    const cpState = { ...state };
                    cpState.invoice.lastName.value = e.target.value;
                    cpState.invoice.lastName.error = false;
                    setState(cpState);
                    setMessage(null);
                  }}
                />
              </Col>
              <Col md={6}>
                <Input
                  {...state.invoice.firstName}
                  onChange={(e) => {
                    const cpState = { ...state };
                    cpState.invoice.firstName.value = e.target.value;
                    cpState.invoice.firstName.error = false;
                    setState(cpState);
                    setMessage(null);
                  }}
                />
              </Col>
              <Col md={6}>
                <InputAddress
                  state={state.invoice}
                  setState={(invoice) => setState({ ...state, invoice })}
                  placeIsSelected={state.invoice.placeIsSelected.value}
                  setPlaceIsSelected={(val) => {
                    const cpState = { ...state };
                    cpState.invoice.placeIsSelected.value = val;
                    setState(cpState);
                  }}
                  message={message}
                  setMessage={setMessage}
                />
              </Col>
              <Col md={6}>
                <Input
                  {...state.invoice.additionalAddress}
                  onChange={(e) => {
                    const cpState = { ...state };
                    cpState.invoice.additionalAddress.value = e.target.value;
                    cpState.invoice.additionalAddress.error = false;
                    setState(cpState);
                    setMessage(null);
                  }}
                />
              </Col>
              <Col md={6}>
                <Input
                  {...state.invoice.postalCode}
                  onChange={(e) => {
                    const cpState = { ...state };
                    cpState.invoice.postalCode.value = e.target.value;
                    cpState.invoice.postalCode.error = false;
                    setState(cpState);
                    setMessage(null);
                  }}
                />
              </Col>
              <Col md={6}>
                <Input
                  {...state.invoice.city}
                  onChange={(e) => {
                    const cpState = { ...state };
                    cpState.invoice.city.value = e.target.value;
                    cpState.invoice.city.error = false;
                    setState(cpState);
                    setMessage(null);
                  }}
                />
              </Col>
            </Row>
          </div>
          {deliveryMode?.deliveryModeType?.requireDeliveryAddress && (
            <div className="bloc-addresse-livraison">
              <h1 className="title-step-tunnel">Adresse de livraison</h1>
              <p className="sub-title-step-tunnel">
                Votre adresse de livraison est nécessaire pour le mode de
                délivrance choisi.
              </p>
              <SingleCheckbox
                {...state.invoice.sameAsInvoice}
                onChange={(e) => {
                  const cpState = { ...state };
                  cpState.invoice.sameAsInvoice.value = e.target.checked;
                  cpState.invoice.sameAsInvoice.error = false;
                  setState(cpState);
                  setMessage(null);
                }}
              />
              <Row>
                {!state.invoice.sameAsInvoice.value && (
                  <>
                    <Col md={6}>
                      <Input
                        {...state.delivery.lastName}
                        onChange={(e) => {
                          const cpState = { ...state };
                          cpState.delivery.lastName.value = e.target.value;
                          cpState.delivery.lastName.error = false;
                          setState(cpState);
                          setMessage(null);
                        }}
                      />
                    </Col>
                    <Col md={6}>
                      <Input
                        {...state.delivery.firstName}
                        onChange={(e) => {
                          const cpState = { ...state };
                          cpState.delivery.firstName.value = e.target.value;
                          cpState.delivery.firstName.error = false;
                          setState(cpState);
                          setMessage(null);
                        }}
                      />
                    </Col>
                    <Col md={6}>
                      <InputAddress
                        state={state.delivery}
                        setState={(delivery) =>
                          setState({ ...state, delivery })
                        }
                        placeIsSelected={state.delivery.placeIsSelected.value}
                        setPlaceIsSelected={(val) => {
                          const cpState = { ...state };
                          cpState.delivery.placeIsSelected.value = val;
                          setState(cpState);
                        }}
                        message={message}
                        setMessage={setMessage}
                      />
                    </Col>
                    <Col md={6}>
                      <Input
                        {...state.delivery.additionalAddress}
                        onChange={(e) => {
                          const cpState = { ...state };
                          cpState.delivery.additionalAddress.value =
                            e.target.value;
                          cpState.delivery.additionalAddress.error = false;
                          setState(cpState);
                          setMessage(null);
                        }}
                      />
                    </Col>
                    <Col md={6}>
                      <Input
                        {...state.delivery.postalCode}
                        onChange={(e) => {
                          const cpState = { ...state };
                          cpState.delivery.postalCode.value = e.target.value;
                          cpState.delivery.postalCode.error = false;
                          setState(cpState);
                          setMessage(null);
                        }}
                      />
                    </Col>
                    <Col md={6}>
                      <Input
                        {...state.delivery.city}
                        onChange={(e) => {
                          const cpState = { ...state };
                          cpState.delivery.city.value = e.target.value;
                          cpState.delivery.city.error = false;
                          setState(cpState);
                          setMessage(null);
                        }}
                      />
                    </Col>
                  </>
                )}

                <Col md={12}>
                  <Input
                    {...state.noteLivreur}
                    onChange={(e) => {
                      const cpState = { ...state };
                      cpState.noteLivreur.value = e.target.value;
                      cpState.noteLivreur.error = false;
                      setState(cpState);
                      setMessage(null);
                    }}
                  />
                </Col>
              </Row>
            </div>
          )}
        </div>
      </div>
      <div className="right-content-detail">
        <Proposition
          benefit={benefit}
          deliveryMode={deliveryMode}
          checkInfos={checkInfos}
          isPending={isPending}
        />
      </div>
    </>
  );
}
