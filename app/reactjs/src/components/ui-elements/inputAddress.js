import React from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import { GroupInput } from "../../assets/styles/adminStyle/adminGlobalStyle";

export default function InputAddress({
  state,
  setState,
  placeIsSelected = false,
  setPlaceIsSelected,
  message = null,
  setMessage,
  ...props
}) {
  const { ref } = usePlacesWidget({
    onPlaceSelected: (place) => {
      const cpState = { ...state };
      let route = "";
      let streetNumber = "";
      cpState.postalCode.value = "";
      cpState.city.value = "";
      if (place?.geometry?.location?.lat()) {
        cpState.latitude.value = place.geometry.location.lat();
        cpState.longitude.value = place.geometry.location.lng();
        setPlaceIsSelected(true);
      }

      if (place?.address_components && place.address_components.length) {
        for (let i = 0; i < place.address_components.length; i++) {
          const p = place.address_components[i];
          if (p.types.indexOf("postal_code") > -1) {
            cpState.postalCode.value = p.long_name;
            cpState.postalCode.error = false;
          } else if (p.types.indexOf("locality") > -1) {
            cpState.city.value = p.long_name;
            cpState.city.error = false;
          } else if (p.types.indexOf("street_number") > -1) {
            streetNumber = p.long_name;
          } else if (p.types.indexOf("route") > -1) {
            route = p.long_name;
          }
        }
      }

      if (place?.place_id && cpState?.placeId!=undefined) {
        cpState.placeId.value = place.place_id;
      }

      if (streetNumber || route) {
        cpState.address.value = String(`${streetNumber} ${route}`).trim();
        cpState.address.error = false;
      }

      setState(cpState);
    },
    language: "fr",
    options: {
      componentRestrictions: { country: "fr" },
      fields: [
        "formatted_address",
        "geometry",
        "address_components",
        "name",
        "place_id",
      ],
      //types: ["address","(cities)","(regions)","geocode","establishment"],
      types: ["geocode", "establishment"],
    },
  });

  return (
    <GroupInput className={state.address.error ? "form-error" : ""}>
      {state.address.label ? (
        <label>
          {state.address.label}
          {state.address.required ? <i>*</i> : null}
        </label>
      ) : null}

      <input
        className="form-control input-address"
        ref={ref}
        value={state.address.value}
        type={state.address.type}
        placeholder={state.address.placeholder}
        autoComplete="false"
        onChange={(e) => {
          const cpState = { ...state };
          cpState.address.value = e.target.value;
          cpState.address.error = false;
          setState(cpState);
          setMessage(null);
          setPlaceIsSelected(false);
        }}
      />
    </GroupInput>
  );
}
