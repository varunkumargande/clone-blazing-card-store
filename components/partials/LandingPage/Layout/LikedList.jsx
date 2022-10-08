import React from "react";
import IconLike from "../../../Icons/IconLike";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { subcatstreamDetailApi } from "../../../../api/stream/subStreamDetail";
import { stringFormatter } from "../../../../utilities/utils";
import Router from "next/router";
import StreamCard from "../../../elements/StreamCard";
import { useSelector } from "react-redux";
import { streamDetailApi } from "../../../../api/stream/streamDetail";

export default function LikedList({
  categoriesData,
  setIsSeeAllCate,
  isSeeAll,
  setIsSeeAll,
  setSeeAllHeading,
  setIsLikedShow,
  isLikedShow
}) {
  const dispatch = useDispatch();

  const streamDetail = useSelector(
    (state) => state?.stream?.streamdetails?.stream
  );

  const handleSeeAll = (name) => {
    setIsSeeAll(true);
    setIsLiveScheduleSeeAll(true);
    setSeeAllHeading(name);
  };

  const getStreamCards = () => {
    return streamDetail?.scheduled?.map((detail) => {
      if (detail?.islike) {
        return <StreamCard isLive={false} detail={detail} />;
      }
    });
  };

  return (
    <section className="Pokomon-wrapper card-inner">
      <div className="inner-container">
        <div className="title-wrap flex space-between flex-center">
          <div className="flex flex-center">
            <h3 className="title">Liked List</h3>
          </div>
        </div>
        <div className="overflow-none">
          <div className="card-wrap flex inner-container">
            {getStreamCards()}
          </div>
        </div>
      </div>
    </section>
  );
}
