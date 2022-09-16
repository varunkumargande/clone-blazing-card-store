import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import StreamCard from "../card/StreamCard";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { streamDetailApi } from "../../../api/stream/streamDetail";

export default function CardCarousel() {
  const streamDetail = useSelector((state) => state?.stream?.streamdetails);

  const dispatch = useDispatch();
  useEffect(() => {
    streamDetailApi(dispatch);
  }, []);
  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 7,
    swipeToSlide: true,
  };
  const getStreamCards = () => {
    return streamDetail?.map((detail) => {
      return (
        <StreamCard
          streamId={detail.id}
          uuid={detail.uuid}
          description={detail.description}
          title={detail.title}
        />
      );
    });
  };

  return (
    <>
      <Slider {...settings}>{getStreamCards()}</Slider>
    </>
  );
}
