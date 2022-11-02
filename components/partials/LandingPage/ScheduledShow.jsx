import React, { useEffect, useState } from "react";
import StreamCard from "../../elements/StreamCard";
import { streamDetailApi } from "../../../api/stream/subStreamDetail";
import CardLoader from "../../reusable/CardLoader";
import { showCardLoader } from "../../../api/utils/showCardLoader";

export default function LiveShow({ showLoginModal }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    streamDetailApi(setData, page);
  }, [page]);

  const getStreamCards = () => {
    if (data.length) {
      return data?.map((detail) => {
        return (
          <StreamCard
            isLive={false}
            detail={detail}
            showLoginModal={showLoginModal}
          />
        );
      });
    }
  };

  return (
    <section className="Live-wrapper card-inner">
      <div className="inner-container">
        <div className="title-wrap flex space-between flex-center">
          <div className="flex flex-center">
            <h3 className="title">Scheduled Shows</h3>
          </div>
          {/* <ShowViewAll
            data={streamSchDetail}
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
  );
}
