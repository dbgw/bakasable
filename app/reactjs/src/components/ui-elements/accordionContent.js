import React, { useContext } from "react";
import { Accordion, AccordionContext } from "react-bootstrap";
import AccordionToggles from "./accordionToggles";
import { ContentAccord } from "../../assets/styles/adminStyle/adminGlobalStyle";

export default function AccordionContent({
  id,
  title,
  children,
  onClick,
  ...props
}) {
  const currentEventKey = useContext(AccordionContext);

  const isCurrentEventKey = currentEventKey === id;
  return (
    <ContentAccord
      className={`sort-item-${id} ${isCurrentEventKey ? "collapsed" : ""}`}
    >
      <AccordionToggles child={title} eventKey={id} onClick={onClick} />
      <Accordion.Collapse eventKey={id}>
        <div className="body-expend">{children}</div>
      </Accordion.Collapse>
    </ContentAccord>
  );
}
