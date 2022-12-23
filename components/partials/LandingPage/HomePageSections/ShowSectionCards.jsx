import React, { memo, useEffect, useState } from "react";

import { getSectionCardsApi } from "../../../../api/home/categories";
import StreamCardSkeleton from "../../../../skeleton/StreamCardSkeleton";
import StreamCard from "../../../elements/StreamCard";

function ShowSectionCards({ section }) {
  const [loader, setLoader] = useState(true);
  const [cards, setCards] = useState(true);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    getSectionCardsApi(
      section.type === "category" || section.category_id || "",
      section.type || "category",
      offset,
      setCards,
      setLoader
    );
  }, []);

  const showCards = () => {
    if (loader) {
      return (
        <div className="overflow-wrap mb-5">
          <div className="card-wrap flex">
            <StreamCardSkeleton count={7} name={"home-live-shows"} />
          </div>
        </div>
      );
    } else if (!loader) {
      if (!!cards?.data?.data?.total) {
        return cards?.data?.data?.data?.map((item) => (
          <StreamCard key={item.uuid} showLoginModal={false} detail={item} />
        ));
      }
      return;
    }
  };

  return (
    <div
      className={
        ((!!cards?.data?.data?.total && !loader) || loader) &&
        `inner-container title-wrap`
      }
    >
      {((!!cards?.data?.data?.total && !loader) || loader) && (
        <h3 className="title text-capitalize mb-4">{section.name}</h3>
      )}
      {showCards()}
    </div>
  );
}

export default memo(ShowSectionCards);
