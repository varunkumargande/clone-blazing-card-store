import React from "react";
import { useSelector } from "react-redux";
import StreamCard from "../../elements/StreamCard";
import Router from "next/router";

export default function LiveShow({
  setIsSeeAll,
  setSeeAllHeading,
  setIsLiveScheduleSeeAll,
  showLoginModal,
}) {
  const streamDetail = useSelector((state) => state?.stream?.streamdetails);
  const handleSeeAll = (name) => {
    setIsSeeAll(true);
    setIsLiveScheduleSeeAll(true);
    setSeeAllHeading(name);
  };

  const getStreamCards = () => {
    return streamDetail?.map((detail) => (
      <StreamCard
        key={detail?.id}
        isLive={false}
        detail={detail}
        showLoginModal={showLoginModal}
      />
    ));
  };

  const handleGoToSeeAll = () => {
    Router.push({
      pathname: "/see-all",
      query: {
        page: "scheduled",
        category: "",
      },
    });
  };

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
          <div className="card-wrap flex">{getStreamCards()}</div>
        </div>
      </div>
    </section>
  );
}
