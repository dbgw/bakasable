import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";
import { NotificationManager } from "react-notifications";
import { useLocation } from "react-router-dom";
import { Input, ButtonDef } from "../../../components/ui";
import AdminBase from "../../../theme/back/adminBase";
import DashboardContent from "../../../components/dashboardContent";
import DashboardSide from "../../../components/dashboardSide";
import { BlocAdminContent } from "../../../assets/styles/adminStyle/adminGlobalStyle";
import ListsRepairMan from "../../../components/prestations/listsRepairMan";
import endPoints from "./../../../config/endPoints";
import connector from "./../../../connector";
import { QuestionIcon } from "../../../assets/styles/icons";
import RadioButton from "../../../components/ui-elements/radioButton";
import Checkbox from "../../../components/ui-elements/checkBox";
import DeliveryModesContent from "../../../components/deliveryModesContent";
import noImage from "../../../assets/images/noImage.png";
import * as vars from "../../../vars";
import { clearErrors } from "../../../helper/form";
import PopinModal from "../../../components/ui-elements/popinModal";
import CloseButton from "../../../components/ui-elements/closeButton";
import { useMediaQuery } from "react-responsive";
import { getFloat, parentCategories } from "../../../helper/functions";
import ROUTES from "../../../config/routes";

export default function Services() {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const query = new URLSearchParams(useLocation().search);
  const [defaultBenefit, setDefaultBenefit] = useState(
    query.get("benefit") ? parseInt(query.get("benefit")) : ""
  );
  const perPageDesMob = isMobile ? 10 : 20;
  const history = useHistory();
  const [deliveryModeTypes, setDeliveryModeTypes] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const [totalBenefits, setTotalBenefits] = useState(0);
  const [benefit, setBenefit] = useState(false);
  const [universesCategories, setUniversesCategories] = useState([]);
  const [perPage, setPerPage] = useState(perPageDesMob);
  const [pageIndex, setPageIndex] = useState(0);
  const [filter, setFilter] = useState({
    universe: {
      placeholder: "Univers",
      options: [{ label: "Tous les univers", value: "", category: [] }],
      value: "",
      isSearchable: true,
    },
    category: {
      placeholder: "catégorie(s)",
      options: [{ label: "Toutes les catégories", value: "", subCategory: [] }],
      value: "",
      isSearchable: true,
    },
    activeElement: "",
  });
  const [paramsUrlBenefit, setParamsUrlBenefit] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [dataModal, setDataModal] = useState({
    title: "",
    type: "",
  });

  const stateDeliveryModes = (parent) => {
    return {
      id: { value: "" },
      price: {
        name: `${parent}_price`,
        label: "Prix",
        type: "text",
        placeholder: "Prix",
        value: "",
        empty: true,
        min: 0,
        max: 5000,
        required: true,
        error: false,
        errorMessage: "",
        isNumber: true,
      },
      radius: {
        name: `${parent}_radius`,
        label: "Rayon max",
        value: false,
        options: [
          { value: false, label: "France" },
          { value: true, label: "Rayon défini" },
        ],
        required: false,
        error: false,
        errorMessage: "",
      },
      distance: {
        name: `${parent}_distance`,
        label: "",
        type: "text",
        value: 0,
        empty: true,
        min: 1,
        max: 999,
        required: false,
        error: false,
        errorMessage: "",
        isNumber: true,
      },
    };
  };

  const [state, setState] = useState({
    id: { value: null },
    typeService: {
      name: "typeService",
      label: "Type de prestation",
      value: "",
      options: [
        { value: "forfait", label: "Forfait" },
        { value: "devis", label: "Devis" },
      ],
      disabled: false,
      error: false,
      errorMessage: "",
    },
    deliveryModes: {
      label: "Modes de délivrance",
      options: [],
      error: false,
      other: { typeService: null },
    },
    priceQuote: {
      type: "text",
      name: "priceQuote",
      placeholder: "Prix",
      value: "",
      required: false,
      empty: true,
      min: 0,
      max: 5000,
      error: false,
      errorMessage: "",
      isNumber: true,
    },
    precisionQuote: {
      name: "precisionQuote",
      label: "Précision de prise en charge du devis",
      placeholder:
        "Indiquez votre fonctionnement : déplacement à domicile, visioconférence etc..",
      value: "",
      error: false,
      errorMessage: "",
      required: false,
      as: "textarea",
    },
  });

  const setChildren = (index, data) => {
    const cpState = { ...state };
    cpState.deliveryModes.options[index].stateChildren = data;
    cpState.deliveryModes.error = false;
    setState(cpState);
  };

  useEffect(() => {
    getBenefits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, perPage, filter]);

  useEffect(() => {
    const cpFilter = copy(filter);
    if (filter.activeElement === "universe") {
      cpFilter.category.options = [
        { label: "Toutes les catégories", value: "", subCategory: [] },
      ];
      if (filter.universe.value) {
        const index = indexOfValue(filter.universe.value, universesCategories);
        if (index > -1) {
          cpFilter.category.options.push(
            ...universesCategories[index].category
          );
          if (
            indexOfValue(
              filter.category.value,
              universesCategories[index].category
            ) === -1
          ) {
            cpFilter.category.value = "";
          }
        }
      } else {
        cpFilter.category.value = "";
        for (let i = 0; i < filter.universe.options.length; i++) {
          cpFilter.category.options.push(
            ...filter.universe.options[i].category
          );
        }
      }
      if (!isEqual(cpFilter.category.options, filter.category.options)) {
        cpFilter.activeElement = "category";
        setFilter(cpFilter);
        setPageIndex(0);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => {
    getDeliveryModeTypes();
    getUniversesCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      benefits &&
      benefits.length &&
      deliveryModeTypes &&
      deliveryModeTypes.length &&
      defaultBenefit
    ) {
      for (let i = 0; i < benefits.length; i++) {
        if (parseInt(benefits[i].id) === defaultBenefit) {
          setActiveBenefit(benefits[i]);
          break;
        }
      }
      setDefaultBenefit(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [benefits, deliveryModeTypes, defaultBenefit]);

  const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

  const copy = (x) => JSON.parse(JSON.stringify(x));

  const indexOfValue = (value, array) => {
    for (let i = 0; i < array.length; i++) {
      if (value === array[i].value) {
        return i;
      }
    }
    return -1;
  };

  const getDeliveryModeTypes = () => {
    connector({
      method: "get",
      url: endPoints.DELIVERY_MODE_TYPES,
      success: (response) => {
        const arrayObj = response.data["hydra:member"] || [];
        setDeliveryModeTypes(arrayObj);
        const cpState = { ...state };
        let options = [];
        for (let i = 0; i < arrayObj.length; i++) {
          options.push({
            value: arrayObj[i].id,
            checked: false,
            label: arrayObj[i].name,
            data: { ...arrayObj[i] },
            children: DeliveryModesContent,
            setChildren: (key, data) => setChildren(key, data),
            stateChildren: stateDeliveryModes(arrayObj[i].id),
          });
        }
        cpState.deliveryModes.options = options;
        setState(cpState);
      },
      catch: (error) => {
        console.log(error);
      },
    });
  };

  const getBenefits = (refresh = false) => {
    let condition = "";
    if (filter.universe.value) {
      condition += `&service.categories.parent.universe.id=${filter.universe.value}`;
    }
    if (filter.category.value) {
      condition += `&service.categories.parent.id=${filter.category.value}`;
    }

    const cpParamsUrlBenefit = `page=${
      parseInt(pageIndex) + 1
    }&itemsPerPage=${perPage}&order[updatedAt]=desc&order[updatedAt]=desc${condition}`;

    if (refresh || cpParamsUrlBenefit !== paramsUrlBenefit) {
      setParamsUrlBenefit(cpParamsUrlBenefit);
      connector({
        method: "get",
        url: `${endPoints.BENEFITS_REPAIRMAN}?${cpParamsUrlBenefit}`,
        success: (response) => {
          const arrayObj = response.data["hydra:member"] || [];
          setBenefits(arrayObj);
          setTotalBenefits(response.data["hydra:totalItems"] || 0);
          if (defaultBenefit) {
            if (arrayObj.length) {
              for (let i = 0; i < arrayObj.length; i++) {
                if (arrayObj[i].id === defaultBenefit) {
                  setActiveBenefit(arrayObj[i]);
                  break;
                }
              }
            }
            setDefaultBenefit(false);
          }
          scrollTop("bloc-content-dashboard");
        },
        catch: (error) => {
          console.log(error);
        },
      });
    }
  };

  const getUniversesCategories = () => {
    connector({
      method: "get",
      url: `${endPoints.UNIVERSES_CATEGORIES_REPAIRMAN}?atLeastOne=${true}`,
      data: {},
      success: (response) => {
        const arrayObj = response.data["hydra:member"] || [];
        const cpFilter = { ...filter };
        cpFilter.universe.options = [
          { label: "Tous les univers", value: "", category: [] },
        ];
        cpFilter.category.options = [
          { label: "Toutes les catégories", value: "", subCategory: [] },
        ];
        for (let i = 0; i < arrayObj.length; i++) {
          let o = arrayObj[i];
          let category = [];
          for (let j = 0; j < o.categories.length; j++) {
            let subCategory = [];
            for (let k = 0; k < o.categories[j].children.length; k++) {
              subCategory.push({
                label: o.categories[j].children[k].name,
                value: o.categories[j].children[k].id,
              });
            }
            const row = {
              label: o.categories[j].name,
              value: o.categories[j].id,
              subCategory,
            };
            cpFilter.category.options.push(row);
            category.push(row);
          }
          cpFilter.universe.options.push({
            label: o.name,
            value: o.id,
            category,
          });
        }
        setUniversesCategories(cpFilter.universe.options);
        setFilter(cpFilter);
      },
      catch: (error) => {
        console.log(error);
      },
    });
  };

  const setActiveRow = (item = {}) => {
    if (benefit && parseInt(item.id) === parseInt(benefit.id)) {
      setBenefit(false);
    } else {
      setActiveBenefit(item);
    }
  };

  const setActiveBenefit = (item = {}) => {
    setMessage(null);
    setIsPending(false);
    const cpState = clearErrors({ ...state });
    cpState.id.value = item.id;
    cpState.typeService.value = item.typeService;
    cpState.typeService.disabled =
      item.typeService === "devis" || item.typeService === "forfait"
        ? true
        : false;
    cpState.priceQuote.value = item.priceQuote == 0 ? "0" : item.priceQuote;
    cpState.precisionQuote.value = item.precisionQuote
      ? item.precisionQuote
      : "";

    let cpDeliveryModes = checkDeliveryModes({
      cpState,
      action: "init",
      options: item.deliveryModes,
    });
    setState(cpDeliveryModes.cpState);
    setBenefit(item);
  };

  const getPathImage = (image) => (image ? vars.pathImage + image : noImage);

  const saveBenefit = () => {
    if (!isPending) {
      setIsPending(true);
      setMessage(null);
      setState(clearErrors({ ...state }));
      const cpDeliveryModes = checkDeliveryModes({
        cpState: { ...state },
        action: "check",
      });
      const cpState = cpDeliveryModes.cpState;

      if (
        cpDeliveryModes.data.length &&
        !cpDeliveryModes.error &&
        (cpState.typeService.value === "forfait" ||
          cpState.typeService.value === "devis")
      ) {
        connector({
          method: "put",
          url: `${endPoints.BENEFIT}/${cpState.id.value}/repairman`,
          data: {
            typeService: cpState.typeService.value,
            priceQuote: cpState.priceQuote.value
              ? parseFloat(cpState.priceQuote.value)
              : null,
            precisionQuote: cpState.precisionQuote.value,
            deliveryModes: cpDeliveryModes.data,
          },
          success: (response) => {
            setActiveBenefit(response.data);
            setIsPending(false);
            msgSuccess("Vos modifications ont bien été prises en compte.");

            if (
              benefit.typeService != "forfait" &&
              benefit.typeService != "devis"
            ) {
              redirectToServices();
            } else {
              getBenefits(true);
            }
          },
          catch: (error) => {
            console.log(error);
            setIsPending(false);
            if (
              error?.response?.data &&
              error.response.data["hydra:description"]
            ) {
              const msg = error.response.data["hydra:description"];
              msgErrors({ msg });
            } else {
              msgErrors({ msg: "Quelque chose s'est mal passé." });
            }
          },
        });
      } else {
        const msg = "Vérifier si les champs obligatoires sont remplis.";
        msgErrors({
          typeService: !(
            cpState.typeService.value === "forfait" ||
            cpState.typeService.value === "devis"
          ),
          deliveryModes: !cpDeliveryModes.data.length,
          msg,
        });
        setState(cpState);
        setIsPending(false);
      }
    }
  };

  const checkDeliveryModes = ({ cpState, action, options = [] }) => {
    let data = [];
    let error = false;
    cpState.deliveryModes.other = {
      ...cpState.deliveryModes.other,
      typeService: cpState.typeService.value,
    };
    for (let i = 0; i < cpState.deliveryModes.options.length; i++) {
      const o = cpState.deliveryModes.options[i];

      if (action === "init") {
        cpState.deliveryModes.options[i].checked = false;
        for (let j = 0; j < options.length; j++) {
          if (options[j].deliveryModeType.id === o.value) {
            cpState.deliveryModes.options[i].checked = true;
            for (const key in o.stateChildren) {
              cpState.deliveryModes.options[i].stateChildren[key].value =
                options[j][key];
            }
          }
        }
        if (!cpState.deliveryModes.options[i].checked) {
          cpState.deliveryModes.options[i].stateChildren["id"].value = null;
          cpState.deliveryModes.options[i].stateChildren["price"].value = 0;
          cpState.deliveryModes.options[i].stateChildren[
            "radius"
          ].value = false;
          cpState.deliveryModes.options[i].stateChildren["distance"].value = 0;
        }
      } else if (action === "check") {
        if (o.checked) {
          const row = {};
          for (const key in o.stateChildren) {
            const value = o.stateChildren[key].value;
            if (key === "id") {
              row[key] = value ? `${endPoints.DELIVERY_MODES}/${value}` : null;
            } else if (o.stateChildren[key].isNumber) {
              row[key] = value !== undefined ? parseFloat(value) : "";
            } else {
              row[key] = value !== undefined ? value : "";
            }
            if (o.stateChildren[key].required && !value) {
              cpState.deliveryModes.options[i].stateChildren[key].error = true;
              error = true;
            }
          }
          row["deliveryModeType"] = o.value
            ? `${endPoints.DELIVERY_MODE_TYPE}/${o.value}`
            : null;
          data.push(row);
        }
      }
    }
    return { cpState, data, error };
  };

  const deleteBenefit = () => {
    if (!isPending) {
      setState(clearErrors(state));
      setIsPending(true);
      connector({
        method: "delete",
        url: `${endPoints.BENEFIT}/${benefit.id}/repairman`,
        success: () => {
          getBenefits(true);
          setBenefit(false);
          setIsPending(false);
          setShowModal(false);
          NotificationManager.success("Prestation supprimé avec succès.", "");
        },
        catch: (error) => {
          setIsPending(false);
          setShowModal(false);
          if (
            error?.response?.data &&
            error.response.data["hydra:description"]
          ) {
            const msg = error.response.data["hydra:description"];
            msgErrors({ msg });
          } else {
            msgErrors({ msg: "Quelque chose s'est mal passé." });
          }
        },
      });
    }
  };

  const msgErrors = (e) => {
    scrollTop();
    if (e.msg !== undefined) setMessage({ type: "error", text: e.msg });
    const cpState = { ...state };
    if (e.typeService !== undefined) cpState.typeService.error = e.typeService;
    if (e.deliveryModes !== undefined)
      cpState.deliveryModes.error = e.deliveryModes;
    setState(cpState);
  };

  const msgSuccess = (text) => {
    scrollTop();
    if (text !== undefined) setMessage({ type: "success", text });
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const scrollTop = (text) => {
    document.querySelector(".side-content-dashboard").scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const redirectToServices = () => {
    setTimeout(() => {
      history.push(ROUTES.SERVICES.url + "?benefit=-1");
    }, 1000);
  };

  return (
    <AdminBase>
      <BlocAdminContent>
        <DashboardContent
          titlePage="Mes Prestations"
          className={`prestations-pages ${benefit ? "side-is-opened" : ""}`}
        >
          <ListsRepairMan
            setActiveItem={setActiveRow}
            item={benefit}
            items={benefits}
            filter={filter}
            setFilter={setFilter}
            totalItems={totalBenefits}
            perPage={perPage}
            setPerPage={setPerPage}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
          />
        </DashboardContent>
        {benefit ? (
          <DashboardSide className="prestations-side">
            {isMobile && (
              <>
                <CloseButton
                  onClick={(e) => {
                    e.preventDefault();
                    setBenefit(false);
                  }}
                />
              </>
            )}
            <h2 className="title-side-dashboard">
              {benefit?.service?.name ? benefit.service.name : ""}
            </h2>
            <Form className="form-prestations reparateur-form-prestation">
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

              <div className="image-service-prestation">
                <img
                  src={getPathImage(
                    benefit?.service?.picture ? benefit.service.picture : ""
                  )}
                  alt=""
                />
              </div>

              <div className="desc-service-prestation">
                <p>
                  {benefit?.service?.description
                    ? benefit.service.description
                    : ""}
                </p>
              </div>

              <div className="cats-service-prestation">
                <span>Catégories :</span>
                <div className="item-cats-prestation">
                  {benefit?.service?.categories
                    ? parentCategories(benefit.service.categories).map(
                        (cat) => (
                          <p key={cat.id}>
                            <span>{cat.name}</span>
                          </p>
                        )
                      )
                    : ""}
                </div>
              </div>
              <div className="type-modes-prestation">
                <div className="type-prestation">
                  <RadioButton
                    {...state.typeService}
                    onChange={(e) => {
                      const cpState = { ...state };
                      if (!state.typeService.disabled) {
                        cpState.typeService.value = e.value;
                        cpState.typeService.error = false;
                      }
                      cpState.deliveryModes.other = {
                        ...cpState.deliveryModes.other,
                        typeService: e.value,
                      };
                      setState(cpState);
                      setMessage(null);
                    }}
                  />
                  {state.typeService.value === "devis" ? (
                    <div className="devis-detail">
                      <div className="price-devis">
                        <label>
                          Prix du devis :
                          <div className="info-tooltip">
                            <QuestionIcon />
                            <span>Si votre devis est gratuit, laissez 0 €</span>
                          </div>
                        </label>
                        <Input
                          {...state.priceQuote}
                          onChange={(e) => {
                            const cpState = { ...state };
                            if (
                              !e.target.value ||
                              parseFloat(e.target.value) <= 5000
                            ) {
                              cpState.priceQuote.value = getFloat(
                                e.target.value
                              );
                            }
                            cpState.priceQuote.error = false;
                            setState(cpState);
                            setMessage(null);
                          }}
                        />
                        <span className="symbol">€ TTC</span>
                      </div>
                      <Input
                        {...state.precisionQuote}
                        onChange={(e) => {
                          const cpState = { ...state };
                          cpState.precisionQuote.value = e.target.value;
                          cpState.precisionQuote.error = false;
                          setState(cpState);
                          setMessage(null);
                        }}
                      />
                    </div>
                  ) : null}
                </div>

                <div className="bloc-mode-delivrance">
                  <Checkbox
                    {...state.deliveryModes}
                    notice={
                      benefit?.service?.averagePrice
                        ? `Le prix moyen de ce service est de : ${parseFloat(
                            benefit.service.averagePrice
                          ).toFixed(2)} € TTC`
                        : ""
                    }
                    onChange={(e) => {
                      const cpState = { ...state };
                      cpState.deliveryModes.options = e;
                      cpState.deliveryModes.error = false;
                      setState(cpState);
                      setMessage(null);
                    }}
                  />
                </div>
              </div>
              <div className="btns-alings service-btns-action">
                <ButtonDef
                  type="button"
                  className="btn-delete"
                  textButton="Supprimer"
                  spinner={isPending}
                  onClick={(e) => {
                    e.preventDefault();
                    setDataModal({
                      type: "modal-save",
                      title: "Confirmer la suppression",
                    });
                    setShowModal(true);
                  }}
                />
                <ButtonDef
                  textButton="Enregistrer"
                  spinner={isPending}
                  onClick={(e) => {
                    e.preventDefault();
                    saveBenefit();
                  }}
                />
              </div>
            </Form>

            <PopinModal
              show={showModal}
              handleClose={() => {
                setShowModal(false);
              }}
              title={dataModal.title}
            >
              <div className="btns-confirm">
                <ButtonDef
                  className="btn-light"
                  textButton="Non"
                  spinner={isPending}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowModal(false);
                  }}
                />
                <ButtonDef
                  textButton="Oui"
                  spinner={isPending}
                  onClick={(e) => {
                    e.preventDefault();
                    deleteBenefit();
                  }}
                />
              </div>
            </PopinModal>
          </DashboardSide>
        ) : null}
      </BlocAdminContent>
    </AdminBase>
  );
}
