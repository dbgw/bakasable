import React, { lazy, Suspense } from "react";
import { Route, Redirect, BrowserRouter, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import ROUTES from "./config/routes";
import Loader from "./components/loader";
import FoundPage from "./components/foundPage";
import imgFound from "./assets/images/img-page-found.svg";

const routesList = [

  {
    exact: true,
    path: ROUTES.UNIVERSE.url,
    component: lazy(() => import("./views/front/universe")),
    roles: ROUTES.UNIVERSE.roles,
  },
  {
    exact: true,
    path: ROUTES.FICHESERVICES.url,
    component: lazy(() => import("./views/front/ficheService")),
    roles: ROUTES.FICHESERVICES.roles,
  },
  {
    exact: true,
    path: ROUTES.FICHEPRESTATION.url,
    component: lazy(() => import("./views/front/fichePrestation")),
    roles: ROUTES.FICHEPRESTATION.roles,
  },
  {
    exact: true,
    path: ROUTES.CONNEXION.url,
    component: lazy(() => import("./views/connexions")),
    roles: ROUTES.CONNEXION.roles,
  },
  {
    exact: true,
    path: ROUTES.DEMAND.url,
    component: lazy(() => import("./views/front/demand")),
    roles: ROUTES.DEMAND.roles,
  },
  {
    exact: true,
    path: ROUTES.HOME.url,
    component: lazy(() => import("./views/home")),
    roles: ROUTES.HOME.roles,
  },
  {
    exact: true,
    path: ROUTES.HOW_ARE_WE.url,
    component: lazy(() => import("./views/about")),
    roles: ROUTES.HOW_ARE_WE.roles,
  },
  {
    exact: true,
    path: ROUTES.CGU.url,
    component: lazy(() => import("./views/cgu")),
    roles: ROUTES.CGU.roles,
  },
  {
    exact: true,
    path: ROUTES.POLITIQUE_CONFIDENTIALITE.url,
    component: lazy(() => import("./views/politiqueConfidentialite")),
    roles: ROUTES.POLITIQUE_CONFIDENTIALITE.roles,
  },
  {
    exact: true,
    path: ROUTES.CONDITION_COMMERCIALE.url,
    component: lazy(() => import("./views/conditionCommerciale")),
    roles: ROUTES.CONDITION_COMMERCIALE.roles,
  },
  {
    exact: true,
    path: ROUTES.CHARTE_COOKIES.url,
    component: lazy(() => import("./views/charteCookies")),
    roles: ROUTES.CHARTE_COOKIES.roles,
  },
  {
    exact: true,
    path: ROUTES.MENTIONS_LEGALES.url,
    component: lazy(() => import("./views/mentionsLegales")),
    roles: ROUTES.MENTIONS_LEGALES.roles,
  },
  {
    exact: true,
    path: ROUTES.CATEGORIES.url,
    component: lazy(() => import("./views/back/admin/categories")),
    roles: ROUTES.CATEGORIES.roles,
  },
  {
    exact: true,
    path: ROUTES.SERVICES.url,
    component: lazy(() => import("./views/back/admin/services")),
    roles: ROUTES.SERVICES.roles,
  },
  {
    exact: true,
    path: ROUTES.PRESTATIONS.url,
    component: lazy(() => import("./views/back/admin/prestations")),
    roles: ROUTES.PRESTATIONS.roles,
  },
  {
    exact: true,
    path: ROUTES.REPARATEURS.url,
    component: lazy(() => import("./views/back/admin/reparateurs")),
    roles: ROUTES.REPARATEURS.roles,
  },
  {
    exact: true,
    path: ROUTES.MESSAGERIE.url,
    component: lazy(() => import("./views/back/commun/messagerie")),
    roles: ROUTES.MESSAGERIE.roles,
  },
  {
    exact: true,
    path: `${ROUTES.MESSAGERIE.url}/:id`,
    component: lazy(() => import("./views/back/commun/messagerie")),
    roles: ROUTES.MESSAGERIE.roles,
  },
  {
    exact: true,
    path: ROUTES.CLIENTS.url,
    component: lazy(() => import("./views/back/admin/clients")),
    roles: ROUTES.CLIENTS.roles,
  },
  {
    exact: true,
    path: ROUTES.ADMINS.url,
    component: lazy(() => import("./views/back/admin/admins")),
    roles: ROUTES.ADMINS.roles,
  },
  {
    exact: true,
    path: ROUTES.DEVIS.url,
    component: lazy(() => import("./views/back/commun/devis")),
    roles: ROUTES.DEVIS.roles,
  },
  {
    exact: true,
    path: ROUTES.DEVIS.url + "/:filter",
    component: lazy(() => import("./views/back/commun/devis")),
    roles: ROUTES.DEVIS.roles,
  },
  {
    exact: true,
    path: ROUTES.COMMANDES.url,
    component: lazy(() => import("./views/back/commun/commands")),
    roles: ROUTES.COMMANDES.roles,
  },
  {
    exact: true,
    path: ROUTES.REPA_SERVICES.url,
    component: lazy(() => import("./views/back/repairman/services")),
    roles: ROUTES.REPA_SERVICES.roles,
  },
  {
    exact: true,
    path: ROUTES.REPA_PRESTATIONS.url,
    component: lazy(() => import("./views/back/repairman/prestations")),
    roles: ROUTES.REPA_PRESTATIONS.roles,
  },
  {
    exact: true,
    path: ROUTES.REPA_VITRINE.url,
    component: lazy(() => import("./views/back/repairman/vitrine")),
    roles: ROUTES.REPA_VITRINE.roles,
  },
  {
    exact: true,
    path: ROUTES.SETTINGS.url,
    component: lazy(() => import("./views/back/commun/settings")),
    roles: ROUTES.SETTINGS.roles,
  },
  {
    exact: true,
    path: `${ROUTES.REPA_CREATE_DEVIS.url}/:id`,
    component: lazy(() => import("./views/back/repairman/create-devis")),
    roles: ROUTES.REPA_CREATE_DEVIS.roles,
  },
  {
    exact: true,
    path: ROUTES.CONTACT.url,
    component: lazy(() => import("./views/contact")),
    roles: ROUTES.CONTACT.roles,
  },
];

export default function Router() {
  const auth = useSelector((state) => state.auth);

  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Switch>
          {routesList.map((route, index) =>
            route.roles.length === 0 ||
            route.roles.filter((value) => auth.roles.includes(value)).length ? (
              <Route key={index} path={route.path} exact={route.exact}>
                <route.component />
              </Route>
            ) : (
              ""
            )
          )}
          <Route>
            <FoundPage image={imgFound} title="Whoops! page non trouvée" />
          </Route>
          <Redirect
            to={{
              pathname: ROUTES.HOME.url,
              state: { from: "/" },
            }}
          />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}
