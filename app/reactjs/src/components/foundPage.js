import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import ROUTES from "../config/routes";
import { ButtonDef } from "./ui";
import { PageMaintenanceStyle } from "../assets/styles/componentStyles";
import AdminBase from "../theme/back/adminBase";
import Base from "../theme/front/base";
import { PREFIX_BACKEND } from "../vars";

export default function FoundPage({ image, title, urlBack, textBack, noBase }) {
  const [isBack] = useState(window.location.pathname.indexOf(PREFIX_BACKEND)>-1);
  if (isBack){
    return  (
      <AdminBase>
        <PageMaintenanceStyle>
          <Container>
            <img className="img-fluid" src={image} alt={title} />
            <h1>{title}</h1>
            <Link to={urlBack ? urlBack : ROUTES.HOME.url}>
              <ButtonDef textButton={textBack ? textBack : "Page d'accueil"} />
            </Link>
          </Container>
        </PageMaintenanceStyle>
      </AdminBase>
    );}
    else{
  if (noBase){
    return (
      <PageMaintenanceStyle>
        <Container>
          <img className="img-fluid" src={image} alt={title} />
          <h1>{title}</h1>
          <Link to={urlBack ? urlBack : ROUTES.HOME.url}>
            <ButtonDef textButton={textBack ? textBack : "Page d'accueil"} />
          </Link>
        </Container>
      </PageMaintenanceStyle>
  );}

  else{
    return (<Base>
      <PageMaintenanceStyle>
        <Container>
          <img className="img-fluid" src={image} alt={title} />
          <h1>{title}</h1>
          <Link to={urlBack ? urlBack : ROUTES.HOME.url}>
            <ButtonDef textButton={textBack ? textBack : "Page d'accueil"} />
          </Link>
        </Container>
      </PageMaintenanceStyle>
    </Base>
  );}}
}
