import React from "react";
import { CheckBoxForm } from "../../assets/styles/componentStyles";
import { NoticeIcon } from "../../assets/styles/icons";

export default function Checkbox({
  label,
  name,
  onChange,
  options = [],
  value = false,
  children,
  error,
  other = {},
  ...props
}) {
  return (
    <CheckBoxForm className={props.className}>
      {label ? <label>{label}</label> : null}

      {props.notice ? (
        <div className="notice-bloc">
          <span className="notice-icon">
            <NoticeIcon />
          </span>
          <div className="item-notice">
            <span>{props.notice}</span>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="bloc-check-box">
        {options.map((check, key) => (
          <div
            className={`check-box-form ${error ? "form-error" : ""}`}
            key={key}
          >
            <input
              type={"checkbox"}
              name={name}
              checked={check.checked}
              onChange={(e) => {
                const cpOptions = [...options];
                cpOptions[key].checked = e.target.checked;
                onChange(cpOptions);
              }}
              id={check.value}
            />
            <label htmlFor={check.value}>{check.label}</label>
            {check.children && check.checked ? (
                <check.children
                  option={check}
                  setState={(data) => check.setChildren(key, data)}
                  state={check.stateChildren}
                  other={other}
                />
            ) : null}
          </div>
        ))}
      </div>
    </CheckBoxForm>
  );
}
