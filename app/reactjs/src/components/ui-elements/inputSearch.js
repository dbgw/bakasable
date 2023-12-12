import React from "react";
import {
  GroupInput,
  InputGroup,
} from "../../assets/styles/adminStyle/adminGlobalStyle";

export default function InputSearch({
  label,
  name,
  type,
  placeholder,
  onChange,
  onClick,
  value,
  id,
  className = "",
  children,
  ...props
}) {
  return (
    <GroupInput className={className}>
      {label ? <label>{label}</label> : null}

      <InputGroup
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        id={id}
        onClick={onClick}
        onChange={onChange}
        disabled={props.disabled !== undefined}
        autoComplete="off"
      />
      {children}
    </GroupInput>
  );
}
