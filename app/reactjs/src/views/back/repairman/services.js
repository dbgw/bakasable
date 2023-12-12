import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { NotificationManager } from "react-notifications";
import { Redirect, useLocation } from "react-router-dom";
import { Input, ButtonDef } from "../../../components/ui";
import AdminBase from "../../../theme/back/adminBase";
import DashboardContent from "../../../components/dashboardContent";
import DashboardSide from "../../../components/dashboardSide";
import { BlocAdminContent } from "../../../assets/styles/adminStyle/adminGlobalStyle";
import ListsRepairMan from "../../../components/services/listsRepairMan";
import { NoticeIcon } from "../../../assets/styles/icons";
import * as vars from "../../../vars";
import endPoints from "../../../config/endPoints";
import connector from "../../../connector";
import noImage from "../../../assets/images/noImage.png";
import { clearErrors } from "../../../helper/form";
import ROUTES from "../../../config/routes";
import { useMediaQuery } from "react-responsive";
import CloseButton from "../../../components/ui-elements/closeButton";
import { parentCategories, sortObjectsText } from "../../../helper/functions";

export default function Services() {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const perPageDesMob = isMobile ? 10 : 20;
  const [goToBenefit, setGoToBenefit] = useState(false);
  const [services, setServices] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [totalServices, setTotalServices] = useState(0);
  const [universesCategories, setUniversesCategories] = useState([]);
  const [message, setMessage] = useState(null);
  const [service, setService] = useState(false);
  const [perPage, setPerPage] = useState(perPageDesMob);
  const [pageIndex, setPageIndex] = useState(0);
  const [paramsUrlService, setParamsUrlService] = useState("");
  const [isPending, setIsPending] = useState(false);
  const query = new URLSearchParams(useLocation().search);

  const [defaultBenefit] = useState(
    query.get("benefit") ? parseInt(query.get("benefit")) : ""
  );

  const [filter, setFilter] = useState({
    benefit: {
      placeholder: "Prestations",
      options: [
        { label: "Toutes les prestations", value: "" },
        { label: "Services avec mes prestations", value: 1 },
        { label: "Services sans prestation", value: -1 },
      ],
      value: defaultBenefit,
      isSearchable: true,
    },
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
      options: [{ label: "Tous les services", value: "", subCategory: [] }],
      value: "",
      isSearchable: true,
    },
    activeElement: "",
  });

  useEffect(() => {
    const cpFilter = copy(filter);
    let all = "";
    if (filter.activeElement === "benefit") {
      
        cpFilter.activeElement = "universe";
        setFilter(cpFilter);

    } else if (filter.activeElement === "universe") {
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
      if (filter.subCategory.value) {
        for (let i = 0; i < allServices.length; i++) {
          if (
            (allServices[i].benefit === 0 && filter.benefit.value === -1) ||
            (allServices[i].benefit > 0 && filter.benefit.value === 1) ||
            !filter.benefit.value
          ) {
            if (
              indexOfValue(
                filter.subCategory.value,
                allServices[i].subCategory,
                "value"
              ) > -1
            ) {
              serviceOptions.push(allServices[i]);
            }
          }
        }
        if (
          indexOfValue(filter.service.value, serviceOptions, "value") === -1
        ) {
          cpFilter.service.value = "";
        }
      } else {
        for (let i = 0; i < allServices.length; i++) {
          if (
            (allServices[i].benefit === 0 && filter.benefit.value === -1) ||
            (allServices[i].benefit > 0 && filter.benefit.value === 1) ||
            !filter.benefit.value
          ) {
            for (let j = 0; j < allServices[i].subCategory.length; j++) {
             
              if (
                indexOfValue(
                  allServices[i].subCategory[j].value,
                  filter.subCategory.options,
                  "value"
                ) > -1
              ) {
                serviceOptions.push(allServices[i]);
                break;
              }
            }
          }
        }
        if (
          indexOfValue(filter.service.value, serviceOptions, "value") === -1
        ) {
          cpFilter.service.value = "";
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
      if (pageIndex === 0) {
        getServices(false);
      } else {
        setPageIndex(0);
      }
    } 

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => {
    getUniversesCategories();
    getAllServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUniversesCategories = () => {
    connector({
      method: "get",
      url: endPoints.UNIVERSES_CATEGORIES_REPAIRMAN,
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
        let categoriesOptions = [];
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
            categoriesOptions.push({ ...row, options: subCategory });
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

        const cpState = { ...state };
        cpState.universe.options = [...cpFilter.universe.options];
        cpState.categories.options = [...categoriesOptions];
        setState(cpState);
      },
      catch: (error) => {
        console.log(error);
      },
    });
  };

  useEffect(() => {
    getServices(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, perPage]);

  const getServices = (refresh = false) => {
    let condition = "";
    if (filter.universe.value) {
      condition += `&categories.parent.universe.id=${filter.universe.value}`;
    }
    if (filter.category.value) {
      condition += `&categories.parent.id=${filter.category.value}`;
    }
    if (filter.subCategory.value) {
      condition += `&categories.id=${filter.subCategory.value}`;
    }
    if (filter.benefit.value) {
      condition += `&benefit=${filter.benefit.value}`;
    }
    if (filter.service.value) {
      condition += `&id=${filter.service.value}`;
    }

    const cpParamsUrlService = `page=${
      parseInt(pageIndex) + 1
    }&itemsPerPage=${perPage}${condition}`;

    if (refresh || cpParamsUrlService !== paramsUrlService) {
      setParamsUrlService(cpParamsUrlService);
      connector({
        method: "get",
        url: `${endPoints.SERVICES_REPAIRMAN}?${cpParamsUrlService}`,
        success: (response) => {
          setServices(response.data["hydra:member"] || []);
          setTotalServices(response.data["hydra:totalItems"] || 0);
        },
        catch: (error) => {
          console.log(error);
        },
      });
    }
  };

  const getAllServices = () => {
    connector({
      method: "get",
      url: `${endPoints.SERVICES_REPAIRMAN}`,
      success: (response) => {
        const arrayObj = response.data["hydra:member"] || [];
        const cpFilter = { ...filter };
        cpFilter.service.options = [
          { label: "Tous les services", value: "", subCategory: [] },
        ];
        for (let i = 0; i < arrayObj.length; i++) {
          let o = arrayObj[i];
          const subCategory = [];
          for (let j = 0; j < o.categories.length; j++) {
            subCategory.push({
              label: o.categories[j].name,
              value: o.categories[j].id,
            });
          }
          cpFilter.service.options.push({
            label: o.name,
            value: o.id,
            subCategory,
            benefit: o.benefits.length || 0,
          });
        }
        setAllServices(cpFilter.service.options);
        setFilter(cpFilter);
      },
      catch: (error) => {
        console.log(error);
      },
    });
  };

  const getPathImage = (image) => (image ? vars.pathImage + image : noImage);

  const setActiveService = (item = {}) => {
    const cpState = { ...state };
    cpState.object.value = "";
    cpState.description.value = "";
    setState(cpState);
    setService(item);
  };

  const [state, setState] = useState({
    object: {
      name: "name_service",
      type: "text",
      label: "Titre du service",
      placeholder: "Titre du service",
      value: "",
      required: true,
      error: false,
      errorMessage: "",
    },
    description: {
      name: "description",
      label: "Description",
      placeholder: "Description",
      value: "",
      error: false,
      errorMessage: "",
      required: true,
      as: "textarea",
    },
  });

  const addBenefit = () => {
    if (!isPending) {
      setIsPending(true);
      setMessage(null);
      if (service.id) {
        connector({
          method: "post",
          url: endPoints.BENEFIT_REPAIRMAN,
          data: {
            service: `${endPoints.ANONYMOUS_SERVICE}${service.id}`,
          },
          success: (response) => {
            setIsPending(false);
            NotificationManager.success(
              "Service ajouté avec succès à vos prestations.",
              ""
            );
            setGoToBenefit({ ...service, benefits: [response.data] });
            setService(false);
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
        msgErrors({ msg: "Quelque chose s'est mal passé." });
      }
    }
  };

  const askNewService = () => {
    if (!isPending) {
      setIsPending(true);
      setMessage(null);
      setState(clearErrors({ ...state }));
      if (state.object.value && state.description.value) {
        connector({
          method: "post",
          url: endPoints.NEW_SERVICE,
          data: {
            object: state.object.value,
            description: state.description.value,
          },
          success: (response) => {
            setActiveService(false);
            setIsPending(false);
            NotificationManager.success(
              "Votre demande de création d'un nouveau service bien été prises en compte.",
              ""
            );
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
          object: !state.object.value,
          description: !state.description.value,
          msg,
        });
        setIsPending(false);
      }
    }
  };

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

  const msgErrors = (e) => {
    if (e.msg !== undefined) setMessage({ type: "error", text: e.msg });
    const cpState = { ...state };
    if (e.object !== undefined) cpState.object.error = e.object;
    if (e.description !== undefined) cpState.description.error = e.description;
    setState(cpState);
  };

  if (goToBenefit) {
    if (goToBenefit.benefits.length) {
      return (
        <Redirect
          to={`${ROUTES.REPA_PRESTATIONS.url}?benefit=${goToBenefit.benefits[0].id}`}
        />
      );
    } else {
      msgErrors({ msg: "Quelque chose s'est mal passé." });
    }
  }

  return (
    <AdminBase>
      <BlocAdminContent>
        <DashboardContent
          titlePage="Catalogue des services"
          className={service ? "side-is-opened" : null}
        >
          <ListsRepairMan
            setActiveItem={setActiveService}
            item={service}
            items={services}
            filter={filter}
            setFilter={setFilter}
            totalItems={totalServices}
            perPage={perPage}
            setPerPage={setPerPage}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            textButtonAjoute="Demander la création d’un nouveau service"
          />
        </DashboardContent>
        {service ? (
          <DashboardSide className="prestations-side">
            {isMobile && (
              <>
                <CloseButton
                  onClick={(e) => {
                    e.preventDefault();
                    setService(false);
                  }}
                />
              </>
            )}
            <h2 className="title-side-dashboard">
              {service === "new"
                ? "Demande de création d’un service"
                : service.name}
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

              {service.id ? (
                <>
                  <div className="image-service-prestation">
                    <img src={getPathImage(service.picture)} alt="" />
                  </div>
                  <div className="desc-service-prestation">
                    <p>{service.description}</p>
                  </div>

                  <div className="cats-service-prestation">
                    <span>Catégories :</span>
                    <div className="item-cats-prestation">
                      {service.categories
                        ? parentCategories(service.categories).map((cat) => (
                            <p key={cat.id}>
                              <span>{cat.name}</span>
                            </p>
                          ))
                        : ""}
                    </div>
                  </div>
                  <div className="notice-bloc">
                    {service.minPrice ||
                    service.averagePrice ||
                    service.maxPrice ? (
                      <span className="notice-icon">
                        <NoticeIcon />
                      </span>
                    ) : (
                      ""
                    )}
                    <div className="item-notice">
                      {service.minPrice ? (
                        <span>
                          Prix mini observé chez Fingz :{" "}
                          {parseFloat(service.minPrice).toFixed(2)} € TTC
                        </span>
                      ) : (
                        ""
                      )}
                      {service.averagePrice ? (
                        <span>
                          Prix moyen observé chez Fingz :{" "}
                          {parseFloat(service.averagePrice).toFixed(2)} € TTC
                        </span>
                      ) : (
                        ""
                      )}
                      {service.maxPrice ? (
                        <span>
                          Prix maxi observé chez Fingz :{" "}
                          {parseFloat(service.maxPrice).toFixed(2)} € TTC
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="bloc-button-prestation">
                    {service.benefits.length ? (
                      <ButtonDef
                        textButton="Voir ma prestation"
                        spinner={isPending}
                        onClick={(e) => {
                          e.preventDefault();
                          setGoToBenefit(service);
                        }}
                      />
                    ) : (
                      <ButtonDef
                        textButton="Ajouter à mes prestations"
                        spinner={isPending}
                        onClick={(e) => {
                          e.preventDefault();
                          addBenefit();
                        }}
                      />
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="notice-bloc">
                    <span className="notice-icon">
                      <NoticeIcon />
                    </span>
                    Vous ne trouvez pas de service correspondant à vos
                    prestations ? Proposez-nous un nouveau service à créer.
                  </div>
                  <Input
                    {...state.object}
                    onChange={(e) => {
                      const cpState = { ...state };
                      cpState.object.value = e.target.value;
                      cpState.object.error = false;
                      setState(cpState);
                    }}
                  />
                  <Input
                    {...state.description}
                    onChange={(e) => {
                      const cpState = { ...state };
                      cpState.description.value = e.target.value;
                      cpState.description.error = false;
                      setState(cpState);
                    }}
                  />
                  <ButtonDef
                    className="btn-center"
                    textButton="Envoyer ma demande"
                    spinner={isPending}
                    onClick={(e) => {
                      e.preventDefault();
                      askNewService();
                    }}
                  />
                </>
              )}
            </Form>
          </DashboardSide>
        ) : null}
      </BlocAdminContent>
    </AdminBase>
  );
}
