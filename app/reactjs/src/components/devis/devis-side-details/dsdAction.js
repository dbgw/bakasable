import React from "react";
import { DsdActionsStyle } from "../../../assets/styles/devisStyles";

export default function DsdAction({ children, ...props }) {
  return <DsdActionsStyle>{children}</DsdActionsStyle>;
}
