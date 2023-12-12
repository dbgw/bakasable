import React from "react";
import { BlocImagesStyle } from "../../../assets/styles/devisStyles";

export default function BlocImages({ title, data, onClick, ...props }) {
  return (
    <BlocImagesStyle>
      <h3>{title}</h3>
      <div className="bloc-images">
        {data.map(($item, $index) => {
          return (
            <div
              className="img"
              key={$index}
              onClick={() => onClick($item.source, $index)}
            >
              <img src={$item.source} alt="" />
            </div>
          );
        })}
      </div>
    </BlocImagesStyle>
  );
}
