import React, { useState, useEffect } from "react";
import StreamCard from "../../elements/StreamCard";
import { liveDetailApi } from "../../../api/stream/subStreamDetail";
import { showCardLoader } from "../../../api/utils/showCardLoader";

export default function LiveShow({ showLoginModal }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    liveDetailApi(setData, page);
  }, [page]);

  const getStreamCards = () => {
    if (data.length) {
      return data?.map((detail, index) => {
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
    }
  };

  return (
    <>
      <section className="Live-wrapper card-inner">
        <div className="inner-container">
          <div className="title-wrap flex space-between flex-center">
            <div className="flex flex-center">
              <h3 className="title">Live Shows</h3>
            </div>
            {/* <ShowViewAll
              data={streamLiveDetail}
              handleGoToSeeAll={handleGoToSeeAll}
            /> */}
          </div>
        </div>
        <div className="overflow-wrap">
          <div className="flex inner-container">
            <div className="card-wrap flex">
              {getStreamCards()}
              {showCardLoader(setPage, page, data)}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
