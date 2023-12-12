import React, { useRef } from "react";
import { GroupInput } from "../../assets/styles/adminStyle/adminGlobalStyle";
import ReactSelect, { components } from "react-select";
import { useOutsideAlerter } from "../../helper/events";
const Placeholder = (props) => {
  return <components.Placeholder {...props} />;
};
const { Option } = components;
const CustomSelectOption = (props) => (
  <Option {...props}>
    <div className="c-select-option">
      <span>{props.data.label}</span>
      {props.data.icon && (
        <span className="input-select__icon">{props.data.icon}</span>
      )}
      {props.data?.row ? (
        <span style={{ marginLeft: "auto", minWidth: "107px" }}>
          {" - "} {props.data.row?.price ? `${props.data.row.price} €` : null}
        </span>
      ) : null}
    </div>
  </Option>
);

const SingleValue = ({ children, ...props }) => (
  <components.SingleValue {...props}>
    {children}{" "}
    {props.data?.row ? (
      <span>
        {" - "} {props.data.row?.price ? `${props.data.row.price} €` : null}
      </span>
    ) : null}
  </components.SingleValue>
);
const NoOptionsMessage = (props) => {
  return (
    <components.NoOptionsMessage {...props}>
      aucun résultat
    </components.NoOptionsMessage>
  );
};

export default function Select({
  label = null,
  onChange,
  value,
  options = [],
  className = "",
  error = false,
  disabled = false,
  isSearchable = false,
  errorMessage = "",
  placeholder = "",
  style = {},
  height = "40px",
  position,
  infoBull = false,
  textInfoBulle = "",
  element = false,
  setElement = () => {},
  ...props
}) {
  let defaultValue = null;
  if (options !== false) {
    options.forEach((val) => {
      if (val.value === value) {
        defaultValue = val;
      }
    });
  }

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected || state.isFocused ? "#9aca3b" : "#FFF",
      color: state.isFocused || state.isSelected ? "#FFF" : "#5d5d5d",
      textAlign: "left",
      cursor: "pointer",
      padding: "5px 15px",
    }),
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: "#FFF",
      borderRadius: "0 0 15px 15px",
      width: "100%",
      boxShadow: "0 2px 9px 0 rgba(182, 172, 251, 0.42)",
      zIndex: "11",
      overflow: "hidden",
      marginTop: "0",
    }),
    menuList: (provided, state) => ({
      maxHeight: "145px",
      overflowY: "auto",
      paddingBottom: "4px",
      paddingTop: "4px",
      position: "relative",
      scrolling: "touch",
      boxSizing: "border-box",
      padding: "10px 5px",
      fontSize: "14px",
    }),
    control: (provided, state) => ({
      backgroundColor: state.isDisabled ? "#E5E5EB" : "#f5f5fa",
      boxShadow: "0 2px 9px 0 rgba(182, 172, 251, 0.42)",
      border: "1px solid transparent",
      color: "#000",
      borderRadius: state.isFocused
        ? "20px 20px 0 0"
        : state.isSelected
        ? "20px"
        : " 20px",
      minHeight: height,
      minWidth: "68px",
      display: "flex",
      alignItems: "center",
      fontWeight: "200",
      fontSize: "14px",
      cursor: "pointer",
    }),
    valueContainer: (base) => ({
      ...base,
      color: "#748993",
      padding: "6px 20px",
    }),
    group: (provided, state) => ({
      padding: "5px 0",
    }),
    groupHeading: (provided, state) => ({
      color: "#000",
      marginBottom: "8px",
      fontSize: "12px",
    }),
    indicatorsContainer: (provided, state) => ({
      display: "flex",
      alignItems: "center",
      transformOrigin: "center",
    }),
    indicatorContainer: (provided, state) => ({
      ...provided,
      color: "#4D5F68",
      transform: state.isFocused ? "rotate(-180deg)" : "rotate(0deg)",
    }),

    indicatorSeparator: (provided, state) => ({
      display: "none",
    }),
    singleValue: (provided, state) => {
      const color = "#495057";
      const opacity = 1;
      const transition = "opacity 300ms";
      const fontWeight = "400";

      return { ...provided, opacity, transition, color, fontWeight };
    },
    multiValue: (base) => ({
      ...base,
      borderRadius: "12px",
      fontSize: "10px",
      color: "#b8b8bb",
      padding: "0 0 0 6px",
      overflow: "hidden",
    }),

    placeholder: (base) => ({
      ...base,
      fontSize: "14px",
      color: "#748993",
    }),
  };
  const refMessgs = useRef(null);
  useOutsideAlerter(refMessgs, () => {
    const cpElement = { ...element };
    cpElement.infoBull = false;
    setElement(cpElement);
  });
  return (
    <>
      <GroupInput
        className={`select-multi-values ${error ? "form-error" : ""}`}
      >
        {label ? (
          <label>
            {label}
            {props.required ? <i>*</i> : null}
          </label>
        ) : null}
        <ReactSelect
          //defaultValue={defaultValue}
          closeMenuOnSelect={true}
          value={defaultValue}
          placeholder={placeholder}
          components={{
            Placeholder,
            Option: CustomSelectOption,
            NoOptionsMessage,
            SingleValue,
          }}
          options={options ? options : []}
          className={`react-select__container ${
            position === "auto" ? "active-position" : ""
          } ${className}`}
          onChange={onChange}
          isDisabled={disabled}
          isLoading={options === false}
          isSearchable={isSearchable}
          styles={customStyles}
          menuPlacement={position}
          classNamePrefix="react-select"
        />
        {infoBull && (
          <div className="message-infobulle" ref={refMessgs}>
            {textInfoBulle}
          </div>
        )}
      </GroupInput>
    </>
  );
}
