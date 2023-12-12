import React from "react";
import { Container } from "react-bootstrap";
import noImage from "../../assets/images/noImage.png";
import { BackStyle, PageBanner } from "../../assets/styles/frontGlobalStyle";
import { BackIcon } from "../../assets/styles/icons";
import ROUTES from "../../config/routes";
import * as vars from "../../vars";

export default function BannerPage({ universe }) {
  const getPathImage = (image) => (image ? vars.pathImage + image : noImage);

  return (
    <PageBanner className="banner-page-universe"
      style={{ backgroundImage: `url(${getPathImage(universe.image)})` }}
    >
      <Container>
        <div className="bloc-title-banner">
          <h1 className="title-banner-cat">{universe.name}</h1>
          <p className="description-banner-cat">{universe.description}</p>
        </div>

        <BackStyle to={ROUTES.HOME.url}>
          <BackIcon />
          <span>Retour à la page d'accueil</span>
        </BackStyle>
      </Container>
    </PageBanner>
  );
}
