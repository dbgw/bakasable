import React from "react";
import {
  GroupInput,
  InputGroup,
} from "../../assets/styles/adminStyle/adminGlobalStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Input({
  label,
  name,
  type,
  setType = () => {},
  placeholder,
  onChange,
  onKeyDown = () => {},
  value,
  id,
  disabled = false,
  subtitle = "",
  className = "",
  classInput = "",
  notice,
  error = false,
  errorMessage = "",
  as,
  min = false,
  step = 0.1,
  autoComplete = "off",
  empty = false,
  optionChat,
  ...props
}) {
  return (
    <GroupInput className={error ? `form-error ${className}` : `${className}`}>
      {label ? (
        <label>
          {label}
          {props.required ? <i>*</i> : null}
        </label>
      ) : null}
      {subtitle ? (
        <p style={{ fontSize: "12px", color: "#BABABA", lineHeight: "16px" }}>
          {subtitle}
        </p>
      ) : null}
      {optionChat || type === "passwordText" || type === "password" ? (
        <div
          className={`${optionChat ? "option-chat" : ""} ${
            type === "passwordText" || type === "password"
              ? "bloc-password"
              : ""
          }`}
        >
          <InputGroup
            onKeyDown={onKeyDown}
            as={as}
            min={min || min === 0 ? min : ""}
            type={type === "passwordText" ? "text" : type}
            placeholder={placeholder}
            value={value ? value : type === "number" && !empty ? 0 : ""}
            name={name}
            id={id}
            onChange={onChange}
            disabled={disabled}
            step={step}
            autoComplete={autoComplete}
            className={classInput}
          />
          {optionChat}
          {(type === "passwordText" || type === "password") && (
            <FontAwesomeIcon
              icon={type === "password" ? faEye : faEyeSlash}
              onClick={(e) => {
                setType(type === "password" ? "passwordText" : "password");
              }}
            />
          )}
        </div>
      ) : (
        <>
          <InputGroup
            onKeyDown={onKeyDown}
            as={as}
            min={min || min === 0 ? min : ""}
            type={type}
            placeholder={placeholder}
            value={value ? value : type === "number" && !empty ? 0 : ""}
            name={name}
            id={id}
            onChange={onChange}
            disabled={disabled}
            step={step}
            autoComplete={autoComplete}
            className={classInput}
          />
          {optionChat}
          {(type === "passwordText" || type === "password") && (
            <FontAwesomeIcon
              icon={type === "password" ? faEye : faEyeSlash}
              onClick={(e) => {
                setType(type === "password" ? "passwordText" : "password");
              }}
            />
          )}
        </>
      )}

      {errorMessage ? (
        <span className="error-message">{errorMessage}</span>
      ) : null}

      {notice ? <p className="notice-form-group">{notice}</p> : null}
    </GroupInput>
  );
}
