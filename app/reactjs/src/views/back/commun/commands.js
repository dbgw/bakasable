import React, { useState, useEffect } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
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
import { ButtonDef, Input } from "../../../components/ui";
import DsdHeader from "../../../components/devis/devis-side-details/dsdHeader";
import DsdContent from "../../../components/devis/devis-side-details/dsdContent";
import DsdAction from "../../../components/devis/devis-side-details/dsdAction";
import BlocInfo from "../../../components/devis/blocks/blocInfo";
import { DashCardsStyle } from "../../../assets/styles/devisStyles";
import {
  IconCardPeople,
  IconCardCheck,
  IconCardWating,
  PDFIcon,
} from "../../../assets/styles/icons";
import connector from "../../../connector";
import endPoints from "../../../config/endPoints";
import moment from "moment";
import ROUTES from "../../../config/routes";
import { ROLES } from "../../../vars";
import {
  getUniqueItemsByProperties,
  getPathImage,
  capitalizeFirstLetter,
  getMsgError,
} from "../../../helper/functions";
import { NotificationManager } from "react-notifications";
import PopinModal from "../../../components/ui-elements/popinModal";
import { validForm } from "../../../helper/form";
import BlocAuth from "../../../components/devis/blocks/blocAuth";
import { useMediaQuery } from "react-responsive";
import CloseButton from "../../../components/ui-elements/closeButton";
import { BtnFile, FileBox } from "../../../assets/styles/componentStyles";

export default withRouter(function Commands({ match }) {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const query = new URLSearchParams(useLocation().search);
  const defaultRepairman = query.get("repairman")
    ? parseInt(query.get("repairman"))
    : false;
  const defaultClient = query.get("client")
    ? parseInt(query.get("client"))
    : false;
  const [activeCommand, setActiveCommand] = useState(
    query.get("id") ? parseInt(query.get("id")) : false
  );
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const [openSide, setOpenSide] = useState(false);
  const [showModalReject, setShowModalReject] = useState(false);
  const [finishingCommand, setFinishingCommand] = useState(false);
  const [showModalFinished, setShowModalFinished] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [countReport, setCountReport] = useState(false);
  const [totalCommands, setTotalCommands] = useState(0);
  const [perPage, setPerPage] = useState(20);
  const [pageIndex, setPageIndex] = useState(0);
  const [activeSort, setActiveSort] = useState("id");
  const [switshSort, setSwitshSort] = useState(false);
  const [isClient] = useState(auth.roles.includes(ROLES.ROLE_CLIENT));
  const [isAdmin] = useState(auth.roles.includes(ROLES.ROLE_ADMIN));
  const [isRepairman] = useState(auth.roles.includes(ROLES.ROLE_REPAIRMAN));
  const [isPending, setIsPending] = useState(false);

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
        {
          label: "En attente",
          value: 1,
          icon: <LabelStatus type={1} hideText />,
        },
        {
          label: "Terminé",
          value: 5,
          icon: <LabelStatus type={5} hideText />,
        },
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
      required: auth.roles.includes(ROLES.ROLE_REPAIRMAN),
      value: "",
      error: false,
      errorMessage: "",
      required: false,
    },
    fileFacture: {
      type: "file",
      id: "facture_file",
      label: "Ajouter une facture (à minima jpg, png, pdf)",
      name: "facture_file",
      nameFile: "",
      value: "",
      file: null,
    },
  });

  const [commands, setCommands] = useState([]);

  useEffect(() => {
    if (match.params.filter) {
      const cpFilter = { ...filter };
      cpFilter.client.value = match.params.filter;
      setFilter(cpFilter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.params.filter]);

  useEffect(() => {
    if (auth.user) {
      const cpState = { ...state };
      cpState.raison.required = auth.roles.includes(ROLES.ROLE_REPAIRMAN);
      setState(cpState);
    }
  }, [auth.user]);

  useEffect(() => {
    getCountReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isClient) {
      connector({
        url: `${endPoints.USERS_COMMANDS_CLIENTS}?order[firstName]=asc&order[lastName]=asc`,
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
        url: `${endPoints.USERS_COMMANDS_REPAIRMANS}?order[enterprise]=asc`,
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
      url: `${endPoints.COMMANDS}/ids?order[id]=desc`,
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
    let url = `${endPoints.COMMANDS}?page=${pageIndex + 1}&itemsPerPage=${perPage}&order[${activeSort}]=${switshSort ? "asc" : "desc"}`;
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
        setCommands(response.data["hydra:member"]);
        setTotalCommands(response.data["hydra:totalItems"]);
        if (activeCommand) {
          const obj = response.data["hydra:member"].find(
            (dvl) => dvl.id === activeCommand
          );
          if (obj) {
            setActiveRow(obj);
          }
          setActiveCommand(false);
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
      url: `${endPoints.COMMANDS}/count`,
      success: (response) => {
        setCountReport(response.data);
      },
      catch: (err) => {
        console.log(err);
      },
    });
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
          <div className="no-wrap">{`${row.client.firstName} ${row.client.lastName}`}</div>
        </div>
      )}
      {!isRepairman && (
        <div className="divTableCell">
          {isMobile && <label> Réparateur: </label>}
          <div className="no-wrap">{`${row.benefit.user.enterprise}`}</div>
        </div>
      )}

      <div className="divTableCell">
        {isMobile && <label> N° de commande: </label>}
        <div>{row.id}</div>
      </div>
      <div className="divTableCell">
        {isMobile && <label> Type: </label>}
        <div>{capitalizeFirstLetter(row.type)}</div>
      </div>
      <div className="divTableCell">
        {isMobile && <label> Nom du service: </label>}
        <div className="name-commande">{row.title}</div>
      </div>
      <div className="divTableCell">
        {isMobile && <label> Commandé le: </label>}
        <div className="sd">{moment(row.createdAt).format("DD/MM/YYYY")}</div>
      </div>
      <div className="divTableCell">
        {isMobile && <label> Montant : </label>}
        <div>{ifNegatifReturn0(row.total).toFixed(2)}€</div>
      </div>
      {!isClient && (
        <div className="divTableCell">
          {isMobile && <label> Réglé : </label>}
          <div>{row.adjust ? "Oui" : "-"}</div>
        </div>
      )}
      <div className="divTableCell">
        {isMobile && <label> Facture : </label>}
        <div>
          {row.facture ? (
            <a
              target="_blank"
              rel="noreferrer"
              href={getPathImage(row.facture)}
              download
              title="Télécharger"
            >
              <PDFIcon />
            </a>
          ) : (
            "-"
          )}
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
              textButton="Voir la commande"
              onClick={() => setActiveRow(row)}
            />
          </div>
        </div>
      )}
    </div>
  );

  const cancelCommand = (e) => {
    e.preventDefault();
    const validationForm = validForm(state);
    setState(validationForm.form);
    if (!validationForm.valid) return;

    setIsPending(true);
    connector({
      url: `${endPoints.COMMANDS}/cancel/${selectedRow.id}`,
      method: "PUT",
      data: {
        rejectRaison: state.raison.value,
      },
      success: (response) => {
        setIsPending(false);
        setSelectedRow(response.data);
        setCommands(
          commands.map((devi) =>
            devi.id === response.data.id ? response.data : devi
          )
        );
        NotificationManager.success("Commande annulée", "");
        setShowModalReject(false);
        getCountReport();
      },
      catch: (error) => {
        setIsPending(false);
        NotificationManager.error(getMsgError(error), "");
      },
    });
  };

  const finishCommand = (e) => {
    e.preventDefault();
    if (finishingCommand) return;
    setFinishingCommand(true);
    setIsPending(true);
    if (state.fileFacture.file) {
      const data = new FormData();
      data.append("type", "alltypes");
      data.append("file", state.fileFacture.file);
      connector({
        method: "post",
        url: endPoints.ANONYMOUS_MEDIA_OBJECT,
        data,
        success: (response) => {
          save(e, response.data.contentUrl);
        },
        catch: (error) => {
          setIsPending(false);
          setFinishingCommand(false);
          NotificationManager.error(getMsgError(error), "");
        },
      });
    } else save(e);
  };

  const save = (e, file = null) => {
    setIsPending(true);
    connector({
      url: `${endPoints.COMMANDS}/finish/${selectedRow.id}`,
      method: "PUT",
      data: { file: file },
      success: (response) => {
        setIsPending(false);
        setSelectedRow(response.data);
        setCommands(
          commands.map((devi) =>
            devi.id === response.data.id ? response.data : devi
          )
        );
        NotificationManager.success("Commande terminée", "");
        setShowModalFinished(false);
        setFinishingCommand(false);
        const cpState = { ...state };
        cpState.fileFacture.file = null;
        e.target.value = "";
        setState(cpState);
        getCountReport();
      },
      catch: (error) => {
        setIsPending(false);
        setFinishingCommand(false);
        NotificationManager.error(getMsgError(error), "");
      },
    });
  };

  const getColumns = () => {
    let columns = [];
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

    columns = [
      ...columns,
      { key: "id", text: "N° de commande", sort: true },
      { key: "type", text: "Type", sort: true },
      { key: "title", text: "Nom du service", sort: true },
      { key: "createdAt", text: "Commandé le", sort: true },
      { key: "total", text: "Montant", sort: true },
    ];
    if (!isClient)
      columns.push({
        key: "regle",
        text: "Réglé",
        sort: false,
      });
    columns = [
      ...columns,
      { key: "facture", text: "Facture", sort: false },
      { key: "status", text: "Statut" },
    ];
    return columns;
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

  const ifNegatifReturn0 = (val) => (!val || val < 0 ? 0 : val);

  const getUrlFicheBenefit = () => {
    return `/univers/${selectedRow.urlBenefit}`;
  };

  return (
    <AdminBase>
      <BlocAdminContent>
        <DashboardContent titlePage="Mes Commandes">
          {totalCommands || (countReport && countReport.count) ? (
            <>
              <DashCardsStyle>
                <div className="row">
                  <div className="col-md-4">
                    <IconCard
                      icon={<IconCardPeople />}
                      text="Commandes en attente"
                      nbr={countReport.commands_en_attente}
                    />
                  </div>
                  <div className="col-md-4">
                    <IconCard
                      icon={<IconCardCheck />}
                      text="Commandes terminées"
                      nbr={countReport.commands_finished}
                    />
                  </div>
                  <div className="col-md-4">
                    <IconCard
                      icon={<IconCardWating />}
                      text="Commandes annulées"
                      nbr={countReport.commands_canceled}
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
                            label: "Tous les N° de commande",
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
                  totalItemsLength={totalCommands}
                  data={commands}
                  rowRender={rowRender}
                />
              </ServicesTableStyle>

              <div className="my-3">
                <LabelStatus type={1} />
                <LabelStatus type={4} customText="Annulé" />
                <LabelStatus type={5} customText="Terminé" />
                {/* <LabelStatus type={4} /> */}
              </div>
            </>
          ) : (
            <NoData>Aucune commande</NoData>
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
                title={"Commande #" + selectedRow.id}
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
                      Commande demandée le{" "}
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
                <BlocInfo withBorder>
                  <h3 className="success-style w-lg">
                    Montant TTC :{" "}
                    {ifNegatifReturn0(selectedRow.total).toFixed(2)}€
                  </h3>
                  {selectedRow.facture ? (
                    <a
                      className="dwn-file-commande"
                      href={getPathImage(selectedRow.facture)}
                      target="_blank"
                      rel="noreferrer"
                      download
                    >
                      Télécharger la facture
                    </a>
                  ) : null}
                </BlocInfo>
              </DsdContent>
              <DsdAction>
                {!isAdmin && (
                  <ButtonDef
                    className="btn-light"
                    onClick={contact}
                    textButton="Contacter"
                  />
                )}
                {/* // FINGZ-329 */}
                {(!selectedRow.paidDevis || !selectedRow.isDevisSend) &&
                  ((isClient &&
                    selectedRow.status === 1 /* &&
                    !selectedRow.rightToCancel &&
                    selectedRow.pastDay <= 14 */) ||
                    (isRepairman && selectedRow.status === 1) ||
                    (isAdmin &&
                      (selectedRow.status === 1 || selectedRow.status === 5) &&
                      !selectedRow.adjust)) && (
                    <ButtonDef
                      textButton="Annuler"
                      className="btn-orange"
                      spinner={isPending}
                      onClick={(e) => {
                        setShowModalReject(true);
                      }}
                    />
                  )}
              </DsdAction>
              <DsdAction>
                {isRepairman &&
                  !selectedRow.paidDevis &&
                  selectedRow.status === 1 && (
                    <ButtonDef
                      textButton="J’ai effectué la prestation"
                      className="w-100"
                      spinner={isPending}
                      onClick={(e) => {
                        setShowModalFinished(true);
                      }}
                    />
                  )}
              </DsdAction>
            </DevisSideDetail>
            <PopinModal
              show={showModalReject}
              handleClose={() => {
                setShowModalReject(false);
              }}
              title={`Refuser la commande #${selectedRow.id}`}
            >
              <form onSubmit={cancelCommand}>
                <Input
                  {...state.raison}
                  onChange={(e) => {
                    const cpState = { ...state };
                    cpState.raison.value = e.target.value;
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
                  <ButtonDef
                    textButton="Confirmer le refus"
                    spinner={isPending}
                  />
                </DsdAction>
              </form>
            </PopinModal>
            <PopinModal
              show={showModalFinished}
              handleClose={() => {
                setShowModalFinished(false);
              }}
              title={`Réalisation de la commande #${selectedRow.id}`}
            >
              <form onSubmit={finishCommand}>
                <FileBox>
                  <div className="form-group">
                    {state.fileFacture.label && (
                      <label>{state.fileFacture.label}</label>
                    )}
                    <div className="file-wrapper">
                      <input
                        type="file"
                        name={state.fileFacture.name}
                        id={state.fileFacture.id}
                        accept="image/png, image/jpeg, application/pdf"
                        onChange={(e) => {
                          if (e?.target?.files[0]?.name) {
                            //e.preventDefault();
                            const cpState = { ...state };
                            cpState.fileFacture.nameFile =
                              e.target.files[0].name;
                            cpState.fileFacture.file = e.target.files[0];
                            cpState.fileFacture.error = false;
                            //e.target.value = "";
                            setState(cpState);
                          }
                        }}
                        className="inputfile"
                      />
                      <BtnFile htmlFor={state.fileFacture.id}>
                        Parcourir
                      </BtnFile>
                    </div>
                  </div>
                </FileBox>

                <DsdAction>
                  <ButtonDef
                    textButton="Annuler"
                    className="btn-light"
                    spinner={isPending}
                    onClick={(e) => {
                      e.preventDefault();
                      setShowModalFinished(false);
                    }}
                  />
                  <ButtonDef textButton="Confirmer" spinner={isPending} />
                </DsdAction>
              </form>
            </PopinModal>
          </DashboardSide>
        ) : null}
      </BlocAdminContent>
    </AdminBase>
  );
});
