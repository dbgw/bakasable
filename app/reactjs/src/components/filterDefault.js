import React from "react";
import {
  DefaultFilter,
  FilterBlocs,
} from "../assets/styles/adminStyle/adminGlobalStyle";

export default function FilterDefault({ formItems, ...props }) {
  return (
    <DefaultFilter>
      <FilterBlocs className={props.className}>
        <div className="form-filter">{formItems}</div>
      </FilterBlocs>
    </DefaultFilter>
  );
}
