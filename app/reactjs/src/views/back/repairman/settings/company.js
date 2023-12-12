import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { ButtonDef, Input } from "../../../../components/ui";
import { validForm } from "../../../../helper/form";
import { getMsgError, scrollTop } from "../../../../helper/functions";
import connector from "../../../../connector";
import endPoints from "../../../../config/endPoints";
import { useSelector } from "react-redux";
import InputAddressBilling from "../../../../components/ui-elements/inputAddressBilling";

export default function Company({ user }) {
  const auth = useSelector((store) => store.auth);
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState({ text: null, type: "" });
  const [state, setState] = useState({
    TypeCompany: {
      label: "Type d'entreprise",
      name: "TypeCompany",
      placeholder: "Type d'entreprise",
      height: "53px",
      value: "",
      disabled: true,
      className: "select-uppercase",
      required: true,
      error: false,
      errorMessage: "",
    },
    SIRET: {
      label: "N° Siret",
      name: "SIRET",
      placeholder: "N° Siret",
      value: "",
      disabled: true,
      type: "text",
      error: false,
      errorMessage: "",
      required: true,
    },
    intraCommunityVAT: {
      label: "N° TVA intracommunautaire",
      name: "intraCommunityVAT",
      placeholder: "FR12345678912",
      value: "",
      disabled: true,
      type: "text",
      error: false,
      errorMessage: "",
    },
    addressBilling: {
      label: "Adresse de facturation",
      name: "addressBilling",
      placeholder: "Adresse de facturation",
      value: "",
      type: "text",
      error: false,
      errorMessage: "",
      required: true,
      autoComplete: "false",
    },
    latitudeBilling: {
      name: "latitudeBilling",
      value: "",
    },
    longitudeBilling: {
      name: "longitudeBilling",
      value: "",
    },
    placeIdBilling: {
      name: "placeIdBilling",
      value: "",
    },
    additionalAddressBilling: {
      label: "Complément d’adresse",
      name: "additionalAddressBilling",
      placeholder: "Complément d’adresse",
      value: "",
      type: "text",
      error: false,
      errorMessage: "",
    },
    postalCodeBilling: {
      label: "Code postal",
      name: "postalCodeBilling",
      placeholder: "Code postal",
      value: "",
      type: "text",
      error: false,
      errorMessage: "",
      required: true,
      disabled: true,
      editable: true,
      empty: true,
      size: 5,
      isNumber: true,
    },
    cityBilling: {
      name: "cityBilling",
      label: "Ville",
      placeholder: "Ville",
      value: "",
      type: "text",
      error: false,
      errorMessage: "",
      required: true,
      disabled: true,
      editable: true,
    },
  });
  const [placeBillingIsSelected, setPlaceBillingIsSelected] = useState(false);

  useEffect(() => {
    if (user) {
      const cpState = { ...state };
      for (const key in user) {
        if (cpState[key]) {
          if (key === "TypeCompany") {
            cpState[key].value = user[key].id ? user[key].name : "";
            cpState.intraCommunityVAT.required =
              user[key].name == "Auto-Entrepreneur" ? false : true;
          } else {
            cpState[key].value = user[key];
          }
        }
      }

      if (!cpState.intraCommunityVAT.value) {
        cpState.intraCommunityVAT.disabled = false;
      }

      if (cpState.addressBilling.value) {
        setPlaceBillingIsSelected(true);
      }

      setState(cpState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    scrollTop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message.text, message.type]);

  const saveCompany = (e) => {
    e.preventDefault();
    if (!isPending) {
      setMessage({ ...message, text: null });
      const validation = validForm(state);

      if (!placeBillingIsSelected) {
        setMessage({
          text: "Veuillez sélectionner une adresse de facturation dans la liste.",
          type: "error",
        });
        validation.form.addressBilling.error = true;
        setState(validation.form);
        return;
      } else if (
        validation.form.addressBilling.error ||
        validation.form.postalCodeBilling.error ||
        validation.form.cityBilling.error
      ) {
        setState(validation.form);
        setMessage({
          text: "Veuillez sélectionner une adresse facturation valide dans la liste.",
          type: "error",
        });
        return;
      }
      if (
        validation.form.postalCodeBilling.error ||
        state.postalCodeBilling.value.length !== 5
      ) {
        setMessage({
          text: "Le code postal doit contenir 5 chiffres",
          type: "error",
        });
        validation.form.postalCodeBilling.error = true;
        setState(validation.form);
        return;
      }
      setState(validation.form);
      if (!validation.valid) {
        setMessage({
          text: "Veuillez renseigner les champs obligatoires.",
          type: "error",
        });
        return;
      }
      setIsPending(true);
      connector({
        method: "put",
        url: `${endPoints.USER}/${auth.user.id}/repairman`,
        data: validation.rawData,
        success: (response) => {
          let text = "Vos modifications ont bien été prises en compte.";
          setMessage({ ...message, text, type: "success" });
          setIsPending(false);
        },
        catch: (error) => {
          setMessage({ ...message, text: getMsgError(error), type: "error" });
          setIsPending(false);
        },
      });
    }
  };

  return (
    <>
      <div className="bloc-form-horizontal-default">
        <div className="bloc-default-form-horizontal">
          <h2 className="titre-form-horizontal">
            Mes informations professionnelles
          </h2>
          <p>
            Lorem ipsum - L’ensemble de ces informations apparaîtront sur vos
            devis
          </p>
        </div>
      </div>
      <Form className="form-horizontal-default">
        {message.text ? (
          <span
            className={
              message.type === "error" ? "text-danger" : "text-success"
            }
          >
            {message.text}
          </span>
        ) : (
          ""
        )}
        <Input
          {...state.SIRET}
          onChange={(e) => {
            const cpState = { ...state };
            cpState.SIRET.value = e.target.value;
            cpState.SIRET.error = false;
            setState(cpState);
          }}
        />
        <Input
          {...state.TypeCompany}
          onChange={(e) => {
            const cpState = { ...state };
            cpState.TypeCompany.value = e.target.value;
            cpState.TypeCompany.error = false;
            setState(cpState);
          }}
        />
        <Input
          {...state.intraCommunityVAT}
          onChange={(e) => {
            const cpState = { ...state };
            cpState.intraCommunityVAT.value = e.target.value;
            cpState.intraCommunityVAT.error = false;
            setState(cpState);
          }}
        />
        <InputAddressBilling
          state={state}
          setState={setState}
          placeIsSelected={placeBillingIsSelected}
          setPlaceIsSelected={setPlaceBillingIsSelected}
          message={message.text}
          setMessage={(e) => {
            setMessage({ ...message, text: null });
          }}
        />
        <Input
          {...state.additionalAddressBilling}
          onChange={(e) => {
            const cpState = { ...state };
            cpState.additionalAddressBilling.value = e.target.value;
            cpState.additionalAddressBilling.error = false;
            setState(cpState);
          }}
        />
        <Input
          {...state.postalCodeBilling}
          onChange={(e) => {
            const cpState = { ...state };
            if (e.target.value.length <= 5)
              cpState.postalCodeBilling.value = e.target.value;
            cpState.postalCodeBilling.error = false;
            setState(cpState);
          }}
        />
        <Input
          {...state.cityBilling}
          onChange={(e) => {
            const cpState = { ...state };
            cpState.cityBilling.value = e.target.value;
            cpState.cityBilling.error = false;
            setState(cpState);
          }}
        />
        <div className="btns-alings">
          <ButtonDef
            textButton="Enregistrer"
            spinner={isPending}
            onClick={saveCompany}
          />
        </div>
      </Form>
    </>
  );
}
