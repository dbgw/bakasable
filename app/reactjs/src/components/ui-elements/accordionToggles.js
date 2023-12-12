import React from "react";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";
import { ToggleAccord } from "../../assets/styles/adminStyle/adminGlobalStyle";

export default function AccordionToggles({ eventKey, callback, child }) {
  const decoratedOnClick = useAccordionToggle(
    eventKey,
    () => callback && callback(eventKey)
  );
  return <ToggleAccord onClick={decoratedOnClick}>{child}</ToggleAccord>;
}
