import React, { useState, useEffect } from "react";
import StreamCard from "../../elements/StreamCard";
import { liveDetailApi } from "../../../api/stream/subStreamDetail";
import { showCardLoader } from "../../../api/utils/showCardLoader";
import { limit } from "../../Constants";
import ShowViewAll from "../../reusable/viewAll";
import { connect } from "react-redux";
import Router from "next/router";

function LiveShow({ showLoginModal }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(null);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    liveDetailApi(setData, page, setTotal, setLoader);
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

  const handleCardVisisble = () => {
    if (total === limit) {
      if(data.length) {
        return <> {showCardLoader(setPage, page)} </>;
      }
    }
  };

  const handleGoToSeeAll = () => {
    Router.push({
      pathname: "/see-all",
      query: {
        page: "live",
        category: "",
      },
    });
  };

  const showLiveComponent = () => {
    if (data.length) {
      return (
        <section className="Live-wrapper card-inner">
          <div className="inner-container">
            <div className="title-wrap flex space-between flex-center">
              <div className="flex flex-center">
                <h3 className="title">Live Shows</h3>
              </div>
              <ShowViewAll dataLen = {data.length} handleGoToSeeAll={handleGoToSeeAll} catName={null} />
            </div>
          </div>
          <div className="overflow-wrap">
            <div className="flex inner-container">
              <div className="card-wrap flex">
                {loader ? (
                  "loading ..."
                ) : (
                  <>
                    {getStreamCards()}
                    {handleCardVisisble()}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      );
    }
  };

  return <>{showLiveComponent()}</>;
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(LiveShow);
