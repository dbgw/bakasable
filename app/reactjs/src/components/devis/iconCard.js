import React from "react";
import { IconCardStyle } from "../../assets/styles/devisStyles";

export default function IconCard({ icon, text, nbr, onClick, ...props }) {
  return (
    <IconCardStyle onClick={onClick}>
      <div className="card-content">
        <div className="card-icon">
          <span>{icon}</span>
        </div>
        <p className="">{text}</p>
        <h3 className="">{nbr}</h3>
      </div>
    </IconCardStyle>
  );
}
