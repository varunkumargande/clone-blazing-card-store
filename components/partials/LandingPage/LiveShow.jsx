import React from "react";
import { useSelector } from "react-redux";
import StreamCard from "../../elements/StreamCard";

export default function LiveShow({
  setIsSeeAll,
  setSeeAllHeading,
  setIsLiveScheduleSeeAll,
  showLoginModal,
}) {
  const handleSeeAll = (name) => {
    setIsSeeAll(true);
    setIsLiveScheduleSeeAll(true);
    setSeeAllHeading(name);
  };

  const streamDetail = useSelector((state) => state?.stream?.liveDetails);

  const getStreamCards = () => {
    return streamDetail?.map((detail, index) => {
      return (
        <React.Fragment key={index}>
          <StreamCard
            showLoginModal={showLoginModal}
            detail={detail}
            isLive={true}
          />
        </React.Fragment>
      );
    });
  };

  return (
    <>
      {streamDetail?.live?.length == 0 ? (
        ""
      ) : (
        <section className="Live-wrapper card-inner">
          <div className="inner-container">
            <div className="title-wrap flex space-between flex-center">
              <div className="flex flex-center">
                <h3 className="title">Live Shows</h3>
              </div>
              <div className="seeAll">
                <a
                  className="flex flex-center"
                  onClick={() => handleSeeAll("Live")}
                >
                  View All
                </a>
              </div>
            </div>
          </div>
          <div className="overflow-wrap">
            <div className="flex inner-container">
              <div className="card-wrap flex">{getStreamCards()}</div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
