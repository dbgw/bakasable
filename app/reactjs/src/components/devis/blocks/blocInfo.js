import React from "react";
import { BlocInfoStyle } from "../../../assets/styles/devisStyles";

export default function BlocInfo({ children, withBorder, ...props }) {
  return (
    <BlocInfoStyle className={withBorder ? "w-b" : ""}>
      {children}
    </BlocInfoStyle>
  );
}
