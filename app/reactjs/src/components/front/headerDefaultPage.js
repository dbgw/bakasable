import React from "react";
import { PageBanner } from "../../assets/styles/frontGlobalStyle";
import { Container } from "react-bootstrap";

export default function HeaderDefaultPage({ image, title }) {
  return (
    <PageBanner
      className="default-banner"
      style={{ backgroundImage: `url(${image}` }}
    >
      <Container>
        <div className="bloc-title-banner">
          <h1 className="title-banner-cat">{title}</h1>
        </div>
      </Container>
    </PageBanner>
  );
}
