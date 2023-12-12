import React from "react";
import { GalerieSlideStyle } from "../assets/styles/componentStyles";
import Slider from "react-slick";
import { useMediaQuery } from "react-responsive";

export default function GalerieSlide({ children = [], md, sm, onClick }) {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 993px)" });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 994px)",
  });
  const settings = {
    arrows: false,
    infinite: true,
    centerMode: true,
    centerPadding: "100px",
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          infinite: true,
          centerMode: true,
          centerPadding: "60px",
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 575,
        settings: {
          infinite: true,
          centerMode: true,
          centerPadding: "60px",
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <GalerieSlideStyle className="bloc-items-realisation">
      {isDesktopOrLaptop && (
        <>
          {children &&
            children.map(($val, $index) => (
              <div
                key={$index}
                className="item-realisation"
                onClick={() => onClick($val.source, $index)}
              >
                <img src={$val.source} alt="" />
              </div>
            ))}
        </>
      )}
      {isTabletOrMobile && (
        <Slider {...settings}>
          {children &&
            children.map(($val, $index) => (
              <div
                key={$index}
                className="item-realisation"
                onClick={() => onClick($val.source, $index)}
              >
                <img src={$val.source} alt="" />
              </div>
            ))}
        </Slider>
      )}
    </GalerieSlideStyle>
  );
}
