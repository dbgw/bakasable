import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Container } from "react-bootstrap";
import Select from "../ui-elements/select";
import {
  BlocFilterStyle,
  PageBanner,
} from "../../assets/styles/frontGlobalStyle";
import { SearchIcon } from "../../assets/styles/icons";
import { useMediaQuery } from "react-responsive";
import InputAutoComplete from "../ui-elements/inputAutoComplete";
import { indexOfValue, isEqual, scrollTop, copy } from "../../helper/functions";
import { clearErrors } from "../../helper/form";
import Slider from "react-slick";
import SelectCat from "../categories/selectCat";

export default function BannerHome({ sliderBanner = [], title, description }) {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 993px)" });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 994px)",
  });
  const [click, setClick] = useState(false);
  const toggleFilter = () => setClick(!click);
  const toogleCloseFilter = () => setClick(false);
  useEffect(() => {
    if (click) {
      document.body.classList.add("menu-is-show");
    } else {
      document.body.classList.remove("menu-is-show");
    }
  }, [click]);

  const history = useHistory();
  const universe = useSelector((state) => state.universe);
  const [placeIsSelected, setPlaceIsSelected] = useState(false);
  const [isPendingLatLng, setIsPendingLatLng] = useState(true);
  const [defaultKeywordId] = useState(localStorage.getItem("keywordId"));
  const [defaultKeywordBy] = useState(localStorage.getItem("keywordBy"));
  const [defaultKeywordVal] = useState(localStorage.getItem("keywordVal"));
  const [defaultCodePostal] = useState(localStorage.getItem("codePostal"));
  const [defaultLatitude] = useState(
    parseFloat(localStorage.getItem("latitude"))
  );
  const [defaultLongitude] = useState(
    parseFloat(localStorage.getItem("longitude"))
  );

  useEffect(() => {
    if (universe.allUniverses) {
      let cpFilter = { ...filter };
      cpFilter.universe.options = [];
      for (let i = 0; i < universe.allUniverses.length; i++) {
        let o = universe.allUniverses[i];
        const category = [];
        for (let j = 0; j < o.categories.length; j++) {
          const subCategory = [];
          for (let k = 0; k < o.categories[j].children.length; k++) {

            subCategory.push({
              label: o.categories[j].children[k].name,
              value: o.categories[j].children[k].id,
            });
          }
          category.push({
            label: o.categories[j].name,
            value: o.categories[j].id,
            subCategory,
          });
        }

        cpFilter.universe.options.push({
          label: o.name,
          value: o.id,
          category,
          nameCategory: o.nameCategory,
          nameSubCategory: o.nameSubCategory,
          requireSearchSubCategory: o.requireSearchSubCategory,
        });
      }
      setFilter(cpFilter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [universe]);

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
      subCategory: [],
      value: null,
      isSearchable: true,
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
      isSearchable: true,
      error: false,
      infoBull: false,
      textInfoBulle:
        "Veuillez sélectionner une sous-catégorie dans la liste pour lancer une recherche",
    },
    activeElement: "",
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

  const [errorcCodePostal] = useState(localStorage.getItem("errorcCodePostal"));

  useEffect(() => {
    if (errorcCodePostal) {
      msgErrors({ codePostal: true });
      localStorage.setItem("errorcCodePostal", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorcCodePostal]);

  const searchServices = () => {
    setFilter(clearErrors(filter));
    setFilterMap(clearErrors(filterMap));
    if (
      filter.universe.value &&
      filter.category.value &&
      ((Array.isArray(filter.subCategory.value) &&  filter.subCategory.value.length>0) || !filter.universe.requireSearchSubCategory) &&
      placeIsSelected
    ) {
      const index = indexOfValue(filter.universe.value, universe.allUniverses);
      if (index > -1) {
        if (isTabletOrMobile) {
          setClick(false);
        }
        const u = universe.allUniverses[index];
        history.push(`/univers/${u.slug}-${u.id}`);
      }
    } else {
      msgErrors({
        universe: !filter.universe.value,
        category: filter.universe.value && !filter.category.value,
        subCategory:
          filter.universe.value &&
          filter.category.value &&
          !(Array.isArray(filter.subCategory.value) &&  filter.subCategory.value.length>0) &&
          filter.universe.requireSearchSubCategory,
        codePostal: !placeIsSelected,
        notice: "Veuillez svp renseigner les champs du filtre.",
      });
    }
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
    setFilter(cpFilter);

    const cpFilterMap = { ...filterMap };
    if (e.codePostal !== undefined) {
      cpFilterMap.codePostal.error = e.codePostal;
      cpFilterMap.codePostal.infoBulle = e.codePostal;
    }
    setFilterMap(cpFilterMap);
  };

  useEffect(() => {
    document.addEventListener("BannerHome", function (event) {
      if (event?.detail?.url && event?.detail?.id) {
        if (event.detail.isHome) {
          if (
            localStorage.getItem("codePostal") &&
            localStorage.getItem("latitude") &&
            localStorage.getItem("longitude")
          ) {
            history.push(event.detail.url);
          } else {
            
            const cpFilter = { ...filter };
            cpFilter.universe.value = event.detail.id;
            setFilter(cpFilter);

            setPlaceIsSelected(false);
            const cpFilterMap = { ...filterMap };
            cpFilterMap.codePostal.error = true;
            cpFilterMap.codePostal.infoBulle = true;
            setFilterMap(cpFilterMap);

            scrollTop();
          }
        }
      } else {
        console.log("error event params.");
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const settings = {
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 1000,
    autoplaySpeed: 5000,
    autoplay: true,
  };

  useEffect(() => {
    const cpFilter = copy(filter);
    if (filter.activeElement === "universe") {
      cpFilter.category.options = [];
      if (filter.universe.value) {
        cpFilter.category.options.push(...filter.universe.category);
        if (
          indexOfValue(
            filter.category.value,
            filter.universe.category,
            "value"
          ) === -1
        ) {
          cpFilter.category.value = "";
          localStorage.setItem("defaultCategory", null);
        }

        cpFilter.category.label =
          filter.universe.nameCategory || "Catégorie(s)";
        cpFilter.subCategory.label =
          filter.universe.nameSubCategory || "Sous-catégorie(s)";
      }
      if (!isEqual(cpFilter.category.options, filter.category.options)) {
        cpFilter.activeElement = "category";
        cpFilter.category.value = "";
        localStorage.setItem("defaultCategory", null);
        setFilter(cpFilter);
      }
    } else if (filter.activeElement === "category") {
      cpFilter.subCategory.options = [];
      if (filter.category.value) {
        cpFilter.subCategory.options.push(...filter.category.subCategory);
        if (
          indexOfValue(
            filter.subCategory.value,
            filter.category.subCategory,
            "value"
          ) === -1
        ) {
          cpFilter.subCategory.value = "";
          localStorage.setItem("defaultSubCategory", null);
        }
      }
      if (!isEqual(cpFilter.subCategory.options, filter.subCategory.options)) {
        cpFilter.activeElement = "subCategory";
        cpFilter.subCategory.value = "";
        localStorage.setItem("defaultSubCategory", null);
        setFilter(cpFilter);
      }
    }
  }, [filter]);

  return (
    <PageBanner className="home-page-banner">
      <div className="slider-home-banner">
        <Slider {...settings}>
          {sliderBanner &&
            sliderBanner.map(($val) => (
              <div key={$val.id} className="item-slider-banner">
                <img src={$val.url} alt={title} />
              </div>
            ))}
        </Slider>
      </div>
      <Container>
        <div className="bloc-title-banner">
          <h1 className="title-banner-cat">{title}</h1>
          <p className="description-banner-cat">{description}</p>
        </div>
        {isTabletOrMobile && (
          <div className="btn-toggle-filter" onClick={toggleFilter}>
            <SearchIcon /> Rechercher une prestation
          </div>
        )}

        <BlocFilterStyle open={click}>
          {isTabletOrMobile && (
            <button
              className="menu-burger is-opened"
              onClick={toogleCloseFilter}
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
                const cpFilter = { ...filter };
                cpFilter.universe.value = e.value;
                cpFilter.universe.nameCategory = e.nameCategory;
                cpFilter.universe.nameSubCategory = e.nameSubCategory;
                cpFilter.universe.requireSearchSubCategory =
                  e.requireSearchSubCategory;
                cpFilter.universe.category = e.category;
                cpFilter.universe.error = false;
                cpFilter.activeElement = "universe";
                setFilter(cpFilter);
              }}
            />
          </div>

          {filter.universe.value && (
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
                    cpFilter.category.subCategory = e.subCategory;
                    cpFilter.category.error = false;
                    cpFilter.activeElement = "category";
                    localStorage.setItem("defaultCategory", e.value);
                    setFilter(cpFilter);
                  }
                }}
              />
            </div>
          )}

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
                  cpFilter.activeElement = "subCategory";
                  localStorage.setItem(
                    "defaultSubCategory",
                    JSON.stringify(response)
                  );
                  setFilter(cpFilter);
                }}
              />
            </div>
          )}
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
          <div className="btn-filter-banner">
            <button
              className="btn-search-filter"
              onClick={() => {
                searchServices();
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
      </Container>
    </PageBanner>
  );
}
