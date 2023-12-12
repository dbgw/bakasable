import React from "react";
import {
  ModalPopinStyle,
  TitelForm,
} from "../../assets/styles/componentStyles";
import { CloseIcon } from "../../assets/styles/icons";

export default function PopinModal({
  show,
  handleClose,
  title,
  children,
  ...props
}) {
  return (
    <ModalPopinStyle
      centered
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      className={props.className}
    >
      <button type="button" className="close" onClick={handleClose}>
        <CloseIcon />
      </button>
      <div className="modal-body">
        <TitelForm>{title}</TitelForm>
        <div className="content-modal">{children}</div>
      </div>
    </ModalPopinStyle>
  );
}
