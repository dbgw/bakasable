import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import { BlocAdminContent } from "../../../assets/styles/adminStyle/adminGlobalStyle";
import { DeleteIcon, EditIcon } from "../../../assets/styles/icons";
import SelectCat from "../../../components/categories/selectCat";
import DashboardContent from "../../../components/dashboardContent";
import DashboardSide from "../../../components/dashboardSide";
import { ButtonDef, Input } from "../../../components/ui";
import AdminBase from "../../../theme/back/adminBase";
import * as vars from "../../../vars";
import endPoints from "../../../config/endPoints";
import connector from "../../../connector";
import noImage from "../../../assets/images/noImage.png";
import { ServicesTableStyle } from "../../../assets/styles/adminStyle/adminGlobalStyle";
import { AddGreenIcon } from "../../../assets/styles/icons";
import Tableau from "../../../components/ui-elements/tableau";
import Select from "../../../components/ui-elements/select";
import FilterDefault from "../../../components/filterDefault";
import { clearErrors } from "../../../helper/form";
import ROUTES from "../../../config/routes";
import PopinModal from "../../../components/ui-elements/popinModal";
import { useMediaQuery } from "react-responsive";
import CloseButton from "../../../components/ui-elements/closeButton";
import {
  scrollTop,
  sortObjectsText,
  indexOfValue,
  isEqual,
  copy,
  getMsgError,
  getPathImage,
} from "../../../helper/functions";

export default function Services() {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const query = new URLSearchParams(useLocation().search);
  const defaultUniverse = query.get("universe")
    ? parseInt(query.get("universe"))
    : "";
  const defaultCategory = query.get("category")
    ? parseInt(query.get("category"))
    : "";
  const defaultSubCategory = query.get("subCategory")
    ? parseInt(query.get("subCategory"))
    : "";
  const perPageDesMob = isMobile ? 10 : 20;
  const [services, setServices] = useState([]);
  const [totalServices, setTotalServices] = useState(0);
  const [universesCategories, setUniversesCategories] = useState([]);
  const [message, setMessage] = useState(null);
  const [service, setService] = useState(false);
  const [perPage, setPerPage] = useState(perPageDesMob);
  const [pageIndex, setPageIndex] = useState(0);
  const [activeSort, setActiveSort] = useState("name");
  const [switshSort, setSwitshSort] = useState(false);
  const [paramsUrlService, setParamsUrlService] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dataModal, setDataModal] = useState({ title: "", type: "" });
  const [state, setState] = useState({
    id: { value: null },
    name: {
      name: "name",
      label: "Nom",
      type: "text",
      required: true,
      placeholder: "Nom",
      value: "",
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
      required: false,
      as: "textarea",
    },
    picture: { name: "picture", value: "", file: null, required: false },
    categories: {
      name: "categories",
      label: "Sous-catégorie(s)",
      placeholder: "Affiner votre recherche",
      value: [],
      options: [],
      required: true,
    },
    universe: {
      name: "universe",
      label: "Univers",
      placeholder: "Filtrer",
      options: [],
      value: "",
      isSearchable: true,
    },
  });
  const [filter, setFilter] = useState({
    universe: {
      placeholder: "Univers",
      options: [{ label: "Tous les univers", value: "", category: [] }],
      value: defaultUniverse,
      isSearchable: true,
    },
    category: {
      placeholder: "catégorie(s)",
      options: [{ label: "Toutes les catégories", value: "", subCategory: [] }],
      value: defaultCategory,
      isSearchable: true,
    },
    subCategory: {
      placeholder: "Sous catégorie(s)",
      options: [{ label: "Toutes les sous-catégories", value: "" }],
      value: defaultSubCategory,
      isSearchable: true,
    },
    activeElement: "",
  });

  useEffect(() => {
    getUniversesCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getServices(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, perPage, filter, activeSort, switshSort]);

  useEffect(() => {
    const cpFilter = copy(filter);
    if (filter.activeElement === "universe") {
      cpFilter.category.options = [
        { label: "Toutes les catégories", value: "", subCategory: [] },
      ];
      if (filter.universe.value) {
        const index = indexOfValue(
          filter.universe.value,
          universesCategories,
          "value"
        );
        if (index > -1) {
          cpFilter.category.options.push(
            ...universesCategories[index].category
          );
          if (
            indexOfValue(
              filter.category.value,
              universesCategories[index].category,
              "value"
            ) === -1
          ) {
            cpFilter.category.value = "";
          }
        }
      }
      if (!isEqual(cpFilter.category.options, filter.category.options)) {
        cpFilter.activeElement = "category";
        cpFilter.category.value = "";
        setFilter(cpFilter);
        setPageIndex(0);
      }
    } else if (filter.activeElement === "category") {
      cpFilter.subCategory.options = [
        { label: "Toutes les sous-catégories", value: "" },
      ];
      if (filter.category.value) {
        const index = indexOfValue(
          filter.category.value,
          filter.category.options,
          "value"
        );
        if (index > -1) {
          cpFilter.subCategory.options.push(
            ...filter.category.options[index].subCategory
          );
          if (
            indexOfValue(
              filter.subCategory.value,
              filter.category.options[index].subCategory,
              "value"
            ) === -1
          ) {
            cpFilter.subCategory.value = "";
          }
        }
      }
      if (!isEqual(cpFilter.subCategory.options, filter.subCategory.options)) {
        cpFilter.activeElement = "subCategory";
        cpFilter.subCategory.value = "";
        setFilter(cpFilter);
        setPageIndex(0);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

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
    const cpParamsUrlService = `page=${
      parseInt(pageIndex) + 1
    }&itemsPerPage=${perPage}&order[${activeSort}]=${
      switshSort ? "desc" : "asc"
    }${condition}`;

    if (refresh || cpParamsUrlService !== paramsUrlService) {
      setParamsUrlService(cpParamsUrlService);
      connector({
        method: "get",
        url: `${endPoints.ANONYMOUS_SERVICES_PRICES}?${cpParamsUrlService}`,
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

  const submitService = (cpState) => {
    let cpCategories = cpState.categories.value.map(
      (cat) => `${endPoints.ANONYMOUS_CATEGORY}${cat.value}`
    );

    connector({
      method: cpState.id.value ? "put" : "post",
      url: `${endPoints.SERVICE}${
        cpState.id.value ? "/" + cpState.id.value : ""
      }`,
      data: {
        name: cpState.name.value,
        description: cpState.description.value,
        picture: cpState.picture.value,
        universe: cpState.universe.value ? `${endPoints.ANONYMOUS_UNIVERSE}${cpState.universe.value}`: null,
        categories: cpCategories,
      },
      success: (response) => {
        getServices(true);
        response.data.categories = cpState.categories.value;
        setActiveService({
          ...response.data,
          totalBenefits: service.totalBenefits,
          universe : cpState.universe.value ? {id:cpState.universe.value}:""
        });
        setIsPending(false);
        msgSuccess("Vos modifications ont bien été prises en compte.");
      },
      catch: (error) => {
        console.log(error);
        setIsPending(false);
        msgErrors({ msg: "Quelque chose s'est mal passé." });
      },
    });
  };

  const saveService = () => {
    if (!isPending) {
      setIsPending(true);
      setMessage(null);
      setState(clearErrors(state));
      if (state.name.value && state.categories.value.length) {
        if (state.picture.file) {
          saveImage(state);
        } else {
          submitService(state);
        }
      } else {
        const msg = "Vérifier si les champs obligatoires sont remplis.";
        msgErrors({
          name: !state.name.value,
          categories: !state.categories.value.length,
          msg,
        });
        setIsPending(false);
      }
    }
  };

  const deleteService = () => {
    if (!isPending) {
      setIsPending(true);
      connector({
        method: "delete",
        url: endPoints.SERVICE + "/" + service.id,
        success: () => {
          getServices(true);
          setService(false);
          setIsPending(false);
          setShowModal(false);
          NotificationManager.success("Service supprimé avec succès.", "");
        },
        catch: (error) => {
          setIsPending(false);
          setShowModal(false);
          msgErrors({ msg: getMsgError(error) });
        },
      });
    }
  };

  const msgErrors = (e) => {
    scrollTop("side-content-dashboard");
    if (e.msg !== undefined) setMessage({ type: "error", text: e.msg });
    const cpState = { ...state };
    if (e.name !== undefined) cpState.name.error = e.name;
    if (e.categories !== undefined) cpState.categories.error = e.categories;
    setState(cpState);
  };

  const msgSuccess = (text) => {
    scrollTop("side-content-dashboard");
    if (text !== undefined) setMessage({ type: "success", text });
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const saveImage = (cpState) => {
    const data = new FormData();
    data.append("file", cpState.picture.file);
    connector({
      method: "post",
      url: endPoints.ANONYMOUS_MEDIA_OBJECT,
      data,
      success: (response) => {
        cpState.picture.file = null;
        cpState.picture.value = response.data.contentUrl;
        setState(cpState);
        submitService(cpState);
      },
      catch: (error) => {
        console.log(error);
      },
    });
  };

  const setActiveRow = (item = {}) => {
    if (service && parseInt(item.id) === parseInt(service.id)) {
      setService(false);
    } else {
      setActiveService(item);
    }
  };

  const setActiveService = (item = {}) => {
    setMessage(null);
    const cpState = { ...clearErrors(state) };
    if (!item.id) {
      item = {
        id: null,
        name: "",
        description: "",
        picture: null,
        universe: "",
        categories: [],
      };
    }
    cpState.id.value = item.id;
    cpState.name.value = item.name;
    cpState.description.value = item.description;
    cpState.picture.value = item.picture;
    cpState.universe.value = item.universe ? item.universe.id :"";
    const options = [];
    for (let i = 0; i < item.categories.length; i++) {
      options.push({
        label: item.categories[i].name || item.categories[i].label,
        value: item.categories[i].id || item.categories[i].value,
      });
    }
    cpState.categories.value = options;
    cpState.picture.file = "";
    setState(cpState);
    setService(item);
  };

  const getUrlBenefits = (item) => {
    return `${ROUTES.PRESTATIONS.url}?service=${item.id}`;
  };

  const universeCategoriesOptions = () => {
    const cpState = { ...state };
    const categoriesOptions = [];
    const universeOptions = [...filter.universe.options];
    for (let i = 0; i < universeOptions.length; i++) {
      const option = universeOptions[i];
      if (
        option.value &&
        (!state.universe.value || state.universe.value === option.value)
      ) {
        option.category.map((obj) => {
          categoriesOptions.push({
            label: obj.label,
            value: obj.value,
            options: obj.subCategory,
          });
        });
      }
    }
    cpState.categories.options = [...categoriesOptions];
    setState(cpState);
  };

  const rowRenderservices = (row) => (
    <div
      onClick={() => setActiveRow(row)}
      className={`divTableRow ${service.id === row.id ? "active" : ""}`}
      key={`row-${row.id}`}
    >
      <div className="divTableCell">
        {isMobile && <label> Nom: </label>}
        <div>{row.name}</div>
      </div>
      <div className="divTableCell">
        {isMobile && <label> Prix moyen: </label>}
        <div>{parseFloat(row.averagePrice).toFixed(2)}</div>
      </div>
      <div className="divTableCell">
        {isMobile && <label> Prix min: </label>}
        <div>{parseFloat(row.minPrice).toFixed(2)}</div>
      </div>
      <div className="divTableCell">
        {isMobile && <label> Prix max: </label>}
        <div>{parseFloat(row.maxPrice).toFixed(2)}</div>
      </div>
      <div className="divTableCell">
        {isMobile && <label> Commandes: </label>}
        <div>{row.totalCommands}</div>
      </div>
      {isMobile && (
        <div className="divTableCell m-action">
          <div>
            <ButtonDef
              textButton="Voir le service"
              onClick={() => setActiveRow(row)}
            />
          </div>
        </div>
      )}
    </div>
  );

  return (
    <AdminBase>
      <BlocAdminContent>
        <DashboardContent titlePage="Services" className="services-page">
          <ServicesTableStyle>
            <ButtonDef
              spinner={isPending}
              onClick={() => setActiveService({})}
              textButton={
                <>
                  Nouveau service <AddGreenIcon />{" "}
                </>
              }
              className="btn-add"
            />
            <FilterDefault
              className="services-filter"
              formItems={
                <>
                  <Select
                    {...filter.universe}
                    onChange={(e) => {
                      const cpFilter = { ...filter };
                      cpFilter.universe.value = e.value;
                      cpFilter.activeElement = "universe";
                      setPageIndex(0);
                      setFilter(cpFilter);
                    }}
                  />
                  {filter.universe.value ? (
                    <Select
                      {...filter.category}
                      onChange={(e) => {
                        let cpFilter = { ...filter };
                        cpFilter.category.value = e.value;
                        cpFilter.activeElement = "category";
                        setPageIndex(0);
                        setFilter(cpFilter);
                      }}
                    />
                  ) : null}

                  {filter.category.value ? (
                    <Select
                      {...filter.subCategory}
                      onChange={(e) => {
                        const cpFilter = { ...filter };
                        cpFilter.subCategory.value = e.value;
                        cpFilter.activeElement = "subCategory";
                        setPageIndex(0);
                        setFilter(cpFilter);
                      }}
                    />
                  ) : (
                    ""
                  )}
                </>
              }
            />
            <Tableau
              columns={[
                { key: "name", text: "Nom", sort: true },
                { key: "averagePrice", text: "Prix moyen", sort: true },
                { key: "minPrice", text: "Prix min", sort: true },
                { key: "maxPrice", text: "Prix max", sort: true },
                { key: "commands", text: "Commandes", sort: true },
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
              totalItemsLength={totalServices}
              data={services}
              rowRender={rowRenderservices}
            />
          </ServicesTableStyle>
        </DashboardContent>

        {service ? (
          <DashboardSide>
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
              {service.name ? service.name : "Nouveau service"}
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
              <Select
                {...state.universe}
                onChange={(e) => {
                  const cpState = { ...state };
                  if(e.value && cpState.universe.value !== e.value){
                    cpState.categories.value = [];
                  }
                  cpState.universe.value = e.value;
                  setState(cpState);
                  universeCategoriesOptions();
                }}
              />
              <SelectCat
                {...state.categories}
                onChangeCallback={(response) => {
                  const cpState = { ...state };
                  cpState.categories.value = response;
                  cpState.categories.error = false;
                  setState(cpState);
                  setMessage(null);
                }}
              />
              <Input
                {...state.name}
                onChange={(e) => {
                  const cpState = { ...state };
                  cpState.name.value = e.target.value;
                  cpState.name.error = false;
                  setState(cpState);
                  setMessage(null);
                }}
              />
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
                    setMessage(null);
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
              {/*<WysiwygEditor
                {...state.description}
                onChange={(e) => {
                  const cpState = { ...state };
                  cpState.description.value = e || "";
                  setState(cpState);
                  setMessage(null);
                }
              />*/}
              <Input
                {...state.description}
                onChange={(e) => {
                  const cpState = { ...state };
                  cpState.description.value = e.target.value;
                  setState(cpState);
                  setMessage(null);
                }}
              />
              <div className="btns-alings service-btns-action">
                {service.name ? (
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
                ) : null}
                <ButtonDef
                  textButton="Enregistrer"
                  spinner={isPending}
                  onClick={(e) => {
                    e.preventDefault();
                    saveService();
                  }}
                />
              </div>

              {!state.id.value ? (
                ""
              ) : service.totalBenefits ? (
                <div className="link-voir">
                  <Link to={getUrlBenefits(service)}>
                    {" "}
                    {service.totalBenefits} prestation(s) lié(s){" "}
                  </Link>
                </div>
              ) : (
                <div className="link-voir-0">
                  <Link to={"#"}> 0 prestation(s) lié(s) </Link>
                </div>
              )}

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
                      deleteService();
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
