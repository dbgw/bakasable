import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { NotificationManager } from "react-notifications";
import { Col, Container, Row } from "react-bootstrap";
import Carousel, { Modal, ModalGateway } from "react-images";
import {
  BackStyle,
  ContentPageStyle,
  PropositionStyle,
  ContentFichePrestation,
} from "../../assets/styles/frontGlobalStyle";
import {
  AdresseIcon,
  BackIcon,
  FacebookColorIcon,
  InstagramColorIcon,
  LinkedinColorIcon,
  TwitterColorIcon,
  WebIcon,
  YoutubeColorIcon,
} from "../../assets/styles/icons";
import { ButtonDef } from "../../components/ui";
import Breadcrumb from "../../components/ui-elements/breadcrumb";
import RadioButton from "../../components/ui-elements/radioButton";
import Base from "../../theme/front/base";
import GalerieSlide from "../../components/galerieSlide";
import endPoints from "../../config/endPoints";
import connector from "../../connector";
import Loader from "../../components/loader";
import {
  getMsgError,
  getPathImage,
  getUniqueListBy,
  parentCategories,
  sortObjects,
} from "../../helper/functions";
import * as vars from "../../vars";
import { useMediaQuery } from "react-responsive";
import Select from "../../components/ui-elements/select";
import RatingBox from "../../components/ui-elements/ratingBox";

export default function FichePrestation() {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 993px)" });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 994px)",
  });

  const auth = useSelector((store) => store.auth);
  const [checkAuto, setCheckAuto] = useState(false);
  const history = useHistory();
  const { slugIdUniverse, slugIdService, slugIdBenefit } = useParams();
  const [benefit, setBenefit] = useState(false);
  const [activeUniverse, setActiveUniverse] = useState(false);
  const [categories, setCategories] = useState([]);
  const [universRepairman, setUniversRepairman] = useState([]);
  const universe = useSelector((state) => state.universe);
  const [isPending, setIsPending] = useState(false);
  const [defaultLatitude] = useState(
    parseFloat(localStorage.getItem("latitude"))
  );
  const [defaultLongitude] = useState(
    parseFloat(localStorage.getItem("longitude"))
  );

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
    getBenefit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getBenefit = () => {
    const id = slugIdBenefit.split("-").pop();
    if (id) {
      setIsPending(true);
      connector({
        method: "get",
        url: `${endPoints.ANONYMOUS_BENEFIT}/${id}/details?${
          defaultLatitude && defaultLongitude
            ? `latitude=${defaultLatitude}&longitude=${defaultLongitude}`
            : ""
        }`,
        success: (response) => {
          const obj = response.data || {};
          setBenefit(response.data || {});
          if (obj?.user?.achievements && obj.user.achievements.length) {
            let dataGallery = [];
            for (let i = 0; i < obj.user.achievements.length; i++) {
              dataGallery.push({
                source: getPathImage(obj.user.achievements[i]),
              });
            }
            setDataGallery(dataGallery);
          }
          if (obj?.deliveryModes && obj.deliveryModes.length) {
            let cpState = { ...state };
            let options = [];
            for (let i = 0; i < obj.deliveryModes.length; i++) {
              const row = obj.deliveryModes[i];
              options.push({
                value: row.id,
                checked: false,
                label: row?.deliveryModeType?.name,
                row: obj.typeService === "forfait" ? row : false,
                id: `delivrance_checkbox_${row.id}`,
              });
            }
            cpState.deliveryModes.options = options;
            cpState.deliveryModes.typeService = obj.typeService;
            if(options.length == 1){
              cpState.deliveryModes.value = options[0].value;
            }
            setState(cpState);
          }
          if (obj?.user?.id) {
            getUserRepairmanBenefits(obj.user.id);
          } else {
            setIsPending(false);
          }
        },
        catch: (error) => {
          setIsPending(false);
          NotificationManager.error(getMsgError(error), "");
        },
      });
    } else {
      NotificationManager.error("Quelque chose s'est mal passé.", "");
    }
  };

  const getUserRepairmanBenefits = (id) => {
    connector({
      method: "get",
      url: `${endPoints.ANONYMOUS_USER_REPAIRMAN}/${id}/benefits`,
      success: (response) => {
        if (response.data?.benefits) {
          let subCategories = [];
          response.data.benefits.map((benefit) => {
            if (benefit?.service?.categories) {
              subCategories = [...subCategories, ...benefit.service.categories];
            }
          });
          const cpCategories = parentCategories(subCategories);
          setCategories(cpCategories);
          if (cpCategories.length > 0) {
            let cpUniversRepairman = [];
            cpCategories.map((cat) => {
              if (cat?.universe) {
                cpUniversRepairman.push({
                  id: cat.universe.id,
                  name: cat.universe.name,
                  slug: cat.universe.slug,
                  position: cat.universe.position,
                });
              }
            });
            setUniversRepairman(
              sortObjects(
                getUniqueListBy(cpUniversRepairman, "id"),
                "position",
                "asc"
              )
            );
          }
        }
        setIsPending(false);
      },
      catch: (error) => {
        setIsPending(false);
        NotificationManager.error(getMsgError(error), "");
      },
    });
  };

  const dataCrumbs = [
    { name: "Accueil", path: "/" },
    {
      name: `${activeUniverse ? activeUniverse.name : "Univers"}`,
      path: `/univers/${slugIdUniverse}`,
    },
    {
      name: benefit?.service?.name ? benefit.service.name : "Service",
      path: `/univers/${slugIdUniverse}/${slugIdService}`,
    },
    {
      name: benefit?.user?.enterprise ? benefit.user.enterprise : "Société",
      path: "#",
    },
  ];

  const [dataGallery, setDataGallery] = useState([]);

  const [state, setState] = useState({
    deliveryModes: {
      label: "Modes de délivrance",
      placeholder: "Modes de délivrance",
      id: "delivrance_radio",
      options: [],
      value: "",
      name: "deliveryModes",
      typeService: null,
    },
  });

  const [currentImage, setCurrentImage] = useState(0);
  const [stateImage, setStateImage] = useState(false);

  const openLightbox = (photo, index) => {
    setCurrentImage(index);
    setStateImage(true);
  };

  const closeLightbox = () => {
    setStateImage(false);
  };

  const checkClient = () => {
    if(!state.deliveryModes.value){
      NotificationManager.error("Veuillez choisir un mode de délivrance.", "");
      return;
    }

    if (auth?.user && auth?.roles) {
      if (auth.roles.includes(vars.ROLES.ROLE_CLIENT)) {
        history.push(
          `/univers/${slugIdUniverse}/${slugIdService}/${slugIdBenefit}/demande/${state.deliveryModes.value}`
        );
      } else if (auth.roles.includes(vars.ROLES.ROLE_REPAIRMAN)) {
        NotificationManager.error(
          "Veuillez créer un compte client, vous ne pouvez pas passer une commande en tant que réparateur",
          ""
        );
      } else if (auth.roles.includes(vars.ROLES.ROLE_ADMIN)) {
        NotificationManager.error(
          "Veuillez créer un compte client, vous ne pouvez pas passer une commande en tant que admin",
          ""
        );
      }
    } else {
      setCheckAuto(true);
      document.dispatchEvent(
        new CustomEvent("eventHeader", { detail: "openModalClient" })
      );
    }
  };

  useEffect(() => {
    if (auth?.user && checkAuto) {
      checkClient();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user]);

  if (isPending || !benefit) {
    return <Loader />;
  }

  return (
    <Base className="fiche-prestation-page">
      <ContentPageStyle>
        <Container>
          {isDesktopOrLaptop && <Breadcrumb crumbs={dataCrumbs} />}

          <BackStyle to={`/univers/${slugIdUniverse}/${slugIdService}`}>
            <BackIcon />
            <span>Retour au service</span>
          </BackStyle>
          <Row>
            <Col lg={4} className="proposition-bloc">
              {isTabletOrMobile && (
                <ContentFichePrestation>
                  <div className="logo-societe">
                    <img
                      src={getPathImage(benefit?.user?.picture)}
                      alt={benefit?.user?.enterprise}
                    />
                  </div>
                  <div className="info-societe">
                    <div className="detail-info-societe">
                      <p className="name-societe">
                        {benefit?.user?.enterprise}
                      </p>
                      <p className="fonction-societe">
                        {`${benefit?.user?.postalCode} ${benefit?.user?.city}`}
                      </p>
                      {benefit?.user?.googleRating && (
                        <RatingBox
                          value={benefit.user.googleRating}
                          showValue={true}
                        />
                      )}
                    </div>
                  </div>
                </ContentFichePrestation>
              )}
              <PropositionStyle>
                <div className="content-proposition">
                  <div className="bloc-titre-fiche mb-3">
                    <p className="titre-proposition">Nom du service</p>
                    <h1 className="titre-fiche-prestation">
                      {benefit?.service?.name}
                    </h1>
                  </div>
                  <p className="titre-proposition">
                    Proposition(s) du réparateur :
                  </p>
                  {isTabletOrMobile ? (
                    <Select
                      {...state.deliveryModes}
                      onChange={(val) => {
                        const cpState = { ...state };
                        cpState.deliveryModes.value = val.value;
                        setState(cpState);
                      }}
                    />
                  ) : (
                    <RadioButton
                      {...state.deliveryModes}
                      onChange={(val) => {
                        const cpState = { ...state };
                        cpState.deliveryModes.value = val.value;
                        setState(cpState);
                      }}
                    />
                  )}

                  {benefit.typeService === "forfait" && (
                    <ButtonDef
                      textButton="Commander"
                      onClick={() => checkClient()}
                    />
                  )}

                  {benefit.typeService === "devis" && (
                    <>
                      <div className="bloc-price-devis">
                        <span className="titre-price">Prix du devis</span>
                        <span className="price-devis">
                          {benefit.priceQuote
                            ? `${benefit.priceQuote?.toFixed(2)} € TTC`
                            : "GRATUIT"}
                        </span>
                      </div>
                      {benefit.precisionQuote && (
                        <div className="bloc-precision">
                          <p className="titre-precision">
                            Précision de prise en charge du devis:
                          </p>
                          <p>{benefit.precisionQuote}</p>
                        </div>
                      )}
                      <ButtonDef
                        textButton="Faire un devis"
                        onClick={() => checkClient()}
                      />
                    </>
                  )}
                </div>
              </PropositionStyle>
            </Col>
            <Col lg={8}>
              <ContentFichePrestation>
                {isDesktopOrLaptop && (
                  <>
                    <div className="info-societe">
                      <div className="detail-info-societe">
                        <p className="name-societe">
                          {benefit?.user?.enterprise}
                        </p>
                        <p className="fonction-societe">
                          {benefit?.user?.postalCode} {benefit?.user?.city}
                        </p>
                        {benefit?.user?.googleRating && (
                          <RatingBox
                            note="Note Google :"
                            value={benefit.user.googleRating}
                            showValue={true}
                          />
                        )}
                      </div>
                      <div className="logo-societe">
                        <img
                          src={getPathImage(benefit?.user?.picture)}
                          alt={benefit?.user?.enterprise}
                        />
                      </div>
                    </div>
                  </>
                )}
                {benefit?.user?.description ? (
                  <div className="description-societe">
                    {benefit?.user?.description}
                  </div>
                ) : null}

                {benefit?.user?.achievements.length ? (
                  <div className="bloc-realisation">
                    <h2 className="titre-bloc-prestation">Réalisations :</h2>
                    <GalerieSlide
                      children={dataGallery}
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
                  </div>
                ) : (
                  ""
                )}
                <div className="cats-prestation">
                  <span>Univers :</span>
                  <div className="item-cats-prestation">
                    {universRepairman.length > 0
                      ? universRepairman.map((row) => (
                          <p key={row.id}>
                            <span>{row.name}</span>
                          </p>
                        ))
                      : null}
                  </div>
                </div>
                <div className="bloc-more">
                  <h2 className="titre-bloc-prestation">En savoir plus :</h2>
                  <div className="info-societe-web">
                    <p>
                      <AdresseIcon /> {benefit?.user?.address}{" "}
                      {benefit?.user?.additionalAddress}{" "}
                      {benefit?.user?.postalCode} {benefit?.user?.city}
                    </p>
                    {benefit?.user?.website ? (
                      <p>
                        <Link
                          to={{ pathname: benefit?.user?.website }}
                          target="_blank"
                        >
                          <WebIcon /> {benefit?.user?.website}
                        </Link>
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="socials-societe">
                    {benefit?.user?.facebook ? (
                      <Link
                        to={{ pathname: benefit.user.facebook }}
                        target="_blank"
                      >
                        <FacebookColorIcon />
                      </Link>
                    ) : (
                      ""
                    )}
                    {benefit?.user?.instagram ? (
                      <Link
                        to={{ pathname: benefit.user.instagram }}
                        target="_blank"
                      >
                        <InstagramColorIcon />
                      </Link>
                    ) : (
                      ""
                    )}
                    {benefit?.user?.twitter ? (
                      <Link
                        to={{ pathname: benefit.user.twitter }}
                        target="_blank"
                      >
                        <TwitterColorIcon />
                      </Link>
                    ) : (
                      ""
                    )}
                    {benefit?.user?.linkedIn ? (
                      <Link
                        to={{ pathname: benefit.user.linkedIn }}
                        target="_blank"
                      >
                        <LinkedinColorIcon />
                      </Link>
                    ) : (
                      ""
                    )}
                    {benefit?.user?.youTube ? (
                      <Link
                        to={{ pathname: benefit.user.youTube }}
                        target="_blank"
                      >
                        <YoutubeColorIcon />
                      </Link>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </ContentFichePrestation>
            </Col>
          </Row>
        </Container>
      </ContentPageStyle>
    </Base>
  );
}
