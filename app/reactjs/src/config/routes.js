import { ROLES, PREFIX_BACKEND } from "./../vars";

const ROUTES = {
  HOME: { url: "/", roles: [] },
  LOGIN: { url: "/", roles: [] },
  //back
  COMMANDES: {
    url: `${PREFIX_BACKEND}/commandes`,
    roles: [
      ROLES.ROLE_SUPER_ADMIN,
      ROLES.ROLE_ADMIN,
      ROLES.ROLE_CLIENT,
      ROLES.ROLE_REPAIRMAN,
    ],
  },
  MESSAGERIE: {
    url: `${PREFIX_BACKEND}/messagerie`,
    roles: [ROLES.ROLE_REPAIRMAN, ROLES.ROLE_CLIENT],
  },
  CATEGORIES: {
    url: `${PREFIX_BACKEND}/categories`,
    roles: [ROLES.ROLE_SUPER_ADMIN, ROLES.ROLE_ADMIN],
  },
  SERVICES: {
    url: `${PREFIX_BACKEND}/services`,
    roles: [ROLES.ROLE_SUPER_ADMIN, ROLES.ROLE_ADMIN],
  },
  PRESTATIONS: {
    url: `${PREFIX_BACKEND}/prestations`,
    roles: [ROLES.ROLE_SUPER_ADMIN, ROLES.ROLE_ADMIN],
  },
  REPARATEURS: {
    url: `${PREFIX_BACKEND}/reparateurs`,
    roles: [ROLES.ROLE_SUPER_ADMIN, ROLES.ROLE_ADMIN],
  },
  CLIENTS: { url: `${PREFIX_BACKEND}/clients`, roles: [ROLES.ROLE_ADMIN] },
  ADMINS: { url: `${PREFIX_BACKEND}/admins`, roles: [ROLES.ROLE_ADMIN] },
  DEVIS: {
    url: `${PREFIX_BACKEND}/devis`,
    roles: [
      ROLES.ROLE_SUPER_ADMIN,
      ROLES.ROLE_ADMIN,
      ROLES.ROLE_REPAIRMAN,
      ROLES.ROLE_CLIENT,
    ],
  },

  //Espace Réparateur
  REPA_SERVICES: {
    url: `${PREFIX_BACKEND}/services`,
    roles: [ROLES.ROLE_ADMIN, ROLES.ROLE_REPAIRMAN],
  },
  REPA_PRESTATIONS: {
    url: `${PREFIX_BACKEND}/prestations`,
    roles: [ROLES.ROLE_ADMIN, ROLES.ROLE_REPAIRMAN],
  },
  REPA_DEVIS: {
    url: `${PREFIX_BACKEND}/devis`,
    roles: [ROLES.ROLE_REPAIRMAN],
  },
  REPA_CREATE_DEVIS: {
    url: `${PREFIX_BACKEND}/devis/create`,
    roles: [ROLES.ROLE_REPAIRMAN],
  },
  REPA_VITRINE: {
    url: `${PREFIX_BACKEND}/ma-vitrine`,
    roles: [ROLES.ROLE_ADMIN, ROLES.ROLE_REPAIRMAN],
  },
  SETTINGS: {
    url: `${PREFIX_BACKEND}/parametres`,
    roles: [ROLES.ROLE_ADMIN, ROLES.ROLE_REPAIRMAN, ROLES.ROLE_CLIENT],
  },

  //Front
  UNIVERSE: { url: "/univers/:slugIdUniverse", roles: [] },
  FICHESERVICES: { url: "/univers/:slugIdUniverse/:slugIdService", roles: [] },
  FICHEPRESTATION: {
    url: "/univers/:slugIdUniverse/:slugIdService/:slugIdBenefit",
    roles: [],
  },
  DEMAND: {
    url: "/univers/:slugIdUniverse/:slugIdService/:slugIdBenefit/demande/:idDeliveryMode",
    roles: [ROLES.ROLE_CLIENT],
  },
  CONTACT: {
    url: "/contact",
    roles: [],
  },
  HOW_ARE_WE: { url: "/qui-sommes-nous", roles: [] },
  CGU: { url: "/condition-generales-utilisation", roles: [] },
  POLITIQUE_CONFIDENTIALITE: { url: "/politique-de-confidentialite", roles: [] },
  CONDITION_COMMERCIALE: { url: "/conditions-commerciales", roles: [] },
  CHARTE_COOKIES: { url: "/charte-cookies", roles: [] },
  MENTIONS_LEGALES: { url: "/mentions-legales", roles: [] },
  CONNEXION:{ url: "/connexion", roles: [] }
};

export default ROUTES;
