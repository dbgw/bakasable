import React from "react";
import { CloseButtonStyle } from "../../assets/styles/componentStyles";
import { CloseIcon } from "../../assets/styles/icons";

export default function CloseButton({ icon, text, nbr, onClick, ...props }) {
  return (
    <CloseButtonStyle onClick={onClick}>
      <div className="dev-close-btn">
        <CloseIcon />
      </div>
    </CloseButtonStyle>
  );
}
