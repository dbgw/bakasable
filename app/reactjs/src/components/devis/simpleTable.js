import React from "react";
import { SimpleTableStyle } from "../../assets/styles/devisStyles";

export default function SimpleTable({ columns = [], data = [], ...props }) {
  const showData = () => {
    return data.map(props.rowRender);
  };

  return (
    <SimpleTableStyle>
      <div className="dev-table">
        {columns ? (
          <div className="table-header">
            <div className="table-row">
              {columns.map(($val) => (
                <div className="table-cell" key={`head-${$val.key}`}>
                  {$val.text}
                </div>
              ))}
            </div>
          </div>
        ) : null}
        <div className="table-body">{showData()}</div>
      </div>
    </SimpleTableStyle>
  );
}
