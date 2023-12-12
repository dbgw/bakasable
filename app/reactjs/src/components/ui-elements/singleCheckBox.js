import React from "react";
import { CheckBoxForm } from "../../assets/styles/componentStyles";
export default function SingleCheckbox({
  label,
  name,
  onChange,
  value = false,
  children,
  error,
  ...props
}) {
  return (
    <CheckBoxForm className={props.className}>
      <div className="bloc-check-box">
        <div className={`check-box-form ${error ? "form-error" : ""}`}>
          <input
            type={"checkbox"}
            name={name}
            checked={value}
            onChange={onChange}
            id={name}
          />
          <label htmlFor={name}>{label}</label>
        </div>
      </div>
    </CheckBoxForm>
  );
}
