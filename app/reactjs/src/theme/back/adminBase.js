import React from "react";
import AdminSideNav from "./adminSideNav";
import {
  MainAdmin,
  ContentAdmin,
  MainPageAdmin,
} from "../../assets/styles/adminStyle/adminGlobalStyle";
import { useState } from "react";

export default function AdminBase({ children, className, noSide = false }) {
  const [isMenuShow, setisMenuShow] = useState(false);
  return (
    <MainAdmin>
      <MainPageAdmin className={className}>
        <AdminSideNav setMenushow={setisMenuShow} />
        <ContentAdmin
          className={`has-scroll-bar ${isMenuShow ? "toggled" : ""} ${
            noSide ? "has-scroll" : ""
          }`}
        >
          {children}
        </ContentAdmin>
      </MainPageAdmin>
    </MainAdmin>
  );
}
