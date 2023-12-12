import React, { useRef } from "react";
import Select, { components } from "react-select";
import { GroupInput } from "../../assets/styles/adminStyle/adminGlobalStyle";
import { useOutsideAlerter } from '../../helper/events';

const Option = (props) => (
  <div>
    <components.Option className="option-select-check" {...props}>
      <input type="checkbox" checked={props.isSelected} onChange={() => null} />{" "}
      <label>{props.label}</label>
    </components.Option>
  </div>
);

const MultiValue = (props) => (
  <components.MultiValue {...props}>
    <span>{props.data.label}</span>
  </components.MultiValue>
);

const Placeholder = (props) => {
  return <components.Placeholder {...props} />;
};

export default function SelectCat({
  label = null,
  infoLabel = null,
  onChangeCallback,
  className = "",
  error = false,
  disabled = false,
  isSearchable = false,
  errorMessage = "",
  placeholder = "",
  options = [],
  style = {},
  value = [],
  hideOptions = false,
  infoBull = false,
  textInfoBulle = "",
  element = false,
  setElement = () => {},
  ...props
}) {
  const customStyles = {
    menu: (provided, state) => ({
      backgroundColor: "#FFF",
      borderRadius: "0 0 15px 15px",
      position: "static",
      width: "100%",
      boxShadow: "0 2px 9px 0 rgba(182, 172, 251, 0.42)",
    }),
    menuList: (provided, state) => ({
      maxHeight: "145px",
      overflowY: "auto",
      paddingBottom: "4px",
      paddingTop: "4px",
      position: "relative",
      scrolling: "touch",
      boxSizing: "border-box",
      padding: "10px 20px",
    }),
    control: (provided, state) => ({
      backgroundColor: "#f5f5fa",
      boxShadow: "0 2px 9px 0 rgba(182, 172, 251, 0.42)",
      border: "1px solid transparent",
      color: "#000",
      borderRadius: state.isFocused ? "20px 20px 0 0" : " 20px",
      minHeight: "40px",
      display: "flex",
      alignItems: "flex-start",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      transformOrigin: "center",
      transform: state.isFocused ? "rotate(-180deg)" : "rotate(0deg)",
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "6px 20px",
    }),
    group: (provided, state) => ({
      padding: "5px 0",
    }),
    groupHeading: (provided, state) => ({
      color: "#000",
      marginBottom: "10px",
      fontSize: "14px",
      fontWeight: "600",
    }),

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
      fontSize: "11px",
      color: "#b8b8bb",
    }),
  };
  const MultiValueContainer = (props) => {
    return (
      <div className={hideOptions ? "show-count-select" : ""}>
        <components.MultiValueContainer {...props} />

        {hideOptions && value.length > 1 ? (
          <span className="count-select">{value.length}</span>
        ) : null}
      </div>
    );
  };
  const ClearIndicator = (props) => {
    return (
      <div className="clear-indicators">
        <components.ClearIndicator {...props} />
      </div>
    );
  };
  const refMessgs = useRef(null);
  useOutsideAlerter(refMessgs, () => {
    const cpElement = { ...element };
    cpElement.infoBull = false;
    setElement(cpElement);
  });
  return (
    <GroupInput className={`select-multi-values ${error ? "form-error" : ""}`}>
      {label ? (
        <label>
          {label} {props.required ? <i>*</i> : null}
          {infoLabel ? <span className="info-label">{infoLabel}</span> : null}
        </label>
      ) : null}
      <Select
        closeMenuOnSelect={false}
        isMulti
        placeholder={placeholder}
        components={{
          Option,
          MultiValue,
          Placeholder,
          MultiValueContainer,
          ClearIndicator,
        }}
        className="react-select__container"
        options={options}
        hideSelectedOptions={false}
        backspaceRemovesValue={false}
        onChange={(e) => onChangeCallback(e)}
        styles={customStyles}
        value={value}
        noOptionsMessage={() => "Aucune donnée"}
        classNamePrefix="react-select"
      />
      {infoBull && (
          <div className="message-infobulle" ref={refMessgs}>
            {textInfoBulle}
          </div>
        )}
    </GroupInput>
  );
}
