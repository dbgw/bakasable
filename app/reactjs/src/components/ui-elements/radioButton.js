import React from "react";
import { RadioButtonForm } from "../../assets/styles/componentStyles";

export default function RadioButton({
  label,
  name,
  onChange,
  options = [],
  value = false,
  id = "",
  disabled,
  typeService = null,
  ...props
}) {
  return (
    <RadioButtonForm className={props.className}>
      <label>
        {label} {props.required ? <i>*</i> : null}
        {typeService && typeService === "forfait" ? (
          <span>Prix (€ TTC)</span>
        ) : null}
      </label>
      <div className="bloc-radios-button">
        {options.map((radio, key) => (
          <div className="radio-button-form" key={key}>
            <input
              type={"radio"}
              name={name}
              checked={radio.value === value}
              disabled={disabled}
              onChange={(e) => {
                if (e.target.checked) onChange(radio);
              }}
              id={`${name}_${key}`}
            />
            <label htmlFor={`${name}_${key}`}>{radio.label}</label>

            {radio?.row ? (
              <span style={{ marginLeft: "auto", minWidth: "107px" }}>
                {radio?.row?.price ? `${radio.row.price} €` : null}
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </RadioButtonForm>
  );
}
