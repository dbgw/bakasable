import React, { useState, useEffect } from "react";
import { Link, useHistory, withRouter, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminBase from "../../../theme/back/adminBase";
import DashboardContent from "../../../components/dashboardContent";
import DashboardSide from "../../../components/dashboardSide";
import {
  BlocAdminContent,
  NoData,
} from "../../../assets/styles/adminStyle/adminGlobalStyle";
import IconCard from "../../../components/devis/iconCard";
import LabelStatus from "../../../components/devis/labelStatus";
import { ServicesTableStyle } from "../../../assets/styles/adminStyle/adminGlobalStyle";
import Tableau from "../../../components/ui-elements/tableau";
import FilterDefault from "../../../components/filterDefault";
import Select from "../../../components/ui-elements/select";
import DevisSideDetail from "../../../components/devis/devis-side-details/devisSideDetail";
import { ButtonDef, Input, SingleCheckbox } from "../../../components/ui";
import DsdHeader from "../../../components/devis/devis-side-details/dsdHeader";
import DsdContent from "../../../components/devis/devis-side-details/dsdContent";
import DsdAction from "../../../components/devis/devis-side-details/dsdAction";
import BlocInfo from "../../../components/devis/blocks/blocInfo";
import { DashCardsStyle } from "../../../assets/styles/devisStyles";
import {
  IconCardPeople,
  IconCardCheck,
  IconCardWating,
} from "../../../assets/styles/icons";
import connector from "../../../connector";
import endPoints from "../../../config/endPoints";
import moment from "moment";
import ROUTES from "../../../config/routes";
import { ROLES } from "../../../vars";
import {
  calcDevisLine,
  downloadFile,
  getPathImage,
  getUniqueItemsByProperties,
} from "../../../helper/functions";
import { NotificationManager } from "react-notifications";
import PopinModal from "../../../components/ui-elements/popinModal";
import { validForm } from "../../../helper/form";
import BlocAuth from "../../../components/devis/blocks/blocAuth";
import { useMediaQuery } from "react-responsive";
import CloseButton from "../../../components/ui-elements/closeButton";

export default withRouter(function Devis({ match }) {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const perPageDesMob = isMobile ? 8 : 20;
  const query = new URLSearchParams(useLocation().search);
  const defaultRepairman = query.get("repairman")
    ? parseInt(query.get("repairman"))
    : false;
  const defaultClient = query.get("client")
    ? parseInt(query.get("client"))
    : false;
  const [activeDevis, setActiveDevis] = useState(
    query.get("id") ? parseInt(query.get("id")) : false
  );
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const [openSide, setOpenSide] = useState(false);
  const [showModalReject, setShowModalReject] = useState(false);
  const [showModalAccept, setShowModalAccept] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [countReport, setCountReport] = useState(false);
  const [totalDevis, setTotalDevis] = useState(0);
  const [perPage, setPerPage] = useState(perPageDesMob);
  const [pageIndex, setPageIndex] = useState(0);
  const [activeSort, setActiveSort] = useState("id");
  const [switshSort, setSwitshSort] = useState(false);
  const [isClient] = useState(auth.roles.includes(ROLES.ROLE_CLIENT));
  const [isAdmin] = useState(auth.roles.includes(ROLES.ROLE_ADMIN));
  const [isRepairman] = useState(auth.roles.includes(ROLES.ROLE_REPAIRMAN));
  const [isPending, setIsPending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [filter, setFilter] = useState({
    client: {
      placeholder: "Client",
      isSearchable: true,
      value: defaultClient,
      options: [],
    },
    repairman: {
      placeholder: "Réparateur",
      isSearchable: true,
      value: defaultRepairman,
      options: [],
    },
    command: {
      placeholder: "Id",
      isSearchable: true,
      value: false,
      options: [],
    },
    status: {
      placeholder: "Statut",
      options: [
        { label: "Tous les statuts", value: false },
        { label: "Nouveau", value: 0, icon: <LabelStatus type={0} hideText /> },
        {
          label: "En attente",
          value: 1,
          icon: <LabelStatus type={1} hideText />,
        },
        { label: "Accepté", value: 2, icon: <LabelStatus type={2} hideText /> },
        { label: "Refusé", value: 3, icon: <LabelStatus type={3} hideText /> },
        { label: "Annulé", value: 4, icon: <LabelStatus type={4} hideText /> },
      ],
      value: false,
    },
  });

  const [state, setState] = useState({
    raison: {
      label: "Raison: ",
      as: "textarea",
      name: "raison",
      placeholder: "",
      value: "",
      error: false,
      errorMessage: "",
      required: true,
    },
    newDevis: {
      label: "Demander un nouveau devis ",
      name: "newDevis",
      value: false,
      error: false,
      errorMessage: "",
      required: false,
    },
  });
  const [devis, setDevis] = useState([]);

  useEffect(() => {
    if (match.params.filter) {
      const cpFilter = { ...filter };
      cpFilter.client.value = match.params.filter;
      setFilter(cpFilter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.params.filter]);

  useEffect(() => {
    getCountReport();
  }, []);

  useEffect(() => {
    if (!isClient) {
      connector({
        url: `${endPoints.USERS_DEVIS_CLIENTS}?order[firstName]=asc&order[lastName]=asc`,
        success: (response) => {
          const cpFilters = { ...filter };
          cpFilters.client.options = response.data["hydra:member"].map(
            (cl) => ({
              value: cl.id,
              label: cl.firstName + " " + cl.lastName,
            })
          );
          //setCountReport(response.data);
        },
        catch: (err) => {
          console.log(err);
        },
      });
    }

    if (!isRepairman) {
      connector({
        url: `${endPoints.USERS_DEVIS_REPAIRMANS}?order[enterprise]=asc`,
        success: (response) => {
          const cpFilters = { ...filter };
          cpFilters.repairman.options = response.data["hydra:member"].map(
            (rep) => ({
              value: rep.id,
              label: rep.enterprise,
            })
          );
          //setCountReport(response.data);
        },
        catch: (err) => {
          console.log(err);
        },
      });
    }

    connector({
      url: `${endPoints.DEVIS}/ids?order[id]=desc`,
      success: (response) => {
        const cpFilters = { ...filter };
        cpFilters.command.options = response.data["hydra:member"].map((c) => ({
          value: c.id,
          label: c.id,
        }));
      },
      catch: (err) => {
        console.log(err);
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.role]);

  useEffect(() => {
    let url = `${endPoints.DEVIS}?page=${pageIndex + 1}&itemsPerPage=${perPage}&order[${activeSort}]=${switshSort ? "asc" : "desc"}`;
    if(filter.client.value){
      url += `&client.id=${filter.client.value}`;
    }
    if(filter.repairman.value){
      url += `&benefit.user.id=${filter.repairman.value}`;
    }
    if(filter.status.value!== false){
      url += `&status=${filter.status.value}`;
    }
    if(filter.command.value!== false){
      url += `&id=${filter.command.value}`;
    }
    connector({
      url: url,
      success: (response) => {
        setDevis(response.data["hydra:member"]);
        setTotalDevis(response.data["hydra:totalItems"]);
        if (activeDevis) {
          const obj = response.data["hydra:member"].find(
            (dvl) => dvl.id === activeDevis
          );
          if (obj) {
            setActiveRow(obj);
            setActiveDevis(false);
          }
        }
      },
      catch: (err) => {
        console.log(err);
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter.client.value, filter.repairman.value, filter.command.value, filter.status.value, perPage, pageIndex, activeSort, switshSort]);

  const getCountReport = () => {
    connector({
      url: `${endPoints.DEVIS}/count`,
      success: (response) => {
        setCountReport(response.data);
      },
      catch: (err) => {
        console.log(err);
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const setActiveRow = (item = {}) => {
    if (parseInt(item.id) === parseInt(selectedRow.id)) {
      setSelectedRow({});
      setOpenSide(false);
    } else {
      setSelectedRow(item);
      setOpenSide(true);
    }
  };

  const rowRender = (row) => (
    <div
      onClick={() => setActiveRow(row)}
      className={`divTableRow ${selectedRow.id === row.id ? "active" : ""}`}
      key={`row-${row.id}`}
    >
      {!isClient && (
        <div className="divTableCell">
          {isMobile && <label> Client: </label>}
          <div>{`${row.client.firstName} ${row.client.lastName}`}</div>
        </div>
      )}
      {!isRepairman && (
        <div className="divTableCell">
          {isMobile && <label> Réparateur: </label>}
          <div>{`${row.benefit.user.enterprise}`}</div>
        </div>
      )}

      <div className="divTableCell">
        {isMobile && <label> N° du devis: </label>}
        <div>{row.id}</div>
      </div>
      <div className="divTableCell">
        {isMobile && <label> Nom du service: </label>}
        <div>{row.title}</div>
      </div>
      <div className="divTableCell">
        {isMobile && <label> Commandé le: </label>}
        <div>{moment(row.createdAt).format("DD/MM/YYYY")}</div>
      </div>
      <div className="divTableCell">
        {isMobile && <label> Valide jusqu'au: </label>}
        <div>
          {row.validationDate
            ? moment(row.validationDate).format("DD/MM/YYYY")
            : "-"}
        </div>
      </div>
      <div className="divTableCell">
        {isMobile && <label> Statut: </label>}
        <div>
          <LabelStatus
            type={row.status}
            hideText={!isMobile}
            active={selectedRow.id === row.id}
          />
        </div>
      </div>
      {isMobile && (
        <div className="divTableCell m-action">
          <div>
            <ButtonDef
              textButton="Voir le devis"
              onClick={() => setActiveRow(row)}
            />
          </div>
        </div>
      )}
    </div>
  );

  const setStatusReject = (e) => {
    e.preventDefault();
    const validationForm = validForm(state);
    setState(validationForm.form);
    if (!validationForm.valid) return;
    setIsPending(true);
    connector({
      url: `${endPoints.DEVIS}/reject/${selectedRow.id}`,
      method: "PUT",
      data: {
        rejectRaison: state.raison.value,
        newDevis: state.newDevis.value,
      },
      success: (response) => {
        setIsPending(false);
        setSelectedRow({ ...response.data });
        setDevis(
          devis.map((devi) =>
            devi.id === response.data.id ? response.data : devi
          )
        );
        NotificationManager.success("Devis refusé", "");
        setShowModalReject(false);
        getCountReport();
      },
      catch: (err) => {
        setIsPending(false);
        console.log(err);
      },
    });
  };

  const setStatusAccept = (e) => {
    e.preventDefault();
    const idDeliveryMode = selectedRow.deliveryMode.id;
    history.push(
      `/univers/${selectedRow.urlBenefit}/demande/${idDeliveryMode}?command=${selectedRow.id}`
    );
  };

  const getColumns = () => {
    const columns = [];
    if (!isClient)
      columns.push({
        key: "client.firstName",
        text: "Clients",
        sort: true,
      });
    if (!isRepairman)
      columns.push({
        key: "benefit.user.enterprise",
        text: "Réparateurs",
        sort: true,
      });
    return [
      ...columns,
      { key: "id", text: "N° du devis", sort: true },
      { key: "title", text: "Nom du service", sort: true },
      { key: "createdAt", text: "Commandé le", sort: true },
      {
        key: "validationDate",
        text: "Valide jusqu'au",
        sort: true,
      },
      { key: "status", text: "Statut" },
    ];
  };

  const closeSide = () => {
    setOpenSide(false);
    setSelectedRow({});
  };

  const contact = () => {
    connector({
      url: endPoints.THREADS,
      method: "post",
      data: {
        user: isClient ? selectedRow.benefit.user.id : selectedRow.client.id,
      },
      success: (response) => {
        history.push(`${ROUTES.MESSAGERIE.url}/${response.data.id}`);
      },
      catch: (err) => console.log(err),
    });
  };

  const ifNegatifReturn0 = (val) => (val < 0 ? 0 : val);

  const getUrlFicheBenefit = () => {
    return `/univers/${selectedRow.urlBenefit}`;
  };

  

  return (
    <AdminBase>
      <BlocAdminContent>
        <DashboardContent titlePage="Mes Devis">
          {totalDevis || (countReport && countReport.count) ? (
            <>
              <DashCardsStyle>
                <div className="row">
                  <div className="col-md-4">
                    <IconCard
                      icon={<IconCardPeople />}
                      text="Nouvelles demandes"
                      nbr={countReport.new_commandes || 0}
                    />
                  </div>
                  <div className="col-md-4">
                    <IconCard
                      icon={<IconCardCheck />}
                      text="Devis acceptés"
                      nbr={countReport.devis_accepte || 0}
                    />
                  </div>
                  <div className="col-md-4">
                    <IconCard
                      icon={<IconCardWating />}
                      text="Devis en attente"
                      nbr={countReport.devis_en_attente || 0}
                    />
                  </div>
                </div>
              </DashCardsStyle>

              <FilterDefault
                className="services-filter"
                formItems={
                  <>
                    {!isClient && (
                      <Select
                        {...filter.client}
                        options={getUniqueItemsByProperties(
                          [
                            {
                              label: "Tous les clients",
                              value: false,
                            },
                            ...filter.client.options,
                          ],
                          ["value", "label"]
                        )}
                        onChange={(e) => {
                          const cpFilter = { ...filter };
                          cpFilter.client.value = e.value;
                          setFilter(cpFilter);
                          setPageIndex(0);
                        }}
                      />
                    )}
                    {!isRepairman && (
                      <Select
                        {...filter.repairman}
                        options={getUniqueItemsByProperties(
                          [
                            {
                              label: "Tous les réparateurs",
                              value: false,
                            },
                            ...filter.repairman.options,
                          ],
                          ["value", "label"]
                        )}
                        onChange={(e) => {
                          const cpFilter = { ...filter };
                          cpFilter.repairman.value = e.value;
                          setFilter(cpFilter);
                          setPageIndex(0);
                        }}
                      />
                    )}

                    <Select
                      {...filter.command}
                      options={getUniqueItemsByProperties(
                        [
                          {
                            label: "Tous les N° de devis",
                            value: false,
                          },
                          ...filter.command.options,
                        ],
                        ["value", "label"]
                      )}
                      onChange={(e) => {
                        const cpFilter = { ...filter };
                        cpFilter.command.value = e.value;
                        setFilter(cpFilter);
                        setPageIndex(0);
                      }}
                    />

                    <Select
                      {...filter.status}
                      onChange={(e) => {
                        const cpFilter = { ...filter };
                        cpFilter.status.value = e.value;
                        setFilter(cpFilter);
                        setPageIndex(0);
                      }}
                    />
                  </>
                }
              />

              <ServicesTableStyle>
                <Tableau
                  columns={getColumns()}
                  perPage={perPage}
                  setPerPage={setPerPage}
                  pageIndex={pageIndex}
                  setPageIndex={setPageIndex}
                  activeSort={activeSort}
                  setActiveSort={setActiveSort}
                  switshSort={switshSort}
                  setSwitshSort={setSwitshSort}
                  pagination={true}
                  totalItemsLength={totalDevis}
                  data={devis}
                  rowRender={rowRender}
                />
              </ServicesTableStyle>

              <div className="my-3 devis-actions">
                <LabelStatus type={0} />
                <LabelStatus type={3} customText="Refusé, Annulé" />
                <LabelStatus type={1} />
                <LabelStatus type={2} />
                {/* <LabelStatus type={4} /> */}
              </div>
            </>
          ) : (
            <NoData>Aucun devis</NoData>
          )}
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
                title={"Devis #" + selectedRow.id}
                statusType={selectedRow.status}
              />
              <DsdContent>
                <Link to={isAdmin ? `${getUrlFicheBenefit()}` : "#"}>
                  <h2
                    className="content-title"
                    style={isAdmin ? { textDecoration: "underline" } : {}}
                  >
                    {selectedRow.title}
                  </h2>
                </Link>

                {!isRepairman && (
                  <BlocAuth
                    imgUrl={getPathImage(selectedRow.benefit.user.picture)}
                    imgAlt={`${selectedRow.benefit.user.enterprise}`}
                    name={
                      <Link
                        style={
                          isAdmin
                            ? {
                                textDecoration: "underline",
                                color: "#000",
                                fontWeight: "600",
                              }
                            : {
                                textDecoration: "none",
                                color: "#000",
                                fontWeight: "600",
                              }
                        }
                        to={
                          isAdmin
                            ? `${ROUTES.REPARATEURS.url}?user=${selectedRow.benefit.user.id}`
                            : "#"
                        }
                      >
                        {selectedRow.benefit.user.enterprise}
                      </Link>
                    }
                  />
                )}

                {!isClient && (
                  <BlocInfo>
                    <h3>
                      {isAdmin ? (
                        <>
                          Client:{" "}
                          <Link
                            to={`${ROUTES.CLIENTS.url}?idclient=${selectedRow.client.id}`}
                          >{`${selectedRow.client.firstName} ${selectedRow.client.lastName}`}</Link>{" "}
                        </>
                      ) : (
                        `${selectedRow.client.firstName} ${selectedRow.client.lastName}`
                      )}
                    </h3>
                    <span>
                      Devis demandé le{" "}
                      {moment(selectedRow.createdAt).format("DD/MM/YYYY")}
                    </span>
                  </BlocInfo>
                )}

                <BlocInfo>
                  <h4 className="success-style">
                    Mode de délivrance souhaité :
                  </h4>
                  <p>{selectedRow.deliveryMode.deliveryModeType.name}</p>
                </BlocInfo>
                {selectedRow.deliveryMode.deliveryModeType
                  .requireDeliveryAddress && (
                  <BlocInfo>
                    <h4 className="success-style">Adresse de livraison :</h4>
                    <p>
                      {selectedRow.address}, {selectedRow.additionalAddress},{" "}
                      {selectedRow.postalCode}, {selectedRow.city}
                    </p>
                  </BlocInfo>
                )}
                <BlocInfo withBorder>
                  {!!selectedRow?.title?.length && (
                    <h4 className="warning-style w-lg">
                      Titre du devis : {selectedRow.title}
                    </h4>
                  )}
                  {selectedRow.dateSend ? (
                    <p>
                      Emis le:{" "}
                      {moment(selectedRow.dateSend).format("DD/MM/YYYY")}
                    </p>
                  ) : null}
                  {selectedRow.validationDate ? (
                    <p>
                      Valide jusqu’au:{" "}
                      {moment(selectedRow.validationDate).format("DD/MM/YYYY")}
                    </p>
                  ) : null}
                  {selectedRow.acceptanceDate &&
                  selectedRow.status != 3 &&
                  selectedRow.status != 4 ? (
                    <p>
                      Accepté le :{" "}
                      {moment(selectedRow.acceptanceDate).format("DD/MM/YYYY")}
                    </p>
                  ) : null}
                  {selectedRow.rejectionDate ? (
                    <p>
                      Refusé le:{" "}
                      {moment(selectedRow.rejectionDate).format("DD/MM/YYYY")}
                    </p>
                  ) : null}
                  {selectedRow.cancellationDate ? (
                    <p>
                      Annulé le:{" "}
                      {moment(selectedRow.cancellationDate).format(
                        "DD/MM/YYYY"
                      )}
                      {selectedRow.updatedBy && (
                        <>
                          {" "}
                          par
                          {selectedRow.updatedBy.roles.includes(ROLES.ROLE_CLIENT) &&
                            ` le client ${selectedRow.updatedBy.firstName} ${selectedRow.updatedBy.lastName}`}
                          {selectedRow.updatedBy.roles.includes(ROLES.ROLE_REPAIRMAN) &&
                            ` le réparateur ${selectedRow.updatedBy.enterprise}`}
                          {selectedRow.updatedBy.roles.includes(ROLES.ROLE_ADMIN) && ` l'administrateur du site`}
                        </>
                      ) }
                    </p>
                  ) : null}

                  {selectedRow.rejectRaison && <p>{selectedRow.rejectRaison}</p>}
                </BlocInfo>
                {!!selectedRow.total && !!selectedRow.benefit.priceQuote && (
                  <BlocInfo>
                    <h4 className="success-style">Prix du devis : </h4>
                    <p>
                      {selectedRow.benefit.priceQuote?.toFixed(2)} € TTC
                      {selectedRow.adjuste ? "(réglé)" : ""}
                    </p>
                  </BlocInfo>
                )}

                {!!selectedRow.devisLines.length && (
                  <BlocInfo withBorder>
                    <h3 className="success-style w-lg">
                      Montant TTC :{" "}
                      {ifNegatifReturn0(
                        selectedRow.devisLines
                          .map(
                            (dl) =>
                              calcDevisLine(
                                dl.qte,
                                dl.unityPrice,
                                dl.reduction,
                                dl.tva
                              ).priceTotalTtc
                          )
                          .reduce((a, b) => a + b, 0)
                      ).toFixed(2)}
                      €
                    </h3>
                    <h4 className="warning-style w-lg">
                      Montant HT :{" "}
                      {ifNegatifReturn0(
                        selectedRow.devisLines
                          .map(
                            (dl) =>
                              calcDevisLine(
                                dl.qte,
                                dl.unityPrice,
                                dl.reduction,
                                dl.tva
                              ).priceTotalHt
                          )
                          .reduce((a, b) => a + b, 0)
                      ).toFixed(2)}
                      €
                    </h4>
                    <ButtonDef
                      onClick={(e) => {
                        e.preventDefault();
                        setIsLoading(true);
                        downloadFile(
                          `${endPoints.EXPORT_DEVIS}/${selectedRow.id}`,
                          `Devis#${selectedRow.id}.pdf`,
                           setIsLoading
                        );
                      }}
                      className="link-download-btn"
                      spinner={isLoading}
                      textButton="Télécharger le devis"
                    />
                  </BlocInfo>
                )}
              </DsdContent>
              {!isAdmin && (
                <DsdAction>
                  <ButtonDef
                    className="btn-light"
                    onClick={contact}
                    textButton="Contacter"
                  />
                  {isClient && selectedRow.status === 1 && (
                    <>
                      <ButtonDef
                        className="btn-orange"
                        textButton="Refuser le devis"
                        spinner={isPending}
                        onClick={(e) => {
                          e.preventDefault();
                          setShowModalReject(true);
                        }}
                      />
                      <ButtonDef
                        textButton="Accepter le devis"
                        spinner={isPending}
                        onClick={(e) => {
                          e.preventDefault();
                          setShowModalAccept(true);
                        }}
                      />
                    </>
                  )}
                  {isRepairman && (
                    <ButtonDef
                      textButton="Editer le devis"
                      onClick={(e) => {
                        history.push(
                          `${ROUTES.REPA_CREATE_DEVIS.url}/${selectedRow.id}`
                        );
                      }}
                    />
                  )}
                </DsdAction>
              )}
            </DevisSideDetail>
          </DashboardSide>
        ) : null}

        <PopinModal
          show={showModalReject}
          handleClose={() => {
            setShowModalReject(false);
          }}
          title={`Refuser le devis#${selectedRow.id}`}
        >
          <form onSubmit={setStatusReject}>
            <Input
              {...state.raison}
              onChange={(e) => {
                const cpState = { ...state };
                cpState.raison.value = e.target.value;
                setState(cpState);
              }}
            />
            <SingleCheckbox
              {...state.newDevis}
              onChange={(e) => {
                const cpState = { ...state };
                cpState.newDevis.value = e.target.checked;
                setState(cpState);
              }}
            />
            <DsdAction>
              <ButtonDef
                textButton="Annuler"
                className="btn-light"
                spinner={isPending}
                onClick={(e) => {
                  e.preventDefault();
                  setShowModalReject(false);
                }}
              />
              <ButtonDef textButton="Confirmer le refus" spinner={isPending} />
            </DsdAction>
          </form>
        </PopinModal>
        <PopinModal
          show={showModalAccept}
          handleClose={() => {
            setShowModalAccept(false);
          }}
          title={`Accepter le devis#${selectedRow.id} et régler la prestation`}
        >
          <form onSubmit={setStatusAccept}>
            <DsdAction>
              <ButtonDef
                textButton="Annuler"
                className="btn-light"
                spinner={isPending}
                onClick={(e) => {
                  e.preventDefault();
                  setShowModalAccept(false);
                }}
              />
              <ButtonDef textButton="Confirmer" spinner={isPending} />
            </DsdAction>
          </form>
        </PopinModal>
      </BlocAdminContent>
    </AdminBase>
  );
});
