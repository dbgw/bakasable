import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { NotificationManager } from "react-notifications";
import { useLocation } from "react-router-dom";
import { Input, ButtonDef } from "../../../components/ui";
import AdminBase from "../../../theme/back/adminBase";
import DashboardContent from "../../../components/dashboardContent";
import DashboardSide from "../../../components/dashboardSide";
import { BlocAdminContent } from "../../../assets/styles/adminStyle/adminGlobalStyle";
import ListsAdmin from "../../../components/prestations/listsAdmin";
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
import { useMediaQuery } from "react-responsive";
import CloseButton from "../../../components/ui-elements/closeButton";
import {
  getFloat,
  parentCategories,
  scrollTop,
  sortObjectsText,
  indexOfValue,
  isEqual,
  copy,
} from "../../../helper/functions";

export default function Services() {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const query = new URLSearchParams(useLocation().search);
  const defaultService = query.get("service")
    ? parseInt(query.get("service"))
    : "";
  const [defaultBenefit, setDefaultBenefit] = useState(
    query.get("benefit") ? parseInt(query.get("benefit")) : ""
  );
  const perPageDesMob = isMobile ? 10 : 20;
  const [benefits, setBenefits] = useState([]);
  const [totalBenefits, setTotalBenefits] = useState(0);
  const [benefit, setBenefit] = useState(false);
  const [universesCategories, setUniversesCategories] = useState([]);
  const [repairMans, setRepairMans] = useState([]);
  const [services, setServices] = useState([]);
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
    subCategory: {
      placeholder: "Sous catégorie(s)",
      options: [{ label: "Toutes les sous-catégories", value: "" }],
      value: "",
      isSearchable: true,
    },
    service: {
      placeholder: "Services",
      options: [
        {
          label: "Tous les services",
          value: "",
          subCategory: [],
          benefits: [],
        },
      ],
      value: defaultService,
      isSearchable: true,
    },
    repairMan: {
      placeholder: "Réparateurs",
      options: [{ label: "Tous les réparateurs", value: "", showcases: [] }],
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
        value: "",
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
    motif: {
      name: "motif",
      label: "",
      placeholder: "Motif de suppression",
      value: "",
      error: false,
      errorMessage: "",
      required: true,
      type: "text",
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
  }, [pageIndex, perPage]);

  useEffect(() => {
    if (benefits && benefits.length && defaultBenefit) {
      for (let i = 0; i < benefits.length; i++) {
        if (parseInt(benefits[i].id) === defaultBenefit) {
          setActiveBenefit(benefits[i]);
          break;
        }
      }
      setDefaultBenefit(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [benefits, defaultBenefit]);

  useEffect(() => {
    const cpFilter = copy(filter);
    let all = "";
    if (filter.activeElement === "universe") {
      let categoryOptions = [];

      if (filter.universe.value) {
        const index = indexOfValue(
          filter.universe.value,
          universesCategories,
          "value"
        );
        if (index > -1) {
          categoryOptions.push(...universesCategories[index].category);
          if (
            indexOfValue(filter.category.value, categoryOptions, "value") === -1
          ) {
            cpFilter.category.value = "";
          }
        }
      } else {
        for (let i = 0; i < universesCategories.length; i++) {
          categoryOptions.push(...universesCategories[i].category);
        }
      }

      all = { label: "Toutes les catégories", value: "", subCategory: [] };
      if (!isEqual([all, ...categoryOptions], filter.category.options)) {
        categoryOptions = sortObjectsText(categoryOptions, "label", "asc");
        cpFilter.category.options = [all, ...categoryOptions];
      }
      cpFilter.category.value = "";
      cpFilter.activeElement = "category";
      setFilter(cpFilter);
    } else if (filter.activeElement === "category") {
      let subCategoryOptions = [];
      if (filter.category.value) {
        const index = indexOfValue(
          filter.category.value,
          filter.category.options,
          "value"
        );
        if (index > -1) {
          subCategoryOptions.push(
            ...filter.category.options[index].subCategory
          );
          if (
            indexOfValue(
              filter.subCategory.value,
              subCategoryOptions,
              "value"
            ) === -1
          ) {
            cpFilter.subCategory.value = "";
          }
        }
      } else {
        for (let i = 0; i < filter.category.options.length; i++) {
          subCategoryOptions.push(...filter.category.options[i].subCategory);
        }
      }
      all = { label: "Toutes les sous-catégories", value: "" };
      if (!isEqual([all, ...subCategoryOptions], filter.subCategory.options)) {
        subCategoryOptions = sortObjectsText(
          subCategoryOptions,
          "label",
          "asc"
        );
        cpFilter.subCategory.options = [all, ...subCategoryOptions];
      }
      cpFilter.subCategory.value = "";
      cpFilter.activeElement = "subCategory";
      setFilter(cpFilter);
    } else if (filter.activeElement === "subCategory") {
      let serviceOptions = [];
      let subCategoryOptions = [];
      if (filter.subCategory.value) {
        const index = indexOfValue(
          filter.subCategory.value,
          filter.subCategory.options,
          "value"
        );
        if (index > -1) {
          subCategoryOptions.push(filter.subCategory.options[index]);
        }
      } else {
        subCategoryOptions = filter.subCategory.options;
      }

      for (let i = 0; i < subCategoryOptions.length; i++) {
        for (let j = 0; j < services.length; j++) {
          if (
            indexOfValue(subCategoryOptions[i].value, services[j].subCategory, "value") > -1 && 
            indexOfValue(services[j].value, serviceOptions, "value") === -1
          ) {
            serviceOptions.push(services[j]);
          }
        }
      }

      all = {
        label: "Tous les services",
        value: "",
        subCategory: [],
        benefits: [],
      };
      if (!isEqual([all, ...serviceOptions], filter.service.options)) {
        serviceOptions = sortObjectsText(serviceOptions, "label", "asc");
        cpFilter.service.options = [all, ...serviceOptions];
      }
      cpFilter.service.value = "";
      cpFilter.activeElement = "service";
      setFilter(cpFilter);
    } else if (filter.activeElement === "service") {

      let serviceOptions = [];
      if (filter.service.value) {
        const index = indexOfValue(
          filter.service.value,
          filter.service.options,
          "value"
        );
        if (index > -1) {
          serviceOptions.push(filter.service.options[index]);
        }
      } else {
        serviceOptions = filter.service.options;
      }

      let repairManOptions = [];

      for (let i = 0; i < serviceOptions.length; i++) {
        for (let j = 0; j < serviceOptions[i].benefits.length; j++) {
          const userBenefit = serviceOptions[i].benefits[j].user.id;
          const index = indexOfValue(userBenefit, repairMans, "value");
          if (
            userBenefit &&
            index > -1 &&
            indexOfValue(userBenefit, repairManOptions, "value") === -1
          ) {
            repairManOptions.push(repairMans[index]);
          }
        }
      }

      all = { label: "Tous les réparateurs", value: "" };
      if (!isEqual([all, ...repairManOptions], filter.repairMan.options)) {
        repairManOptions = sortObjectsText(repairManOptions, "label", "asc");
        cpFilter.repairMan.options = [all, ...repairManOptions];
      }
      cpFilter.repairMan.value = "";
      cpFilter.activeElement = "repairMan";
      setFilter(cpFilter);
    } else if (filter.activeElement === "repairMan") {
      if (pageIndex === 0) {
        getBenefits();
      } else {
        setPageIndex(0);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => {
    getUniversesCategories();
    getRepairMans();
    getServices();
    getDeliveryModeTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDeliveryModeTypes = () => {
    connector({
      method: "get",
      url: endPoints.DELIVERY_MODE_TYPES,
      success: (response) => {
        const arrayObj = response.data["hydra:member"] || [];
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
    if (filter.repairMan.value) {
      condition += `&user.id=${filter.repairMan.value}`;
    }
    if (filter.universe.value) {
      condition += `&service.categories.parent.universe.id=${filter.universe.value}`;
    }
    if (filter.category.value) {
      condition += `&service.categories.parent.id=${filter.category.value}`;
    }
    if (filter.subCategory.value) {
      condition += `&service.categories.id=${filter.subCategory.value}`;
    }
    if (filter.service.value) {
      condition += `&service.id=${filter.service.value}`;
    }

    const cpParamsUrlBenefit = `page=${
      parseInt(pageIndex) + 1
    }&itemsPerPage=${perPage}&order[updatedAt]=desc&order[updatedAt]=desc${condition}`;

    if (refresh || cpParamsUrlBenefit !== paramsUrlBenefit) {
      setParamsUrlBenefit(cpParamsUrlBenefit);
      connector({
        method: "get",
        url: `${endPoints.BENEFITS_ADMIN}?${cpParamsUrlBenefit}`,
        success: (response) => {
          setBenefits(response.data["hydra:member"] || []);
          setTotalBenefits(response.data["hydra:totalItems"] || 0);
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
      url: endPoints.ANONYMOUS_UNIVERSES_CATEGORIES,
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
        cpFilter.subCategory.options = [
          { label: "Toutes les sous-catégories", value: "" },
        ];
        let universeOptions = [];
        let categoryOptions = [];
        let subCategoryOptions = [];
        for (let i = 0; i < arrayObj.length; i++) {
          let o = arrayObj[i];
          let category = [];
          for (let j = 0; j < o.categories.length; j++) {
            let subCategory = [];
            for (let k = 0; k < o.categories[j].children.length; k++) {
              const subRow = {
                label: o.categories[j].children[k].name,
                value: o.categories[j].children[k].id,
              };
              subCategoryOptions.push(subRow);
              subCategory.push(subRow);
            }
            const row = {
              label: o.categories[j].name,
              value: o.categories[j].id,
            };
            categoryOptions.push({ ...row, subCategory });
            category.push({ ...row, subCategory });
          }
          universeOptions.push({
            label: o.name,
            value: o.id,
            category,
          });
        }
        universeOptions = sortObjectsText(universeOptions, "label", "asc");
        cpFilter.universe.options = [
          ...cpFilter.universe.options,
          ...universeOptions,
        ];
        categoryOptions = sortObjectsText(categoryOptions, "label", "asc");
        cpFilter.category.options = [
          ...cpFilter.category.options,
          ...categoryOptions,
        ];
        subCategoryOptions = sortObjectsText(
          subCategoryOptions,
          "label",
          "asc"
        );
        cpFilter.subCategory.options = [
          ...cpFilter.subCategory.options,
          ...subCategoryOptions,
        ];
        setUniversesCategories(cpFilter.universe.options);
        setFilter(cpFilter);
      },
      catch: (error) => {
        console.log(error);
      },
    });
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
          { label: "Tous les réparateurs", value: "", showcases: [] },
        ];
        for (let i = 0; i < arrayObj.length; i++) {
          let o = arrayObj[i];
          let showcases = [];
          for (let j = 0; j < o.showcases.length; j++) {
            showcases.push({
              label: o.showcases[j].name,
              value: o.showcases[j].id,
            });
          }
          cpFilter.repairMan.options.push({
            label: o.enterprise,
            value: o.id,
            showcases,
          });
        }
        setFilter(cpFilter);
        setRepairMans(cpFilter.repairMan.options);
      },
      catch: (error) => {
        console.log(error);
      },
    });
  };

  const getServices = () => {
    connector({
      method: "get",
      url: `${endPoints.ANONYMOUS_SERVICES}?atLeastOne=${true}&order[name]=asc`,
      data: {},
      success: (response) => {
        const arrayObj = response.data["hydra:member"] || [];
        const cpFilter = { ...filter };
        cpFilter.service.options = [
          {
            label: "Tous les services",
            value: "",
            subCategory: [],
            benefits: [],
          },
        ];
        for (let i = 0; i < arrayObj.length; i++) {
          let o = arrayObj[i];
          const subCategory = [];
          for (let j = 0; j < o.categories.length; j++) {
            subCategory.push({
              label: o.categories[j].name,
              value: o.categories[j].id,
              //parent: o.categories[j].parent,
            });
          }
          cpFilter.service.options.push({
            label: o.name,
            value: o.id,
            subCategory,
            benefits: o.benefits,
          });
        }
        setServices(cpFilter.service.options);
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
    cpState.priceQuote.value = item.priceQuote;
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
            priceQuote: cpState.priceQuote.value
              ? cpState.priceQuote.value
              : null,
            precisionQuote: cpState.precisionQuote.value,
            deliveryModes: cpDeliveryModes.data,
          },
          success: (response) => {
            getBenefits(true);
            setActiveBenefit(response.data);
            setIsPending(false);
            msgSuccess("Vos modifications ont bien été prises en compte.");
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
          typeService: !cpState.typeService.value,
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
      if (state.motif.value) {
        setIsPending(true);
        connector({
          method: "delete",
          url: `${endPoints.BENEFIT}/${benefit.id}/repairman?motif=${state.motif.value}`,
          success: () => {
            getBenefits(true);
            setBenefit(false);
            setIsPending(false);
            setShowModal(false);
            const cpState = { ...state };
            cpState.motif.value = "";
            setState(cpState);
            NotificationManager.success(
              "Prestation supprimée avec succès.",
              ""
            );
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
      } else {
        msgErrors({ motif: !state.motif.value });
      }
    }
  };

  const msgErrors = (e) => {
    scrollTop("side-content-dashboard");
    if (e.msg !== undefined) setMessage({ type: "error", text: e.msg });
    const cpState = { ...state };
    if (e.typeService !== undefined) cpState.typeService.error = e.typeService;
    if (e.deliveryModes !== undefined)
      cpState.deliveryModes.error = e.deliveryModes;
    if (e.motif !== undefined) cpState.motif.error = e.motif;
    setState(cpState);
  };

  const msgSuccess = (text) => {
    scrollTop("side-content-dashboard");
    if (text !== undefined) setMessage({ type: "success", text });
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  return (
    <AdminBase>
      <BlocAdminContent>
        <DashboardContent
          titlePage="Catalogue des prestations"
          className={benefit ? "side-is-opened" : null}
        >
          <ListsAdmin
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
            <div className="bloc-name-societe">
              <img
                src={getPathImage(
                  benefit?.user?.picture ? benefit.user.picture : ""
                )}
                alt=""
              />
              <span>
                {benefit?.user?.enterprise ? benefit.user.enterprise : ""}
              </span>
            </div>
            <h2 className="title-side-dashboard">{benefit.service.name}</h2>
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
                    : null}
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
                            )
                              cpState.priceQuote.value = getFloat(
                                e.target.value
                              );
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
              <PopinModal
                show={showModal}
                handleClose={() => {
                  setShowModal(false);
                }}
                title={dataModal.title}
              >
                <Input
                  {...state.motif}
                  onChange={(e) => {
                    const cpState = { ...state };
                    cpState.motif.value = e.target.value;
                    cpState.motif.error = false;
                    setState(cpState);
                    setMessage(null);
                  }}
                />
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
            </Form>
          </DashboardSide>
        ) : null}
      </BlocAdminContent>
    </AdminBase>
  );
}
