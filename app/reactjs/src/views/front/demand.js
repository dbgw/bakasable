import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { NotificationManager } from "react-notifications";
import { useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import {
  BackStyle,
  ContentPageStyle,
  LinNavkItem,
} from "../../assets/styles/frontGlobalStyle";
import { BackIcon } from "../../assets/styles/icons";
import Loader from "../../components/loader";
import TabsStep from "../../components/tabsStep";
import endPoints from "../../config/endPoints";
import ROUTES from "../../config/routes";
import connector from "../../connector";
import { validForm } from "../../helper/form";
import {
  deleteKeys,
  getMsgError,
  newObject,
  renameKeys,
  scrollTop,
} from "../../helper/functions";
import Base from "../../theme/front/base";
import AdresseStep from "./demandSteps/adresseStep";
import ConfirmeStep from "./demandSteps/confirmeStep";
import InfosStep from "./demandSteps/infosStep";
import PaymentStep from "./demandSteps/paymentStep";

export default function Demand() {
  const { slugIdUniverse, slugIdService, slugIdBenefit, idDeliveryMode } =
    useParams();
  const query = new URLSearchParams(useLocation().search);
  const defaultCommand = query.get("command")
    ? parseInt(query.get("command"))
    : "";
  const history = useHistory();
  const [activeIndex, setActiveIndex] = useState(0);
  const auth = useSelector((store) => store.auth);
  const [user, setUser] = useState(false);
  const [benefit, setBenefit] = useState(false);
  const [command, setCommand] = useState(false);
  const [paiement, setPaiement] = useState(false);
  const [deliveryMode, setDeliveryMode] = useState(false);
  const [message, setMessage] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const initState = {
    id: { value: null, name: "id", error: false, required: false },
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
      error: false,
      required: false,
    },
    longitude: {
      name: "longitude",
      value: "",
      error: false,
      required: false,
    },
    placeIsSelected: {
      name: "placeIsSelected",
      value: true,
      error: false,
    },
    additionalAddress: {
      label: "Complément d’adresse",
      name: "additionalAddress",
      placeholder: "Complément d’adresse",
      value: "",
      type: "text",
      error: false,
      errorMessage: "",
      required: false,
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
      autocomplete: false,
      empty: true,
      size: 5,
      disabled: true,
      editable: true,
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
    sameAsInvoice: {
      label: "Identique à l’adresse de facturation",
      name: "sameAsInvoice",
      value: false,
      error: false,
      errorMessage: "",
      required: false,
    },
  };
  const [state, setState] = useState({
    invoice: newObject({
      ...initState,
      type: { value: "invoice", name: "type", error: false },
    }),
    delivery: newObject({
      ...initState,
      type: { value: "delivery", name: "type", error: false },
    }),
    noteLivreur: {
      name: `noteLivreur`,
      label: "Note d’information pour le livreur",
      type: "text",
      placeholder: "Digicode, étage etc…",
      value: "",
      as: "textarea",
      error: false,
      errorMessage: "",
      required: false,
    },
    infos: {
      description: {
        name: `description`,
        label: "Description du besoin",
        type: "text",
        placeholder: "Description du besoin",
        value: "",
        as: "textarea",
      },
      picture: {
        name: "picture",
        placeholder: "Insérer une photo",
        value: "",
        file: null,
        id: "file-img",
        type: "file",
        nameFile: null,
        required: false,
        error: false,
        errorMessage: "",
      },
      files: {
        name: "files",
        value: [],
        required: false,
        error: false,
        errorMessage: "",
      },
    },
    payment: {
      cardNumber: {
        name: "cardNumber",
        label: "Numéro de la carte",
        type: "text",
        required: true,
        placeholder: "Numéro de la carte",
        value: "",
        error: false,
        errorMessage: "",
        className: "number-cart-payment",
        classInput: "input-cart-payment",
      },
      cardExpiry: {
        name: "cardExpiry",
        label: "Expiration et pictogramme",
        type: "text",
        required: true,
        placeholder: "MM/AA",
        value: "",
        error: false,
        errorMessage: "",
        className: "date-cart-payment",
        classInput: "input-cart-payment",
      },
      cardCvc: {
        name: "cardCvc",
        label: "",
        type: "text",
        required: true,
        placeholder: "CVC",
        value: "",
        error: false,
        errorMessage: "",
        className: "cvc-cart",
        classInput: "input-cart-payment",
      },
      paymentIntent: {
        name: "paymentIntent",
        value: "",
        type: "text",
        error: false,
        errorMessage: "",
        required: false,
      },
      clientSecret: {
        name: "clientSecret",
        value: "",
        type: "text",
        error: false,
        errorMessage: "",
        required: false,
      },
      amount: {
        name: "amount",
        value: "",
        type: "text",
        error: false,
        errorMessage: "",
        required: false,
      },
      rightToCancel: {
        name: "rightToCancel",
        className: "checkboxs-accept",
        label: (
          <>
            Je souhaite que la prestation commandée soit réalisée avant
            l’expiration du délai de rétractation de 14 jours et renonce
            expressément à mon droit de rétractation
          </>
        ),
        value: false,
        error: false,
        errorMessage: "",
        required: false,
      },
      acceptCommercialConditions: {
        name: "acceptCommercialConditions",
        className: "checkboxs-accept",
        label: (
          <>
            J'ai lu et j'accepte
            <LinNavkItem
              to={ROUTES.CONDITION_COMMERCIALE.url}
              target="_blank"
              className="payment-conditions-commerciale"
            >
              les conditions commerciales*
            </LinNavkItem>
          </>
        ),
        value: false,
        error: false,
        errorMessage: "",
        required: true,
      },
    },
  });
  const [checkCardPayment, setCheckCardPayment] = useState(false);

  useEffect(() => {
    const cpStateDelivery = { ...state.delivery };
    for (const key in cpStateDelivery) {
      cpStateDelivery[key].required =  !state.invoice.sameAsInvoice.value;
      cpStateDelivery[key].error = false;
    }
    cpStateDelivery.id.required = false;
    cpStateDelivery.latitude.required = false;
    cpStateDelivery.longitude.required = false;
    cpStateDelivery.additionalAddress.required = false;
    cpStateDelivery.sameAsInvoice.required = false;
    setState({...state, delivery : cpStateDelivery});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.invoice.sameAsInvoice.value]);

  useEffect(() => {
    if (auth.user) {
      getUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user]);

  useEffect(() => {
    getBenefit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (defaultCommand) {
      getCommand();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultCommand]);

  useEffect(() => {
    window.scrollTo({ top: 150, behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  const getCommand = () => {
    connector({
      method: "get",
      url: `${endPoints.COMMAND}/${defaultCommand}/client`,
      success: (response) => {
        setCommand(response.data);
        setActiveIndex(2);
      },
      catch: (error) => {
        NotificationManager.error(getMsgError(error), "");
        history.push(ROUTES.HOME.url);
      },
    });
  };

  const getUser = () => {
    connector({
      method: "get",
      url: `${endPoints.USER}/${auth.user.id}/client`,
      success: (response) => {
        setUser(response.data);
      },
      catch: (error) => {
        NotificationManager.error(getMsgError(error), "");
        history.push(ROUTES.HOME.url);
      },
    });
  };

  const getBenefit = () => {
    const id = slugIdBenefit.split("-").pop();
    if (id) {
      connector({
        method: "get",
        url: `${endPoints.ANONYMOUS_BENEFIT}/${id}/details`,
        success: (response) => {
          const obj = response.data || {};
          setBenefit(obj);
          for (let i = 0; i < obj.deliveryModes.length; i++) {
            if (
              parseInt(obj.deliveryModes[i].id) === parseInt(idDeliveryMode)
            ) {
              setDeliveryMode(obj.deliveryModes[i]);
              break;
            }
          }
        },
        catch: (error) => {
          NotificationManager.error(getMsgError(error), "");
        },
      });
    } else {
      NotificationManager.error("Quelque chose s'est mal passé.", "");
      history.push(ROUTES.HOME.url);
    }
  };

  useEffect(() => {
    if (user) {
      const invoiceAddress = user.addresses.find((a) => a.type === "invoice");
      const cpState = { ...state };
      if (invoiceAddress) {
        for (const key in invoiceAddress) {
          if (cpState.invoice[key]) {
            if (key === "id") {
              cpState.invoice[key].value = invoiceAddress["@id"];
            } else {
              cpState.invoice[key].value = invoiceAddress[key];
            }
          }
        }
      } else {
        cpState.invoice.firstName.value = user.firstName || "";
        cpState.invoice.lastName.value = user.lastName || "";
        cpState.invoice.address.value = user.address || "";
        cpState.invoice.latitude.value = user.latitude || null;
        cpState.invoice.longitude.value = user.longitude || null;
      }
      cpState.invoice.sameAsInvoice.value = false;

      const deliveryAddress = user.addresses.find((a) => a.type === "delivery");
      if (deliveryAddress) {
        for (const key in deliveryAddress) {
          if (cpState.delivery[key]) {
            if (key === "id") {
              cpState.delivery[key].value = deliveryAddress["@id"];
            } else {
              cpState.delivery[key].value = deliveryAddress[key];
            }
          }
        }
      } else {
        cpState.delivery.firstName.value = user.firstName || "";
        cpState.delivery.lastName.value = user.lastName || "";
        cpState.delivery.address.value = user.address || "";
        cpState.delivery.latitude.value = user.latitude || null;
        cpState.delivery.longitude.value = user.longitude || null;
        cpState.delivery.postalCode.value = user.postalCode || "";
        cpState.delivery.city.value = user.city;
      }
      cpState.delivery.postalCode.disabled = cpState.delivery.postalCode.value
        ? true
        : false;
      cpState.delivery.city.disabled = cpState.delivery.city.value
        ? true
        : false;
      setState(cpState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const getTabs = () => {
    const tabs = {};
    tabs.addresse_step = (
      <AdresseStep
        benefit={benefit}
        deliveryMode={deliveryMode}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        state={state}
        setState={setState}
        isPending={isPending}
        setIsPending={setIsPending}
      />
    );

    if (benefit && benefit.typeService === "devis") {
      tabs.infos_step = (
        <InfosStep
          user={user}
          benefit={benefit}
          deliveryMode={deliveryMode}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          state={state}
          setState={setState}
          message={message}
          setMessage={setMessage}
          isPending={isPending}
          setIsPending={setIsPending}
          saveAddresses={saveAddresses}
        />
      );
    }

    if (
      benefit &&
      (benefit.typeService === "forfait" ||
        (benefit.typeService === "devis" && benefit.priceQuote > 0) ||
        defaultCommand)
    ) {
      tabs.payment_step = (
        <PaymentStep
          user={user}
          benefit={benefit}
          deliveryMode={deliveryMode}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          state={state}
          setState={setState}
          message={message}
          setMessage={setMessage}
          isPending={isPending}
          setIsPending={setIsPending}
          saveAddresses={saveAddresses}
          savePaiement={savePaiement}
          command={command}
          defaultCommand={defaultCommand}
          checkCardPayment={checkCardPayment}
          setCheckCardPayment={setCheckCardPayment}
        />
      );
    }

    tabs.confirmation_step = (
      <ConfirmeStep
        state={state}
        setState={setState}
        benefit={benefit}
        command={command}
        paiement={paiement}
        defaultCommand={defaultCommand}
      />
    );
    return tabs;
  };

  useEffect(() => {
    if (deliveryMode) {
      const cpState = { ...state };
      cpState.invoice.sameAsInvoice.value = deliveryMode.deliveryModeType
        .requireDeliveryAddress
        ? false
        : true;
      setState(cpState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deliveryMode]);

  const getMenus = () => {
    const menu = [];
    menu.push({
      key: "addresse_step",
      title: "Adresse",
      //buttonNextText: "Valider",
    });
    if (benefit && benefit.typeService === "devis") {
      menu.push({
        key: "infos_step",
        title: "Informations complémentaires",
        // buttonNextText: "Valider",
        // buttonPrevText: "Retour",
      });
    }
    if (
      benefit &&
      (benefit.typeService === "forfait" ||
        (benefit.typeService === "devis" && benefit.priceQuote > 0) ||
        defaultCommand)
    ) {
      menu.push({
        key: "payment_step",
        title: "Paiement",
        // buttonNextText: "Valider",
        // buttonPrevText: "Retour",
      });
    }
    menu.push({
      key: "confirmation_step",
      title: "Confirmation",
    });
    return menu;
  };

  const saveAddresses = (makePayment = false) => {
    setIsPending(true);

    if (defaultCommand) {
      setCheckCardPayment(true);
      return;
    }

    const formInvoice = validForm(state.invoice);
    const formDelivery = validForm(state.delivery);
    const addresses = [];
    addresses.push(formInvoice.rawData);
    if (formInvoice.rawData.sameAsInvoice) {
      formDelivery.rawData = {
        ...formInvoice.rawData,
        id: formDelivery.rawData.id,
        type: "delivery",
      };
    }

    addresses.push(formDelivery.rawData);

    if (auth.user.id) {
      connector({
        method: "put",
        url: `${endPoints.USER}/${auth.user.id}/addresses`,
        data: { addresses },
        success: (response) => {
          const unusedKeys = [
            "id",
            "type",
            "sameAsInvoice",
            "latitude",
            "longitude",
            "placeIsSelected",
          ];
          formDelivery.rawData = deleteKeys(formDelivery.rawData, unusedKeys);
          formInvoice.rawData = deleteKeys(formInvoice.rawData, unusedKeys);
          saveCommand(
            {
              ...formDelivery.rawData,
              ...renameKeys(formInvoice.rawData, { suffix: "Invoice" }),
              client: `${endPoints.USER}/${auth.user.id}`,
              benefit: benefit["@id"],
              deliveryMode: deliveryMode["@id"],
              id: null,
              description: state.infos.description.value,
              files: state.infos.files.value,
              rightToCancel: state.payment.rightToCancel.value,
              noteLivreur: state.noteLivreur.value,
            },
            makePayment
          );
        },
        catch: (error) => {
          msgErrors({ msg: getMsgError(error) });
        },
      });
    } else {
      msgErrors({
        msg: "Vous devez être connecté pour effectuer cette opération",
      });
    }
  };

  const saveCommand = (data, makePayment) => {
    if (command) {
      if (makePayment) {
        setCheckCardPayment(true);
      }
      return;
    }

    connector({
      method: "post",
      url: `${endPoints.COMMAND}`,
      data,
      success: (response) => {
        const obj = response.data;
        setCommand(obj);
        if (makePayment) {
          setCheckCardPayment(true);
        } else {
          msgSuccessCommand();
        }
      },
      catch: (error) => {
        console.log("error");
        msgErrors({ msg: getMsgError(error) });
      },
    });
  };

  const savePaiement = () => {
    const form = validForm(state.payment);
    connector({
      method: "post",
      url: `${endPoints.PAIEMENT}`,
      data: { command: command["@id"], ...form.rawData },
      success: (response) => {
        setPaiement(response.data);
        msgSuccessCommand();
      },
      catch: (error) => {
        msgErrors({ msg: getMsgError(error) });
      },
    });
  };

  const msgSuccessCommand = () => {
    const text =
      benefit.typeService === "forfait"
        ? "Commande enregistré avec succès."
        : "Devis enregistré avec succès.";
    setMessage({ text, type: "success" });
    setIsPending(false);
    scrollTop();
    setActiveIndex(activeIndex + 1);
  };

  const msgErrors = (e) => {
    if (e.msg !== undefined) setMessage({ type: "error", text: e.msg });
    setIsPending(false);
    scrollTop();
  };

  if (!benefit) {
    return <Loader />;
  }

  return (
    <Base className="fiche-prestation-page">
      <ContentPageStyle>
        <Container>
          {activeIndex === 0 ? (
            <BackStyle
              to={`/univers/${slugIdUniverse}/${slugIdService}/${slugIdBenefit}`}
            >
              <BackIcon />
              <span>Retour à la prestation</span>
            </BackStyle>
          ) : getMenus()[activeIndex].key === "confirmation_step" ||
            defaultCommand ? null : (
            <BackStyle
              to={"#"}
              onClick={(e) => {
                e.preventDefault();
                setActiveIndex(activeIndex - 1);
                window.scrollTo({
                  top: 150,
                  behavior: "smooth",
                });
              }}
            >
              <BackIcon />
              <span>Retour à l'étape précédente</span>
            </BackStyle>
          )}
          <TabsStep
            menu={getMenus()}
            tabs={getTabs()}
            activeIndex={activeIndex}
          />
        </Container>
      </ContentPageStyle>
    </Base>
  );
}
