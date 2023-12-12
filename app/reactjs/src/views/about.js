import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ContentPageStyle } from "../assets/styles/frontGlobalStyle";
import DefaultPage from "../components/defaultPage";
import HeaderDefaultPage from "../components/front/headerDefaultPage";
import Base from "../theme/front/base";
import ImageBanner from "../assets/images/image-slide.jpg";

export default function About() {
  const dataCrumbs = [
    { name: "Accueil", path: "/" },
    { name: "Qui somme-nous ?", path: "/qui-somme-nous" },
  ];
  return (
    <Base>
      <HeaderDefaultPage title="Qui somme-nous ?" image={ImageBanner} />
      <ContentPageStyle>
        <Container>
          <DefaultPage bradcrumbPage={dataCrumbs}>
            <h2>Ceci est une page de contenu CMS</h2>
            <p>
              Le Lorem Ipsum est simplement du faux texte employé dans la
              composition et la mise en page avant impression. Le Lorem Ipsum
              est le Le Lorem Ipsum est simplement du faux texte employé dans la
              composition et la mise en page avant impression. Le Lorem Ipsum
              est le faux texte standard de l'imprimerie depuis les années Le
              Lorem Ipsum est simplement du faux texte employé dans la
              composition et la mise en page avant impression. Le Lorem Ipsum
              est le faux texte standard de l'imprimerie depuis les années
            </p>
            <ul>
              <li>Le Lorem Ipsum est simplement</li>
              <li>Le Lorem Ipsum est simplement</li>
              <li>Le Lorem Ipsum est simplement</li>
            </ul>
            <ol>
              <li>Le Lorem Ipsum est simplement</li>
              <li>Le Lorem Ipsum est simplement</li>
              <li>Le Lorem Ipsum est simplement</li>
            </ol>
            <h2>Titre H2</h2>
            <p>
              Le <strong>Lorem Ipsum</strong> est simplement du faux texte
              employé dans la composition et la mise en page avant impression.
              Le Lorem Ipsum est le Le Lorem Ipsum est simplement du faux texte
              employé dans la composition et la mise en page avant.
              <br /> impression. Le Lorem Ipsum est le faux texte standard de
              l'imprimerie depuis les années Le Lorem Ipsum est simplement du
              faux texte employé dans la composition et la mise en page avant
              impression. Le Lorem Ipsum est le faux texte standard de
              l'imprimerie depuis les années du faux texte employé dans la
              composition et la mise en page avant impression. Le Lorem Ipsum
              est le faux texte standard de l'imprimerie depuis les années.
            </p>
            <p>
              Le Lorem Ipsum est simplement du faux texte employé dans la
              composition et la mise en page avant impression. Le Lorem Ipsum
              est le Le Lorem Ipsum est simplement du faux texte employé dans la
              composition et la mise en <Link to={"#"}>page avant</Link>.
            </p>

            <h2>Titre H2</h2>
            <p>
              Le Lorem Ipsum est simplement du faux texte employé dans la
              composition et la mise en page avant impression. Le Lorem Ipsum
              est le Le Lorem Ipsum est simplement du faux texte employé dans la
              composition et la mise en page avant impression. <br />
              Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis
              les années Le Lorem Ipsum est simplement du faux texte employé
              dans la composition et la mise en page avant impression. Le Lorem
              Ipsum est le faux texte standard de l'imprimerie depuis les années
              du faux texte employé dans la composition et la mise en page avant
              impression. Le Lorem Ipsum est le faux texte standard de
              l'imprimerie depuis les années.
            </p>
          </DefaultPage>
        </Container>
      </ContentPageStyle>
    </Base>
  );
}
