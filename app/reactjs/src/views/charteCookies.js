import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ContentPageStyle } from "../assets/styles/frontGlobalStyle";
import DefaultPage from "../components/defaultPage";
import HeaderDefaultPage from "../components/front/headerDefaultPage";
import Base from "../theme/front/base";
import ImageBanner from "../assets/images/image-slide.jpg";
import ROUTES from "../config/routes";

export default function CharteCookies() {
  const dataCrumbs = [
    { name: "Accueil", path: "/" },
    {
      name: "Charte des Cookies",
      path: ROUTES.CHARTE_COOKIES.url,
    },
  ];
  return (
    <Base>
      <HeaderDefaultPage title="Charte des Cookies" image={ImageBanner} />
      <ContentPageStyle>
        <Container>
          <DefaultPage bradcrumbPage={dataCrumbs}>
            <h2>Google Analytics</h2>
            <p>Ces  cookies  collectent  des  données  relatives  à  l'adresse IP,  à  l'appareil,  au  navigateur  et  aux  activités effectuées  sur  le  Site  afin  de  mesurer  les  interactions  des  utilisateurs  et  de  générer  des  statistiques permettant d’optimiser  l’ergonomie  du  Site,  les  modalités  de  présentations  de  ses  contenus  et  de  son optimisation générale.</p>
            <p><strong>FINGZ</strong>  a  mis  en  œuvre  les  mesures  nécessaires  à  l’anonymisation  des  adresses  IP  des  utilisateurs  et  à  la limitation  de  la  durée  de  vie  du  cookies Google  Analytics à  13  mois  conformément  à  la  réglementation applicable.</p>
            <h2>Facebook</h2>
            <h5><i>Marketing/Tracking, Functional</i></h5>
            <h5><i>Utilisation</i></h5>
            <p>Nous utilisons Facebook pour display of recent social posts and/or social share buttons. <a>Lire la suite</a></p>
            <h5><i>Partage de données</i></h5>
            <p>Pour plus d’informations, veuillez lire la <a>déclaration de confidentialité Facebook</a>.</p>
            <h5><i>Marketing/Tracking</i></h5>
            <table>
              <thead>
                <tr>
                  <td>Nom</td>
                  <td>Expiration</td>
                  <td>Fonction</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>_fbc</td>
                  <td>2 years</td>
                  <td>Store last visit</td>
                </tr>
                <tr>
                  <td>fbm*</td>
                  <td>1 year</td>
                  <td>Store account details</td>
                </tr>
                <tr>
                  <td>xs</td>
                  <td>3 months</td>
                  <td>Store a unique session ID</td>
                </tr>
                <tr>
                  <td>fr</td>
                  <td>3 months</td>
                  <td>Provide ad delivery or retargeting</td>
                </tr>
                <tr>
                  <td>act</td>
                  <td>90 days</td>
                  <td>Store logged in users</td>
                </tr>
                <tr>
                  <td>_fbp</td>
                  <td>3 months</td>
                  <td>Store and track visits across websites</td>
                </tr>
                <tr>
                  <td>datr</td>
                  <td>2 years</td>
                  <td>Provide fraud prevention</td>
                </tr>
                <tr>
                  <td>c_user</td>
                  <td>30 days</td>
                  <td>Store a unique user ID</td>
                </tr>
                <tr>
                  <td>sb</td>
                  <td>2 years</td>
                  <td>Store browser details</td>
                </tr>
                <tr>
                  <td>*_fbm</td>
                  <td>1 years</td>
                  <td>Store account details</td>
                </tr>
              </tbody>
            </table>

            <h5><i>Functional</i></h5>

            <table>
              <thead>
                <tr>
                  <td>Nom</td>
                  <td>Expiration</td>
                  <td>Fonction</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>wd</td>
                  <td>1 week</td>
                  <td>Read screen resolution</td>
                </tr>
                <tr>
                  <td>csm</td>
                  <td>90 days</td>
                  <td>Provide fraud prevention</td>
                </tr>
                <tr>
                  <td>actppresence</td>
                  <td>session</td>
                  <td>Store and track if the browser tab is active</td>
                </tr>
              </tbody>
            </table>


          </DefaultPage>
        </Container>
      </ContentPageStyle>
    </Base>
  );
}
