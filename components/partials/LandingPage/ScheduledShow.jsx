import React from "react";
import { useSelector } from "react-redux";
import StreamCard from "../../elements/StreamCard";
import Router from "next/router";
import ShowViewAll  from "../../reusable/viewAll";

export default function LiveShow({
  setIsSeeAll,
  setSeeAllHeading,
  setIsLiveScheduleSeeAll,
  showLoginModal,
  streamSchDetail
}) {
  const streamDetail = useSelector((state) => state?.stream?.streamdetails);
  const handleSeeAll = (name) => {
    setIsSeeAll(true);
    setIsLiveScheduleSeeAll(true);
    setSeeAllHeading(name);
  };

  const getStreamCards = () => {
    return streamDetail?.map((detail) => {
      return (
        <StreamCard
          isLive={false}
          detail={detail}
          showLoginModal={showLoginModal}
        />
      );
    });
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
            <h3 className="title">Scheduled Shows</h3>
          </div>
          <ShowViewAll
            data={streamSchDetail}
            handleGoToSeeAll={handleGoToSeeAll}
          />
        </div>
      </div>
      <div className="overflow-wrap">
        <div className="flex inner-container">
          <div className="card-wrap flex">
            {getStreamCards()}
          </div>
        </div>
      </div>
    </section>
  );
}
