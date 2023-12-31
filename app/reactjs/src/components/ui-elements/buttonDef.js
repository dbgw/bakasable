import React from "react";
import { Spinner } from "react-bootstrap";
import { ButtonDefault } from "../../assets/styles/adminStyle/adminGlobalStyle";

export default function ButtonDef({
  textButton,
  onClick,
  spinner = false,
  disabled = false,
  type = "", 
  ...props
}) {
  return (
    <ButtonDefault
      className={props.className}
      disabled={spinner ? true : disabled}
      onClick={onClick}
      type={type}
    >
      {spinner ? (
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      ) : null}
      {textButton}
    </ButtonDefault>
  );
}
