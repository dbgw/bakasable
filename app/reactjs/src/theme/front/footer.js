import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FooterStyle } from "../../assets/styles/frontGlobalStyle";
import LogoFooter from "../../assets/images/logo-footer.png";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "../../assets/styles/icons";
import { Link } from "react-router-dom";
import ROUTES from "../../config/routes";
import moment from "moment";
import { LINK_EXTERNAL_WhoAreWe, LINK_FeelAndClic } from "../../vars";

export default function Footer() {
  return (
    <FooterStyle>
      <Container>
        <Row>
          <Col xl={2}>
            <div className="logo-footer">
              <Link to={"/"}>
              <img src={LogoFooter} alt="Fingz" />
              </Link>
            </div>
          
            <div className="socials">
              <p
                className="title-menu-footer"
                style={{
                  fontSize: "15px",
                  color: "#fff",
                  fontWeight: "600",
                  textTransform: "uppercase",
                }}
              >
                Suivez-nous
              </p>
              <Link
                to={{ pathname: "https://www.facebook.com/FingzRepair" }}
                target="_blank"
              >
                <FacebookIcon />
              </Link>
              <Link
                to={{ pathname: "https://www.instagram.com/fingz.fr/" }}
                target="_blank"
              >
                <InstagramIcon />
              </Link>
              <Link to={{ pathname: "#" }} target="_blank">
                <TwitterIcon />
              </Link>
              <Link
                to={{ pathname: "https://www.linkedin.com/company/fingz/" }}
                target="_blank"
              >
                <LinkedinIcon />
              </Link>
            </div>
          
          </Col>
         
          <Col xl={7}>
            <Row>
              <Col md={6}>
                <div className="menu-footer">
                  <p className="title-menu-footer">
                    <Link to={"/"}>Fingz</Link>
                  </p>
                  <ul>
                    <li>
                      <a href={LINK_EXTERNAL_WhoAreWe} target="_blank">
                        Qui sommes-nous ?
                      </a>
                    </li>

                    <li>
                      <Link to={ROUTES.CONTACT.url}>Contact</Link>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col md={6}>
                <div className="menu-footer">
                  <p className="title-menu-footer">Informations légales</p>
                  <ul>
                    <li>
                      <Link to={ROUTES.CGU.url}>
                        Conditions générales d’utilisation
                      </Link>
                    </li>
                    <li>
                      <Link to={ROUTES.POLITIQUE_CONFIDENTIALITE.url}>
                        Politique de confidentialité
                      </Link>
                    </li>
                    <li>
                      <Link to={ROUTES.CONDITION_COMMERCIALE.url}>
                        Conditions commerciales
                      </Link>
                    </li>
                    <li>
                      <Link to={ROUTES.CHARTE_COOKIES.url}>
                        Charte des Cookies
                      </Link>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Col>

        </Row>
        <p
          className="mt-4 text-center"
          style={{ fontSize: "14px", color: "#fff", marginBottom: 0 }}
        >
          © {moment().format("YYYY")} Fingz -{" "}
          <Link to={ROUTES.MENTIONS_LEGALES.url}>Mentions légales</Link> - Site développé par {" "}
          <Link to={{ pathname: LINK_FeelAndClic }} target="_blank">
            Feel and Clic
          </Link>{" "}
        </p>
      </Container>
    </FooterStyle>
  );
}
