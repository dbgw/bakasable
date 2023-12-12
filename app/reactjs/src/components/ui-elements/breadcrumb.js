import React from "react";
import { Link } from "react-router-dom";
import { BreadcrumbStyle } from "../../assets/styles/frontGlobalStyle";

export default function Breadcrumb({ crumbs }) {
  if (crumbs.length <= 1) {
    return null;
  }
  return (
    <BreadcrumbStyle>
      {crumbs.map(({ name, path }, key) =>
        key + 1 === crumbs.length ? (
          <span key={key}>{name}</span>
        ) : (
          <Link key={key} to={path}>
            {name}
            <i>{">"}</i>
          </Link>
        )
      )}
    </BreadcrumbStyle>
  );
}
