import React, { memo, useEffect, useState } from "react";

import { getSectionCardsApi } from "../../../../api/home/categories";
import StreamCardSkeleton from "../../../../skeleton/StreamCardSkeleton";
import { categoryConstant } from "../../../Constants";
import StreamCard from "../../../elements/StreamCard";
import IconLoader from "../../../Icons/IconLoader";
import IconLoaderPlay from "../../../Icons/IconLoaderPlay";

function ShowSectionCards({ section, showLoginModal }) {
  const [loader, setLoader] = useState(true);
  const [cards, setCards] = useState([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    getSectionCardsApi(
      section,
      offset,
      (data) => setCards([...cards, ...data]),
      setTotal,
      setLoader
    );
  }, [offset]);

  const showCardLoader = () => {
    return (
      <div
        className="card-list flex flex-center"
        onClick={(e) => {
          e.preventDefault();
          setLoader(true);
          setOffset(offset + categoryConstant.LIVE_DATA.limit);
        }}
      >
        <div className="inner-card-list Loader">
          <div className="image flex flex-center justify-center column">
            <div className="LoaderImg">
              <div className="loader-icon">
                <IconLoader />
              </div>
              <span>
                <IconLoaderPlay />
              </span>
            </div>
            <div className="loading">Load More</div>
          </div>
          <div className="text">
            <div className="title"></div>
            <div className="disc"></div>
            <div className="disc"></div>
            <div className="cate"></div>
          </div>
        </div>
      </div>
    );
  };

  const showCards = () => {
    if (loader && !cards.length) {
      return (
        <div className="overflow-wrap mb-5">
          <div className="card-wrap flex">
            <StreamCardSkeleton count={7} name={"home-live-shows"} />
          </div>
        </div>
      );
    } else if (!!total) {
      return (
        <div className="overflow-wrap mb-5">
          <div className="card-wrap flex">
            {cards?.map((item) => (
              <StreamCard
                key={item.uuid}
                showLoginModal={showLoginModal}
                detail={item}
              />
            ))}
            {loader && (
              <StreamCardSkeleton count={3} name={"home-live-shows"} />
            )}
            {total > cards?.length && showCardLoader()}
          </div>
        </div>
      );
    } else return;
  };

  return (
    <div
      className={
        ((!!total && !loader) || loader) && `inner-container title-wrap`
      }
    >
      {((!!total && !loader) || loader) && (
        <h3 className="title text-capitalize mb-4">{section.name}</h3>
      )}
      {showCards()}
    </div>
  );
}

export default memo(ShowSectionCards);
