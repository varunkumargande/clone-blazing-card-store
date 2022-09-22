import React from "react";
import Link from "next/link";
import IconBack from "../../Icons/IconBack";
import IconEye from "../../Icons/IconEye";
import IconLike from "../../Icons/IconLike";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { subcatstreamDetailApi } from "../../../api/stream/subStreamDetail";
import { stringFormatter } from "../../../utilities/utils";
import Router from 'next/router';


export default function Electronic({ categoryData, setIsSeeAllCate, isSeeAll, setIsSeeAll, setSeeAllHeading }) {
  const dispatch = useDispatch();

  useEffect(() => {
    subcatstreamDetailApi(dispatch);
  }, []);

  const handleSeeAll = (name) => { 
    setIsSeeAll(true)
    setIsSeeAllCate(false)
    setSeeAllHeading(name)
  }

  const getStreamCards = () => {
    if (categoryData)
      return categoryData[1]?.map((detail) => {
        return (
          <div className="card-list flex flex-center">
            <a href={`/streaming?stream=${detail.id}&uuid=${detail.uuid}`}>
              <div className="image">
                <img src="/static/images/card.png" alt="Card" />
                <div className="tme-wrap flex flex-center justify-center">
                  <IconEye />
                  <span>1.2K</span> <button className="live">Live</button>
                </div>
                <button className="like flex flex-center justify-center">
                  <IconLike />
                </button>
              </div>
            </a>
            <div className="text">
              <h3 className="title flex flex-center">
                <img src="/static/images/profile.png" alt="Card" />{" "}
                {detail.title}
              </h3>
              <div className="disc">{detail.description}</div>
              <button className="cate-btn">{stringFormatter(detail?.category_name)}</button>
            </div>
          </div>
        );
      });
  }



  return (
    <section className="Live-wrapper card-inner">
      <div className="inner-container">
        <div className="title-wrap flex space-between flex-center">
          <div className="flex flex-center">
            <h3 className="title">{stringFormatter(categoryData[0])}</h3>
          </div>
          <div className="seeAll">
            {/* <Link href={`/categoryStream?catname=${categoryData[0]}`}> */}
            <a className="flex flex-center" onClick={() => handleSeeAll(categoryData[0])}>See All</a>
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

