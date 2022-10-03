import React from "react";
import IconLike from "../../Icons/IconLike";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { subcatstreamDetailApi } from "../../../api/stream/subStreamDetail";
import { stringFormatter } from "../../../utilities/utils";
import Router from "next/router";
import { streamLikeDislike } from "../../../api/stream/streams_api";
import { useState } from "react";

export default function Electronic({
  categoryData,
  setIsSeeAllCate,
  isSeeAll,
  setIsSeeAll,
  setSeeAllHeading,
}) {
  const dispatch = useDispatch();
  const [likedStream, setLikedStream] = useState([]);
  useEffect(() => {
    subcatstreamDetailApi(dispatch);
  }, []);

  const handleSeeAll = (name) => {
    setIsSeeAll(true);
    setIsSeeAllCate(false);
    setSeeAllHeading(name);
  };

  const handleLikeUnlike = async (uuid) => {
    const userDetails = JSON.parse(sessionStorage.getItem("spurtUser"));
    if (uuid && !!userDetails) {
      const data = {
        stream_id: uuid,
        user_id: userDetails?.id,
      };
      const response = await streamLikeDislike(data);
      console.log(response);

      if (response.status) {
        setLikedStream((state) => [...state, uuid])
      }
    }
  };

  const getlikedStatus = (uuid) => {
    if(!!likedStream.includes(uuid)) {
      
      return  "like flex flex-center justify-center liked"
    }
    return  "like flex flex-center justify-center"
  }

  const getStreamCards = () => {
    if (categoryData)
      return categoryData[1]?.map((detail) => {
        console.log(detail);
        return (
          <div className="card-list flex flex-center">
            <div class="inner-card-list">
              <div className="image">
                <a href={`/streaming?stream=${detail.id}&uuid=${detail.uuid}`}>
                  <img src="/static/images/card.png" alt="Card" />
                </a>
                <div className="tme-wrap flex flex-center justify-center live">
                  <span>1.2K</span> <button className="live"></button>
                </div>
                <button
                  onClick={() => handleLikeUnlike(detail.uuid)}
                  className={getlikedStatus(detail.uuid)}
                >
                  <IconLike />
                </button>
              </div>

              <div className="text">
                <h3 className="title flex flex-center">
                  <img src="/static/images/profile.png" alt="Card" />{" "}
                  {detail.title}
                </h3>
                <div className="disc">{detail.description}</div>
                <button className="cate-btn">
                  {stringFormatter(detail?.category_name)}
                </button>
              </div>
            </div>
          </div>
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
              See All
            </a>
            {/* </Link> */}
          </div>
        </div>
        <div className="overflow-wrap">
          <div className="card-wrap flex inner-container">
            {/*  */}
            {getStreamCards()}
          </div>
        </div>
      </div>
    </section>
  );
}
