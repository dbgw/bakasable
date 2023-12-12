import React from "react";
import { LabelStatusStyle } from "../../assets/styles/devisStyles";
import {
  IconStatusNew,
  IconStatusAccepted,
  IconStatusRejected,
  IconStatusWaiting,
} from "../../assets/styles/icons";

export default function LabelStatus({
  type,
  hideText,
  customText,
  active,
  ...props
}) {
  let icon, text;

  switch (type) {
    case 0:
      icon = <IconStatusNew className={active ? "active" : ""} />;
      text = "Nouveau";
      break;    
    case 1:
      icon = <IconStatusWaiting className={active ? "active" : ""} />;
      text = "En attente";
      break;
    case 2:
      icon = <IconStatusAccepted className={active ? "active" : ""} />;
      text = "Accepté";
      break;
    case 3:
      icon = <IconStatusRejected className={active ? "active" : ""} />;
      text = "Refusé";
      break;
    case 4:
      icon = <IconStatusRejected className={active ? "active" : ""} />;
      text = "Annulé";
      break;    
    case 5:
      icon = <IconStatusAccepted className={active ? "active" : ""} />;
      text = "Terminée";
      break;
    default:
      icon = <IconStatusNew className={active ? "active" : ""} />;
      text = "Nouveau";
      break;
  }

  if (customText) text = customText;

  return (
    <LabelStatusStyle>
      <div className="status-icon">{icon}</div>
      <p className={hideText ? "hide" : ""}>{text}</p>
    </LabelStatusStyle>
  );
}
