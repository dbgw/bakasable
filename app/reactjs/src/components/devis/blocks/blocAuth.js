import React from "react";
import { BlocAuthStyle } from "../../../assets/styles/devisStyles";

export default function BlocAuth({
  imgUrl,
  imgAlt,
  name,
  desc,
  size,
  ...props
}) {
  return (
    <BlocAuthStyle>
      <div className={`auth-bloc ${size ? size : ""}`}>
        <div className="bloc-img">
          <img src={imgUrl} alt={imgAlt} />
        </div>
        <div>
          <p>{name}</p>
          <span>{desc}</span>
        </div>
      </div>
    </BlocAuthStyle>
  );
}
