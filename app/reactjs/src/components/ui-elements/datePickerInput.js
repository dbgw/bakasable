import React from "react";
import {
  GroupInput,
  DatePickerStyle,
} from "../../assets/styles/adminStyle/adminGlobalStyle";

import { IconCalendarWhite } from "../../assets/styles/icons";

import DatePicker from "react-date-picker";

export default function DatePickerInput({
  label,
  name,
  type,
  placeholder,
  onChange,
  value,
  id,
  className = "",
  notice,
  error = false,
  errorMessage = "",
  minDate = null,
  disabled = false,
  min,
  as,
  ...props
}) {
  return (
    <GroupInput className={error ? `form-error ${className}` : `${className}`}>
      {label ? (
        <label>
          {label}
          {props.required ? <i>*</i> : null}
        </label>
      ) : null}

      <div>
        <DatePickerStyle>
          <DatePicker
            clearIcon={null}
            onChange={onChange}
            value={value}
            name={name}
            id={id}
            onChange={onChange}
            disabled={disabled}
            calendarIcon={<IconCalendarWhite />}
            minDate={minDate}
          />
        </DatePickerStyle>
      </div>

      {errorMessage ? (
        <span className="error-message">{errorMessage}</span>
      ) : null}

      {notice ? <p className="notice-form-group">{notice}</p> : null}
    </GroupInput>
  );
}
