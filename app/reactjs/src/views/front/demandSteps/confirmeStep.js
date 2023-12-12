import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { CheckGreenIcon } from "../../../assets/styles/icons";
import imgContact from "../../../assets/images/img-contact.svg";
import imgCommande from "../../../assets/images/img-commande.svg";
import imgPrestation from "../../../assets/images/img-home-prestation.svg";
import { ButtonDef } from "../../../components/ui";
import { TitelForm } from "../../../assets/styles/componentStyles";
import ROUTES from "../../../config/routes";
import endPoints from "../../../config/endPoints";
import connector from "../../../connector";

export default function ConfirmeStep({
  benefit,
  command,
  paiement = false,
  defaultCommand
}) {
  const history = useHistory();
  const contact = () => {
    connector({
      url: endPoints.THREADS,
      method: "post",
      data: {
        user: benefit.user.id,
      },
      success: (response) => {
        history.push(`${ROUTES.MESSAGERIE.url}/${response.data.id}`);
      },
      catch: (err) => console.log(err),
    });
  };

  return (
    <div className="left-content-detail">
      <div className="bloc-confirme-step">
        <div className="message-confirme-tunnel">
          <CheckGreenIcon />
          {defaultCommand && (
            <span>Merci pour votre commande, le réparateur entrera en contact avec vous dans les plus brefs délais.</span>
          )}
          {(!defaultCommand && benefit.typeService === "forfait") && (
            <span>Merci pour votre commande, le réparateur entrera en contact avec vous dans les plus brefs délais.</span>
          )}
          {(!defaultCommand && benefit.typeService === "devis") && (
            <span>Merci pour votre demande de devis, le réparateur entrera en contact avec vous dans les plus brefs délais.</span>
          )}
        </div>
        <TitelForm>Que souhaitez-vous faire ?</TitelForm>
        <Row>
          <Col lg={4} md={6}>
            <div className="content-faire-confirme">
              <div className="img-faire-confirme">
                <img src={imgContact} alt="contact" />
              </div>
              <p>J’ai besoin de contacter mon réparateur</p>
              <Link to={"#"} onClick={contact}>
                <ButtonDef textButton="Contact" />
              </Link>
            </div>
          </Col>
          <Col lg={4} md={6}>
            <div className="content-faire-confirme">
              <div className="img-faire-confirme">
                <img src={imgCommande} alt="Commande" />
              </div>
              {defaultCommand && paiement && (
                <>
                  <p>Je consulte ma commande</p>
                  <Link to={`${ROUTES.COMMANDES.url}?id=${paiement.command.id}`}>
                    <ButtonDef textButton="Ma commande" />
                  </Link>
                </>
              )}
              {(!defaultCommand && benefit.typeService === "forfait") && (
                <>
                  <p>Je consulte ma commande</p>
                  <Link to={`${ROUTES.COMMANDES.url}?id=${command.id}`}>
                    <ButtonDef textButton="Ma commande" />
                  </Link>
                </>
              )}
              {(!defaultCommand && benefit.typeService === "devis") && (
                <>
                  <p>Je consulte ma demande de devis</p>
                  <Link
                    to={`${ROUTES.DEVIS.url}?id=${
                      parseInt(command.idParent) || command.id
                    }`}
                  >
                    <ButtonDef textButton="Mon devis" />
                  </Link>
                </>
              )}
            </div>
          </Col>
          <Col lg={4} md={6}>
            <div className="content-faire-confirme">
              <div className="img-faire-confirme">
                <img src={imgPrestation} alt="contact" />
              </div>
              <p>Je recherche une nouvelle prestation</p>
              <Link to={ROUTES.HOME.url}>
                <ButtonDef textButton="Page d'accueil" />
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
