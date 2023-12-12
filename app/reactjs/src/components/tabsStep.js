import React from "react";
import { BlocTabStep } from "../assets/styles/componentStyles";
import { useMediaQuery } from "react-responsive";

export default function TabsStep({ menu = [], tabs = [], activeIndex }) {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 993px)" });
  let j = 0;
  return (
    <BlocTabStep>
      <div className="bloc-nav-step">
        {isTabletOrMobile ? (
          <div className="nav-step-mobile">
            <p className="titre-step-mobile">
              <span className="number-step">{activeIndex + 1}</span>

              {menu.map((v, i) => (
                <>{activeIndex === i ? <span>{v.title}</span> : null}</>
              ))}
            </p>
            <div className="range-step">
              {menu.map((v, i) => (
                <div
                  className={`${
                    activeIndex > i
                      ? "active "
                      : activeIndex === i && i === menu.length - 1
                      ? "active "
                      : activeIndex === i
                      ? "encour "
                      : ""
                  }`}
                  style={{
                    width: "100%",
                  }}
                ></div>
              ))}
            </div>
          </div>
        ) : (
          <ul className="nav-step">
            {menu.map((v, i) => (
              <li
                className={`item-nav-step ${activeIndex >= i ? "active " : ""}`}
                key={v.key}
              >
                <span className="number-step">{++j}</span>
                {v.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="content-detail-step">
        {menu[activeIndex] && tabs[menu[activeIndex].key]
          ? tabs[menu[activeIndex].key]
          : null}
      </div>
    </BlocTabStep>
  );
}
