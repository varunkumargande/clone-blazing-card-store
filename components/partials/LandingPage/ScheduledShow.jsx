import React, { useEffect, useState, memo } from "react";
import StreamCard from "../../elements/StreamCard";
import { streamDetailApi } from "../../../api/stream/subStreamDetail";
import CardLoader from "../../reusable/CardLoader";
import { showCardLoader } from "../../../api/utils/showCardLoader";
import { limit } from "../../Constants";
import ShowViewAll from "../../reusable/viewAll";
import Router from "next/router";
import StreamCardSkeleton from "../../../skeleton/StreamCardSkeleton";

function LiveShow({ showLoginModal }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(null);
  const [loader, setLoader] = useState(true);
  const [seeMoreLoader,setSeeMoreLoader] = useState(true);

  useEffect(() => {
   setSeeMoreLoader(true);
    streamDetailApi(setData, page, setTotal, setLoader,setSeeMoreLoader);
  }, [page]);

  const getStreamCards = () => {
    if (data.length) {
      return data?.map((detail) => {
        return (
          <StreamCard
            key={detail.uuid}
            isLive={false}
            detail={detail}
            showLoginModal={showLoginModal}
          />
        );
      });
    }
  };

  const handleCardVisisble = () => {
    if (total === limit) {
      if (data.length) {
        return <> {showCardLoader(setPage, page)} </>;
      }
    }
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

  const showSheduledComponent = () => {
    if (data.length) {
      return (
        <section className="Live-wrapper card-inner">
          <div className="inner-container">
            <div className="title-wrap flex space-between flex-center">
              <div className="flex flex-center">
                <h3 className="title">Scheduled Shows</h3>
              </div>
              <ShowViewAll
                dataLen={data.length}
                handleGoToSeeAll={handleGoToSeeAll}
                catName={null}
              />
            </div>
          </div>
          <div className="overflow-wrap">
            <div className="flex inner-container">
              <div className="card-wrap flex">
                {getStreamCards()}
                {seeMoreLoader ? (
                  <StreamCardSkeleton count={3} name={"home-scheduled-shows"} />
                ) : (
                  handleCardVisisble()
                )}
              </div>
            </div>
          </div>
        </section>
      );
    } else if (loader) {
      return (
        <section className="Live-wrapper card-inner">
          <div className="inner-container">
            <div className="title-wrap flex space-between flex-center">
              <div className="flex flex-center">
                <h3 className="title">Scheduled Shows</h3>
              </div>
            </div>
          </div>
          <div className="overflow-wrap">
            <div className="flex inner-container">
              <div className="card-wrap flex">
                <StreamCardSkeleton count={7} name={"home-scheduled-shows"} />
              </div>
            </div>
          </div>
        </section>
      );
    }
  };

  return <>{showSheduledComponent()}</>;
}

export default memo(LiveShow);
