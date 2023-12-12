import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Base from "../theme/front/base";
import { Form } from "react-bootstrap";
import { ButtonDef, Input } from "../components/ui";
import { TitlePage } from "../assets/styles/adminStyle/adminGlobalStyle";

import { ContentPageStyle } from "../assets/styles/frontGlobalStyle";
import { useSelector } from "react-redux";
import { validForm } from "../helper/form";
import connector from "../connector";
import endPoints from "../config/endPoints";

export default function Contact() {
  const [message, setMessage] = useState({ text: null, type: "" });
  const auth = useSelector((state) => state.auth);

  const [state, setState] = useState({
    email: {
      label: "Email",
      name: "email",
      placeholder: "Email",
      value: "",
      type: "text",
      error: false,
      errorMessage: "",
      required: true,
    },
    object: {
      label: "Objet",
      name: "object",
      placeholder: "Objet",
      value: "",
      type: "text",
      error: false,
      errorMessage: "",
      required: true,
    },
    message: {
      label: "Message",
      name: "message",
      placeholder: "Message ...",
      value: "",
      type: "text",
      error: false,
      errorMessage: "",
      required: true,
      as: "textarea",
    },
  });

  useEffect(() => {
    if (auth.user) {
      const cpState = { ...state };
      cpState.email.value = auth.user.email;
      setState(cpState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user]);

  const onSubmit = (e) => {
    e.preventDefault();
    setMessage({ text: null, type: "" });
    const validation = validForm(state);
    setState(validation.form);
    if (validation.valid) {
      connector({
        url: endPoints.ANONYMOUS_CONTACT,
        method: "POST",
        data: validation.rawData,
        success: (response) => {
          setMessage({
            text: "Votre demande de contact a bien été envoyée. Nous vous répondrons dans les plus brefs délais",
            type: "success",
          });
          const cpState = { ...state };
          cpState.email.value = auth.user ? auth.user.email : "";
          cpState.object.value = "";
          cpState.message.value = "";
          setState(cpState);
        },
        catch: (err) => console.log(err),
      });
    } else
      setMessage({
        text: "Vérifier si les champs obligatoires sont remplis.",
        type: "error",
      });
  };

  return (
    <Base>
      <ContentPageStyle>
        <Container>
          <div className="row">
            <div className="col-md-7">
              <TitlePage>Contact</TitlePage>

              <Form
                className="form-horizontal-default contact-formulaire"
                onSubmit={onSubmit}
              >
                {message.text ? (
                  <span
                    className={
                      message.type === "error" ? "text-danger" : "text-success"
                    }
                  >
                    {message.text}
                  </span>
                ) : null}
                <Input
                  {...state.email}
                  onChange={(e) => {
                    const cpState = { ...state };
                    cpState.email.value = e.target.value;
                    setState(cpState);
                  }}
                />
                <Input
                  {...state.object}
                  onChange={(e) => {
                    const cpState = { ...state };
                    cpState.object.value = e.target.value;
                    setState(cpState);
                  }}
                />
                <Input
                  {...state.message}
                  onChange={(e) => {
                    const cpState = { ...state };
                    cpState.message.value = e.target.value;
                    setState(cpState);
                  }}
                />

                <div className="d-flex justify-content-end mb-5">
                  <ButtonDef textButton="Envoyer" />
                </div>
              </Form>
            </div>
            <div className="col-md-4 offset-md-1">
              <TitlePage>Ou Par Téléphone</TitlePage>
              <ButtonDef
                textButton="09 70 70 47 79"
                onClick={() => window.open("tel:09 70 70 47 79")}
              />
            </div>
          </div>
        </Container>
      </ContentPageStyle>
    </Base>
  );
}
