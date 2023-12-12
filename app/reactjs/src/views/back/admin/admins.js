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
import { AddGreenIcon } from "../../../assets/styles/icons";
import { useMediaQuery } from "react-responsive";
import CloseButton from "../../../components/ui-elements/closeButton";
import { getDigits, getMsgError } from "../../../helper/functions";

export default function Admins() {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const perPageDesMob = isMobile ? 8 : 20;
  const [openSide, setOpenSide] = useState(false);
  const [selectedRow, setSelectedRow] = useState(false);
  const [message, setMessage] = useState({ type: "", text: null });

  const [perPage, setPerPage] = useState(perPageDesMob);
  const [totalItems, setTotalItems] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
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
    firstName: {
      label: "Prénom",
      name: "firstName",
      placeholder: "Prénom",
      value: "",
      type: "text",
      error: false,
      errorEmail: false,
      errorMessage: "",
      required: true,
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
    phone: {
      label: "Téléphone",
      name: "phone",
      placeholder: "Téléphone",
      type: "tel",
      value: "",
      error: false,
      errorMessage: "",
      required: false,
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

  const setActiveRow = (item = {}) => {
    if (item.id && item.id === selectedRow.id) {
      setSelectedRow(false);
      setOpenSide(false);
    } else {
      setSelectedRow(item);
      setOpenSide(true);
    }
  };

  useEffect(() => {
    const url = `${endPoints.USERS_ADMINS}?page=${
      pageIndex + 1
    }&itemsPerPage=${perPage}&order[${activeSort}]=${
      switshSort ? "asc" : "desc"
    }`;
    connector({
      url: url,
      success: (response) => {
        setClients(response.data["hydra:member"]);
        setTotalItems(response.data["hydra:totalItems"]);
      },
      catch: (err) => {
        console.log(err);
      },
    });
  }, [perPage, pageIndex, activeSort, switshSort]);

  useEffect(() => {
    const cpState = { ...profile };
    if (selectedRow && Object.keys(selectedRow).length) {
      cpState.gender.value = selectedRow.gender;
      cpState.firstName.value = selectedRow.firstName;
      cpState.lastName.value = selectedRow.lastName;
      cpState.email.value = selectedRow.email;
      cpState.phone.value = selectedRow.phone;
      cpState.status.value = selectedRow.status;
    } else {
      cpState.gender.value = "Monsieur";
      cpState.firstName.value = "";
      cpState.lastName.value = "";
      cpState.email.value = "";
      cpState.phone.value = "";
      cpState.status.value = 1;
    }
    setProfile(cpState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRow]);

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
        {isMobile && <label> Téléphone: </label>}
        <div>{row.phone}</div>
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
        <div>
          {moment(row.lastConnection).isValid() &&
            moment(row.lastConnection).format("DD/MM/YYYY")}
        </div>
      </div>
      {isMobile && (
        <div className="divTableCell m-action">
          <div>
            <ButtonDef textButton="Editer" onClick={() => setActiveRow(row)} />
          </div>
        </div>
      )}
    </div>
  );

  const onSubmit = (e) => {
    e.preventDefault();
    setMessage({ type: "", text: null });
    const profileForm = validForm(profile);
    setProfile(profileForm.form);
    if (profileForm.form.email.errorEmail) {
      setMessage({
        type: "error",
        text: "Adresse email invalide.",
      });
      return;
    }
    if (!profileForm.valid) {
      setMessage({
        type: "error",
        text: "Vérifier si les champs obligatoires sont remplis.",
      });
      return;
    }
    if (profile.phone.value && profile.phone.value.length != 10) {
      setMessage({
        type: "error",
        text: "Le numéro de téléphone doit contenir 10 chiffres.",
      });
      profileForm.form.phone.error = true;
      setProfile(profileForm.form);
      return;
    }
    connector({
      url: Object.keys(selectedRow).length
        ? `${endPoints.USER}/${selectedRow.id}/admin`
        : `${endPoints.USER}/admin`,
      method: Object.keys(selectedRow).length ? "PUT" : "POST",
      data: profileForm.rawData,
      success: (response) => {
        setSelectedRow(response.data);
        if (Object.keys(selectedRow).length) {
          setClients(
            clients.map((cl) =>
              cl.id === response.data.id ? response.data : cl
            )
          );
          setMessage({
            type: "success",
            text: "Vos modifications ont bien été prises en compte.",
          });
        } else {
          setClients([...clients, response.data]);
          setMessage({
            type: "success",
            text: "Administrateur ajouté avec succès.",
          });
        }
      },
      catch: (error) => {
        setMessage({
          type: "error",
          text: getMsgError(error),
        });
      },
    });
  };

  const closeSide = () => {
    setOpenSide(false);
    setSelectedRow({});
  };

  return (
    <AdminBase>
      <BlocAdminContent>
        <DashboardContent titlePage="Administrateurs">
          <ServicesTableStyle>
            <ButtonDef
              //spinner={isPending}
              onClick={() => setActiveRow({})}
              textButton={
                <>
                  {!isMobile && "Nouvel administrateur "}
                  <AddGreenIcon />{" "}
                </>
              }
              className="btn-add"
            />
            <Tableau
              columns={[
                { key: "lastName", text: "Nom", sort: true },
                { key: "firstName", text: "Prénom", sort: true },
                { key: "email", text: "Email", sort: true },
                { key: "phone", text: "Téléphone", sort: true },
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
                title={
                  Object.keys(selectedRow).length
                    ? `${profile.firstName.value} ${profile.lastName.value}`
                    : "Nouvel administrateur"
                }
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
                  <Input
                    {...profile.phone}
                    onChange={(e) => {
                      const cpState = { ...profile };
                      cpState.phone.value = getDigits(e.target.value);
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
                    {moment(selectedRow.createdAt).isValid() &&
                      moment(selectedRow.createdAt).format("DD/MM/YYYY")}
                  </span>
                </BlocInfo>
              </DsdContent>
            </DevisSideDetail>
          </DashboardSide>
        ) : null}
      </BlocAdminContent>
    </AdminBase>
  );
}
