import React, { useState } from "react";
import { ReadMoreBtn} from "../../assets/styles/frontGlobalStyle"

export default function ReadMore({
  btnFull = "En savoir plus",
  btnShort = "En savoir moins",
  className = "btnReadMore",
  ...props
}) {
  const [shortMode, setShortMode] = useState(true);
  return (
    <React.Fragment>
      <ReadMoreBtn onClick={() => setShortMode(!shortMode)} className={`${className} ${shortMode ? "open" : ""}`}>
        {shortMode ? btnFull : btnShort}
      </ReadMoreBtn>
      <div className="bloc-content-read-more">
        
        {!shortMode && <div className="content-read-more">{props.children}</div>}
        </div>
      
      
    </React.Fragment>
  );
}
