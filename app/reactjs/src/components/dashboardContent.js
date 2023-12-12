import React from "react";
import {
  TitlePage,
  ContentDashboard,
  BackLinkStyle,
} from "../assets/styles/adminStyle/adminGlobalStyle";

import { Link } from "react-router-dom";

export default function DashboardContent({
  titlePage,
  className = "",
  backlinkUrl,
  backlinkText,
  actions,
  children,
  ...props
}) {
  return (
    <ContentDashboard className={`bloc-content-dashboard ${className}`}>
      {backlinkUrl && (
        <BackLinkStyle>
          <Link to={backlinkUrl}>{backlinkText}</Link>
        </BackLinkStyle>
      )}
      <div className="d-flex justify-content-between">
        <TitlePage>{titlePage}</TitlePage>
        {actions}
      </div>
      <div className="content-dashboard">{children}</div>
    </ContentDashboard>
  );
}
