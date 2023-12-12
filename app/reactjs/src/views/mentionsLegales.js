import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ContentPageStyle } from "../assets/styles/frontGlobalStyle";
import DefaultPage from "../components/defaultPage";
import HeaderDefaultPage from "../components/front/headerDefaultPage";
import Base from "../theme/front/base";
import ImageBanner from "../assets/images/image-slide.jpg";
import ROUTES from "../config/routes";

export default function MentionsLegales() {
  const dataCrumbs = [
    { name: "Accueil", path: "/" },
    {
      name: "Mentions légales",
      path: ROUTES.MENTIONS_LEGALES.url,
    },
  ];
  return (
    <Base>
      <HeaderDefaultPage title="Mentions légales" image={ImageBanner} />
      <ContentPageStyle className="content-wysiwig">
        <Container>
          <DefaultPage bradcrumbPage={dataCrumbs}>
            <p>
              Nom social et forme juridique : FINGZ SAS
              <br />
              Adresse postale du siège : 19 rue Ravignan, 75018 Paris France
            </p>

            <p>
              Numéro et ville du RCS : Registre du commerce et des sociétés de
              Paris
              <br />
              Registre du commerce : 889 838 694 R.C.S. Paris
              <br />
              Numéro de TVA intracommunautaire : FR 46889838694
            </p>

            <p>
              Numéro de téléphone : +33 9 70 70 47 79
              <br />
              Adresse courriel : contact@fingz.fr
              <br />
              Direction et directrice de publication : Emmanuelle Bourgueil
            </p>

            <p>Capital Social : 64 000 €</p>
          </DefaultPage>
        </Container>
      </ContentPageStyle>
    </Base>
  );
}
