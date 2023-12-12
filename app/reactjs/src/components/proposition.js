import React from "react";
import { PropositionStyle } from "../assets/styles/frontGlobalStyle";
import { ButtonDef } from "../components/ui";
import { getPathImage } from "../helper/functions";

export default function Proposition({
  benefit = {},
  deliveryMode = {},
  command = false,
  checkInfos,
  textButton = null,
  isPending = false,
  ...props
}) {
  return (
    <PropositionStyle className={props.className}>
      <div className="content-proposition">
        <p className="titre-proposition">Nom du service</p>
        <p className="sub-titre-proposition">{benefit?.service?.name}</p>
        <div className="info-societe">
          <div className="detail-info-societe">
            <p className="name-societe">{benefit?.user?.enterprise}</p>
            <p className="fonction-societe">
              {`${benefit?.user?.postalCode} ${benefit?.user?.city}`}
            </p>
          </div>
        </div>

        {deliveryMode ? (
          <>
            <div className="mode-delivrance">
              <p className="title-mode-deflivrance">Mode de délivrance</p>
              <p className="mode-choix">
                {deliveryMode?.deliveryModeType?.name}
              </p>
            </div>
            <div className="bloc-price-devis">
              <span className="titre-price">Total</span>
              <span className="price-devis">
                {command && command.totalDevisLines ? (
                  `${command.totalDevisLines?.toFixed(2)} € TTC`
                ) : (
                  <>
                    {benefit.typeService === "forfait" &&
                      `${deliveryMode.price?.toFixed(2)} € TTC`}

                    {benefit.typeService === "devis" &&
                      (benefit.priceQuote
                        ? `${benefit.priceQuote?.toFixed(2)} € TTC`
                        : "GRATUIT")}
                  </>
                )}
              </span>
            </div>

            {benefit.precisionQuote && (
              <div className="bloc-precision">
                <p className="titre-precision">
                  Précision de prise en charge du devis:
                </p>
                <p>{benefit.precisionQuote}</p>
              </div>
            )}
          </>
        ) : null}

        <ButtonDef
          textButton={textButton ? textButton : "Etape suivante"}
          spinner={isPending}
          onClick={() => {
            checkInfos();
          }}
        />
      </div>
    </PropositionStyle>
  );
}
