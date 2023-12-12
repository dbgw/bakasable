import React from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import { GroupInput } from "../../assets/styles/adminStyle/adminGlobalStyle";

export default function InputAddressBilling({
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
      cpState.postalCodeBilling.value = "";
      cpState.cityBilling.value = "";
      if (place?.geometry?.location?.lat()) {
        cpState.latitudeBilling.value = place.geometry.location.lat();
        cpState.longitudeBilling.value = place.geometry.location.lng();
        setPlaceIsSelected(true);
      }
      if (place?.address_components && place.address_components.length) {
        for (let i = 0; i < place.address_components.length; i++) {
          const p = place.address_components[i];
          if (p.types.indexOf("postal_code") > -1) {
            cpState.postalCodeBilling.value = p.long_name;
            cpState.postalCodeBilling.error = false;
          } else if (p.types.indexOf("locality") > -1) {
            cpState.cityBilling.value = p.long_name;
            cpState.cityBilling.error = false;
          } else if (p.types.indexOf("street_number") > -1) {
            streetNumber = p.long_name;
          } else if (p.types.indexOf("route") > -1) {
            route = p.long_name;
          }
        }
      }
     
      if (place?.place_id && cpState?.placeId) {
        cpState.placeIdBilling.value = place.place_id; 
      }
      if (streetNumber || route) {
        cpState.addressBilling.value = String(`${streetNumber} ${route}`).trim();
        cpState.addressBilling.error = false;
      }
      setState(cpState);
    },
    language: "fr",
    options: {
      componentRestrictions: { country: "fr" },
      fields: ["formatted_address", "geometry", "address_components", "name", "place_id"],
      //types: ["address","(cities)","(regions)","geocode","establishment"],
      types: ["geocode", "establishment"],
    },
  });

  return (
    <GroupInput className={state.addressBilling.error ? "form-error" : ""}>
      {state.addressBilling.label ? (
        <label>
          {state.addressBilling.label}
          {state.addressBilling.required ? <i>*</i> : null}
        </label>
      ) : null}

      <input
        className="form-control input-address"
        ref={ref}
        value={state.addressBilling.value}
        type={state.addressBilling.type}
        placeholder={state.addressBilling.placeholder}
        autoComplete="false"
        onChange={(e) => {
          const cpState = { ...state };
          cpState.addressBilling.value = e.target.value;
          cpState.addressBilling.error = false;
          setState(cpState);
          setMessage(null);
          setPlaceIsSelected(false);
        }}
      />
    </GroupInput>
  );
}
