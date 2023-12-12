import React, { useEffect, useState } from "react";
import { getFloat } from "../helper/functions";
import { Input } from "./ui";
import RadioButton from "./ui-elements/radioButton";

export default function DeliveryModesContent({ ...props }) {
  const [state, setState] = useState(props.state);

  useEffect(() => {
    const cpState = { ...state };
    if (cpState.radius.value === "") {
      cpState.radius.value = false;
    }
    cpState.distance.required =
      props.option.data?.requireKilometerRadius && cpState.radius.value;

    cpState.price.required = props.other.typeService !== "devis";

    props.setState(cpState);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, props.other.typeService]);

  return (
    <div
      className={
        state.price.required || props.option.data?.requireKilometerRadius
          ? "details-checkbox"
          : ""
      }
    >
      <div className="delivrance-content">
        {state.price.required ? (
          <div className="price-delivrance">
            <Input
              {...state.price}
              onChange={(e) => {
                const cpState = { ...state };
                if (!e.target.value || parseFloat(e.target.value) <= 5000) {
                  cpState.price.value = getFloat(e.target.value);
                }
                cpState.price.error = false;
                setState(cpState);
              }}
            />
            <span className="symbol">€ TTC</span>
          </div>
        ) : (
          ""
        )}
        {props.option.data?.requireKilometerRadius ? (
          <>
            <RadioButton
              className="rayon-radio"
              {...state.radius}
              onChange={(val) => {
                const cpState = { ...state };
                cpState.radius.value = val.value;
                cpState.radius.error = false;
                setState(cpState);
              }}
            />

            {state.radius.value ? (
              <div className="distance-delivrance distance-input">
                <Input
                  {...state.distance}
                  onChange={(e) => {
                    const cpState = { ...state };
                    if (!e.target.value || parseFloat(e.target.value) <= 999)
                      cpState.distance.value = getFloat(e.target.value);
                    cpState.distance.error = false;
                    setState(cpState);
                  }}
                />
                <span className="symbol">Km</span>
              </div>
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
