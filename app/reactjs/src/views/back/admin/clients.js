import React, { useState, useEffect } from "react";
import AdminBase from "../../../theme/back/adminBase";
import DashboardContent from "../../../components/dashboardContent";
import DashboardSide from "../../../components/dashboardSide";
import { BlocAdminContent } from "../../../assets/styles/adminStyle/adminGlobalStyle";
import DevisSideDetail from "../../../components/devis/devis-side-details/devisSideDetail";

import { ServicesTableStyle } from "../../../assets/styles/adminStyle/adminGlobalStyle";
import Tableau from "../../../components/ui-elements/tableau";

import DsdHeader from "../../../components/devis/devis-side-details/dsdHeader";
import DsdContent from "../../../components/devis/devis-side-details/dsdContent";
import BlocInfo from "../../../components/devis/blocks/blocInfo";

import { Form } from "react-bootstrap";
import { ButtonDef, Input } from "../../../components/ui";
import RadioButton from "../../../components/ui-elements/radioButton";
import connector from "../../../connector";
import endPoints from "../../../config/endPoints";
import moment from "moment";
import { validForm } from "../../../helper/form";
import { Link, useLocation } from "react-router-dom";
import ROUTES from "../../../config/routes";
import { useMediaQuery } from "react-responsive";
import CloseButton from "../../../components/ui-elements/closeButton";
import { scrollTop } from "../../../helper/functions";
import FilterDefault from "../../../components/filterDefault";
import Select from "../../../components/ui-elements/select";

export default function Clients() {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const perPageDesMob = isMobile ? 8 : 20;
  const [openSide, setOpenSide] = useState(false);
  const [selectedRow, setSelectedRow] = useState(false);
  const [message, setMessage] = useState({ type: "", text: null });

  const query = new URLSearchParams(useLocation().search);
  const [perPage, setPerPage] = useState(perPageDesMob);
  const [totalItems, setTotalItems] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [activeClient, setActiveClient] = useState(
    query.get("idclient") ? parseInt(query.get("idclient")) : false
  );
  const [activeSort, setActiveSort] = useState("lastName");
  const [switshSort, setSwitshSort] = useState(false);

  const [clients, setClients] = useState([]);

  const [profile, setProfile] = useState({
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
      disabled:true,
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
      disabled:true,
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
      disabled:true,
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
      disabled:true,
    },
    status: {
      name: "status",
      label: "Statut",
      required: true,
      id: "status",
      value: "",
      options: [
        { value: 1, label: "En ligne", id: "enligne_radio" },
        { value: 2, label: "Hors ligne", id: "horsligne_radio" },
      ],
    },
  });

  const [filter, setFilter] = useState({
    client: {
      placeholder: "Client",
      options: [{ label: "Tous les clients", value: "" }],
      value: "",
      isSearchable: true,
    },
    status: {
      placeholder: "Statut",
      options: [
        { label: "Tous les statuts", value: "" },
        { label: "En ligne", value: 1 },
        { label: "Hors ligne", value: 2 },
      ],
      value: "",
      isSearchable: true,
    },
    activeElement: "",
  });

  const setActiveRow = (item = {}) => {
    setMessage({ type: "", text: null });
    if (parseInt(item.id) === parseInt(selectedRow.id)) {
      setSelectedRow(false);
      setOpenSide(false);
    } else {
      setSelectedRow(item);
      setOpenSide(true);
    }
  };

  useEffect(() => {
    if (selectedRow) {
      const cpState = { ...profile };
      cpState.gender.value = selectedRow.gender;
      cpState.firstName.value = selectedRow.firstName;
      cpState.lastName.value = selectedRow.lastName;
      cpState.email.value = selectedRow.email;
      cpState.status.value = selectedRow.status;
      setProfile(cpState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRow]);

  useEffect(() => {
    getClients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let condition = "";
    if (activeClient) {
      condition += `&active=${activeClient}`;
    }
    if (filter.client.value) {
      condition += `&id=${filter.client.value}`;
    }
    if ([1, 2].includes(parseInt(filter.status.value))) {
      condition += `&status=${filter.status.value}`;
    }
    const url = `${endPoints.USERS_CLIENT}?page=${
      pageIndex + 1
    }&itemsPerPage=${perPage}&order[${activeSort}]=${
      switshSort ? "asc" : "desc"
    }${condition}`;
    connector({
      url: url,
      success: (response) => {
        setClients(response.data["hydra:member"]);
        setTotalItems(response.data["hydra:totalItems"]);
        if (activeClient) {
          setActiveRow(
            response.data["hydra:member"].find((cl) => activeClient === cl.id)
          );
          setActiveClient(false);
        }
      },
      catch: (err) => {
        console.log(err);
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perPage, pageIndex, activeSort, switshSort, filter]);

  const getClients = () => {
    connector({
      method: "get",
      url: `${endPoints.USERS_CLIENT_LIST}?order[firstName]=asc`,
      data: {},
      success: (response) => {
        const arrayObj = response.data["hydra:member"] || [];
        const cpFilter = { ...filter };
        cpFilter.client.options = [{ label: "Tous les clients", value: "" }];
        for (let i = 0; i < arrayObj.length; i++) {
          let o = arrayObj[i];
          cpFilter.client.options.push({
            label: `${o.firstName} ${o.lastName}`,
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

  const rowRender = (row) => (
    <div
      onClick={() => setActiveRow(row)}
      className={`divTableRow ${selectedRow.id === row.id ? "active" : ""}`}
      key={`row-${row.id}`}
    >
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
          {row.status == 2 && "Hors ligne"}
        </div>
      </div>
      <div className="divTableCell">
        {isMobile && <label> Date de dernière connexion: </label>}
        <div>{moment(row.lastConnection).format("DD/MM/YYYY")}</div>
      </div>
      {isMobile && (
        <div className="divTableCell m-action">
          <div>
            <ButtonDef
              textButton="Editer le client"
              onClick={() => setActiveRow(row)}
            />
          </div>
        </div>
      )}
    </div>
  );

  const onSubmit = (e) => {
    e.preventDefault();
    const profileForm = validForm(profile);
    setProfile(profileForm.form);
    if (!profileForm.valid) {
      setMessage({
        type: "error",
        text: "Vérifier si les champs obligatoires sont remplis.",
      });
      return;
    }
    connector({
      url: `${endPoints.USER}/${selectedRow.id}/client`,
      method: "PUT",
      data: profileForm.rawData,
      success: (response) => {
        setSelectedRow(response.data);
        setClients(
          clients.map((cl) => (cl.id === response.data.id ? response.data : cl))
        );
        getClients();
        setMessage({
          type: "success",
          text: "Vos modifications ont bien été prises en compte",
        });
        scrollTop("side-content-dashboard");
      },
      catch: (err) => console.log(err),
    });
  };

  const closeSide = () => {
    setOpenSide(false);
    setSelectedRow({});
  };

  const getUrlCommands = (item) => {
    return `${ROUTES.COMMANDES.url}?client=${item.id}`;
  };

  const getUrlDevis = (item) => {
    return `${ROUTES.DEVIS.url}?client=${item.id}`;
  };

  return (
    <AdminBase>
      <BlocAdminContent>
        <DashboardContent titlePage="Clients">
          <ServicesTableStyle>
            <FilterDefault
              className="services-filter"
              formItems={
                <>
                  <Select
                    {...filter.client}
                    onChange={(e) => {
                      const cpFilter = { ...filter };
                      cpFilter.client.value = e.value;
                      cpFilter.activeElement = "client";
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
                { key: "lastName", text: "Nom", sort: true },
                { key: "firstName", text: "Prénom", sort: true },
                { key: "email", text: "Email", sort: true },
                { key: "status", text: "Statut", sort: true },
                {
                  key: "lastLogin",
                  text: "Date de dernière connexion",
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
              totalItemsLength={totalItems}
              data={clients}
              rowRender={rowRender}
              className="align-left"
            />
          </ServicesTableStyle>
        </DashboardContent>
        {openSide ? (
          <DashboardSide className="devis-side">
            <DevisSideDetail>
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
              <DsdHeader
                title={`${profile.firstName.value} ${profile.lastName.value}`}
                hideStatus
              />

              <DsdContent>
                <Form className="form-horizontal-default" onSubmit={onSubmit}>
                  {message.text ? (
                    <span
                      className={
                        message.type === "error"
                          ? "text-danger"
                          : "text-success"
                      }
                    >
                      {message.text}
                    </span>
                  ) : null}

                  <RadioButton
                    {...profile.gender}
                    onChange={(val) => {
                      const cpState = { ...profile };
                      cpState.gender.value = val.value;
                      setProfile(cpState);
                    }}
                  />
                  <Input
                    {...profile.lastName}
                    onChange={(e) => {
                      const cpState = { ...profile };
                      cpState.lastName.value = e.target.value;
                      setProfile(cpState);
                    }}
                  />
                  <Input
                    {...profile.firstName}
                    onChange={(e) => {
                      const cpState = { ...profile };
                      cpState.firstName.value = e.target.value;
                      setProfile(cpState);
                    }}
                  />
                  <Input
                    {...profile.email}
                    onChange={(e) => {
                      const cpState = { ...profile };
                      cpState.email.value = e.target.value;
                      setProfile(cpState);
                    }}
                  />
                  <RadioButton
                    {...profile.status}
                    onChange={(val) => {
                      const cpState = { ...profile };
                      cpState.status.value = val.value;
                      setProfile(cpState);
                    }}
                  />
                  <div className="btns-alings">
                    <ButtonDef textButton="Enregistrer" />
                  </div>
                </Form>

                <BlocInfo>
                  <span>
                    Créé le :
                    {moment(selectedRow.createdAt).format("DD/MM/YYYY")}
                  </span>
                </BlocInfo>

                <BlocInfo>
                  <div className="text-center">
                    <Link to={getUrlCommands(selectedRow)}>
                      {selectedRow.totalCommands} commande(s) liée(s)
                    </Link>
                  </div>
                  <div className="text-center">
                    <Link to={getUrlDevis(selectedRow)}>
                      {selectedRow.totalDevis} Devis lié(s)
                    </Link>
                  </div>
                </BlocInfo>
              </DsdContent>
            </DevisSideDetail>
          </DashboardSide>
        ) : null}
      </BlocAdminContent>
    </AdminBase>
  );
}
