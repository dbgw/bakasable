import React from "react";
import { DsdContentStyle } from "../../../assets/styles/devisStyles";

export default function DsdContent({ children, ...props }) {
  return <DsdContentStyle>{children}</DsdContentStyle>;
}
