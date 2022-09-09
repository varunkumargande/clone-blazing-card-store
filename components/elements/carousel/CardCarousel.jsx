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
        <StreamCard audience="1"/>
        <StreamCard audience="2"/>
        <StreamCard audience="3"/>
        <StreamCard audience="4"/>
        <StreamCard audience="5"/>
        <StreamCard audience="6"/>
        <StreamCard audience="7"/>
        <StreamCard audience="8"/>
      </Slider>
    </div>
  );
}
