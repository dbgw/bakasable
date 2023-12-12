import React from "react";
import Rating from "@mui/material/Rating";
import { RatingBloc } from "../../assets/styles/frontGlobalStyle";

export default function RatingBox({
  name = "read-only",
  note = "",
  value = 0,
  readOnly = true,
  precision = 0.1,
  showValue = false
}) {
  return (
    <RatingBloc>
      {note && (<span>{note}</span>)}
      <Rating
        name={name}
        value={value}
        readOnly={readOnly}
        precision={precision}
      />
      {showValue && (<span className="rating-value">{value}</span>)}
    </RatingBloc>
  );
}
