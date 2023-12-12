import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import * as actionTypes from "../../store/functions/actionTypes";
import {
  ForumIcon,
  VitrineIcon,
  CommandesIcon,
  DocumentIcon,
  HomeIcon,
  PrestationsIcon,
  ChatIcon,
  SettingsIcon,
  LogoutIcon,
} from "../../assets/styles/icons";
import {
  NavMenu,
  LinkItem,
  NameProfil,
} from "../../assets/styles/adminStyle/sideNavStyle";
import ROUTES from "../../config/routes";
import { LINK_EXTERNAL_Forum, PREFIX_BACKEND, ROLES } from "../../vars";
import { getAllThreads } from "../../store/functions/threadActions";
import { Redirect } from "react-router";

export default function Navbar({ className }) {
  const isMobile = useMediaQuery({ query: "(max-width: 993px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1199px)" });
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const thread = useSelector((state) => state.thread);
  const isCompleted = auth.roles.includes(ROLES.ROLE_REPAIRMAN)
    ? auth.user.isCompleted
    : true;
  const [needConnection] = useState(
    window.location.pathname.indexOf(PREFIX_BACKEND) > -1 ||
      window.location.pathname.indexOf("/demande") > -1
  );

  useEffect(() => {
    if (auth.user) dispatch(getAllThreads());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    dispatch({
      type: actionTypes.LOGOUT,
    });
  };

  if (auth.token === null && needConnection)
    return <Redirect to={ROUTES.LOGIN.url} />;

  return (
    <NavMenu className={`nav-menu ${className}`}>
      {isMobile && (
        <NameProfil className="full-name-user">
          Bonjour{" "}
          <span>
            {auth.user.firstName} {auth.user.lastName}
          </span>
        </NameProfil>
      )}

      <LinkItem to={ROUTES.HOME.url} exact activeClassName="active">
        <HomeIcon /> Accueil
      </LinkItem>
      {auth.roles.includes(ROLES.ROLE_REPAIRMAN) && (
        <LinkItem to={ROUTES.REPA_VITRINE.url}>
          <VitrineIcon /> Ma vitrine
        </LinkItem>
      )}

      <LinkItem
        to={isCompleted ? ROUTES.COMMANDES.url : "#"}
        className={!isCompleted ? "disable" : ""}
      >
        <CommandesIcon /> {auth.roles.includes(ROLES.ROLE_ADMIN) ? "" : "Mes"}{" "}
        Commandes
      </LinkItem>
      <LinkItem
        to={isCompleted ? ROUTES.DEVIS.url : "#"}
        className={!isCompleted ? "disable" : ""}
      >
        <DocumentIcon />
        {auth.roles.includes(ROLES.ROLE_ADMIN) ? "" : "Mes"} Devis
      </LinkItem>
      {!auth.roles.includes(ROLES.ROLE_ADMIN) && (
        <LinkItem
          to={
            isCompleted &&
            thread.threads &&
            thread.threads.filter((th) => th.messages.length).length
              ? ROUTES.MESSAGERIE.url
              : "#"
          }
          className={
            !isCompleted ||
            !thread.threads ||
            !thread.threads.filter((th) => th.messages.length).length
              ? "disable"
              : "s"
          }
        >
          <ChatIcon /> Messagerie
        </LinkItem>
      )}

      {auth.roles.includes(ROLES.ROLE_ADMIN) && (
        <LinkItem to={ROUTES.CATEGORIES.url}>
          <DocumentIcon />
          Catégories
        </LinkItem>
      )}

      {(auth.roles.includes(ROLES.ROLE_ADMIN) ||
        auth.roles.includes(ROLES.ROLE_REPAIRMAN)) && (
        <>
          <LinkItem
            to={isCompleted ? ROUTES.SERVICES.url : "#"}
            className={!isCompleted ? "disable" : ""}
          >
            <DocumentIcon />
            Services
          </LinkItem>
          <LinkItem
            to={isCompleted ? ROUTES.PRESTATIONS.url : "#"}
            className={!isCompleted ? "disable" : ""}
          >
            <PrestationsIcon /> Prestations
          </LinkItem>

          {auth.roles.includes(ROLES.ROLE_REPAIRMAN) && (
            <LinkItem to={{ pathname: LINK_EXTERNAL_Forum }} target="_blank">
              <ChatIcon /> Forum
            </LinkItem>
          )}
        </>
      )}
      {auth.roles.includes(ROLES.ROLE_ADMIN) && (
        <>
          <LinkItem to={ROUTES.REPARATEURS.url}>
            <ForumIcon /> Réparateurs
          </LinkItem>
          <LinkItem to={ROUTES.CLIENTS.url}>
            <ForumIcon /> Clients
          </LinkItem>
          <LinkItem to={ROUTES.ADMINS.url}>
            <ForumIcon /> Administrateurs
          </LinkItem>
        </>
      )}

      {!auth.roles.includes(ROLES.ROLE_ADMIN) && (
        <LinkItem
          to={isCompleted ? ROUTES.SETTINGS.url : "#"}
          className={!isCompleted ? "disable" : ""}
        >
          <SettingsIcon /> Paramètres
        </LinkItem>
      )}

      {auth.roles.includes(ROLES.ROLE_ADMIN) && (
        <LinkItem
          to={ROUTES.SETTINGS.url}
        >
          <SettingsIcon /> Paramètres
        </LinkItem>
      )}

      <div className="logout-bloc">
        <Link
          to={"#"}
          onClick={(e) => {
            e.preventDefault();
            logout();
            if (isTabletOrMobile) {
              window.location.href = '/';
            }
          }}
        >
          <LogoutIcon /> Se déconnecter
        </Link>
      </div>
    </NavMenu>
  );
}
