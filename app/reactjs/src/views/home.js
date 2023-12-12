import React from "react";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import BannerHome from "../components/front/bannerHome";
import Base from "../theme/front/base";
import iconRep1 from "../assets/images/icons-services-home/home-page-01.svg";
import iconRep2 from "../assets/images/icons-services-home/home-page-02.svg";
import iconRep3 from "../assets/images/icons-services-home/home-page-03.svg";
import iconRep4 from "../assets/images/icons-services-home/home-page-04.svg";
import iconRep5 from "../assets/images/icons-services-home/home-page-05.svg";
import iconRep6 from "../assets/images/icons-services-home/home-page-06.svg";
import iconRep7 from "../assets/images/icons-services-home/home-page-07.svg";
import {
  ContentPageStyle,
  HomeReparateur,
  HomeBlocs,
} from "../assets/styles/frontGlobalStyle";
import { Link } from "react-router-dom";
import slideImage1 from "../assets/images/slider-image/home-slider-1.png";
import slideImage2 from "../assets/images/slider-image/home-slider-2.png";
import slideImage3 from "../assets/images/slider-image/home-slider-3.png";
import slideImage4 from "../assets/images/slider-image/home-slider-4.png";
import slideImage5 from "../assets/images/slider-image/home-slider-5.png";
import slideImage6 from "../assets/images/slider-image/home-slider-6.png";
import noImage from "../assets/images/noImage.png";
import * as vars from "../vars";

export default function Home() {
  const getPathImage = (image) => (image ? vars.pathImage + image : noImage);
  const universe = useSelector((state) => state.universe);

  const sliderImages = [
    {
      id: 1,
      url: slideImage1,
    },
    {
      id: 2,
      url: slideImage2,
    },
    {
      id: 3,
      url: slideImage3,
    },
    {
      id: 4,
      url: slideImage4,
    },
    {
      id: 5,
      url: slideImage5,
    },
    {
      id: 6,
      url: slideImage6,
    },
  ];
  return (
    <Base>
      <BannerHome
        sliderBanner={sliderImages}
        title="Faites réparer les objets qui vous sont chers"
      />
      <ContentPageStyle>
        <Container>
          <HomeReparateur>
            <h1 className="title-bloc">
              Il n'a jamais été aussi facile de trouver un réparateur
            </h1>
            <Row>
              <Col className="item-reparateurs-solution" lg={3} md={6}>
                <div className="content-reparateur-solution">
                  <div className="bloc-icon-repa">
                    <img src={iconRep1} alt="" />
                  </div>
                  <div className="content-item-repa-solution">
                    <p>
                      Dites-nous ce que vous voulez faire réparer
                    </p>
                  </div>
                </div>
              </Col>
              <Col className="item-reparateurs-solution" lg={3} md={6}>
                <div className="content-reparateur-solution">
                  <div className="bloc-icon-repa">
                    <img src={iconRep3} alt="" />
                  </div>
                  <div className="content-item-repa-solution">
                    <p>
                      Affinez votre recherche en choisissant votre prestation de
                      service
                    </p>
                  </div>
                </div>
              </Col>
              <Col className="item-reparateurs-solution" lg={3} md={6}>
                <div className="content-reparateur-solution">
                  <div className="bloc-icon-repa">
                    <img src={iconRep2} alt="" />
                  </div>
                  <div className="content-item-repa-solution">
                    <p>
                      Sélectionnez un artisan réparateur recommandé et réservez
                      en toute transparence grâce aux forfaits ou devis
                    </p>
                  </div>
                </div>
              </Col>
              <Col className="item-reparateurs-solution" lg={3} md={6}>
                <div className="content-reparateur-solution">
                  <div className="bloc-icon-repa">
                    <img src={iconRep4} alt="" />
                  </div>
                  <div className="content-item-repa-solution">
                    <p>
                      Payez et prenez rendez-vous avec votre réparateur en toute sécurité
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </HomeReparateur>
          <HomeBlocs>
            <Row>
              {universe.allUniverses &&
                universe.allUniverses.map((row) => (
                  <Col lg={4} sm={6} className="item-cat-univers" key={row.id}>
                    <Link
                      to={`/univers/${row.slug}-${row.id}`}
                      className="content-item-univers"
                    >
                      <img src={getPathImage(row.imageHome)} alt={row.name} />
                      <p className="name-cat-univers">{row.name}</p>
                    </Link>
                  </Col>
                ))}
            </Row>
          </HomeBlocs>
          <HomeReparateur>
            <h1 className="title-bloc">Pourquoi choisir Fingz ?</h1>
            <Row>
              <Col className="item-reparateurs-solution" lg={3} md={6}>
                <div className="content-reparateur-solution">
                  <div className="bloc-icon-repa">
                    <img src={iconRep5} alt="" />
                  </div>
                  <div className="content-item-repa-solution">
                    <p className="titre-item-repa-solution">Economique</p>
                    <p>
                      Une réparation au juste prix qui prolonge la durée de vie
                      de vos objets
                    </p>
                  </div>
                </div>
              </Col>
              <Col className="item-reparateurs-solution" lg={3} md={6}>
                <div className="content-reparateur-solution">
                  <div className="bloc-icon-repa">
                    <img src={iconRep6} alt="" />
                  </div>
                  <div className="content-item-repa-solution">
                    <p className="titre-item-repa-solution">Ecologique</p>
                    <p>
                      En donnant une 2ème vie à vos objets, vous participez à
                      préserver les ressources de la planète
                    </p>
                  </div>
                </div>
              </Col>
              <Col className="item-reparateurs-solution" lg={3} md={6}>
                <div className="content-reparateur-solution">
                  <div className="bloc-icon-repa">
                    <img src={iconRep7} alt="" />
                  </div>
                  <div className="content-item-repa-solution">
                    <p className="titre-item-repa-solution">Local</p>
                    <p>
                      En choisissant des réparateurs près de chez vous, vous
                      soutenez l’économie locale et limitez l’impact CO2 lié au
                      transport
                    </p>
                  </div>
                </div>
              </Col>
              <Col className="item-reparateurs-solution" lg={3} md={6}>
                <div className="content-reparateur-solution">
                  <div className="bloc-icon-repa">
                    <img src={iconRep4} alt="" />
                  </div>
                  <div className="content-item-repa-solution">
                    <p className="titre-item-repa-solution">Fiable</p>
                    <p>
                    Les artisans partenaires sont des professionnels qui s’engagent à vous fournir un service de qualité et à faire de la réparation leur priorité.
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </HomeReparateur>
        </Container>
      </ContentPageStyle>
    </Base>
  );
}
