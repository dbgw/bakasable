import React from "react";
import { DsdHeaderStyle } from "../../../assets/styles/devisStyles";
import LabelStatus from "../labelStatus";

export default function DsdHeader({ title, statusType, hideStatus, ...props }) {
  return (
    <DsdHeaderStyle>
      <h3 className="bloc-title">{title}</h3>
      {!hideStatus && <LabelStatus type={statusType} />}
    </DsdHeaderStyle>
  );
}
