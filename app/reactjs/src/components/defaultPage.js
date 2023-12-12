import React from "react";
import { useMediaQuery } from "react-responsive";
import { DefaultPageStyle } from "../assets/styles/frontGlobalStyle";
import Breadcrumb from "../components/ui-elements/breadcrumb";

export default function DefaultPage({ bradcrumbPage, children }) {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 994px)",
  });
  return (
    <DefaultPageStyle>
      {isDesktopOrLaptop && <Breadcrumb crumbs={bradcrumbPage} />}
      <div className="content-default-page">{children}</div>
    </DefaultPageStyle>
  );
}
