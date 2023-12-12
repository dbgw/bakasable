import jwtDecode from "jwt-decode";
import { NotificationManager } from "react-notifications";
import { entryPoint } from "./config/entryPoint";
import endPoints from "./config/endPoints";

const connector = (params) => {
  const token = localStorage.getItem("token");
  const refresh_token = localStorage.getItem("refresh_token");
  entryPoint.defaults.headers.common["Authorization"] = "";
  let dateExp = false;
  if (token !== null) dateExp = new Date(jwtDecode(token).exp * 1000);

  if (
    token !== null &&
    token !== undefined &&
    token !== "" &&
    dateExp !== false &&
    dateExp > Date.now()
  ) {
    if(!params.url.startsWith("/api/anonymous")){
      entryPoint.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    goOn(params);
  } else if (refresh_token !== null) {
    entryPoint
      .post(endPoints.REFRESH_TOKEN, {
        refresh_token: refresh_token,
      })
      .then((response) => {
        entryPoint.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        localStorage.setItem("token", response.data.token);
        goOn(params);
      })
      .catch((error) => {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        window.location.reload();
      });
  } else goOn(params);
};

const goOn = (params) => {
  entryPoint({
    method: params.method ?? "GET",
    url: params.url,
    data: params.data ?? {},
    responseType: params.responseType ?? "json",
    dataType: params.dataType ?? "json",
    headers: params.headers ?? {},
  })
    .then(params.success)
    .catch((error) => {
      params.catch(error);
      console.log(error.response);
      if (error.response !== undefined && error.response.status === 403) {
        NotificationManager.error(
          "Mauvaise Demande",
          "Une mauvaise demande a été envoyée, veuillez réessayer plus tard."
        );
      }
      if (error.response !== undefined && error.response.status === 422) {
        NotificationManager.error(
          "Erreur 422",
          "Veuillez renseigner les champs obligatoires."
        );
      }
      if (error.response !== undefined && error.response.status === 500) {
        //TODO décommente notification after install mercure in dev
        NotificationManager.error(
          "Erreur 500",
          "Une erreur de serveur inconnue s'est produite."
        );
        console.log("Une erreur de serveur inconnue s'est produite.");
      }
      if (
        endPoints.LOGIN !== params.url &&
        error.response !== undefined &&
        error.response.status === 401
      ) {
        NotificationManager.error(
          "Accès refusé",
          "Vous n'êtes pas autorisé à accéder à cette ressource."
        );
      }

      if (
        error.response?.data?.code !== undefined &&
        error.response.data.message !== undefined &&
        error.response.data.code === 401 &&
        (error.response.data.message === "Invalid credentials." || error.response.data.message === "Invalid JWT Token")
      ) {
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("token");
        window.location.reload();
      }
    });
};

export default connector;
