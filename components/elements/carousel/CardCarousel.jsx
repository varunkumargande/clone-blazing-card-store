import React from "react";
import Slider from "react-slick";
import StreamCard from "../card/StreamCard";

export default function CardCarousel() {
  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 7,
    swipeToSlide: true,
  };
  return (
    <div>
      <Slider {...settings}>
        <StreamCard />
        <StreamCard />
        <StreamCard />
        <StreamCard />
        <StreamCard />
        <StreamCard />
        <StreamCard />
        <StreamCard />
      </Slider>
    </div>
  );
}
