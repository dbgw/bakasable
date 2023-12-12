import React from "react";
import { Dropdown } from "react-bootstrap";
import { DropMenu } from "../../assets/styles/adminStyle/adminGlobalStyle";

export default function DropDown({ contentToggle, contentchildren, ...props }) {
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div
      className="head-dropdown"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </div>
  ));
  return (
    <Dropdown className={props.className}>
      <Dropdown.Toggle as={CustomToggle}>{contentToggle}</Dropdown.Toggle>
      <DropMenu>{contentchildren}</DropMenu>
    </Dropdown>
  );
}
