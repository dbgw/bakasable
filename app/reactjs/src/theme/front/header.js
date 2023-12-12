import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useSelector, useDispatch } from "react-redux";
import { NotificationManager } from "react-notifications";
import { Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import logoFingz from "../../assets/images/logo.svg";
import ButtonDef from "../../components/ui-elements/buttonDef";
import {
  LogoHeader,
  HeaderDefault,
  HeaderTop,
  BlocMenuNav,
  MenuNav,
  LinNavkItem,
  LoginBtns,
  MenuMobile,
} from "../../assets/styles/frontGlobalStyle";
import NavbarUniverses from "./navbarUniverses";
import PopinModal from "../../components/ui-elements/popinModal";
import Input from "../../components/ui-elements/input";
import ROUTES from "../../config/routes";
import endPoints from "../../config/endPoints";
import { clearErrors } from "../../helper/form";
import connector from "../../connector";
import * as vars from "../../vars";
import * as actionTypes from "../../store/functions/actionTypes";
import { FormLogin } from "../../assets/styles/componentStyles";
import InscriptionForm from "../../components/inscriptionForm";
import AdminSideNav from "../back/adminSideNav";
import { ClientIcon, ReparateurIcon } from "../../assets/styles/icons";
import Forgotpassword from "../../views/back/auth/forgotpassword";
import { validateEmail, validatePassword } from "../../helper/form";
import { ROLES, LINK_EXTERNAL_WhoAreWe } from "../../vars";
import Navbar from "../back/navBar";
import { useOutsideAlerter } from "../../helper/events";

export default function Header() {
  const history = useHistory();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1199px)" });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1200px)",
  });
  const [click, setClick] = useState(false);
  const toggle = () => setClick(!click);
  const toogleClose = () => setClick(false);

  const urlSearchParams = new URLSearchParams(useLocation().search);
  const [forgotPasswordRepairman] = useState(
    urlSearchParams.get("forgotPasswordRepairman") ? true : false
  );

  const [modalInscription] = useState(urlSearchParams.get("modal_inscription"));

  const [showModal, setShowModal] = useState(false);
  const [dataModal, setDataModal] = useState({
    title: "",
    typeModal: "",
  });
  const [linkInscrir, setLinkInscrir] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const auth = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [message, setMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

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
    password: {
      label: "Mot de passe",
      name: "password",
      placeholder: "Mot de passe",
      value: "",
      type: "password",
      error: false,
      errorMessage: "",
      autocomplete: "new-password",
      required: true,
      setType: (e) => {
        const cpState = { ...state };
        cpState.password.type = e;
        setState(cpState);
      },
    },
  });

  useEffect(() => {
    if (click) {
      document.body.classList.add("menu-is-show");
    } else {
      document.body.classList.remove("menu-is-show");
    }
  }, [click]);

  useEffect(() => {
    document.addEventListener("eventHeader", function (event) {
      if (event.detail === "openModalClient") {
        setShowModal(true);
        setDataModal({ typeModal: "client", title: "Espace client" });
      }
    });

    if (forgotPasswordRepairman) {
      setLinkInscrir("forgotPass");
      setShowModal(true);
      setDataModal({
        typeModal: "reparateur",
        title: "Espace réparateur",
      });
    }

    if (
      modalInscription &&
      ["reparateur", "client"].includes(modalInscription)
    ) {
      setLinkInscrir(modalInscription);
      setShowModal(true);
      setDataModal({
        typeModal: modalInscription,
        title:
          modalInscription == "reparateur"
            ? "Espace réparateur"
            : "Espace client",
      });
    }
  }, []);

  useEffect(() => {
    if (auth.roles.length && isConnected) {
      if (auth.roles.includes(vars.ROLES.ROLE_ADMIN)) {
        history.push(ROUTES.CATEGORIES.url);
      } else if (auth.roles.includes(vars.ROLES.ROLE_REPAIRMAN)) {
        history.push(ROUTES.REPA_VITRINE.url);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.roles, isConnected]);

  const submitLogin = (e) => {
    e.preventDefault();
    if (!submitting) {
      setState(clearErrors(state));

      const email = state.email.value;
      const password = state.password.value;
      let msg = "Erreur";
      msgErrors({ email: false, password: false, msg: null, submit: true });

      if (email && password) {
        if (!validateEmail(email)) {
          msg = "Votre email n’est pas correctement renseigné.";
          msgErrors({ email: true, msg, submit: false, notice: msg });
        } else if (!validatePassword(password)) {
          msg =
            "Votre mot de passe doit contenir au moins 8 caractères, 1 majuscule, 1 chiffre et 1 caractère spécial.";
          msgErrors({ password: true, msg, submit: false, notice: msg });
        } else {
          connector({
            method: "post",
            url: endPoints.LOGIN,
            data: { username: email, password },
            success: (response) => {
              msgErrors({ submit: false });
              dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                token: response.data.token,
                refresh_token: response.data.refresh_token,
              });
              setIsConnected(true);
              setShowModal(false);
            },
            catch: (error) => {
              console.log(error);
              msg = "Vos identifiants sont incorrects";
              if (error.response?.data?.code !== undefined) {
                if (error.response.data.message !== undefined) {
                  msg = error.response.data.message;
                }
              }
              msgErrors({ msg, submit: false });
            },
          });
        }
      } else {
        msgErrors({
          email: !email,
          password: !password,
          msg: "Veuillez renseigner les champs obligatoires",
          submit: false,
        });
      }
    }
  };

  const msgErrors = (e) => {
    if (e.notice !== undefined) NotificationManager.error("Erreur", e.notice);
    if (e.msg !== undefined) setMessage(e.msg);
    const cpState = { ...state };
    if (e.email !== undefined) cpState.email.error = e.email;
    if (e.password !== undefined) cpState.password.error = e.password;
    if (e.submit !== undefined) setSubmitting(e.submit);
    setState(cpState);
  };

  const redirectToSpace = () => {
    if (auth.roles.includes(ROLES.ROLE_REPAIRMAN))
      history.push(ROUTES.REPA_VITRINE.url);
    if (auth.roles.includes(ROLES.ROLE_ADMIN))
      history.push(ROUTES.CATEGORIES.url);
    if (auth.roles.includes(ROLES.ROLE_CLIENT))
      history.push(ROUTES.COMMANDES.url);
  };


  const [clickDashboard, setClickDashboard] = useState(false);
  const toggleDashboard = () => {
    setClickDashboard(!clickDashboard);
  };

  const ref = useRef(null);
  useOutsideAlerter(ref, () => {
    setClickDashboard(false);
  });
  return (
    <HeaderDefault>
      <HeaderTop>
        <Container>
          <Row className="align-items-center">
            {isDesktopOrLaptop && (
              <>
                <Col md={3}>
                  <LogoHeader>
                    <Link to={"/"}>
                      <img src={logoFingz} alt="Fingz" />
                    </Link>
                  </LogoHeader>
                </Col>
                <Col md={9}>
                  <BlocMenuNav>
                    <MenuNav>
                    <LinNavkItem
                       to={{pathname:LINK_EXTERNAL_WhoAreWe}} 
                       target="_blank"
                       >
                        Nous réparons 
                    </LinNavkItem>
                    <LinNavkItem
                       to={{pathname:LINK_EXTERNAL_WhoAreWe}} 
                       target="_blank"
                       >
                        Comment ça marche ?
                    </LinNavkItem>
                    <LinNavkItem
                       to={{pathname:LINK_EXTERNAL_WhoAreWe}} 
                       target="_blank"
                       >
                        Qui sommes-nous ?
                      </LinNavkItem>
                  
                      <LinNavkItem
                       to={{pathname:LINK_EXTERNAL_WhoAreWe}} 
                       target="_blank"
                       >
                        Blog
                      </LinNavkItem>
                  
                      <LinNavkItem
                        to={{ pathname: "https://www.fingzpartenaires.fr/" }}
                        target="_blank"
                      >
                        Devenez réparateur partenaire
                      </LinNavkItem>
                    
                    
                     
                    </MenuNav>
                    <LoginBtns>
                      {auth.user ? (
                        <AdminSideNav setMenushow={() => {}} noLogo />
                      ) : (
                        <>
                          <ButtonDef
                            textButton="S’identifier"
                            onClick={() => {
                              setShowModal(true);
                              setDataModal({
                                typeModal: "client",
                                title: "Espace client",
                              });
                            }}
                          />
                       
                        </>
                      )}
                    </LoginBtns>
                  </BlocMenuNav>
                </Col>
              </>
            )}
            {isTabletOrMobile && (
              <>
                <Col xs={3} className="d-flex">
                  <button className="menu-burger" onClick={toggle}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </button>
                </Col>
                <Col xs={6}>
                  <LogoHeader>
                    <Link to={"/"}>
                      <img src={logoFingz} alt="Fingz" />
                    </Link>
                  </LogoHeader>
                </Col>
                <Col xs={3}>
                  <LoginBtns>
                    {(!auth.user ||
                      !auth.roles.includes(ROLES.ROLE_REPAIRMAN)) && (
                      <button
                        onClick={() => {
                          if (auth.user) {
                            toggleDashboard()
                            //redirectToSpace();
                          } else {
                            setShowModal(true);
                            setDataModal({
                              typeModal: "client",
                              title: "Espace client",
                            });
                          }
                        }}
                      >
                        <ClientIcon />
                      </button>
                    )}
                    {(!auth.user ||
                      auth.roles.includes(ROLES.ROLE_REPAIRMAN)) && (
                      <button
                        className="light-btn"
                        onClick={() => {
                          if (auth.user) {
                            toggleDashboard()
                            //redirectToSpace();
                          } else {
                            setShowModal(true);
                            setDataModal({
                              typeModal: "reparateur",
                              title: "Espace réparateur",
                            });
                          }
                        }}
                      >
                        <ReparateurIcon />
                      </button>
                    )}
                  </LoginBtns>
                </Col>
              </>
            )}
          </Row>
        </Container>
      </HeaderTop>
      {isDesktopOrLaptop && <NavbarUniverses setNav={setClick} />}
      <MenuMobile open={click}>
        <div className="head-menu-mobile">
          <div className="logo-mobile">
            <Link to={"/"}>
              <img src={logoFingz} alt="Fingz" />
            </Link>
          </div>
          <button className="menu-burger is-opened" onClick={toogleClose}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div className="content-menu">
          {isTabletOrMobile && <NavbarUniverses setNav={setClick} />}
          <MenuNav>
            <LinNavkItem
              to={"/"}
              exact
              activeClassName="active"
              onClick={toogleClose}
            >
              Accueil{" "}
            </LinNavkItem>
            <Link to={{ pathname: LINK_EXTERNAL_WhoAreWe }} target="_blank">
              Qui sommes-nous ?
            </Link>
            <LinNavkItem to={ROUTES.CONTACT.url} onClick={toogleClose}>
              Contact
            </LinNavkItem>
          </MenuNav>
        </div>
      </MenuMobile>
      
      {isTabletOrMobile && (
      <MenuMobile className={`nav-dashboard ${clickDashboard ? "menu-dashboard-open" : ""}`} open={clickDashboard}>
        <div className="head-menu-mobile">
          <div className="logo-mobile">
            <Link to={"/"}>
              <img src={logoFingz} alt="Fingz" />
            </Link>
          </div>
          <button className="menu-burger is-opened" onClick={() =>{setClickDashboard(false)} }>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div className="content-menu">
          <Navbar />
        </div>
      </MenuMobile>) }

      {!auth.user && (
        <PopinModal
          show={showModal}
          handleClose={() => {
            setShowModal(false);
            setLinkInscrir();
          }}
          title={dataModal.title}
          className={dataModal.typeModal}
        >
          <div className="content-modal">
            {linkInscrir === "reparateur" ? (
              <>
                <InscriptionForm
                  retour={() => {
                    setLinkInscrir(null);
                    setShowModal(false);
                  }}
                  formType={linkInscrir}
                />
                <div className="footer-modal">
                  Déjà sur Fingz?{" "}
                  <Link
                    to={"#"}
                    onClick={(e) => {
                      e.preventDefault();
                      setLinkInscrir();
                    }}
                  >
                    Connectez-vous
                  </Link>
                </div>
              </>
            ) : linkInscrir === "client" ? (
              <>
                <InscriptionForm
                  retour={() => {
                    setShowModal(false);
                  }}
                  formType={linkInscrir}
                />
                <div className="footer-modal">
                  Déjà sur Fingz?{" "}
                  <Link
                    to={"#"}
                    onClick={(e) => {
                      e.preventDefault();
                      setLinkInscrir(null);
                    }}
                  >
                    Connectez-vous
                  </Link>
                </div>
              </>
            ) : linkInscrir === "forgotPass" ? (
              <Forgotpassword
                retour={(e) => {
                  e.preventDefault();
                  setLinkInscrir();
                }}
              />
            ) : (
              <>
                <div className="header-modal">
                  Première fois sur Fingz?{" "}
                  {linkInscrir === "reparateur" ||
                  dataModal.typeModal === "reparateur" ? (
                    <Link
                      to={{ pathname: vars.LINK_EXTERNAL_LandingPage }}
                      target="_blank"
                    >
                      Inscrivez-vous
                    </Link>
                  ) : (
                    <Link
                      to={"#"}
                      onClick={(e) => {
                        e.preventDefault();
                        setLinkInscrir(dataModal.typeModal);
                      }}
                    >
                      Inscrivez-vous
                    </Link>
                  )}
                </div>
                <FormLogin onSubmit={submitLogin}>
                  {message ? (
                    <span className="error-form">{message}</span>
                  ) : null}
                  <Input
                    {...state.email}
                    onChange={(e) => {
                      const cpState = { ...state };
                      cpState.email.value = e.target.value;
                      setState(cpState);
                      setMessage(null);
                    }}
                  />
                  <Input
                    className="password-input"
                    {...state.password}
                    onChange={(e) => {
                      const cpState = { ...state };
                      cpState.password.value = e.target.value;
                      setState(cpState);
                      setMessage(null);
                    }}
                  />
                  <Link
                    to={"#"}
                    className="pass-oublier"
                    onClick={(e) => {
                      setLinkInscrir("forgotPass");
                    }}
                  >
                    Mot de passe oublié ?
                  </Link>
                  <ButtonDef
                    textButton="Connexion"
                    className="btn-form-def"
                    spinner={submitting}
                  />
                </FormLogin>
              </>
            )}
          </div>
        </PopinModal>
      )}
    </HeaderDefault>
  );
}
