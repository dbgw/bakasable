import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { GreenColor } from "../componentStyles";
import iconHome from "../../images/iconMenu/icon-home-active.svg";
import iconVitrine from "../../images/iconMenu/icon-vitrine-active.svg";
import iconChat from "../../images/iconMenu/icon-chat-active.svg";
import iconForum from "../../images/iconMenu/icon-forum-active.svg";
import iconDocument from "../../images/iconMenu/icon-document-active.svg";
import iconPrestations from "../../images/iconMenu/icon-prestations-active.svg";
import iconCommandes from "../../images/iconMenu/icon-commande-active.svg";
import iconSettings from "../../images/iconMenu/icon-settings-active.svg";
import iconLogout from "../../images/iconMenu/icon-logout-active.svg";
import {
  ForumIcon,
  VitrineIcon,
  CommandesIcon,
  SettingsIcon,
  DocumentIcon,
  HomeIcon,
  mixinIcon,
  PrestationsIcon,
  ChatIcon,
  LogoutIcon,
} from "../icons";

export const SideNavBar = styled.div`
  position: relative;
  z-index: 999;
  .toggle-menu {
    background-color: transparent;
    border: 0;
    width: 26px;
    outline: none;
    box-shadow: none;
    padding: 0;
    margin-right: 16px;
    order: 1;
    &:focus {
      outline: none;
      box-shadow: none;
    }
    span {
      display: block;
      width: 100%;
      margin-bottom: 5px;
      height: 2px;
      background-color: #000;
      border-radius: 0px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;
export const NameProfil = styled.div`
  order: 2;
  cursor: pointer;
  span {
    font-weight: 600;
  }
`;

export const BlocTopSide = styled.div`
  display: flex;
  background: #ffffff;
  box-shadow: 0 3px 51px 0 rgba(182, 172, 251, 0.42);
  padding: 16px 30px;
  justify-content: space-between;
  @media (max-width: 993px) {
    padding: 16px 18px;
  }
`;

export const LogoSideNav = styled.div`
  img {
    height: 44px;
  }
`;

export const NavMenu = styled.div`
  width: 310px;
  padding: 30px 0 0;
  position: absolute;
  z-index: 11;
  right: 16px;
  top: 72px;
  background: #ffffff;
  box-shadow: 0 3px 51px 0 rgba(182, 172, 251, 0.42);
  border-radius: 10px;
  opacity: 0;
  pointer-events: none;
  transition: 0.5s ease-in-out;
  &.open-nav-menu {
    opacity: 1;
    pointer-events: all;
  }
  &::before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    top: 1px;
    left: 104px;
    box-sizing: border-box;
    border: 12px solid white;
    border-color: #ffffff #ffffff transparent transparent;
    transform-origin: 0 0;
    transform: rotate(-45deg);
    z-index: -1;
    border-radius: 2px;
    background: #ffffff;
    box-shadow: 0 3px 51px 0 rgba(182, 172, 251, 0.42);
  }
  .logout-bloc {
    padding-top: 20px;
    margin-top: 27px;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 30px;
      right: 0;
      height: 1px;
      background-color: #ececec;
      @media (max-width: 768px) {
        right: 30px;
      }
    }
    a {
      display: flex;
      align-items: center;
      text-decoration: none !important;
      color: #444444;
      position: relative;
      margin-bottom: 20px;
      transition: 0.4s ease-in-out;
      font-size: 14px;
      line-height: 26px;
      padding: 0 30px;
      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        width: 5px;
        height: 0;
        transition: 0.4s ease-in-out;
        background-color: ${GreenColor};
      }
      i {
        min-width: 42px !important;
        transition: 0.4s ease-in-out;
      }
      &:hover,
      &.active {
        color: ${GreenColor};
        text-decoration: none;
        &::before {
          height: 100%;
        }

        ${LogoutIcon} {
          ${mixinIcon({ urlIcon: iconLogout, width: 19, height: 18 })};
        }
      }
    }
  }
  ${NameProfil} {
    padding: 0 30px 25px;
  }
  @media (max-width: 1199px) {
    width: 100%;
    right: 0;
    top: 66px;
    border-radius: 0;
    height: calc(100vh - 66px);
    overflow: auto;
    box-shadow: none;
    &::before {
      display: none;
    }
  }
`;

export const UserProfil = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
  .full-name-user {
    cursor: pointer;
  }
  span {
    font-weight: 600;
  }

  @media (max-width: 768px) {
    .full-name-user {
      display: none;
    }

    .toggle-menu {
      margin-right: 0;
    }
  }
`;

export const DropItem = styled(Link)``;

export const LinkItem = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none !important;
  color: #444444;
  position: relative;
  margin-bottom: 20px;
  transition: 0.4s ease-in-out;
  font-size: 14px;
  line-height: 26px;
  padding: 0 30px;
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 5px;
    height: 0;
    transition: 0.4s ease-in-out;
    background-color: ${GreenColor};
  }
  i {
    min-width: 42px !important;
    transition: 0.4s ease-in-out;
  }
  &:not(.disable) {
    &:hover,
    &.active {
      color: ${GreenColor};
      text-decoration: none;
      &::before {
        height: 100%;
      }
      ${HomeIcon} {
        ${mixinIcon({ urlIcon: iconHome, width: 15, height: 15 })};
      }

      ${VitrineIcon} {
        ${mixinIcon({ urlIcon: iconVitrine, width: 17, height: 16 })};
      }
      ${ChatIcon} {
        ${mixinIcon({ urlIcon: iconChat, width: 19, height: 14 })};
      }

      ${ForumIcon} {
        ${mixinIcon({ urlIcon: iconForum, width: 17, height: 17 })};
      }

      ${DocumentIcon} {
        ${mixinIcon({ urlIcon: iconDocument, width: 12, height: 16 })};
      }

      ${PrestationsIcon} {
        ${mixinIcon({ urlIcon: iconPrestations, width: 17, height: 17 })};
      }

      ${CommandesIcon} {
        ${mixinIcon({ urlIcon: iconCommandes, width: 14, height: 14 })};
      }
      ${SettingsIcon} {
        ${mixinIcon({ urlIcon: iconSettings, width: 18, height: 18 })};
      }
      ${LogoutIcon} {
        ${mixinIcon({ urlIcon: iconLogout, width: 19, height: 18 })};
      }
    }
  }
  &.disable {
    opacity: 0.6;
    pointer-events: none;
    &:hover {
      color: #444444;
    }
  }
`;
