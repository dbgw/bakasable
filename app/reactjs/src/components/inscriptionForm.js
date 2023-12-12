import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { NotificationManager } from "react-notifications";
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3";
import RadioButton from "../components/ui-elements/radioButton";
import Checkbox from "../components/ui-elements/checkBox";
import { FileBox, BtnFile } from "../assets/styles/componentStyles";
import { ButtonDef, Input } from "./ui";
import Select from "./ui-elements/select";
import endPoints from "../config/endPoints";
import { validForm, validateEmail, validatePassword } from "../helper/form";
import connector from "../connector";
import { getDigits, scrollTop, trimChar } from "../helper/functions";
import { REFRESH_TOKEN } from "../store/functions/actionTypes";
import ROUTES from "../config/routes";
import InputAddress from "../components/ui-elements/inputAddress";
import { reCaptchaKey } from "../vars";

export default function InscriptionForm({ retour = () => {}, ...props }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [message, setMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [placeIsSelected, setPlaceIsSelected] = useState(false);
  const [state, setState] = useState({
    SIRET: {
      label: "Siret",
      name: "SIRET",
      placeholder: "Siret",
      value: "",
      type: "text",
      error: false,
      errorMessage: "",
      required: true,
      autocomplete: false,
      isNumber: true,
    },
    enterprise: {
      label: "Entreprise",
      name: "enterprise",
      placeholder: "Entreprise",
      value: "",
      type: "text",
      error: false,
      errorMessage: "",
      required: true,
    },
    address: {
      label: "Adresse",
      name: "address",
      placeholder: "Adresse",
      value: "",
      type: "text",
      error: false,
      errorMessage: "",
      required: true,
      autoComplete: "false",
    },
    latitude: {
      name: "latitude",
      value: "",
    },
    longitude: {
      name: "longitude",
      value: "",
    },
    placeId: {
      name: "placeId",
      value: "",
    },
    additionalAddress: {
      label: "Complément d’adresse",
      name: "additionalAddress",
      placeholder: "Complément d’adresse",
      value: "",
      type: "text",
      error: false,
      errorMessage: "",
    },
    postalCode: {
      label: "Code postal",
      name: "postalCode",
      placeholder: "Code postal",
      value: "",
      type: "text",
      error: false,
      errorMessage: "",
      required: true,
      disabled: true,
      editable: true,
      size: 5,
      isNumber: true,
    },
    city: {
      label: "Ville",
      name: "city",
      placeholder: "Ville",
      value: "",
      type: "text",
      error: false,
      errorMessage: "",
      required: true,
      disabled: true,
      editable: true,
    },
    intraCommunityVAT: {
      label: "N° TVA intracommunautaire",
      name: "intraCommunityVAT",
      placeholder: "FR12345678912",
      value: "",
      type: "text",
      error: false,
      errorMessage: "",
      required: true,
    },
    picture: {
      label: "Photo de votre logo ou photo de profil",
      name: "picture",
      placeholder: "Insérer une photo",
      value: "",
      file: null,
      nameFile: null,
      id: "file-img",
      type: "file",
      error: false,
      errorMessage: "",
      required: false,
    },
    TypeCompany: {
      label: "Type d'entreprise",
      name: "TypeCompany",
      placeholder: "Type d'entreprise",
      height: "53px",
      value: "",
      options: [],
      className: "select-uppercase",
      required: true,
      error: false,
      errorMessage: "",
    },
    gender: {
      name: "gender",
      label: "Civilité",
      required: true,
      id: "gender",
      value: "Monsieur",
      options: [
        { value: "Monsieur", label: "Monsieur", id: "monsieur_radio" },
        { value: "Madame", label: "Madame", id: "madame_radio" },
      ],
    },
    firstName: {
      label:
        props.formType === "reparateur" ? "Prénom du représentant" : "Prénom",
      name: "firstName",
      placeholder:
        props.formType === "reparateur" ? "Prénom du représentant" : "Prénom",
      value: "",
      type: "text",
      error: false,
      errorMessage: "",
      required: true,
    },
    lastName: {
      label: "Nom",
      name: "lastName",
      placeholder: "Nom",
      value: "",
      type: "text",
      error: false,
      errorMessage: "",
      required: true,
    },
    phone: {
      label: "Téléphone",
      name: "phone",
      placeholder: "Téléphone",
      value: "",
      type: "phone",
      error: false,
      errorMessage: "",
      required: false,
    },
    email: {
      label: "Email",
      name: "email",
      placeholder: "Email",
      value: "",
      type: "email",
      error: false,
      errorMessage: "",
      required: true,
      autoComplete: "on",
      check: false,
    },
    plainPassword: {
      label: "Mot de passe",
      name: "plainPassword",
      placeholder: "Mot de passe",
      value: "",
      type: "password",
      error: false,
      errorMessage: "",
      autoComplete: "new-password",
      required: true,
      check: false,
      setType: (e) => {
        const cpState = { ...state };
        cpState.plainPassword.type = e;
        setState(cpState);
      },
    },
    passwordConfirm: {
      label: "Confirmation du mot de passe",
      name: "password",
      placeholder: "Confirmation du mot de passe",
      value: "",
      type: "password",
      error: false,
      errorMessage: "",
      autoComplete: "new-password",
      required: true,
      notice:
        "Votre mot de passe doit contenir au moins 8 caractères, 1 majuscule, 1 chiffre et 1 caractère spécial.",
      check: false,
      setType: (e) => {
        const cpState = { ...state };
        cpState.passwordConfirm.type = e;
        setState(cpState);
      },
    },
    acceptation: {
      className: "checkboxs-accept",
      options: [
        {
          value: "politique",
          checked: false,
          label: (
            <>
              j'ai lu et j'accepte
              <Link to={ROUTES.POLITIQUE_CONFIDENTIALITE.url} target="_blank">
                {" "}
                la politique de confidentialité*
              </Link>
            </>
          ),
          id: "politique_check",
        },
        {
          value: "delivrance2",
          checked: false,
          label: (
            <>
              j'ai lu et j'accepte
              <Link to={ROUTES.CGU.url} target="_blank">
                {" "}
                les conditions générales d'utilisation*
              </Link>
            </>
          ),
          id: "delivrance2_checkbox",
        },
      ],
    },
  });

  const [captcha, setCaptcha] = useState();

  useEffect(() => {
    const cpState = { ...state };
    if (props.formType === "reparateur") {
      getTypeCompanies();
    } else {
      for (const key in cpState) {
        cpState[key].required = false;
      }
      cpState.gender.required =
        cpState.firstName.required =
        cpState.lastName.required =
        cpState.email.required =
        cpState.plainPassword.required =
        cpState.passwordConfirm.required =
          true;
    }
    setState(cpState);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.formType]);

  const onSubmit = (e) => {
    e.preventDefault();
    const validation = validForm(state);
    let msg = "Vérifier si les champs obligatoires sont remplis.";
    if (validation.valid) {
      if (props.formType === "reparateur" && state.SIRET.value.length !== 14) {
        validation.valid = false;
        validation.form.SIRET.error = true;
        msg = "Le champ SIRET doit être composé de 14 chiffres";
      } else if (props.formType === "reparateur" && !placeIsSelected) {
        validation.form.address.error = true;
        validation.valid = false;
        msg = "Veuillez sélectionner une adresse dans la liste.";
      } else if (!validateEmail(state.email.value)) {
        validation.valid = false;
        validation.form.email.error = true;
        msg = "Le format du mail est incorrect";
      } else if (state.phone.value?.length && state.phone.value.length != 10) {
        validation.valid = false;
        validation.form.phone.error = true;
        msg = "Le numéro de téléphone doit contenir 10 chiffres.";
      } else if (!validatePassword(state.plainPassword.value)) {
        validation.valid = false;
        validation.form.plainPassword.error = true;
        msg =
          "Votre mot de passe doit contenir au moins 8 caractères, 1 majuscule, 1 chiffre et 1 caractère spécial.";
      } else if (state.plainPassword.value !== state.passwordConfirm.value) {
        validation.valid = false;
        validation.form.plainPassword.error =
          validation.form.passwordConfirm.error = true;
        msg = "Les mots de passe sont différents";
      } else if (
        !state.acceptation.options[0].checked ||
        !state.acceptation.options[1].checked
      ) {
        msg =
          "Veuillez accepter notre politique de confidentialité et les conditions générales d'utilisation.";
        validation.valid = false;
      }
    } else {
      if (
        props.formType === "reparateur" &&
        (validation.form.address.error ||
          validation.form.postalCode.error ||
          validation.form.city.error)
      ) {
        msg = "Veuillez sélectionner une adresse valide dans la liste.";
      }
    }
    setState(validation.form);
    if (!validation.valid) {
      scrollTop("modal");
      setMessage(msg);
      return;
    }

    setSubmitting(true);
    if (state.picture.file) {
      saveImage(validation);
    } else {
      saveUser(validation);
    }
  };

  const saveUser = (validation) => {
    let url = endPoints.USER;
    let data = {};
    if (props.formType === "reparateur") {
      url = endPoints.ANONYMOUS_USER_REPAIRMAN;
      validation.rawData.TypeCompany = `${endPoints.TYPE_COMPANY}/${validation.rawData.TypeCompany}`;
      data = validation.rawData;
    } else {
      url = endPoints.ANONYMOUS_CLIENT;
      data.firstName = validation.rawData.firstName;
      data.lastName = validation.rawData.lastName;
      data.gender = validation.rawData.gender;
      data.email = validation.rawData.email;
      data.plainPassword = validation.rawData.plainPassword;
    }
    data.captcha = captcha;
    connector({
      url,
      data,
      method: "POST",
      success: (response) => {
        setSubmitting(false);
        if (props.formType === "reparateur") {
          const cpState = { ...state };
          cpState.picture.file = null;
          cpState.picture.fileName = "";
          setState(cpState);

          NotificationManager.success(
            "Votre inscription a été effectuée avec succès, un message a été envoyé a votre boite mail.",
            ""
          );
          retour();
        } else {
          dispatch({ type: REFRESH_TOKEN, token: response.data.payload.token });
          let url = window.location.pathname.trim();
          url = trimChar(url, "/");
          const isHome = url === "";
          if (isHome) {
            history.push(ROUTES.SETTINGS.url);
          }
        }
      },
      catch: (error) => {
        setSubmitting(false);
        let msg = "Quelque chose s'est mal passé.";
        if (
          error.response?.data?.code !== undefined ||
          error.response?.status === 400
        ) {
          console.log(error);
          if (error.response.data["hydra:description"] !== undefined) {
            msg = error.response.data["hydra:description"];
          }
          setMessage(msg);
          scrollTop("modal");
        }
        if (
          validation.rawData.picture &&
          validation.rawData.picture.indexOf("/media") > -1
        ) {
          removeImage(validation.rawData.picture);
        }
      },
    });
  };

  const saveImage = (validation) => {
    const data = new FormData();
    data.append("file", state.picture.file);
    connector({
      method: "post",
      url: endPoints.ANONYMOUS_MEDIA_OBJECT,
      data,
      success: (response) => {
        validation.rawData.picture = response.data.contentUrl;
        saveUser(validation);
      },
      catch: (error) => {
        setSubmitting(false);
        let msg = "Quelque chose s'est mal passé.";
        if (
          error.response?.data?.code !== undefined ||
          error.response?.status === 400
        ) {
          console.log(error);
          if (error.response.data["hydra:description"] !== undefined) {
            msg = error.response.data["hydra:description"];
          }
          setMessage(msg);
          scrollTop("modal");
        }
      },
    });
  };

  const getTypeCompanies = () => {
    connector({
      method: "get",
      url: endPoints.TYPE_COMPANIES,
      success: (response) => {
        const arrayObj = response.data["hydra:member"] || [];
        const cpState = { ...state };
        let options = [];
        for (let i = 0; i < arrayObj.length; i++) {
          options.push({
            label: arrayObj[i].name,
            value: arrayObj[i].id,
            requireNoTva: arrayObj[i].requireNoTva,
          });
        }
        cpState.TypeCompany.options = options;
        setState(cpState);
      },
      catch: (error) => {
        console.log(error);
      },
    });
  };

  const removeImage = (image) => {
    if (image) {
      image = image.replace("/media/", "");
      connector({
        method: "delete",
        url: `${endPoints.ANONYMOUS_DELETE_MEDIA_OBJECT}/${image}`,
        success: (response) => {
          //console.log(response);
        },
        catch: (error) => {
          console.log(error);
        },
      });
    }
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");

    script.src =
      "https://www.google.com/recaptcha/api.js?render=" + reCaptchaKey;
    script.async = true;

    script.addEventListener('load', function () {
      setLoading(true);
    });

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);


  useEffect(() => {
    if(loading){
      window.grecaptcha.ready(function () {
        window.grecaptcha
          .execute(reCaptchaKey, { action: "validate_captcha" })
          .then(function (token) {
            if (token) {
              setCaptcha(token);
              console.log("token", token);
            }
          });
      });}
  }, [loading]);

  return (
    <Form className="form-inscrirs" onSubmit={onSubmit}>
      {message ? (
        <span className="error-form text-danger mb-2">{message}</span>
      ) : null}
      {props.formType === "reparateur" ? (
        <>
          <Input
            {...state.SIRET}
            onChange={(e) => {
              const cpState = { ...state };
              cpState.SIRET.value = e.target.value;
              cpState.SIRET.error = false;
              setState(cpState);
              setMessage(null);
            }}
          />
          <Input
            {...state.enterprise}
            onChange={(e) => {
              const cpState = { ...state };
              cpState.enterprise.value = e.target.value;
              cpState.enterprise.error = false;
              setState(cpState);
              setMessage(null);
            }}
          />
          <InputAddress
            state={state}
            setState={setState}
            placeIsSelected={placeIsSelected}
            setPlaceIsSelected={setPlaceIsSelected}
            message={message}
            setMessage={setMessage}
          />
          <Input
            {...state.additionalAddress}
            onChange={(e) => {
              const cpState = { ...state };
              cpState.additionalAddress.value = e.target.value;
              cpState.additionalAddress.error = false;
              setState(cpState);
              setMessage(null);
            }}
          />
          <Input
            {...state.postalCode}
            onChange={(e) => {
              const cpState = { ...state };
              cpState.postalCode.value = e.target.value;
              cpState.postalCode.error = false;
              setState(cpState);
              setMessage(null);
            }}
          />
          <Input
            {...state.city}
            onChange={(e) => {
              const cpState = { ...state };
              cpState.city.value = e.target.value;
              cpState.city.error = false;
              setState(cpState);
              setMessage(null);
            }}
          />
          <FileBox>
            <div className="form-group">
              {state.picture.label ? (
                <label>{state.picture.label}</label>
              ) : null}
              <div className="file-wrapper">
                <input
                  type="file"
                  name="picture"
                  id="file-img"
                  accept="image/png, image/jpeg"
                  onChange={(e) => {
                    if (e?.target?.files[0]?.name) {
                      //e.preventDefault();
                      const cpState = { ...state };
                      cpState.picture.nameFile = e.target.files[0].name;
                      cpState.picture.file = e.target.files[0];
                      cpState.picture.error = false;
                      //e.target.value = "";
                      setState(cpState);
                      setMessage(null);
                    }
                  }}
                  className="inputfile"
                />
                <BtnFile htmlFor="file-img">Parcourir</BtnFile>
              </div>
            </div>
          </FileBox>
          <Select
            {...state.TypeCompany}
            onChange={(e) => {
              const cpState = { ...state };
              cpState.TypeCompany.value = e.value;
              cpState.TypeCompany.error = false;
              cpState.intraCommunityVAT.required = e.requireNoTva;
              if (!e.requireNoTva) {
                cpState.intraCommunityVAT.error = false;
              }
              setState(cpState);
              setMessage(null);
            }}
          />
          <Input
            {...state.intraCommunityVAT}
            onChange={(e) => {
              const cpState = { ...state };
              cpState.intraCommunityVAT.value = e.target.value;
              cpState.intraCommunityVAT.error = false;
              setState(cpState);
              setMessage(null);
            }}
          />
        </>
      ) : null}
      <RadioButton
        {...state.gender}
        onChange={(val) => {
          const cpState = { ...state };
          cpState.gender.value = val.value;
          cpState.gender.error = false;
          setState(cpState);
          setMessage(null);
        }}
      />
      <Input
        {...state.lastName}
        onChange={(e) => {
          const cpState = { ...state };
          cpState.lastName.value = e.target.value;
          cpState.lastName.error = false;
          setState(cpState);
          setMessage(null);
        }}
      />
      <Input
        {...state.firstName}
        onChange={(e) => {
          const cpState = { ...state };
          cpState.firstName.value = e.target.value;
          cpState.firstName.error = false;
          setState(cpState);
          setMessage(null);
        }}
      />
      {props.formType === "reparateur" ? (
        <>
          <Input
            {...state.phone}
            onChange={(e) => {
              const cpState = { ...state };
              cpState.phone.value = getDigits(e.target.value);
              cpState.phone.error = false;
              setState(cpState);
              setMessage(null);
            }}
          />
        </>
      ) : null}
      <Input
        {...state.email}
        onChange={(e) => {
          const cpState = { ...state };
          cpState.email.value = e.target.value;
          cpState.email.error = false;
          setState(cpState);
          setMessage(null);
        }}
      />
      <Input
        className="password-input"
        {...state.plainPassword}
        onChange={(e) => {
          const cpState = { ...state };
          cpState.plainPassword.value = e.target.value;
          cpState.plainPassword.error = false;
          setState(cpState);
          setMessage(null);
        }}
      />
      <Input
        className="password-input"
        {...state.passwordConfirm}
        onChange={(e) => {
          const cpState = { ...state };
          cpState.passwordConfirm.value = e.target.value;
          cpState.passwordConfirm.error = false;
          setState(cpState);
          setMessage(null);
        }}
      />
      <Checkbox
        {...state.acceptation}
        onChange={(e) => {
          const cpState = { ...state };
          cpState.acceptation.options = e;
          cpState.acceptation.error = false;
          setState(cpState);
          setMessage(null);
        }}
      />
      {/* <GoogleReCaptcha
          onVerify={(token) => {
            if (token) {
              setCaptcha(token);
            }
          }}
        /> */}
      <ButtonDef
        spinner={submitting}
        textButton={
          props.formType === "reparateur"
            ? "Demande d'inscription"
            : "Inscription"
        }
        className="btn-form-def"
      />
    </Form>
  );
}
