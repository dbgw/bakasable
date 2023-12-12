import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Form } from "react-bootstrap";
import { useHistory, withRouter } from "react-router-dom";
import moment from "moment";
import Carousel, { Modal, ModalGateway } from "react-images";
import AdminBase from "../../../theme/back/adminBase";
import DashboardContent from "../../../components/dashboardContent";
import DashboardSide from "../../../components/dashboardSide";
import Input from "../../../components/ui-elements/input";
import DatePickerInput from "../../../components/ui-elements/datePickerInput";
import DevisSideDetail from "../../../components/devis/devis-side-details/devisSideDetail";
import { ButtonDef } from "../../../components/ui";
import DsdHeader from "../../../components/devis/devis-side-details/dsdHeader";
import DsdContent from "../../../components/devis/devis-side-details/dsdContent";
import BlocInfo from "../../../components/devis/blocks/blocInfo";
import BlocImages from "../../../components/devis/blocks/blocImages";
import SimpleTable from "../../../components/devis/simpleTable";
import Loader from "../../../components/loader";
import CloseButton from "../../../components/ui-elements/closeButton";
import PopinModal from "../../../components/ui-elements/popinModal";
import { BlocAdminContent } from "../../../assets/styles/adminStyle/adminGlobalStyle";
import { IconRemove } from "../../../assets/styles/icons";
import { TitlePage } from "../../../assets/styles/adminStyle/adminGlobalStyle";
import { InlineInputStyle } from "../../../assets/styles/devisStyles";
import { AddGreenIcon } from "../../../assets/styles/icons";
import connector from "../../../connector";
import endPoints from "../../../config/endPoints";
import ROUTES from "../../../config/routes";
import {
  calcDevisLine,
  downloadFile,
  getFloat,
  getMsgError,
  getPathImage,
} from "../../../helper/functions";
import { NotificationManager } from "react-notifications";

export default withRouter(function CreateDevis({ match }) {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const history = useHistory();
  const [openSide, setOpenSide] = useState(true);
  const [message, setMessage] = useState({ text: null, type: "error" });
  const [devis, setDevis] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const devisLine = {
    qte: {
      type: "text",
      name: "qte",
      value: 1,
      min: 1,
      empty: true,
      step: 1,
      className: "qte-devis",
      isNumber: true,
    },
    description: {
      type: "text",
      name: "description",
      value: "",
    },
    unityPrice: {
      type: "number",
      name: "unityPrice",
      value: 0,
      max: 9999,
      empty: true,
      isNumber: true,
      classInput: "input-num"
    },
    reduction: {
      type: "text",
      name: "reduction",
      value: 0,
      min: 0,
      max: 100,
      empty: true,
      isNumber: true,
    },
    tva: {
      type: "text",
      name: "tva",
      value: 0,
      min: 0,
      max: 100,
      empty: true,
      className: "tva-devis",
      isNumber: true,
    },
  };
  const [totalTTC, setTotalTTC] = useState(0);
  const [state, setState] = useState({
    title: {
      label: "Titre: ",
      name: "title",
      placeholder: "Titre",
      value: "Remplacement carte mère",
      type: "text",
      error: false,
      errorMessage: "",
      required: true,
    },
    valideUntil: {
      label: "Valide jusqu'au : ",
      name: "valideUntil",
      value: null,
    },
    note: {
      name: "note",
      placeholder: "Note ...",
      value: "",
      error: false,
      errorMessage: "",
      required: false,
      as: "textarea",
    },
    devis: [{ ...devisLine }],
  });

  const [currentImage, setCurrentImage] = useState(0);
  const [stateImage, setStateImage] = useState(false);
  const [dataGallery, setDataGallery] = useState([]);
  const openLightbox = (photo, index) => {
    setCurrentImage(index);
    setStateImage(true);
  };
  const closeLightbox = () => {
    setStateImage(false);
  };
  const [showModalError, setShowModalError] = useState(false);
  const [dataModalError, setDataModalError] = useState({
    title: "",
    type: "",
    description: "",
  });

  useEffect(() => {
    if (match.params.id) {
      connector({
        url: `${endPoints.COMMANDS}/${match.params.id}`,
        success: (response) => {
          const obj = response.data;
          setDevis({ ...obj });
          if (obj?.files && obj.files.length) {
            let dataGallery = [];
            for (let i = 0; i < obj.files.length; i++) {
              dataGallery.push({
                source: getPathImage(obj.files[i]),
              });
            }
            setDataGallery(dataGallery);
          }
        },
        catch: (err) => console.log(err),
      });
    }
  }, [match.params.id]);

  useEffect(() => {
    if (devis) {
      const cpState = { ...state };
      let disabled = devis.status !== 0;
      cpState.valideUntil.disabled =
        cpState.note.disabled =
        cpState.title.disabled =
          disabled;
      cpState.valideUntil.value = devis.validationDate
        ? new Date(devis.validationDate)
        : null;
      cpState.title.value = devis.title ?? devis.benefit.service.name;
      cpState.note.value = devis.extraNote;
      cpState.devis = devis.devisLines.length
        ? devis.devisLines.map((dl) => ({
            qte: {
              ...devisLine.qte,
              value: parseInt(dl.qte),
              disabled: disabled,
            },
            description: {
              ...devisLine.description,
              value: dl.description,
              disabled: disabled,
            },
            unityPrice: {
              ...devisLine.unityPrice,
              value: parseFloat(dl.unityPrice),
              disabled: disabled,
            },
            reduction: {
              ...devisLine.reduction,
              value: parseFloat(dl.reduction),
              disabled: disabled,
            },
            tva: {
              ...devisLine.tva,
              value: parseFloat(dl.tva),
              disabled: disabled,
            },
            id: dl.id,
          }))
        : [{ ...devisLine }];
      setState(cpState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [devis]);

  useEffect(() => {
    setTotalTTC(
      ifNegatifReturn0(
        state.devis
          .map(
            (dl) =>
              calcDevisLine(
                dl.qte.value,
                dl.unityPrice.value,
                dl.reduction.value,
                dl.tva.value
              ).priceTotalTtc
          )
          .reduce((a, b) => a + b, 0)
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const rowRender = (row, index) => (
    <div className="table-row" key={`row-${index}`}>
      <div className="table-cell">
        <Input
          {...row.qte}
          label={isMobile ? "Quantité" : ""}
          onChange={(e) => {
            const cpState = { ...state };
            if (cpState.devis[index])
              cpState.devis[index].qte.value = parseInt(e.target.value);
            setState(cpState);
          }}
        />
      </div>
      <div className="table-cell" style={{ width: "350px" }}>
        <Input
          {...row.description}
          label={isMobile ? "Description" : ""}
          onChange={(e) => {
            const cpState = { ...state };
            if (cpState.devis[index])
              cpState.devis[index].description.value = e.target.value;
            setState(cpState);
          }}
        />
      </div>
      <div className="table-cell">
        <Input
          {...row.unityPrice}
          label={isMobile ? "Prix unitaire HT" : ""}
          onChange={(e) => {
            const cpState = { ...state };
            if (
              !e.target.value ||
              parseFloat(e.target.value) <= 9999
            ) {
              if (cpState.devis[index]) {
                cpState.devis[index].unityPrice.value = getFloat(e.target.value);
              }
            }
            setState(cpState);
          }}
        />
      </div>
      <div className="table-cell">
        <Input
          {...row.reduction}
          label={isMobile ? "Réduction %" : ""}
          onChange={(e) => {
            const cpState = { ...state };
            if (
              !e.target.value ||
              parseFloat(e.target.value) <= 100
            ) {
              if (cpState.devis[index])
              cpState.devis[index].reduction.value = getFloat(e.target.value);
            }
            setState(cpState);
          }}
        />
      </div>
      <div className="table-cell">
        <Input
          {...row.tva}
          label={isMobile ? "TVA %" : ""}
          onChange={(e) => {
            const cpState = { ...state };
            if (
              !e.target.value ||
              parseFloat(e.target.value) <= 100
            ) {
              if (cpState.devis[index]) {
                cpState.devis[index].tva.value = getFloat(e.target.value);
              }
            }
            setState(cpState);
          }}
        />
      </div>
      <div className="table-cell">
        <div className="m-full">
          {isMobile && <span>Total HT:</span>}
          <span>
            {calcDevisLine(
              state.devis[index].qte.value,
              state.devis[index].unityPrice.value,
              state.devis[index].reduction.value,
              state.devis[index].tva.value
            ).priceTotalHt.toFixed(2)}
            €
          </span>
        </div>
      </div>
      <div className="table-cell">
        <div className="m-full">
          {isMobile && <span>TTC:</span>}
          <span>
            {(
              calcDevisLine(
                state.devis[index].qte.value,
                state.devis[index].unityPrice.value,
                state.devis[index].reduction.value,
                state.devis[index].tva.value
              ).priceTotalTtc ?? 0
            ).toFixed(2)}
            €
          </span>
        </div>
      </div>
      <div className="table-cell">
        {devis.status === 0 && (
          <>
            {!isMobile ? (
              <IconRemove
                onClick={() => {
                  const cpState = { ...state };
                  cpState.devis = state.devis.filter(
                    (dl, $in) => index !== $in
                  );
                  setState(cpState);
                }}
              />
            ) : (
              <ButtonDef
                spinner={isPending}
                type="button"
                textButton="Supprimer"
                className="warning-style w-full"
                onClick={(e) => {
                  const cpState = { ...state };
                  cpState.devis = state.devis.filter(
                    (dl, $in) => index !== $in
                  );
                  setState(cpState);
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
  );

  const onSubmit = (e, callback = false) => {
    e.preventDefault();
    setMessage({ ...message, text: null });
    const cpState = { ...state };
    cpState.valideUntil.error = false;
    setState(cpState);
    if (!state.valideUntil.value) {
      cpState.valideUntil.error = true;
      setState(cpState);
      setMessage({
        type: "error",
        text: "Champs obligatoire.",
      });
      return;
    }
    cpState.title.error = false;
    if (!state.title.value.length) {
      cpState.title.error = true;
      setState(cpState);
      return;
    }
    if (!state.devis.length) {
      setMessage({
        type: "error",
        text: "Devis dois avoir 1 ligne au minimum.",
      });
      return;
    }
    if (totalTTC <= 0.5) {
      setMessage({
        type: "error",
        text: "Le montant doit être d'au moins 0,50 €.",
      });
      return;
    }

    let validDevisLines = true;

    cpState.devis.forEach((dl, index) => {
      cpState.devis[index].qte.error = false;
      if (!parseInt(dl.qte.value) || parseInt(dl.qte.value) <= 0) {
        cpState.devis[index].qte.error = true;
        validDevisLines = false;
      }
      cpState.devis[index].unityPrice.error = false;
      if (!parseFloat(dl.unityPrice.value)) {
        cpState.devis[index].unityPrice.error = true;
        validDevisLines = false;
      }
      cpState.devis[index].description.error = false;
      if (!dl.description.value) {
        cpState.devis[index].description.error = true;
        validDevisLines = false;
      }
    });
    setState(cpState);

    if (!validDevisLines) {
      setMessage({
        type: "error",
        text: "Champs obligatoire.",
      });
      return;
    }
    const data = {
      validationDate: state.valideUntil.value,
      extraNote: state.note.value,
      title: state.title.value,
      devisLines: state.devis.map((dl) => {
        const obj = {
          id: null,
          qte: dl.qte.value,
          unityPrice: parseFloat(dl.unityPrice.value),
          reduction: parseFloat(dl.reduction.value),
          tva: parseFloat(dl.tva.value),
          description: dl.description.value,
        };
        if (dl.id) {
          obj.id = `/api/devis_lines/${dl.id}`;
        }
        return obj;
      }),
    };
    if (!isPending) {
      setIsPending(true);
      connector({
        url: `${endPoints.DEVIS}/${devis.id}`,
        data: data,
        method: "PUT",
        success: (response) => {
          setIsPending(false);
          setDevis({ ...response.data });
          if (callback) callback();

          setMessage({
            type: "success",
            text: "Devis enregisté",
          });
        },
        catch: (err) => {
          console.log(err);
          setIsPending(false);
        },
      });
    }
  };

  const setStatusEnAttente = () => {
    if (!isPending) {
      setIsPending(true);
      connector({
        url: `${endPoints.DEVIS}/send/${devis.id}`,
        method: "PUT",
        success: (response) => {
          setDevis({ ...response.data });
          setMessage({
            type: "success",
            text: "Devis envoyé",
          });
          setIsPending(false);
        },
        catch: (err) => {
          console.log(err);
          const msg = getMsgError(err);
          if (msg === "errorPayRepairman") {
            setDataModalError({
              type: "modal-save",
              title: "Impossible de régler votre prestation",
              description:
                "Oops. Il y a un soucis avec votre compte bancaire. Avant d'envoyer votre devis, veuillez contacter l'administrateur du site afin de vérifier vos informations bancaires.",
            });
            setShowModalError(true);
          } else {
            NotificationManager.error(msg, "");
          }
          setIsPending(false);
        },
      });
    }
  };

  const newDevis = () => {
    if (!isPending) {
      setIsPending(true);
      connector({
        url: `${endPoints.DEVIS}/${devis.id}/new`,
        method: "PUT",
        success: (response) => {
          setMessage({ type: "success", text: "New Devis" });
          history.push(`${ROUTES.REPA_CREATE_DEVIS.url}/${response.data.id}`);
          setIsPending(false);
        },
        catch: (err) => {
          console.log(err);
          setIsPending(false);
        },
      });
    }
  };

  const ifNegatifReturn0 = (val) => (val < 0 ? 0 : val);

  if (!devis) return <Loader />;

  const closeSide = () => {
    setOpenSide(false);
  };

  return (
    <AdminBase>
      <BlocAdminContent>
        <DashboardContent
          titlePage={`Devis #${devis.id}`}
          backlinkUrl={ROUTES.DEVIS.url}
          backlinkText="< Retour à la liste des Devis"
        >
          <Form onSubmit={onSubmit}>
            {message.text ? (
              <span
                className={
                  message.type === "error" ? "text-danger" : "text-success"
                }
              >
                {message.text}
              </span>
            ) : null}

            <InlineInputStyle>
              <div className="input-full">
                <Input
                  {...state.title}
                  onChange={(e) => {
                    const cpState = { ...state };
                    cpState.title.value = e.target.value;
                    setState(cpState);
                  }}
                />
              </div>
            </InlineInputStyle>

            <InlineInputStyle>
              <DatePickerInput
                {...state.valideUntil}
                minDate={new Date()}
                onChange={(date) => {
                  const cpState = { ...state };
                  cpState.valideUntil.value = date;
                  setState(cpState);
                }}
              />
            </InlineInputStyle>

            <TitlePage>Lignes du devis</TitlePage>

            <SimpleTable
              columns={[
                { key: "quantity", text: "Quantité" },
                { key: "description", text: "Description" },
                { key: "ht", text: "Prix unitaire HT" },
                { key: "reduction", text: "Réduction %" },
                { key: "tva", text: "TVA %" },
                { key: "total_ht", text: "Total HT" },
                { key: "ttc", text: "TTC" },
                { key: "actions", text: "" },
              ]}
              data={state.devis}
              rowRender={rowRender}
            />

            <div className="d-sm-flex align-items-center justify-content-between mb-sm-3 mb-5">
              <div>
                {devis.status === 0 && (
                  <ButtonDef
                    spinner={isPending}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      const cpState = { ...state };
                      cpState.devis.push({ ...devisLine });
                      setState(cpState);
                    }}
                    textButton={
                      <>
                        <AddGreenIcon /> Nouvelle ligne
                      </>
                    }
                    className="btn-add m-r"
                  />
                )}
              </div>
              <BlocInfo>
                <h3 className="warning-style w-lg text-right">
                  Total HT :{" "}
                  {ifNegatifReturn0(
                    state.devis
                      .map(
                        (dl) =>
                          calcDevisLine(
                            dl.qte.value,
                            dl.unityPrice.value,
                            dl.reduction.value,
                            dl.tva.value
                          ).priceTotalHt
                      )
                      .reduce((a, b) => a + b, 0)
                  ).toFixed(2)}
                  €
                </h3>
                <h4 className="w-lg text-right">
                  Montant TVA{" "}
                  {ifNegatifReturn0(
                    state.devis
                      .map(
                        (dl) =>
                          calcDevisLine(
                            dl.qte.value,
                            dl.unityPrice.value,
                            dl.reduction.value,
                            dl.tva.value
                          ).amountTva
                      )
                      .reduce((a, b) => a + b, 0)
                  ).toFixed(2)}
                  €
                </h4>
                <h4 className="success-style w-lg text-right">
                  Montant TTC : {totalTTC.toFixed(2)}€
                </h4>
              </BlocInfo>
            </div>

            <TitlePage>Notes additionnelles</TitlePage>
            <Input
              {...state.note}
              onChange={(e) => {
                const cpState = { ...state };
                cpState.note.value = e.target.value;
                setState(cpState);
              }}
            />

            <div className="d-flex justify-content-center mb-5 flex-column flex-sm-row">
              <ButtonDef
                spinner={isPending}
                type="button"
                textButton="Télécharger En pdf"
                className="m-1"
                onClick={(e) => {
                  if (devis.status === 0)
                    onSubmit(e, () => {
                      setIsPending(true);
                      downloadFile(
                        `${endPoints.EXPORT_DEVIS}/${devis.id}`,
                        `Devis#${devis.id}.pdf`,
                        setIsPending
                      );
                    });
                  else {
                    e.preventDefault();
                    setIsPending(true);
                    downloadFile(
                      `${endPoints.EXPORT_DEVIS}/${devis.id}`,
                      `Devis#${devis.id}.pdf`,
                      setIsPending
                    );
                  }
                }}
              />
              {devis.status === 0 && (
                <>
                  <ButtonDef
                    spinner={isPending}
                    type="button"
                    textButton="Enregistrer"
                    className="m-1"
                    onClick={(e) => {
                      onSubmit(e);
                    }}
                  />
                  <ButtonDef
                    spinner={isPending}
                    type="button"
                    textButton="Envoyer le devis"
                    className="m-1"
                    onClick={(e) => {
                      if (devis.status === 0) onSubmit(e, setStatusEnAttente);
                      else {
                        e.preventDefault();
                        setStatusEnAttente();
                      }
                    }}
                  />
                </>
              )}
              {devis.status === 3 && devis.newDevis && !devis.isCommand && (
                <ButtonDef
                  spinner={isPending}
                  type="button"
                  textButton="Nouveau devis"
                  className="m-1"
                  onClick={(e) => {
                    e.preventDefault();
                    newDevis();
                  }}
                />
              )}
            </div>
          </Form>
        </DashboardContent>
        {!isMobile
          ? openSide && (
              <DashboardSide className="devis-side">
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
                <DevisSideDetail>
                  <DsdHeader
                    title={`Devis #${devis.id}`}
                    statusType={devis.status}
                  />

                  <DsdContent>
                    <h2 className="content-title">
                      {devis.benefit.service.name}
                    </h2>

                    <BlocInfo>
                      <h3>
                        {`${devis.client.firstName} ${devis.client.lastName}`}
                      </h3>
                      <span>
                        Devis demandé le{" "}
                        {moment(devis.createdAt).format("DD/MM/YYYY")}
                      </span>
                    </BlocInfo>

                    <BlocInfo>
                      <h4 className="success-style">
                        Mode de délivrance souhaité :
                      </h4>
                      <p>{devis.deliveryMode.deliveryModeType.name}</p>
                    </BlocInfo>

                    {devis.deliveryMode.deliveryModeType
                      .requireDeliveryAddress && (
                      <BlocInfo>
                        <h4 className="success-style">
                          Adresse de livraison :
                        </h4>
                        <p>
                          {devis.address}, {devis.additionalAddress},{" "}
                          {devis.postalCode}, {devis.city}
                        </p>
                      </BlocInfo>
                    )}
                    <BlocInfo withBorder>
                      {!!devis?.title?.length && (
                        <h4 className="warning-style w-lg">
                          Titre du devis : {devis.title}
                        </h4>
                      )}
                      {devis.dateSend ? (
                        <p>
                          Emis le: {moment(devis.dateSend).format("DD/MM/YYYY")}
                        </p>
                      ) : null}
                      {devis.validationDate ? (
                        <p>
                          Valide jusqu’au:{" "}
                          {moment(devis.validationDate).format("DD/MM/YYYY")}
                        </p>
                      ) : null}
                      {devis.acceptanceDate &&
                      devis.status != 3 &&
                      devis.status != 4 ? (
                        <p>
                          Accepté le :{" "}
                          {moment(devis.acceptanceDate).format("DD/MM/YYYY")}
                        </p>
                      ) : null}
                      {devis.rejectionDate ? (
                        <p>
                          Refusé le:{" "}
                          {moment(devis.rejectionDate).format("DD/MM/YYYY")}
                        </p>
                      ) : null}
                      {devis.cancellationDate ? (
                        <p>
                          Annulé le:{" "}
                          {moment(devis.cancellationDate).format("DD/MM/YYYY")}
                        </p>
                      ) : null}
                    </BlocInfo>
                    {!!devis.total && !!devis.benefit.priceQuote && (
                      <BlocInfo>
                        <h4 className="success-style">Prix du devis : </h4>
                        <p>
                          {devis.benefit.priceQuote?.toFixed(2)} € TTC
                          {devis.paiements.filter(
                            (pay) => pay.object === "charge"
                          ).length
                            ? "(réglé)"
                            : ""}
                        </p>
                      </BlocInfo>
                    )}
                    {devis.description ? (
                      <BlocInfo>
                        <h3 className="warning-style">Description :</h3>
                        <div className="desc-devis">{devis.description}</div>
                      </BlocInfo>
                    ) : null}

                    {devis.files.length ? (
                      <>
                        <BlocImages
                          title="Photos"
                          data={dataGallery}
                          onClick={openLightbox}
                        />
                        <ModalGateway>
                          {stateImage ? (
                            <Modal onClose={closeLightbox}>
                              <Carousel
                                currentIndex={currentImage}
                                views={dataGallery}
                              />
                            </Modal>
                          ) : null}
                        </ModalGateway>
                      </>
                    ) : null}
                  </DsdContent>
                </DevisSideDetail>

                <PopinModal
                  show={showModalError}
                  handleClose={() => {
                    setShowModalError(false);
                  }}
                  title={dataModalError.title}
                >
                  <p>{dataModalError.description}</p>
                  <div className="btns-confirm">
                    <ButtonDef
                      textButton="Contacter"
                      onClick={(e) => {
                        e.preventDefault();
                        history.push(`${ROUTES.CONTACT.url}`);
                      }}
                    />
                  </div>
                </PopinModal>
              </DashboardSide>
            )
          : null}
      </BlocAdminContent>
    </AdminBase>
  );
});
