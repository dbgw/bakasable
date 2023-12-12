import moment from "moment";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { Link, useLocation } from "react-router-dom";
import noImage from "../../../assets/images/noImage.png";
import {
  BlocAdminContent,
  ServicesTableStyle,
} from "../../../assets/styles/adminStyle/adminGlobalStyle";
import {
  AddGreenIcon,
  DeleteIcon,
  EditIcon,
} from "../../../assets/styles/icons";
import DashboardContent from "../../../components/dashboardContent";
import DashboardSide from "../../../components/dashboardSide";
import FilterDefault from "../../../components/filterDefault";
import { ButtonDef, Input } from "../../../components/ui";
import CloseButton from "../../../components/ui-elements/closeButton";
import RadioButton from "../../../components/ui-elements/radioButton";
import Select from "../../../components/ui-elements/select";
import Tableau from "../../../components/ui-elements/tableau";
import endPoints from "../../../config/endPoints";
import ROUTES from "../../../config/routes";
import connector from "../../../connector";
import { clearErrors, validForm } from "../../../helper/form";
import { getDigits, getMsgError, scrollTop } from "../../../helper/functions";
import AdminBase from "../../../theme/back/adminBase";
import { pathImage, STRIPE_PUBLIC_KEY } from "../../../vars";
import InputAddress from "../../../components/ui-elements/inputAddress";
import InputAddressBilling from "../../../components/ui-elements/inputAddressBilling";

export default function Reparateurs() {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const query = new URLSearchParams(useLocation().search);
  const [defaultUser, setDefaultUser] = useState(
    query.get("user") ? parseInt(query.get("user")) : ""
  );
  const perPageDesMob = isMobile ? 8 : 20;
  const [users, setUsers] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(false);
  const [perPage, setPerPage] = useState(perPageDesMob);
  const [pageIndex, setPageIndex] = useState(0);
  const [activeSort, setActiveSort] = useState("enterprise");
  const [switshSort, setSwitshSort] = useState(false);
  const [paramsUrl, setParamsUrl] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [state, setState] = useState({
    id: { value: null, name: "id" },
    stripeAccountToken: { value: null, name: "stripeAccountToken" },
    stripePersonToken: { value: null, name: "stripePersonToken" },
    gender: {
      name: "gender",
      label: "Civilité",
      required: true,
      id: "civilite",
      value: "",
      options: [
        { value: "Monsieur", label: "Monsieur", id: "monsieur_radio" },
        { value: "Madame", label: "Madame", id: "madame_radio" },
      ],
    },
    firstName: {
      name: "firstName",
      label: "Prénom",
      placeholder: "Prénom",
      value: "",
      type: "text",
      error: false,
      errorMessage: "",
      required: true,
    },
    lastName: {
      name: "lastName",
      label: "Nom",
      placeholder: "Nom",
      value: "",
      type: "text",
      error: false,
      errorMessage: "",
      required: true,
    },
    phone: {
      name: "phone",
      label: "Téléphone",
      placeholder: "Téléphone",
      value: "",
      type: "phone",
      error: false,
      errorMessage: "",
    },
    email: {
      name: "email",
      label: "Email",
      placeholder: "Email",
      value: "",
      type: "email",
      error: false,
      errorEmail: false,
      errorMessage: "",
      required: true,
    },
    picture: { name: "picture", value: "", file: null, required: false },
    enterprise: {
      name: "enterprise",
      label: "Entreprise",
      placeholder: "Entreprise",
      value: "",
      type: "text",
      error: false,
      errorMessage: "",
      required: true,
    },
    TypeCompany: {
      name: "TypeCompany",
      label: "Type d'entreprise",
      placeholder: "Type d'entreprise",
      height: "53px",
      options: [],
      value: "",
      className: "select-uppercase",
      required: true,
      error: false,
      errorMessage: "",
    },
    SIRET: {
      label: "N° Siret",
      name: "SIRET",
      placeholder: "Siret",
      value: "",
      type: "text",
      error: false,
      errorMessage: "",
      required: true,
      autocomplete: false,
      empty: true,
      isNumber: true,
    },
    intraCommunityVAT: {
      name: "intraCommunityVAT",
      label: "N° TVA intracommunautaire",
      placeholder: "FR12345678912",
      value: "",
      type: "text",
      error: false,
      errorMessage: "",
      required: true,
    },
    address: {
      name: "address",
      label: "Adresse de la vitrine",
      placeholder: "Adresse de la vitrine",
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
      name: "additionalAddress",
      label: "Complément d’adresse",
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
      empty: true,
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
    addressBilling: {
      name: "addressBilling",
      label: "Adresse de facturation",
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
      name: "additionalAddressBilling",
      label: "Complément d’adresse",
      placeholder: "Complément d’adresse",
      value: "",
      type: "text",
      error: false,
      errorMessage: "",
    },
    postalCodeBilling: {
      name: "postalCodeBilling",
      label: "Code postal",
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
    status: {
      name: "status",
      label: "Statut",
      required: true,
      id: "statut",
      value: "0",
      options: [
        { value: 1, label: "En ligne", id: "EnLigne_radio" },
        { value: 0, label: "En attente", id: "EnAttente_radio" },
        { value: 2, label: "Hors ligne", id: "HorsLigne_radio" },
      ],
    },
    plainPassword: {
      label: "Mot de passe",
      name: "plainPassword",
      value: "",
      type: "password",
      error: false,
      errorMessage: "",
      autocomplete: "new-password",
      required: false,
      setType: (e) => {
        const cpState = { ...state };
        cpState.plainPassword.type = e;
        setState(cpState);
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
      required: false,
      notice:
        "Votre mot de passe doit contenir au moins 8 caractères, 1 majuscule, 1 chiffre et 1 caractère spécial.",
      setType: (e) => {
        const cpState = { ...state };
        cpState.confirmPassword.type = e;
        setState(cpState);
      },
    },
  });
  const [placeIsSelected, setPlaceIsSelected] = useState(false);
  const [placeBillingIsSelected, setPlaceBillingIsSelected] = useState(false);
  const [filter, setFilter] = useState({
    repairMan: {
      placeholder: "Réparateurs",
      options: [{ label: "Tous les réparateurs", value: "" }],
      value: "",
      isSearchable: true,
    },
    status: {
      placeholder: "Statut",
      options: [
        { label: "Tous les statuts", value: "" },
        { label: "En ligne", value: 1 },
        { label: "En attente", value: 0 },
        { label: "Hors ligne", value: 2 },
      ],
      value: "",
      isSearchable: true,
    },
    activeElement: "",
  });

  useEffect(() => {
    getTypeCompanies();
    getRepairMans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getUsers(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, perPage, activeSort, switshSort, filter]);

  const [stripe, setStripe] = useState(null);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/";
    script.async = true;
    script.addEventListener("load", function () {
      setStripe(window.Stripe(STRIPE_PUBLIC_KEY));
    });
    document.body.appendChild(script);
  }, []);

  const getUsers = (refresh = false) => {
    let condition = "";
    if (defaultUser) {
      condition = `&active=${defaultUser}`;
    }

    if (filter.repairMan.value) {
      condition += `&id=${filter.repairMan.value}`;
    }

    if ([0, 1, 2].includes(parseInt(filter.status.value))) {
      condition += `&status=${filter.status.value}`;
    }

    const cpParamsUrl = `page=${
      parseInt(pageIndex) + 1
    }&itemsPerPage=${perPage}&order[${activeSort}]=${
      switshSort ? "desc" : "asc"
    }${condition}`;

    if (refresh || cpParamsUrl !== paramsUrl) {
      setParamsUrl(cpParamsUrl);
      setUsers(false);
      setTotalUsers(0);
      connector({
        method: "get",
        url: `${endPoints.USERS_REPAIRMAN}?${cpParamsUrl}`,
        success: (response) => {
          const arrayObj = response.data["hydra:member"] || [];
          setUsers(arrayObj);
          setTotalUsers(response.data["hydra:totalItems"] || 0);
          if (defaultUser) {
            for (let i = 0; i < arrayObj.length; i++) {
              if (arrayObj[i].id === defaultUser) {
                setDefaultUser(null);
                setActiveUser(arrayObj[i]);
                break;
              }
            }
          }
        },
        catch: (error) => {
          console.log(error);
        },
      });
    }
  };

  const getRepairMans = () => {
    connector({
      method: "get",
      url: `${endPoints.USERS_REPAIRMAN_UNIVERSES}?order[enterprise]=asc`,
      data: {},
      success: (response) => {
        const arrayObj = response.data["hydra:member"] || [];
        const cpFilter = { ...filter };
        cpFilter.repairMan.options = [
          { label: "Tous les réparateurs", value: "" },
        ];
        for (let i = 0; i < arrayObj.length; i++) {
          let o = arrayObj[i];
          cpFilter.repairMan.options.push({
            label: o.enterprise,
            value: o.id,
          });
        }
        setFilter(cpFilter);
      },
      catch: (error) => {
        console.log(error);
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

  const submitUser = async (validation) => {
    if (!validation.rawData.stripeAccountToken) {
      if (!stripe) {
        msgErrors({ msg: "Stripe.js has not yet loaded." });
      }

      const accountResult = await stripe.createToken("account", {
        business_type: "company",
        company: {
          name: validation.rawData.enterprise,
          address: {
            city: validation.rawData.cityBilling,
            postal_code: validation.rawData.postalCodeBilling,
            line1: validation.rawData.addressBilling,
            line2: validation.rawData.additionalAddressBilling,
          },
          phone: validation.rawData.phone || "0000000000",
          registration_number: validation.rawData.SIRET,
          tax_id: validation.rawData.intraCommunityVAT,
        },
        tos_shown_and_accepted: true,
      });

      const personResult = await stripe.createToken("person", {
        person: {
          first_name: validation.rawData.firstName,
          last_name: validation.rawData.lastName,
          address: {
            city: validation.rawData.cityBilling,
            postal_code: validation.rawData.postalCodeBilling,
            line1: validation.rawData.addressBilling,
            line2: validation.rawData.additionalAddressBilling,
          },
        },
      });

      if (accountResult.token && personResult.token) {
        validation.rawData.stripeAccountToken = accountResult.token.id;
        validation.rawData.stripePersonToken = personResult.token.id;
      }
    }

    if (validation.rawData.stripeAccountToken) {
      validation.rawData.TypeCompany = `${endPoints.TYPE_COMPANY}/${validation.rawData.TypeCompany}`;
      connector({
        method: user.id ? "put" : "post",
        url: user.id
          ? `${endPoints.USER_ADMIN_REPAIRMAN}/${user.id}`
          : endPoints.USER_ADMIN_REPAIRMAN,
        data: validation.rawData,
        success: (response) => {
          setIsPending(false);
          getUsers(true);
          getRepairMans();
          setActiveUser({
            ...response.data,
            TypeCompany: { id: state.TypeCompany.value },
          });
          msgSuccess("Vos modifications ont bien été prises en compte.");
        },
        catch: (error) => {
          setIsPending(false);
          msgErrors({ msg: getMsgError(error) });
        },
      });
    } else {
      msgErrors({ msg: "Le token stripe n'a pas pu être creer." });
    }
  };

  const saveUser = () => {
    if (!isPending) {
      setMessage(null);
      setState(clearErrors(state));
      const validation = validForm(state);
      setState(validation.form);
      if (
        validation.form.phone.value?.length &&
        validation.form.phone.value.length != 10
      ) {
        msgErrors({
          msg: "Le numéro de téléphone doit contenir 10 chiffres.",
        });
        validation.form.phone.error = true;
        setState(validation.form);
        return;
      }
      if (validation.form.SIRET.value.length !== 14) {
        msgErrors({
          msg: "Le siret doit avoir 14 caractères",
        });
        validation.form.SIRET.error = true;
        setState(validation.form);
        return;
      }
      if (!placeIsSelected) {
        msgErrors({
          address: true,
          msg: "Veuillez sélectionner une adresse dans la liste.",
        });
        return;
      } else if (
        validation.form.address.error ||
        validation.form.postalCode.error ||
        validation.form.city.error
      ) {
        setState(validation.form);
        msgErrors({
          msg: "Veuillez sélectionner une adresse valide dans la liste.",
        });
        return;
      }
      if (!placeBillingIsSelected) {
        msgErrors({
          addressBilling: true,
          msg: "Veuillez sélectionner une adresse de facturation dans la liste.",
        });
        return;
      } else if (
        validation.form.addressBilling.error ||
        validation.form.postalCodeBilling.error ||
        validation.form.cityBilling.error
      ) {
        setState(validation.form);
        msgErrors({
          msg: "Veuillez sélectionner une adresse facturation valide dans la liste.",
        });
        return;
      }
      if (
        validation.form.postalCode.error ||
        validation.form.postalCode.value.length !== 5
      ) {
        msgErrors({
          msg: "Le code postal doit avoir 5 caractères",
        });
        validation.form.postalCode.error = true;
        setState(validation.form);
        return;
      }
      if (
        validation.form.postalCodeBilling.error ||
        validation.form.postalCodeBilling.value.length !== 5
      ) {
        msgErrors({
          msg: "Le code postal doit avoir 5 caractères",
        });
        validation.form.postalCodeBilling.error = true;
        setState(validation.form);
        return;
      }
      if (validation.form.email.errorEmail) {
        msgErrors({
          msg: "Adresse email invalide.",
        });
        validation.form.email.error = true;
        setState(validation.form);
        return;
      }
      const plainPassword = state.plainPassword.value;
      const confirmPassword = state.confirmPassword.value;
      if (plainPassword?.length || confirmPassword?.length) {
        let errorMsg = "";
        if (plainPassword && validation.form.plainPassword.error) {
          errorMsg = "Veuillez respecter les conditions du mot de passe";
        } else if (plainPassword !== confirmPassword) {
          errorMsg = "Le mot de passe et sa confirmation ne sont pas identique";
          validation.form.confirmPassword.error = true;
        }
        if (errorMsg) {
          msgErrors({
            msg: errorMsg,
          });
          setState(validation.form);
          return;
        }
      }

      if (validation.valid) {
        setIsPending(true);
        if (state.picture.file) {
          saveImage(validation);
        } else {
          submitUser(validation);
        }
      } else {
        msgErrors({
          msg: "Vérifier si les champs obligatoires sont remplis.",
        });
        setIsPending(false);
      }
    }
  };

  const saveImage = (validation) => {
    const data = new FormData();
    data.append("file", state.picture.file);
    connector({
      method: "post",
      url: endPoints.ANONYMOUS_MEDIA_OBJECT,
      data,
      success: (response) => {
        const cpState = { ...state };
        cpState.picture.file = null;
        cpState.picture.value = response.data.contentUrl;
        setState(cpState);
        validation.rawData.picture = response.data.contentUrl;
        submitUser(validation);
      },
      catch: (error) => {
        console.log(error);
        setIsPending(false);
      },
    });
  };

  const msgErrors = (e) => {
    const cpState = { ...state };
    if (e.msg !== undefined) setMessage({ type: "error", text: e.msg });
    if (e.address !== undefined) cpState.address.error = e.address;
    if (e.addressBilling !== undefined)
      cpState.addressBilling.error = e.addressBilling;
    setState(cpState);
    scrollTop("side-content-dashboard");
  };

  const msgSuccess = (text) => {
    scrollTop("side-content-dashboard");
    if (text !== undefined) setMessage({ type: "success", text });
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const getPathImage = (image) =>
    image.file
      ? URL.createObjectURL(image.file)
      : image.value
      ? pathImage + image.value
      : noImage;

  const setActiveRow = (item = {}) => {
    if (user && parseInt(item.id) === parseInt(user.id)) {
      setUser(false);
    } else {
      setActiveUser(item);
    }
  };

  const setActiveUser = (item = {}) => {
    setMessage(null);
    const cpState = { ...clearErrors(state) };
    if (!item.id) {
      for (const key in cpState) {
        item[key] = "";
      }
      item = {
        ...item,
        id: null,
        gender: "Monsieur",
        status: 0,
        createdAt: null,
        totalCommands: 0,
        totalDevis: 0,
        plainPassword: "",
        confirmPassword: "",
      };
    } else {
      item.plainPassword = "";
      item.confirmPassword = "";
    }
    for (const key in item) {
      if (cpState[key]) {
        if (key === "TypeCompany") {
          cpState.TypeCompany.value = item.TypeCompany.id
            ? item.TypeCompany.id
            : null;
          cpState.intraCommunityVAT.required = item.TypeCompany.id
            ? item.TypeCompany.requireNoTva
            : true;
        } else {
          cpState[key].value = item[key];
        }
      }
    }
    setState(cpState);
    setUser(item);
    if (cpState.address.value) {
      setPlaceIsSelected(true);
    }
    if (cpState.addressBilling.value) {
      setPlaceBillingIsSelected(true);
    }
  };

  const getUrlCommands = (item) => {
    return `${ROUTES.COMMANDES.url}?repairman=${item.id}`;
  };

  const getUrlDevis = (item) => {
    return `${ROUTES.DEVIS.url}?repairman=${item.id}`;
  };

  const rowRender = (row) => (
    <div
      onClick={() => setActiveRow(row)}
      className={`divTableRow ${user.id === row.id ? "active" : ""}`}
      key={`row-${row.id}`}
    >
      <div className="divTableCell">
        {isMobile && <label> Société: </label>}
        <div>{row.enterprise}</div>
      </div>
      <div className="divTableCell">
        {isMobile && <label> Nom: </label>}
        <div>{row.lastName}</div>
      </div>
      <div className="divTableCell">
        {isMobile && <label> Prénom: </label>}
        <div>{row.firstName}</div>
      </div>
      <div className="divTableCell">
        {isMobile && <label> Email: </label>}
        <div>{row.email}</div>
      </div>
      <div className="divTableCell">
        {isMobile && <label> Statut: </label>}
        <div>
          {row.status == 1 && "En ligne"}
          {row.status == 0 && "En attente"}
          {row.status == 2 && "Hors ligne"}
        </div>
      </div>
      <div className="divTableCell">
        {isMobile && <label> Date dernière connexion: </label>}
        <div>
          {row.lastConnection
            ? moment(row.lastConnection).format("DD/MM/YYYY")
            : ""}
        </div>
      </div>
      {isMobile && (
        <div className="divTableCell m-action">
          <div>
            <ButtonDef textButton="Editer" onClick={() => setActiveUser(row)} />
          </div>
        </div>
      )}
    </div>
  );

  const closeSide = () => {
    setUser(false);
  };

  return (
    <AdminBase>
      <BlocAdminContent>
        <DashboardContent
          titlePage="Réparateurs"
          className="reparateur-admin-page"
        >
          <ServicesTableStyle>
            <ButtonDef
              spinner={isPending}
              onClick={() => setActiveUser({})}
              textButton={
                <>
                  {!isMobile && "Nouveau réparateur"}
                  <AddGreenIcon />{" "}
                </>
              }
              className="btn-add"
            />

            <FilterDefault
              className="services-filter"
              formItems={
                <>
                  <Select
                    {...filter.repairMan}
                    onChange={(e) => {
                      const cpFilter = { ...filter };
                      cpFilter.repairMan.value = e.value;
                      cpFilter.activeElement = "repairMan";
                      setFilter(cpFilter);
                      setPageIndex(0);
                    }}
                  />
                  <Select
                    {...filter.status}
                    onChange={(e) => {
                      const cpFilter = { ...filter };
                      cpFilter.status.value = e.value;
                      cpFilter.activeElement = "status";
                      setFilter(cpFilter);
                      setPageIndex(0);
                    }}
                  />
                </>
              }
            />

            <Tableau
              columns={[
                { key: "enterprise", text: "Société", sort: true },
                { key: "lastName", text: "Nom", sort: true },
                { key: "firstName", text: "Prénom", sort: true },
                { key: "email", text: "Email", sort: true },
                { key: "status", text: "Statut", sort: true },
                {
                  key: "lastConnection",
                  text: "Date dernière connexion",
                  sort: false,
                },
              ]}
              perPage={perPage}
              setPerPage={setPerPage}
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
              activeSort={activeSort}
              setActiveSort={setActiveSort}
              switshSort={switshSort}
              setSwitshSort={setSwitshSort}
              pagination={true}
              totalItemsLength={totalUsers}
              data={users}
              rowRender={rowRender}
            />
          </ServicesTableStyle>
        </DashboardContent>

        {user ? (
          <DashboardSide className="reparateur-side">
            {isMobile && (
              <>
                <CloseButton
                  onClick={(e) => {
                    e.preventDefault();
                    closeSide();
                  }}
                />
              </>
            )}
            <h2 className="title-side-dashboard">
              {user.id ? `${user.enterprise}` : "Nouveau réparateur"}
            </h2>
            <Form>
              {message && message.type && message.text ? (
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
                  if (e.target.value.length <= 14)
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
              <InputAddressBilling
                state={state}
                setState={setState}
                placeIsSelected={placeBillingIsSelected}
                setPlaceIsSelected={setPlaceBillingIsSelected}
                message={message}
                setMessage={setMessage}
              />
              <Input
                {...state.additionalAddressBilling}
                onChange={(e) => {
                  const cpState = { ...state };
                  cpState.additionalAddressBilling.value = e.target.value;
                  cpState.additionalAddressBilling.error = false;
                  setState(cpState);
                  setMessage(null);
                }}
              />
              <Input
                {...state.postalCodeBilling}
                onChange={(e) => {
                  const cpState = { ...state };
                  cpState.postalCodeBilling.value = e.target.value;
                  cpState.postalCodeBilling.error = false;
                  setState(cpState);
                  setMessage(null);
                }}
              />
              <Input
                {...state.cityBilling}
                onChange={(e) => {
                  const cpState = { ...state };
                  cpState.cityBilling.value = e.target.value;
                  cpState.cityBilling.error = false;
                  setState(cpState);
                  setMessage(null);
                }}
              />
              <div className="bloc-file-form">
                <label>Photo de la société</label>
                <div className="image-service">
                  <img src={getPathImage(state.picture)} alt="" />
                  <input
                    type="file"
                    name="file"
                    id="uploadImage"
                    accept="image/png, image/jpeg"
                    onChange={(e) => {
                      const cpState = { ...state };
                      cpState.picture.file = e.target.files[0];
                      e.target.value = "";
                      setState(cpState);
                    }}
                  />
                  <div className="btns-file">
                    <label htmlFor="uploadImage" className="edit-image">
                      <EditIcon />
                    </label>
                    {state.picture.value || state.picture.file ? (
                      <button
                        className="delete-image"
                        onClick={(e) => {
                          e.preventDefault();
                          const cpState = { ...state };
                          cpState.picture.value = "";
                          cpState.picture.file = null;
                          setState(cpState);
                        }}
                      >
                        <DeleteIcon />
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <Select
                {...state.TypeCompany}
                onChange={(e) => {
                  const cpState = { ...state };
                  cpState.TypeCompany.value = e.value;
                  cpState.TypeCompany.error = false;
                  cpState.intraCommunityVAT.required = e.requireNoTva;
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
              <RadioButton
                {...state.gender}
                onChange={(val) => {
                  const cpState = { ...state };
                  cpState.gender.value = val.value;
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
                  setState(cpState);
                  setMessage(null);
                }}
              />
              <Input
                className="password-input"
                {...state.confirmPassword}
                onChange={(e) => {
                  const cpState = { ...state };
                  cpState.confirmPassword.value = e.target.value;
                  setState(cpState);
                  setMessage(null);
                }}
              />

              <RadioButton
                {...state.status}
                onChange={(val) => {
                  const cpState = { ...state };
                  cpState.status.value = val.value;
                  cpState.status.error = false;
                  setState(cpState);
                  setMessage(null);
                }}
              />
              <div className="btns-alings service-btns-action">
                <ButtonDef
                  textButton="Enregistrer"
                  spinner={isPending}
                  onClick={(e) => {
                    e.preventDefault();
                    saveUser();
                  }}
                />
              </div>
              {state.id.value ? (
                <>
                  <div className="date-create">
                    créé le :{" "}
                    {user.createdAt
                      ? moment(user.createdAt).format("DD/MM/YYYY")
                      : ""}
                  </div>

                  <div className="link-voir">
                    <div>
                      <Link to={getUrlCommands(user)}>
                        {" "}
                        {user.totalCommands} commande(s) lié(s){" "}
                      </Link>
                    </div>
                    <div>
                      <Link to={getUrlDevis(user)}>
                        {" "}
                        {user.totalDevis} devis lié(s){" "}
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                <div className="link-voir">
                  <div>
                    <Link to={"#"}> 0 commande(s) lié(s) </Link>
                  </div>
                  <div>
                    <Link to={"#"}> 0 devis lié(s) </Link>
                  </div>
                </div>
              )}
            </Form>
          </DashboardSide>
        ) : null}
      </BlocAdminContent>
    </AdminBase>
  );
}
