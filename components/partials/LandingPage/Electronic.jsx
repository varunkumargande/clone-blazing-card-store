import React from "react";
import IconLike from "../../Icons/IconLike";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { subcatstreamDetailApi } from "../../../api/stream/subStreamDetail";
import { stringFormatter } from "../../../utilities/utils";
import Router from "next/router";
import StreamCard from "../../elements/StreamCard";

export default function Electronic({
  categoryData,
  setIsSeeAllCate,
  isSeeAll,
  setIsSeeAll,
  setSeeAllHeading,
  setIsLikedShow,
  isLikedShow
}) {
  const dispatch = useDispatch();
  
  useEffect(() => {
    subcatstreamDetailApi(dispatch);
  }, []);

  const handleSeeAll = (name) => {
    setIsSeeAll(true);
    setIsSeeAllCate(false);
    setSeeAllHeading(name);
  };


  const getStreamCards = () => {
    if (categoryData)
      return categoryData[1]?.map((detail) => {
        return (
          <StreamCard detail={detail} isLive={true} />
        );
      });
  };

  return (
    <section className="Live-wrapper card-inner">
      <div className="inner-container">
        <div className="title-wrap flex space-between flex-center">
          <div className="flex flex-center">
            <h3 className="title">{stringFormatter(categoryData[0])}</h3>
          </div>
          <div className="seeAll">
            {/* <Link href={`/categoryStream?catname=${categoryData[0]}`}> */}
            <a
              className="flex flex-center"
              onClick={() => handleSeeAll(categoryData[0])}
            >
              View All
            </a>
            {/* </Link> */}
          </div>
        </div>
      </div>
      <div className="overflow-wrap">
        <div className="flex inner-container">
          <div className="card-wrap flex">
            {/*  */}
            {getStreamCards()}
          </div>
        </div>
      </div>
    </section>
  );
}
