import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Nav, Tab } from "react-bootstrap";
import {
  ContainePageSimple,
  TitlePage,
  SettingTabs,
} from "../../../assets/styles/adminStyle/adminGlobalStyle";
import { ButtonDef, Input } from "../../../components/ui";
import RadioButton from "../../../components/ui-elements/radioButton";
import AdminBase from "../../../theme/back/adminBase";
import endPoints from "../../../config/endPoints";
import connector from "../../../connector";
import { clearErrors, validForm } from "../../../helper/form";
import { REFRESH_TOKEN, SET_USER } from "../../../store/functions/actionTypes";
import Company from "../repairman/settings/company";
import { getDigits, getMsgError, scrollTop } from "../../../helper/functions";
import { ROLES } from "../../../vars";
import Myadresses from "../client/settings/myadresses";

export default function Settings() {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const [user, setUser] = useState(false);
  const [message, setMessage] = useState({
    profile: {},
    password: {},
  });
  const [isPending, setIsPending] = useState(false);
  const [stateProfile, setStateProfile] = useState({
    gender: {
      label: "Civilité",
      name: "gender",
      required: true,
      id: "civilite",
      value: "",
      options: [
        { value: "Monsieur", label: "Monsieur", id: "monsieur_radio" },
        { value: "Madame", label: "Madame", id: "madame_radio" },
      ],
    },
    firstName: {
      label: "Prénom",
      name: "firstName",
      placeholder: "Prénom",
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
      type: "tel",
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
    },
  });
  const [statePassword, setStatePassword] = useState({
    currentPassword: {
      label: "Mot de passe actuel",
      name: "currentPassword",
      value: "",
      type: "password",
      error: false,
      errorMessage: "",
      autocomplete: "new-password",
      required: true,
      setType: (e) => {
        const cpState = { ...statePassword };
        cpState.currentPassword.type = e;
        setStatePassword(cpState);
      },
    },
    plainPassword: {
      label: "Mot de passe",
      name: "plainPassword",
      value: "",
      type: "password",
      error: false,
      errorMessage: "",
      autocomplete: "new-password",
      required: true,
      setType: (e) => {
        const cpState = { ...statePassword };
        cpState.plainPassword.type = e;
        setStatePassword(cpState);
      },
    },
    confirmPassword: {
      label: "Confirmation du mot de passe",
      name: "confirmPassword",
      value: "",
      type: "password",
      error: false,
      errorMessage: "",
      autocomplete: "new-password",
      required: true,
      notice:
        "Votre mot de passe doit contenir au moins 8 caractères, 1 majuscule, 1 chiffre et 1 caractère spécial.",
      setType: (e) => {
        const cpState = { ...statePassword };
        cpState.confirmPassword.type = e;
        setStatePassword(cpState);
      },
    },
  });

  useEffect(() => {
    if (auth.user) {
      const cpStateProfile = { ...stateProfile };
      let url = "";
      switch (auth.roles[0]) {
        case ROLES.ROLE_REPAIRMAN:
          url = `${endPoints.USER}/${auth.user.id}/repairman`;
          break;
        case ROLES.ROLE_CLIENT:
          url = `${endPoints.USER}/${auth.user.id}/client`;
          break;
        case ROLES.ROLE_ADMIN:
          url = `${endPoints.USER}/${auth.user.id}/admin`;
          break;
        default:
          url = `${endPoints.USER}/${auth.user.id}/client`;
          break;
      }
      connector({
        method: "get",
        url: url,
        success: (response) => {
          setUser(response.data);
          for (const key in response.data) {
            if (cpStateProfile[key]) {
              cpStateProfile[key].value = response.data[key];
            }
          }
          setStateProfile(cpStateProfile);
        },
        catch: (error) => {
          console.log(error);
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.roles, auth.user]);

  const saveProfile = (e) => {
    e.preventDefault();
    if (!isPending) {
      setIsPending(true);
      setMessage({ ...message, profile: {} });
      setStateProfile(clearErrors(stateProfile));

      const form = validForm(stateProfile);
      setStateProfile(form.form);

      if (form.form.phone.value?.length && form.form.phone.value.length != 10) {
        msg({
          name: "profile",
          type: "error",
          text: "Le numéro de téléphone doit contenir 10 chiffres.",
        });
        form.form.phone.error = true;
        setStateProfile(form.form);
        return;
      }
      if (form.valid) {
        submitUser({ ...form, name: "profile" });
      } else {
        msg({
          name: "profile",
          type: "error",
          text: "Veuillez renseigner les champs obligatoires.",
        });
        setStateProfile(form.form);
      }
    }
  };

  const savePassword = (e) => {
    e.preventDefault();
    if (!isPending) {
      setIsPending(true);
      setMessage({ ...message, password: {} });
      setStatePassword(clearErrors(statePassword));

      const form = validForm(statePassword);

      const plainPassword = statePassword.plainPassword.value;
      const confirmPassword = statePassword.confirmPassword.value;

      if (form.valid && plainPassword === confirmPassword) {
        submitUser({ ...form, name: "password" });
      } else {
        let text = "Veuillez renseigner les champs obligatoires";
        if (plainPassword && form.form.plainPassword.error) {
          text = "Veuillez respecter les conditions du mot de passe";
        } else if (plainPassword !== confirmPassword) {
          text = "Le mot de passe et sa confirmation ne sont pas identique";
          form.form.confirmPassword.error = true;
        }
        msg({
          name: "password",
          type: "error",
          text,
        });
        setStatePassword(form.form);
      }
    }
  };

  const submitUser = (form) => {
    let url = "";
    switch (auth.roles[0]) {
      case ROLES.ROLE_REPAIRMAN:
        url = `${endPoints.USER}/${auth.user.id}/repairman`;
        break;
      case ROLES.ROLE_CLIENT:
        url = `${endPoints.USER}/${auth.user.id}/client`;
        break;
      case ROLES.ROLE_ADMIN:
        url = `${endPoints.USER}/${auth.user.id}/admin`;
        break;

      default:
        url = `${endPoints.USER}/${auth.user.id}/client`;
        break;
    }
    connector({
      method: "put",
      url: url,
      data: form.rawData,
      success: (response) => {
        let text = "Vos modifications ont bien été prises en compte.";
        if (form.name === "password") {
          text = "Votre mot de passe a été réinitialisé.";
          const cpState = { ...statePassword };
          cpState.currentPassword.value = "";
          cpState.plainPassword.value = "";
          cpState.confirmPassword.value = "";
          setStatePassword(cpState);
        }
        msg({ name: form.name, type: "success", text });

        if (
          (form.name === "profile" &&
            auth.user.email !== stateProfile.email.value) ||
          form.name === "password"
        ) {
          dispatch({
            type: REFRESH_TOKEN,
            token: response.data.payload.token,
            refresh_token: response.data.payload.refresh_token,
          });
        }

        if (form.name === "profile") {
          dispatch({
            type: SET_USER,
            user: {
              ...auth.user,
              firstName: response.data.firstName,
              lastName: response.data.lastName,
              email: response.data.email,
            },
          });
        }
      },
      catch: (error) => {
        msg({ name: form.name, type: "error", text: getMsgError(error) });
      },
    });
  };

  const msg = (obj) => {
    setIsPending(false);
    if (obj.name !== undefined) {
      if (obj.name === "profile") scrollTop();
      const cpMessage = { ...message };
      cpMessage[obj.name] = { type: obj.type, text: obj.text };
      setMessage(cpMessage);
      if (obj.type === "success") {
        setTimeout(() => {
          const cpMessage = { ...message };
          cpMessage[obj.name] = {};
          setMessage(cpMessage);
        }, 5000);
      }
    }
  };

  return (
    <AdminBase noSide={true}>
      <ContainePageSimple>
        <TitlePage>Paramètres</TitlePage>
        <SettingTabs>
          <Tab.Container defaultActiveKey="profil">
            <Nav variant="pills">
              <Nav.Item>
                <Nav.Link eventKey="profil">Mon Profil</Nav.Link>
              </Nav.Item>
              {auth.roles.includes(ROLES.ROLE_REPAIRMAN) && (
                <Nav.Item>
                  <Nav.Link eventKey="socite">Ma société</Nav.Link>
                </Nav.Item>
              )}
              {auth.roles.includes(ROLES.ROLE_CLIENT) && (
                <Nav.Item>
                  <Nav.Link eventKey="addresses">Mes adresses</Nav.Link>
                </Nav.Item>
              )}
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="profil">
                <div className="bloc-form-horizontal-default">
                  <div className="bloc-default-form-horizontal">
                    <h2 className="titre-form-horizontal">
                      Mes informations personnelles
                    </h2>
                  </div>
                </div>
                <Form
                  className="form-horizontal-default"
                  onSubmit={saveProfile}
                >
                  {message && message?.profile?.type && message.profile.text ? (
                    <span
                      className={
                        message.profile.type === "error"
                          ? "text-danger"
                          : "text-success"
                      }
                    >
                      {message.profile.text}
                    </span>
                  ) : (
                    ""
                  )}
                  <RadioButton
                    {...stateProfile.gender}
                    onChange={(val) => {
                      const cpState = { ...stateProfile };
                      cpState.gender.value = val.value;
                      setStateProfile(cpState);
                      setMessage({ ...message, profile: {} });
                    }}
                  />
                  <Input
                    {...stateProfile.lastName}
                    onChange={(e) => {
                      const cpState = { ...stateProfile };
                      cpState.lastName.value = e.target.value;
                      setStateProfile(cpState);
                      setMessage({ ...message, profile: {} });
                    }}
                  />
                  <Input
                    {...stateProfile.firstName}
                    onChange={(e) => {
                      const cpState = { ...stateProfile };
                      cpState.firstName.value = e.target.value;
                      setStateProfile(cpState);
                      setMessage({ ...message, profile: {} });
                    }}
                  />
                  <Input
                    {...stateProfile.email}
                    onChange={(e) => {
                      const cpState = { ...stateProfile };
                      cpState.email.value = e.target.value;
                      setStateProfile(cpState);
                      setMessage({ ...message, profile: {} });
                    }}
                  />
                  {auth.roles.includes(ROLES.ROLE_REPAIRMAN) && (
                    <Input
                      {...stateProfile.phone}
                      onChange={(e) => {
                        const cpState = { ...stateProfile };
                        cpState.phone.value = getDigits(e.target.value);
                        setStateProfile(cpState);
                        setMessage({ ...message, profile: {} });
                      }}
                    />
                  )}

                  <div className="btns-alings">
                    <ButtonDef textButton="Enregistrer" spinner={isPending} />
                  </div>
                </Form>

                <div className="bloc-form-horizontal-default">
                  <div className="bloc-default-form-horizontal">
                    <h2 className="titre-form-horizontal">
                      Modification du mot de passe
                    </h2>
                  </div>
                </div>
                <Form
                  className="form-horizontal-default"
                  onSubmit={savePassword}
                >
                  {message &&
                  message?.password?.type &&
                  message.password.text ? (
                    <span
                      className={
                        message.password.type === "error"
                          ? "text-danger"
                          : "text-success"
                      }
                    >
                      {message.password.text}
                    </span>
                  ) : (
                    ""
                  )}
                  <Input
                    className="password-input"
                    {...statePassword.currentPassword}
                    onChange={(e) => {
                      const cpState = { ...statePassword };
                      cpState.currentPassword.value = e.target.value;
                      setStatePassword(cpState);
                      setMessage({ ...message, password: {} });
                    }}
                  />
                  <Input
                    className="password-input"
                    {...statePassword.plainPassword}
                    onChange={(e) => {
                      const cpState = { ...statePassword };
                      cpState.plainPassword.value = e.target.value;
                      setStatePassword(cpState);
                      setMessage({ ...message, password: {} });
                    }}
                  />
                  <Input
                    className="password-input"
                    {...statePassword.confirmPassword}
                    onChange={(e) => {
                      const cpState = { ...statePassword };
                      cpState.confirmPassword.value = e.target.value;
                      setStatePassword(cpState);
                      setMessage({ ...message, password: {} });
                    }}
                  />
                  <div className="btns-alings">
                    <ButtonDef textButton="Enregistrer" spinner={isPending} />
                  </div>
                </Form>
              </Tab.Pane>

              {auth.roles.includes(ROLES.ROLE_REPAIRMAN) && (
                <Tab.Pane eventKey="socite">
                  <Company user={user} />
                </Tab.Pane>
              )}

              {auth.roles.includes(ROLES.ROLE_CLIENT) && (
                <Tab.Pane eventKey="addresses">
                  <Myadresses user={user} />
                </Tab.Pane>
              )}
            </Tab.Content>
          </Tab.Container>
        </SettingTabs>
      </ContainePageSimple>
    </AdminBase>
  );
}
