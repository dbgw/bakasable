import React from "react";
import { greatPlaceStyleHover, greatPlaceStyle } from "./markerStyle";
export default function PrestationFicheMap({ ...props }) {
  const style = props.hover ? greatPlaceStyleHover : greatPlaceStyle;
  return (
    <>
      {props.text ? (
        <div
          className={`item-map-prestation ${
            parseInt(props.activeBenefit.id) === parseInt(props.id)
              ? "active"
              : ""
          }`}
          style={style}
        >
          <div>{props.text}</div>
        </div>
      ) : null}
    </>
  );
}
