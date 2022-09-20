import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import StreamCard from "../card/StreamCard";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { substreamDetailApi } from "../../../api/stream/subStreamDetail";
import { useRouter } from "next/router";

export default function CategoryCard() {
  const streamDetail = useSelector((state) => state?.stream?.streamdetails);
  const { query } = useRouter();
  const [params,setparams] = useState(query.id)
 

  const dispatch = useDispatch();
  useEffect(() => {
    substreamDetailApi(dispatch,query.catId,query.id);
  }, [params]);
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
          audience={detail.id}
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
