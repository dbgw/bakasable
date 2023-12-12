import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  SideNavBar,
  LogoSideNav,
  BlocTopSide,
  UserProfil,
  NameProfil,
} from "../../assets/styles/adminStyle/sideNavStyle";
import logoFingz from "../../assets/images/logo.svg";
import Navbar from "./navBar";
import ROUTES from "../../config/routes";
import { useOutsideAlerter } from "../../helper/events";

export default function AdminSideNav({ setMenushow, noLogo }) {
  const auth = useSelector((store) => store.auth);
  const [click, setClick] = useState(false);
  const toggle = () => {
    setClick(!click);
    setMenushow(!click);
  };

  const ref = useRef(null);
  useOutsideAlerter(ref, () => {
    setClick(false);
    setMenushow(false);
  });

  return (
    <SideNavBar ref={ref}>
      <BlocTopSide>
        {!noLogo && (
          <LogoSideNav>
            <Link to={ROUTES.HOME.url}>
              <img src={logoFingz} alt="Fingz" />
            </Link>
          </LogoSideNav>
        )}

        <UserProfil onClick={toggle}>
          <NameProfil className="full-name-user">
            Bonjour{" "}
            <span>
              {auth.user.firstName} {auth.user.lastName}
            </span>
          </NameProfil>

          <button className={`toggle-menu ${click ? "isOpen" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </UserProfil>
      </BlocTopSide>

      <Navbar className={`${click === true ? " open-nav-menu" : ""}`} />
    </SideNavBar>
  );
}
