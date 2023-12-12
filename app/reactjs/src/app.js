import "bootstrap/dist/css/bootstrap.min.css";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import CookieConsent, { Cookies } from "react-cookie-consent";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { useDispatch, useSelector } from "react-redux";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./app.css";
import "./assets/styles/componentStyles";
import { CookiesBlocs } from "./assets/styles/frontGlobalStyle";
import endPoints from "./config/endPoints";
import ROUTES from "./config/routes";
import connector from "./connector";
import Router from "./router";
import {
  REFRESH_TOKEN,
  REFRESH_TOKEN_FAIL,
} from "./store/functions/actionTypes";
import { GOOGLE_ANALYTICS_ID, FACEBOOK_ID } from "./vars";
import ReactPixel from "react-facebook-pixel";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [isDone, setIsDone] = useState(false);

  // facebook pixel
  const advancedMatching = {};
  const options = {
    autoConfig: true,
    debug: true,
  };
  ReactPixel.init(FACEBOOK_ID, advancedMatching, options);
  ReactPixel.pageView();
  ReactPixel.revokeConsent();

  useEffect(() => {
    if (Cookies.get("useCookiesAccepted")) {
      // google analytics
      const script = document.createElement("script");
      script.src =
        "https://www.googletagmanager.com/gtag/js?id=" + GOOGLE_ANALYTICS_ID;
      script.async = true;

      script.addEventListener("load", function () {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          window.dataLayer.push(arguments);
        }
        gtag("js", new Date());
        gtag("config", GOOGLE_ANALYTICS_ID);
      });

      document.body.appendChild(script);

      // facebook pixel
      ReactPixel.grantConsent();
    }
  }, [Cookies.get("useCookiesAccepted")]);

  useEffect(() => {
    // Last seen of this user
    lastseen(auth.user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user]);

  const lastseen = (user) => {
    if (user) {
      connector({
        url: `${endPoints.USER}/${user.id}/lastseen`,
        method: "put",
        success: (response) => {
          setTimeout(
            () => (localStorage.getItem("token") ? lastseen(auth.user) : false),
            30000
          );
          //console.log(response);
        },
        catch: (err) => {
          console.log(err);
        },
      });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const refresh_token = localStorage.getItem("refresh_token");
    if (token === undefined || refresh_token === undefined) {
      setIsDone(true);
      return;
    }
    let dateExp =
      token !== null ? new Date(jwtDecode(token).exp * 1000) : false;
    if (dateExp !== false && dateExp > Date.now()) {
      dispatch({
        type: REFRESH_TOKEN,
        token: token,
      });
      setIsDone(true);
    } else if (refresh_token !== null)
      connector({
        method: "post",
        url: endPoints.REFRESH_TOKEN,
        data: {
          refresh_token: refresh_token,
        },
        success: (response) => {
          dispatch({
            type: REFRESH_TOKEN,
            token: response.data.token,
          });
          setIsDone(true);
        },
        catch: (error) => {
          dispatch({
            type: REFRESH_TOKEN_FAIL,
          });
          setIsDone(true);
        },
      });
    else setIsDone(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CookiesBlocs>
      <CookieConsent
        location="bottom"
        cookieName="useCookiesAccepted"
        buttonText="J'accepte"
        declineButtonText="Je refuse"
        enableDeclineButton
        flipButtons
        contentClasses="content-cookies"
      >
        Ce site Web utilise
        <a
          href={ROUTES.CHARTE_COOKIES.url}
          target="_blank"
          style={{ color: "#4D5F68", margin: "5px", fontWeight: "600" }}
        >
          des cookies
        </a>
        pour améliorer l'expérience utilisateur.
      </CookieConsent>
      {isDone ? <Router /> : "Chargement ..."}
      <NotificationContainer />
    </CookiesBlocs>
  );
}
export default App;
