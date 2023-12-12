import React, { useEffect, useRef } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import { NotificationManager } from "react-notifications";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { GroupInput } from "../../assets/styles/adminStyle/adminGlobalStyle";
import { GPSIcon } from "../../assets/styles/icons";
import { useOutsideAlerter } from "../../helper/events";

export default function InputAutoComplete({
  filter,
  setFilter,
  placeIsSelected = false,
  setPlaceIsSelected,
  isPendingLatLng = true,
  setIsPendingLatLng,
  ...props
}) {
  const refMessg = useRef(null);
  useOutsideAlerter(refMessg, () => {
    const cpFilter = { ...filter };
    cpFilter.codePostal.infoBulle = false;
    setFilter(cpFilter);
  });
  const { ref } = usePlacesWidget({
    onPlaceSelected: (place) => {
      if (place?.formatted_address && place?.geometry?.location?.lat()) {
        const cpFilter = { ...filter };
        cpFilter.codePostal.value = place.formatted_address;
        cpFilter.codePostal.latitude = place.geometry.location.lat();
        cpFilter.codePostal.longitude = place.geometry.location.lng();
        localStorage.setItem("codePostal", cpFilter.codePostal.value);
        localStorage.setItem("latitude", cpFilter.codePostal.latitude);
        localStorage.setItem("longitude", cpFilter.codePostal.longitude);
        setFilter(cpFilter);
        setPlaceIsSelected(true);
      }
    },
    language: "fr",
    options: {
      componentRestrictions: { country: "fr" },
      fields: ["formatted_address", "geometry"],
      //types: ["address","(cities)","(regions)","geocode","establishment"],
      types: ["geocode", "establishment"],
    },
  });

  useEffect(() => {
    if (
      filter.codePostal.value &&
      filter.codePostal.latitude &&
      filter.codePostal.longitude
    ) {
      setPlaceIsSelected(true);
      setIsPendingLatLng(false);
    } else {
      getLocation();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getLocation = () => {
    let msg = "";
    if (!navigator.geolocation) {
      msg =
        "La géolocalisation n'est pas prise en charge par votre navigateur.";
      NotificationManager.error(msg, "");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          getAddress(position.coords);
        },
        () => {}
      );
    }
  };

  const getAddress = (coords) => {
    const latlng = {
      lat: parseFloat(coords.latitude),
      lng: parseFloat(coords.longitude),
    };
    const geocoder = new window.google.maps.Geocoder();
    geocoder
      .geocode({ location: latlng })
      .then((response) => {
        if (response?.results[0]?.formatted_address) {
          const cpFilter = { ...filter };
          cpFilter.codePostal.value = response.results[0].formatted_address;
          cpFilter.codePostal.latitude = coords.latitude;
          cpFilter.codePostal.longitude = coords.longitude;
          localStorage.setItem("codePostal", cpFilter.codePostal.value);
          localStorage.setItem("latitude", cpFilter.codePostal.latitude);
          localStorage.setItem("longitude", cpFilter.codePostal.longitude);
          cpFilter.codePostal.error = false;
          cpFilter.codePostal.infoBulle = false;
          setFilter(cpFilter);
          setPlaceIsSelected(true);
          setIsPendingLatLng(false);
        } else {
          NotificationManager.error("Aucun résultat trouvé", "");
        }
      })
      .catch((e) => {
        NotificationManager.error(
          "Le géocodeur a échoué en raison de: " + e,
          ""
        );
      });
  };

  return (
    <div className="post-code">
      <OverlayTrigger
        placement={"bottom"}
        overlay={<Tooltip>Me géolocaliser</Tooltip>}
      >
        <button className="btn-gps" onClick={(e) => getLocation()}>
          <GPSIcon />
        </button>
      </OverlayTrigger>
      <GroupInput className={filter.codePostal.error ? "form-error" : ""}>
        {filter.codePostal.label ? (
          <label>
            {filter.codePostal.label}
            {filter.codePostal.required ? <i>*</i> : null}
          </label>
        ) : null}

        <input
          className="form-control"
          ref={ref}
          value={filter.codePostal.value}
          type={filter.codePostal.type}
          placeholder={filter.codePostal.placeholder}
          onChange={(e) => {
            const cpFilter = { ...filter };
            cpFilter.codePostal.value = e.target.value;
            cpFilter.codePostal.error = false;
            setFilter(cpFilter);
            setPlaceIsSelected(false);
            localStorage.setItem("codePostal", "");
            localStorage.setItem("latitude", "");
            localStorage.setItem("longitude", "");
          }}
          autoComplete="false"
        />
      </GroupInput>
      {filter.codePostal.infoBulle ? (
        <div className="message-infobulle" ref={refMessg}>
          Veuillez sélectionner une adresse dans la liste pour lancer une
          recherche
        </div>
      ) : null}
    </div>
  );
}
