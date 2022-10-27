import React from "react";
import Link from "next/link";
import IconBack from "../../Icons/IconBack";
import IconEye from "../../Icons/IconEye";
import IconLike from "../../Icons/IconLike"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { streamDetailApi } from "../../../api/stream/streamDetail";
import { subcatstreamDetailApi } from "../../../api/stream/subStreamDetail";
import StreamCard from "../../elements/StreamCard";
import Router from "next/router";


export default function LiveShow({ name, catId, setIsSeeAll, setSeeAllHeading, setIsLiveScheduleSeeAll, activeCategoryName,showLoginModal }) {
    const dispatch = useDispatch();
    // useEffect(() => {
    //     subcatstreamDetailApi(dispatch, catId)
    // }, [])
    const streamDetail = useSelector((state) => state?.stream?.streamdetails?.stream)

    const handleSeeAll = (name) => {
        setIsSeeAll(true)
        setIsLiveScheduleSeeAll(true)
        setSeeAllHeading(name)
    }

    const getStreamCards = () => {
        return streamDetail?.scheduled?.map((detail) => {
            return (
                <StreamCard isLive={false} detail={detail} showLoginModal={showLoginModal} />
            );
        });
    };

    const handleGoToSeeAll = () => {
        Router.push({
          pathname: "/see-all",
          query: {
            page: "scheduled",
            category: ""
          }
        })
      }

    return (
        <section className="Live-wrapper card-inner">
            <div className="inner-container">
                <div className="title-wrap flex space-between flex-center">
                    <div className="flex flex-center">
                        <h3 className="title">Schedule Shows</h3>
                    </div>
                    <div className="seeAll" onClick={() => handleGoToSeeAll()}>
                        <a className="flex flex-center">View All</a>
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