import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { NotificationManager } from "react-notifications";
import { useMediaQuery } from "react-responsive";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import imgMaintenence from "../../assets/images/img-page-maintenace.svg";
import {
  BlocFilterStyle,
  ContentPageStyle,
} from "../../assets/styles/frontGlobalStyle";
import { SearchIcon } from "../../assets/styles/icons";
import SelectCat from "../../components/categories/selectCat";
import FoundPage from "../../components/foundPage";
import BannerPage from "../../components/front/bannerPage";
import ListProduits from "../../components/front/listProduits";
import Loader from "../../components/loader";
import Breadcrumb from "../../components/ui-elements/breadcrumb";
import InputAutoComplete from "../../components/ui-elements/inputAutoComplete";
import InputSearchKeyword from "../../components/ui-elements/inputSearchKeyword";
import Select from "../../components/ui-elements/select";
import endPoints from "../../config/endPoints";
import ROUTES from "../../config/routes";
import connector from "../../connector";
import { clearErrors } from "../../helper/form";
import Base from "../../theme/front/base";

export default function Universe() {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 993px)" });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 994px)",
  });
  const [toggleFilter, setToggleFilter] = useState(false);
  const history = useHistory();
  const [defaultKeywordId] = useState(localStorage.getItem("keywordId"));
  const [defaultKeywordBy] = useState(localStorage.getItem("keywordBy"));
  const [defaultKeywordVal] = useState(localStorage.getItem("keywordVal"));
  const [defaultCategory, setDefaultCategory] = useState(
    parseInt(localStorage.getItem("defaultCategory"))
  );
  const [defaultSubCategory, setDefaultSubCategory] = useState(
    JSON.parse(localStorage.getItem("defaultSubCategory") || null)
  );
  const [defaultCodePostal] = useState(localStorage.getItem("codePostal"));
  const [defaultLatitude] = useState(
    parseFloat(localStorage.getItem("latitude"))
  );
  const [defaultLongitude] = useState(
    parseFloat(localStorage.getItem("longitude"))
  );

  const perPageDesMob = isDesktopOrLaptop ? 20 : 8;
  const { slugIdUniverse } = useParams();
  const [placeIsSelected, setPlaceIsSelected] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isPendingLatLng, setIsPendingLatLng] = useState(true);
  const [universe, setUniverse] = useState(false);
  const [perPage, setPerPage] = useState(perPageDesMob);
  const [pageIndex, setPageIndex] = useState(0);
  const [services, setServices] = useState([]);
  const [totalServices, setTotalServices] = useState(0);
  const [paramsUrlService, setParamsUrlService] = useState("");
  const universeSelector = useSelector((state) => state.universe);
  const [filter, setFilter] = useState({
    universe: {
      label: "Univers",
      placeholder: "Choisir dans la liste",
      options: [{ label: "Tous les univers", value: "", category: [] }],
      value: "",
      category: [],
      nameCategory: "",
      nameSubCategory: "",
      requireSearchSubCategory: false,
      isSearchable: true,
      error: false,
      infoBull: false,
      textInfoBulle:
        "Veuillez sélectionner un univers dans la liste pour lancer une recherche",
    },
    category: {
      label: "Catégorie(s)",
      placeholder: "Choisir dans la liste",
      options: [],
      value: null,
      error: false,
      infoBull: false,
      textInfoBulle:
        "Veuillez sélectionner une catégorie dans la liste pour lancer une recherche",
    },
    subCategory: {
      label: "Sous-catégorie(s)",
      placeholder: "Affiner votre recherche",
      options: [],
      value: null,
      hideOptions: true,
      error: false,
      infoBull: false,
      textInfoBulle:
        "Veuillez sélectionner une sous-catégorie dans la liste pour lancer une recherche",
    },
    keyword: {
      label: "Réparer quoi",
      type: "text",
      name: "keyword",
      placeholder: "Rentrer un mot clé",
      value: defaultKeywordVal ? defaultKeywordVal : "",
      options: [],
      active:
        defaultKeywordBy && defaultKeywordId
          ? { id: defaultKeywordId, by: defaultKeywordBy }
          : {},
      error: false,
      required: false,
    },
  });
  const [filterMap, setFilterMap] = useState({
    codePostal: {
      name: "codePostal",
      type: "text",
      label: "Où",
      placeholder: "Saisir un code postal",
      value:
        defaultCodePostal && defaultLatitude && defaultLongitude
          ? defaultCodePostal
          : "",
      latitude:
        defaultCodePostal && defaultLatitude && defaultLongitude
          ? defaultLatitude
          : null,
      longitude:
        defaultCodePostal && defaultLatitude && defaultLongitude
          ? defaultLongitude
          : null,
      error: false,
      required: true,
      infoBulle: false,
    },
  });

  useEffect(() => {
    if (toggleFilter) {
      document.body.classList.add("menu-is-show");
    } else {
      document.body.classList.remove("menu-is-show");
    }
  }, [toggleFilter]);

  useEffect(() => {
    if (universeSelector.allUniverses) {
      let cpFilter = { ...filter };
      cpFilter.universe.options = [];
      for (let i = 0; i < universeSelector.allUniverses.length; i++) {
        let o = universeSelector.allUniverses[i];
        cpFilter.universe.options.push({
          label: o.name,
          value: o.id,
          slug: o.slug,
        });
      }
      cpFilter.universe.value = parseInt(slugIdUniverse.split("-").pop());
      setFilter(cpFilter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [universeSelector, slugIdUniverse]);

  useEffect(() => {
    if (localStorage.getItem("codePostal")) {
      getUniverse();
    } else {
      localStorage.setItem("errorcCodePostal", "codePostal non define");
      history.push(ROUTES.HOME.url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugIdUniverse]);

  useEffect(() => {
    document.addEventListener("Universe", function (event) {
      if (event?.detail?.url && event?.detail?.id) {
        const cpFilter = { ...filter };
        cpFilter.keyword.value = "";
        cpFilter.keyword.active = { id: "", by: "", index: 0 };
        cpFilter.keyword.options = [];
        localStorage.setItem("keywordVal", "");
        localStorage.setItem("keywordBy", "");
        localStorage.setItem("keywordId", "");
        localStorage.setItem("defaultCategory", "");
        localStorage.setItem("defaultSubCategory", "");
        setDefaultCategory(null);
        setDefaultSubCategory(null);
        setFilter(cpFilter);
      } else {
        console.log("error event params.");
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (universe && !isPendingLatLng) {
      getServices(false, 0);
    }
  }, [universe]);

  useEffect(() => {
    if (universe && !isPendingLatLng) {
      getServices(false, null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPendingLatLng, pageIndex, perPage]);

  const getUniverse = () => {
    const id = slugIdUniverse.split("-").pop();
    if (id) {
      connector({
        method: "get",
        url: `${endPoints.ANONYMOUS_UNIVERSE}${id}/categories`,
        success: (response) => {
          const arrayObj = response.data || { categories: [] };
          setUniverse(arrayObj);

          let cpFilter = { ...filter };
          cpFilter.category.options = [];

          cpFilter.category.value = null;
          cpFilter.subCategory.value = null;
          cpFilter.subCategory.options = [];

          if (response.data?.nameCategory) {
            cpFilter.category.label = response.data.nameCategory;
          }

          if (response.data?.nameSubCategory) {
            cpFilter.subCategory.label = response.data.nameSubCategory;
          }

          if (response.data?.requireSearchSubCategory != undefined) {
            cpFilter.universe.requireSearchSubCategory =
              response.data.requireSearchSubCategory;
          }

          for (let i = 0; i < arrayObj.categories.length; i++) {
            let o = arrayObj.categories[i];

            if (o.id == defaultCategory) {
              cpFilter.category.value = defaultCategory;
              cpFilter.subCategory.value = defaultSubCategory;
              for (let j = 0; j < o.children.length; j++) {
                cpFilter.subCategory.options.push({
                  label: o.children[j].name,
                  value: o.children[j].id,
                });
              }
            }
            cpFilter.category.options.push({ label: o.name, value: o.id });
          }
          setFilter(cpFilter);
        },
        catch: (error) => {
          console.log(error);
          if (error.response?.data?.code !== undefined) {
            if (error.response.data.code === 401) {
              NotificationManager.error("Univers introuvable.", "");
            } else if (error.response.data.message !== undefined) {
              NotificationManager.error(error.response.data.message, "");
            }
          }
          setUniverse(null);
        },
      });
    } else {
      NotificationManager.error("Quelque chose s'est mal passé.", "");
    }
  };

  const getServices = (refresh = false, index = null) => {
    index = index != null ? index : pageIndex;
    setPageIndex(index);
    if (!placeIsSelected) {
      msgErrors({
        codePostal: true,
      });
      return;
    }

    if (!isPending) {
      setIsPending(true);
      setFilter(clearErrors(filter));
      setFilterMap(clearErrors(filterMap));
      if (refresh || (filterMap.codePostal.latitude && filterMap.codePostal.value)) {
        let condition = "";
        if (filter.category.value) {
          condition += `&categories.parent.id=${filter.category.value}`;
        }
        if (filter.subCategory.value && filter.subCategory.value.length) {
          for (let i = 0; i < filter.subCategory.value.length; i++) {
            condition += `&categories.id[]=${filter.subCategory.value[i].value}`;
          }
        }
        /*  if (
          filter.keyword.active.id &&
          filter.keyword.active.by &&
          filter.keyword.value.trim()
        ) {
          condition += `&${filter.keyword.active.by}=${filter.keyword.value}`;
        } else if (filter.keyword.value.trim()) {
          condition += `&or[name,categories.parent.name,categories.name,description]=${filter.keyword.value}`;
        } */

        if (filterMap.codePostal.latitude && filterMap.codePostal.longitude) {
          condition += `&latitude=${filterMap.codePostal.latitude}&longitude=${filterMap.codePostal.longitude}`;
        }

        const cpParamsUrlService = `page=${
          parseInt(index) + 1
        }&itemsPerPage=${perPage}&categories.parent.universe.id=${
          universe.id
        }${condition}`;

        if (refresh || cpParamsUrlService !== paramsUrlService) {
          setParamsUrlService(cpParamsUrlService);
          connector({
            method: "get",
            url: `${endPoints.ANONYMOUS_SERVICES_CATALOG}?${cpParamsUrlService}`,
            success: (response) => {
              setServices(response.data["hydra:member"] || []);
              setTotalServices(response.data["hydra:totalItems"] || 0);
              setIsPending(false);
            },
            catch: (error) => {
              console.log(error);
              setIsPending(false);
            },
          });
        } else {
          setIsPending(false);
        }
      } else {
        msgErrors({
          codePostal: !(filterMap.codePostal.latitude && filterMap.codePostal.value),
        });
        setIsPending(false);
      }
    }
  };

  const refreshSubCategory = (cpFilter, cpCategories) => {
    const index = cpCategories.findIndex(
      (cat) => cat.id === cpFilter.category.value
    );
    cpFilter.subCategory.options = [];
    let subCat = [];
    if (index > -1) {
      subCat = cpCategories[index].children;
    } else {
      const allSubCategory = [];
      for (let i = 0; i < cpCategories.length; i++) {
        allSubCategory.push(...cpCategories[i].children);
      }
      subCat = allSubCategory;
    }
    for (let i = 0; i < subCat.length; i++) {
      cpFilter.subCategory.options.push({
        label: subCat[i].name,
        value: subCat[i].id,
      });
    }
    if (cpFilter.category.value) cpFilter.subCategory.value = [];
    return cpFilter;
  };

  const msgErrors = (e) => {
    const cpFilter = { ...filter };
    if (e.universe !== undefined) {
      cpFilter.universe.error = e.universe;
      cpFilter.universe.infoBull = e.universe;
    }
    if (e.category !== undefined) {
      cpFilter.category.error = e.category;
      cpFilter.category.infoBull = e.category;
    }
    if (e.subCategory !== undefined) {
      cpFilter.subCategory.error = e.subCategory;
      cpFilter.subCategory.infoBull = e.subCategory;
    }

    if (e.notice !== undefined) NotificationManager.error(e.notice, "");
    setFilter(cpFilter);

    const cpFilterMap = { ...filterMap };
    if (e.codePostal !== undefined) {
      cpFilterMap.codePostal.error = e.codePostal;
      cpFilterMap.codePostal.infoBulle = e.codePostal;
    }
    setFilterMap(cpFilterMap);
  };

  if (universe === false) {
    return <Loader />;
  }

  return (
    <Base>
      {universe ? (
        <>
          <BannerPage
            universe={universe}
            toggleFilter={toggleFilter}
            setToggleFilter={setToggleFilter}
          />
          <ContentPageStyle>
            <Container>
              {isDesktopOrLaptop && (
                <Breadcrumb
                  crumbs={[
                    { name: "Accueil", path: "/" },
                    { name: universe.name, path: "/univers/" + slugIdUniverse },
                  ]}
                />
              )}

              {isTabletOrMobile && (
                <div
                  className="btn-toggle-filter toggel-filter-universe"
                  onClick={() => {
                    setToggleFilter(!toggleFilter);
                  }}
                >
                  <SearchIcon /> Rechercher une prestation
                </div>
              )}

              <BlocFilterStyle className="filter-universe" open={toggleFilter}>
                {isTabletOrMobile && (
                  <button
                    className="menu-burger is-opened"
                    onClick={() => {
                      setToggleFilter(false);
                    }}
                  >
                    <span></span>
                    <span></span>
                    <span></span>
                  </button>
                )}

                <div className="item-filter">
                  <Select
                    {...filter.universe}
                    element={filter.universe}
                    setElement={(element) => {
                      const cpFilter = { ...filter };
                      cpFilter.universe = element;
                      setFilter(cpFilter);
                    }}
                    onChange={(e) => {
                      if (e.value && e.slug) {
                        document.dispatchEvent(
                          new CustomEvent("Universe", {
                            detail: {
                              url: `/univers/${e.slug}-${e.value}`,
                              id: e.value,
                            },
                          })
                        );
                        history.push(`/univers/${e.slug}-${e.value}`);

                        msgErrors({
                          universe: false,
                          category: false,
                          subCategory: false,
                          codePostal: false,
                        });
                      }
                    }}
                  />
                </div>

                <div className="item-filter">
                  <Select
                    {...filter.category}
                    element={filter.category}
                    setElement={(element) => {
                      const cpFilter = { ...filter };
                      cpFilter.category = element;
                      setFilter(cpFilter);
                    }}
                    onChange={(e) => {
                      if (filter.category.value !== e.value) {
                        let cpFilter = { ...filter };
                        cpFilter.category.value = e.value;
                        cpFilter.category.error = false;
                        localStorage.setItem("defaultCategory", e.value);
                        cpFilter = refreshSubCategory(
                          cpFilter,
                          universe.categories
                        );
                        if (e.value == "") {
                          cpFilter.subCategory.value = "";
                        }
                        cpFilter.subCategory.error = false;
                        cpFilter.subCategory.infoBull = false;
                        setFilter(cpFilter);
                      }
                    }}
                  />
                </div>

                {filter.category.value && (
                  <div className="item-filter">
                    <SelectCat
                      {...filter.subCategory}
                      element={filter.subCategory}
                      setElement={(element) => {
                        const cpFilter = { ...filter };
                        cpFilter.subCategory = element;
                        setFilter(cpFilter);
                      }}
                      onChangeCallback={(response) => {
                        const cpFilter = { ...filter };
                        cpFilter.subCategory.value = response;
                        cpFilter.subCategory.error = false;
                        localStorage.setItem(
                          "defaultSubCategory",
                          JSON.stringify(response)
                        );
                        setFilter(cpFilter);
                      }}
                    />
                  </div>
                )}

                {/* <div className="item-filter">
                  <InputSearchKeyword
                    filter={filter}
                    setFilter={setFilter}
                    universe={universe}
                  />
                </div> */}

                <div className="item-filter">
                  <InputAutoComplete
                    filter={filterMap}
                    setFilter={setFilterMap}
                    placeIsSelected={placeIsSelected}
                    setPlaceIsSelected={setPlaceIsSelected}
                    isPendingLatLng={isPendingLatLng}
                    setIsPendingLatLng={setIsPendingLatLng}
                  />
                </div>

                <div className="item-filter btn-filter-banner">
                  <button
                    className="btn-search-filter"
                    onClick={() => {
                      if (
                        isTabletOrMobile &&
                        placeIsSelected &&
                        filterMap.codePostal.latitude &&
                        filterMap.codePostal.value
                      ) {
                        setToggleFilter(false);
                      }

                      if (
                        filter.universe.value &&
                        filter.category.value &&
                        ((Array.isArray(filter.subCategory.value) &&
                          filter.subCategory.value.length > 0) ||
                          !filter.universe.requireSearchSubCategory) &&
                        placeIsSelected
                      ) {
                        getServices(false, 0);
                      } else {
                        msgErrors({
                          universe: !filter.universe.value,
                          category:
                            filter.universe.value && !filter.category.value,
                          subCategory:
                            filter.universe.value &&
                            filter.category.value &&
                            !(
                              Array.isArray(filter.subCategory.value) &&
                              filter.subCategory.value.length > 0
                            ) &&
                            filter.universe.requireSearchSubCategory,
                          codePostal: !placeIsSelected,
                        });
                      }
                    }}
                  >
                    {isDesktopOrLaptop && (
                      <>
                        <SearchIcon />
                      </>
                    )}
                    {isTabletOrMobile && <>Recherche</>}
                  </button>
                </div>
              </BlocFilterStyle>

              <ListProduits
                data={services}
                perPage={perPage}
                setPerPage={setPerPage}
                pageIndex={pageIndex}
                setPageIndex={setPageIndex}
                totalItemsLength={totalServices}
                pagination={true}
                isLoading={isPending}
              />
            </Container>
          </ContentPageStyle>
        </>
      ) : (
        <FoundPage
          noBase
          title="Univers en cours de développement"
          image={imgMaintenence}
        />
      )}
    </Base>
  );
}
