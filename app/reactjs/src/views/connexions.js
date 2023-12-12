
import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import Base from "../theme/front/base";
import ROUTES from "../config/routes";
import Auth from "../components/auth.js";

export default function Connexions() {
  const dataCrumbs = [
    { name: "Accueil", path: "/" },
    {
      name: "CONNEXION",
      path: ROUTES.CHARTE_COOKIES.url,
    },
  ];


  return (
    <Base>
        <div style={{ width: 1512, height: 1311, position: 'relative', background: '#FEFDFA' }}>
          <div style={{ width: 1064, left: 200, top: 295, position: 'absolute', color: '#5E5E5E', fontSize: 20, fontFamily: 'Poppins', fontWeight: '400', wordWrap: 'break-word' }}>Que vous soyez un particulier ou un réparateur, utilisez cet espace pour créer un compte ou vous connecter à votre compte. C’est le premier pas pour utiliser Fingz !</div>
          <div style={{ left: 200, top: 192, position: 'absolute', color: '#465A61', fontSize: 42.91, fontFamily: 'Poppins', fontWeight: '700', lineHeight: 1, wordWrap: 'break-word' }}>Bienvenue chez Fingz !</div>
          <div style={{ width: 524, height: 518, left: 470, top: 432, position: 'absolute', background: '#D9D9D9', borderRadius: 10 }} />
          <div style={{ width: 261, height: 51, left: 471, top: 433, position: 'absolute', background: 'white', borderTopLeftRadius: 10 }} />
          <div style={{ left: 567, top: 444, position: 'absolute', color: '#4D5F68', fontSize: 20, fontFamily: 'Poppins', fontWeight: '600', wordWrap: 'break-word' }}>Clients
          <Auth /></div>
          <div style={{ left: 807, top: 444, position: 'absolute', color: '#4D5F68', fontSize: 20, fontFamily: 'Poppins', fontWeight: '600', wordWrap: 'break-word' }}>Réparateurs</div>

        </div>
       
    </Base>
        );
  }
