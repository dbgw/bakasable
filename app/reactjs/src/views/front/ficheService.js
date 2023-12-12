import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import {
  BackStyle,
  BlocFilterStyle,
  ContentPageStyle,
} from "../../assets/styles/frontGlobalStyle";
import { BackIcon, SearchIcon } from "../../assets/styles/icons";
import Breadcrumb from "../../components/ui-elements/breadcrumb";
import Base from "../../theme/front/base";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import { RangePrice } from "../../assets/styles/componentStyles";
import ListePrestationFiche from "../../components/front/listePrestationFiche";
import endPoints from "../../config/endPoints";
import connector from "../../connector";
import InputAutoComplete from "../../components/ui-elements/inputAutoComplete";
import { clearErrors } from "../../helper/form";
import SelectCat from "../../components/categories/selectCat";
import { sortObjects } from "../../helper/functions";

export default function FicheService() {
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

  const [defaultCodePostal] = useState(localStorage.getItem("codePostal"));
  const [defaultLatitude] = useState(
    parseFloat(localStorage.getItem("latitude"))
  );
  const [defaultLongitude] = useState(
    parseFloat(localStorage.getItem("longitude"))
  );

  const { slugIdUniverse, slugIdService } = useParams();
  const [service, setService] = useState(false);
  const [benefits, setBenefits] = useState([]);
  const [activeUniverse, setActiveUniverse] = useState(false);
  const universe = useSelector((state) => state.universe);
  const [placeIsSelected, setPlaceIsSelected] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isPendingLatLng, setIsPendingLatLng] = useState(true);
  const [paramsUrlService, setParamsUrlService] = useState("");
  const [filter, setFilter] = useState({
    deliveryModeTypes: {
      label: "Mode de délivrance",
      name: "deliveryModeTypes",
      placeholder: "Tous",
      options: [],
      value: [],
      hideOptions: true,
    },
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
    price: {
      value: [-1, -1],
    },
    sortBy: {
      label: "Trier par: ",
      placeholder: `${isTabletOrMobile ? "trier par :" : ""}`,
      options: [
        { value: "distance_asc", label: "Distance" },
        { value: "rating_desc", label: "Meilleures notes" },
        { value: "price_asc", label: "Prix croissant" },
        { value: "price_desc", label: "Prix décroissant" },
      ],
      value: `${isTabletOrMobile ? null : "distance_asc"}`,
    },
  });
  const dataCrumbs = [
    { name: "Accueil", path: "/" },
    {
      name: `${activeUniverse ? activeUniverse.name : "Univers"}`,
      path: `/univers/${slugIdUniverse}`,
    },
    { name: service ? service.name : "", path: "/" },
  ];

  useEffect(() => {
    if (universe.allUniverses) {
      const id = slugIdUniverse.split("-").pop();
      if (id) {
        const universeData = universe.allUniverses.find(
          (u) => parseInt(u.id) === parseInt(id)
        );
        if (universeData) {
          setActiveUniverse(universeData);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [universe]);

  useEffect(() => {
    getDeliveryModeTypes();
    getService();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isPendingLatLng && service) {
      getBenefits(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugIdService, filter.sortBy.value, isPendingLatLng, service.id]);

  const getDeliveryModeTypes = () => {
    connector({
      method: "get",
      url: endPoints.DELIVERY_MODE_TYPES,
      success: (response) => {
        const arrayObj = response.data["hydra:member"] || [];
        const cpFilter = { ...filter };
        let options = [];
        for (let i = 0; i < arrayObj.length; i++) {
          options.push({ value: arrayObj[i].id, label: arrayObj[i].name });
        }
        cpFilter.deliveryModeTypes.options = options;
        setFilter(cpFilter);
      },
      catch: (error) => {
        console.log(error);
      },
    });
  };

  const getService = () => {
    const idService = slugIdService.split("-").pop();
    if (idService) {
      let condition = ``;
      if (filter.codePostal.latitude && filter.codePostal.longitude) {
        condition += `?latitude=${filter.codePostal.latitude}&longitude=${filter.codePostal.longitude}`;
      }
      connector({
        method: "get",
        url: `${endPoints.ANONYMOUS_SERVICE}${idService}${condition}`,
        success: (response) => {
          setService(response.data || {});
        },
        catch: (error) => {
          console.log(error);
        },
      });
    } else {
      NotificationManager.error("Quelque chose s'est mal passé.", "");
    }
  };

  const getBenefits = (refresh = false) => {
    const idService = slugIdService.split("-").pop();
    if (idService) {
      if (!placeIsSelected) {
        msgErrors({
          codePostal: true,
        });
        return;
      }

      if (isTabletOrMobile) {
        setClick(false);
      }

      if (!isPending) {
        setIsPending(true);
        setFilter(clearErrors(filter));

        const sortBy = filter.sortBy.value.split("_");

        let condition = ``;
        if (filter.codePostal.latitude && filter.codePostal.longitude) {
          condition += `&latitude=${filter.codePostal.latitude}&longitude=${filter.codePostal.longitude}`;
        }
        if (sortBy[0] === "distance") {
          condition += `&order[distance]=asc`;
        } else if (sortBy[0] === "price") {
          condition += `&order[deliveryModes.price]=${sortBy[1]}`;
        }else if (sortBy[0] === "rating") {
          condition += `&order[rating]=${sortBy[1]}`;
        }
        if (filter.deliveryModeTypes.value.length) {
          for (let i = 0; i < filter.deliveryModeTypes.value.length; i++) {
            const row = filter.deliveryModeTypes.value[i];
            condition += `&deliveryModes.deliveryModeType.id[]=${row.value}`;
          }
        }
        if (
          filter.price.value[0] > -1 &&
          filter.price.value[1] > -1 &&
          (filter.price.value[0] !== service.minPrice ||
            filter.price.value[1] !== service.maxPrice)
        ) {
          condition += `&deliveryModes.price[between]=${filter.price.value[0]}..${filter.price.value[1]}`;
        }

        const cpParamsUrlService = `${condition}`;

        //if (refresh || cpParamsUrlService !== paramsUrlService) {
        if (refresh || paramsUrlService) {
          setParamsUrlService(cpParamsUrlService);
          connector({
            method: "get",
            url: `${endPoints.ANONYMOUS_BENEFITS_SERVICE}?service.id=${idService}${cpParamsUrlService}`,
            success: (response) => {
              let results = response.data["hydra:member"] || [];
              //todo list est voir le min et max
              if (service) {
                const cpService = { ...service };
                let prices = [];
                for (var i = 0; i < results.length; i++) {
                  for (var j = 0; j < results[i].deliveryModes.length; j++) {
                    const obj = results[i].deliveryModes[j];
                    if (obj.price && parseFloat(obj.price) > 0) {
                      prices.push(parseFloat(obj.price));
                    }
                  }
                  results[i] = {...results[i], rating :  results[i].user.googleRating || 0};
                }
                if (prices.length) {
                  cpService.minPrice = Math.floor(Math.min(...prices));
                  cpService.maxPrice = Math.ceil(Math.max(...prices));
                  setService(cpService);
                }else{
                  cpService.minPrice = 0;
                  cpService.maxPrice = 0;
                  setService(cpService);
                }
              }
              if (sortBy[0] === "price") {
                results = sortObjects(results,'minPrice',sortBy[1]);
              }else if(sortBy[0] === "rating"){
                results = sortObjects(results,'rating',sortBy[1]);
              }
              setBenefits(results);
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
      }
    } else {
      NotificationManager.error("Quelque chose s'est mal passé.", "");
    }
  };

  const to = (value, index) => {
    value = Math.round(value);
    const cpFilter = { ...filter };
    if (index !== undefined && cpFilter.price.value[index] !== value) {
      cpFilter.price.value[index] = value;
      setFilter(cpFilter);
    }
    return value;
  };

  const from = (value) => {
    return Number(value);
  };

  const msgErrors = (e) => {
    const cpFilter = { ...filter };
    if (e.notice !== undefined) NotificationManager.error(e.notice, "");
    if (e.codePostal !== undefined) {
      cpFilter.codePostal.error = e.codePostal;
      cpFilter.codePostal.infoBulle = e.codePostal;
    }
    setFilter(cpFilter);
  };

  return (
    <Base className="fiche-service-page">
      <ContentPageStyle>
        <Container>
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
              <RangePrice>
                <label>Prix</label>
                {service &&
                service.minPrice &&
                service.maxPrice &&
                service.minPrice != service.maxPrice ? (
                  <Nouislider
                    range={{ min: service.minPrice, max: service.maxPrice }}
                    start={[service.minPrice, service.maxPrice]}
                    connect={true}
                    behaviour="tap"
                    step={1}
                    tooltips={true}
                    format={{ to, from }}
                  />
                ) : (
                  "Sur devis"
                )}
              </RangePrice>
            </div>
            <div className="item-filter">
              <SelectCat
                {...filter.deliveryModeTypes}
                onChangeCallback={(response) => {
                  const cpFilter = { ...filter };
                  cpFilter.deliveryModeTypes.value = response;
                  setFilter(cpFilter);
                }}
              />
            </div>
            <div className="item-filter">
              <InputAutoComplete
                filter={filter}
                setFilter={setFilter}
                placeIsSelected={placeIsSelected}
                setPlaceIsSelected={setPlaceIsSelected}
                isPendingLatLng={isPendingLatLng}
                setIsPendingLatLng={setIsPendingLatLng}
              />
            </div>
            <div className="btn-filter-banner">
              <button
                className="btn-search-filter"
                onClick={(e) => {
                  getBenefits(false);
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
          {isDesktopOrLaptop && <Breadcrumb crumbs={dataCrumbs} />}
          <BackStyle to={`/univers/${slugIdUniverse}`}>
            <BackIcon />
            <span>Retour à l'univers</span>
          </BackStyle>
          {isTabletOrMobile && (
            <div className="btn-toggle-filter" onClick={toggleFilter}>
              <SearchIcon /> Rechercher une prestation
            </div>
          )}
          <ListePrestationFiche
            service={service}
            benefits={benefits}
            filter={filter}
            setFilter={setFilter}
            isPending={isPending}
          />
        </Container>
      </ContentPageStyle>
    </Base>
  );
}
