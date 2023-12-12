import React, { useState } from "react";
import { Link } from "react-router-dom";
import noImage from "../../assets/images/noImage.png";
import { ProduititemStyle } from "../../assets/styles/frontGlobalStyle";
import { parentCategories } from "../../helper/functions";
import * as vars from "../../vars";
import ButtonDef from "../ui-elements/buttonDef";

export default function ProduitItem({ row, slugIdUniverse, ...props }) {
  const [showMore, setShowMore] = useState(false);
  const getPathImage = (image) => (image ? vars.pathImage + image : noImage);
  const getUrl = () => {
    return row.totalBenefits
      ? `/univers/${slugIdUniverse}/${row.slug}-${row.id}`
      : "#";
  };

  return (
    <ProduititemStyle xl={3} lg={4} sm={6}>
      <div className="content-item-produit">
        <div className="img-produit">
          <Link to={getUrl()} className={row.totalBenefits ? '':'disabled-link'}>
            <img
              className="img-fluid"
              src={getPathImage(row.picture)}
              alt={row.name}
            />
          </Link>
        </div>
        <div className="detail-produit">
          <p className="name-produit">
            <Link to={getUrl()} className={row.totalBenefits ? '':'disabled-link'}>{row.name}</Link>
          </p>
          <div
            className="desc-produit"
            style={
              row.description.length > 90
                ? {
                    maxHeight: showMore ? "initial" : "63px",
                    overflow: "hidden",
                    position: "relative",
                  }
                : {}
            }
          >
            {row.description}
            {row.description.length > 90 && (
              <span
                style={{
                  color: "#7A7C7F",
                  position: "absolute",
                  right: "2px",
                  background: "#fff",
                  bottom: "0px",
                  padding: "2px 2px",
                  paddingLeft: "6px",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? "moins" : "plus"}
              </span>
            )}
          </div>
          <div className="cats-prestation">
            <span>Catégories :</span>
            <div className="item-cats-prestation">
              {row.categories
                ? parentCategories(row.categories).map((cat) => (
                    <p key={cat.id}>
                      <span>{cat.name}</span>
                    </p>
                  ))
                : null}
            </div>
          </div>

          <Link to={getUrl()} className="url-btn-produit">
            {row.totalBenefits ? (
              <ButtonDef
                textButton={`Voir les ${row.totalBenefits} réparateur(s)`}
              />
            ) : (
              <ButtonDef textButton={`0 réparateur(s)`} disabled={true} />
            )}
          </Link>
        </div>
      </div>
    </ProduititemStyle>
  );
}
