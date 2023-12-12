import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { ItemFichePrestation } from "../../assets/styles/frontGlobalStyle";
import { getPathImage, slugify } from "../../helper/functions";
import RatingBox from "../ui-elements/ratingBox";
import { useMediaQuery } from "react-responsive";

export default function PrestationFiche({ row, ...props }) {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 993px)" });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 994px)",
  });
  const { slugIdUniverse, slugIdService } = useParams();
  const history = useHistory();
  const linkBenefit = `/univers/${slugIdUniverse}/${slugIdService}/${slugify(row.user.enterprise)}-${row.id}`;

  return (
    <ItemFichePrestation
      onClick={() => props.setActiveBenefit(row)}
      className={props.activeBenefit.id === row.id ? "active activeItem" : null}
    >
      <div className="content-item-fiche" onClick={() => {
        if (props.activeBenefit.id === row.id) {
          history.push(linkBenefit);
        }
      }}>
        {isDesktopOrLaptop ? (
        <>
          <div className="logo-image">
            {row.user.picture ? (
              <Link to={linkBenefit}>
                <img
                  src={getPathImage(row.user.picture)}
                  alt={row.user.enterprise}
                />
              </Link>
            ) : null}
          </div>
          <div className="detail-item-fiche">
            <p className="name-societe">
              <Link to={linkBenefit}>
                {row.user.enterprise}
              </Link>
            </p>
            <span className="code-postal-societe">
              {row.user.postalCode} {row.user.city}
            </span>
            <div className="lists-mode-delivrance">
              {row.deliveryModes
                ? row.deliveryModes.map((val) => (
                  <span className="item-mode" key={val.deliveryModeType.id}>
                    {val.deliveryModeType.name}
                  </span>
                ))
                : null}
            </div>
            <Link to={linkBenefit} className="show-prestation">Voir la prestation</Link>
          </div>
          <div className="type-prestation">
            {row?.user?.googleRating && (
              <div className="service-rating-bloc">
                <RatingBox value={row.user.googleRating} />
              </div>
            )}
            {row.typeService === "devis" ? (
              <p className="devis-prestation">Sur devis</p>
            ) : (
              <p className="price-prestation">
                A partir de <span>{row.minPrice} €</span>
              </p>
            )}
          </div>
        </>
        )
        :
        (
        <>
          <div className="head-fiche-mobile">
            <div className="logo-image">
              {row.user.picture ? (
                <Link to={linkBenefit}>
                  <img
                    src={getPathImage(row.user.picture)}
                    alt={row.user.enterprise}
                  />
                </Link>
              ) : null}
            </div>
            <div className="info-fich-mobile">
              <p className="name-societe">
                <Link to={linkBenefit}>
                  {row.user.enterprise}
                </Link>
              </p>
              <span className="code-postal-societe">
                {row.user.postalCode} {row.user.city}
              </span>
              {row?.user?.googleRating && (
                <div className="service-rating-bloc">
                  <RatingBox value={row.user.googleRating} />
                </div>
              )}
            </div>
          </div>
          <div className="detail-item-fiche">
            <div className="content-detail-fiche-mobile">
              <div className="lists-mode-delivrance">
                {row.deliveryModes
                  ? row.deliveryModes.map((val) => (
                    <span className="item-mode" key={val.deliveryModeType.id}>
                      {val.deliveryModeType.name}
                    </span>
                  ))
                  : null}
              </div>
              <div className="type-prestation">
                {row.typeService === "devis" ? (
                  <p className="devis-prestation">Sur devis</p>
                ) : (
                  <p className="price-prestation">
                    A partir de <span>{row.minPrice} €</span>
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="go-item-fiche">
            {isTabletOrMobile && <Link to={linkBenefit} className="show-prestation">Voir la prestation</Link>}
          </div>
        </>
        )
        }
      </div>
    </ItemFichePrestation>
  );
}
