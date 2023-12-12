import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FormLogin } from "../../../assets/styles/componentStyles";
import { ButtonDef, Input } from "../../../components/ui";
import { validForm } from "../../../helper/form";
import connector from "../../../connector";
import endPoints from "../../../config/endPoints";

export default function Forgotpassword({ retour = () => {} }) {
  const [submitting] = useState(false);
  const [done, setDone] = useState(false);
  const [message, setMessage] = useState(null);
  const [state, setState] = useState({
    email: {
      label: "Email",
      name: "email",
      placeholder: "Email",
      value: "",
      type: "email",
      error: false,
      errorMessage: "",
      autocomplete: "username",
      required: true,
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    setMessage(null);
    setDone(false);
    const validation = validForm(state);
    setState(validation.form);
    if (!validation.valid) {
      setMessage("Ce champs est obligatoire");
      return;
    }
    connector({
      url: endPoints.FORGOT_PASSWORD,
      method: "post",
      data: validation.rawData,
      success: (response) => {
        if (response.data.status === "send") setDone(true);
        else if (response.data.noAccount)
          setMessage("Cet email ne dispose d’aucun compte sur notre site.");
      },
      catch: (err) => console.log(err),
    });
  };
  return (
    <>
      {done && (
        <div className="message-confirmation">
          <p className="titre-message-confirm">
            UN NOUVEAU MOT DE PASSE VIENT DE VOUS ÊTRE ENVOYÉ
          </p>
          <div className="desc-message-confirm">
            Vous devriez recevoir un email contenant votre nouveau mot de passe.
            Vous pouvez désormais vous connecter sur votre compte en
            l’utilisant.
          </div>
        </div>
      )}
      <FormLogin onSubmit={onSubmit}>
        {message ? <span className="error-form">{message}</span> : null}
        <Input
          {...state.email}
          onChange={(e) => {
            const cpState = { ...state };
            cpState.email.value = e.target.value;
            setState(cpState);
            setMessage(null);
          }}
        />
        <ButtonDef
          textButton="Envoyer"
          className="btn-form-def"
          spinner={submitting}
        />
        <div className="footer-modal">
          Déjà sur Fingz?{" "}
          <Link to={"#"} onClick={retour}>
            Connectez-vous
          </Link>
        </div>
      </FormLogin>
    </>
  );
}
