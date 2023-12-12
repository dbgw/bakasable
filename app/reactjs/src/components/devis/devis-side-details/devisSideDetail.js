import React from "react";
import { DevisSideDetailStyle } from "../../../assets/styles/devisStyles";

export default function DevisSideDetail({ children, ...props }) {
  return <DevisSideDetailStyle>{children}</DevisSideDetailStyle>;
}
