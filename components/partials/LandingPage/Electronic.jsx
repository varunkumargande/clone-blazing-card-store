import React, { memo, useMemo } from "react";
import { stringFormatter } from "../../../utilities/utils";
import Router from "next/router";
import StreamCard from "../../elements/StreamCard";
import { connect } from "react-redux";
import { limit } from "../../Constants";
import { showCatCardLoader } from "../../../api/utils/showCatCardLoader";
import ShowViewAll from "../../reusable/viewAll";
import StreamCardSkeleton from "../../../skeleton/StreamCardSkeleton";

function CategoryStream({
  showLoginModal,
  catData,
  catName,
  catSlug,
  catId,
  loader,
  setPage,
  page,
  setCatId,
  category,
}) {
  const getStreamCards = useMemo(() => {
    if (!!catData[catId]) {
      return catData[catId]?.data?.map((detail) => (
        <StreamCard
          key={detail.uuid}
          showLoginModal={showLoginModal}
          detail={detail}
        />
      ));
    }
  }, [catData[catId]]);

  const handleCatCardVisisble = () => {
    if (!!catData[catId]) {
      if (catData[catId]?.total == limit) {
        return <>{showCatCardLoader(setPage, page, catId, setCatId)} </>;
      }
    }
  };

  const handleGoToSeeAll = () => {
    if (!!category?.categoryName) {
      Router.push({
        pathname: "/see-all",
        query: {
          page: "allCategory",
          category: category?.categoryName,
          subCategory: catSlug,
        },
      });
    } else {
      Router.push({
        pathname: "/see-all",
        query: {
          page: "allCategory",
          category: category?.categoryName,
          subCategory: "all",
        },
      });
    }
  };

  return (
    <section className="Live-wrapper card-inner">
      <div className="inner-container">
        <div className="title-wrap flex space-between flex-center">
          <div className="flex flex-center">
            <h3 className="title">{stringFormatter(catName)}</h3>
          </div>
          {!!catData[catId] && (
            <ShowViewAll
              dataLen={catData[catId]?.data?.length}
              handleGoToSeeAll={handleGoToSeeAll}
              catName={catSlug}
            />
          )}
        </div>
      </div>
      <div className="overflow-wrap">
        {loader[catId] ? (
          <div className="flex inner-container">
            <div className="card-wrap flex">
              {getStreamCards}
              {handleCatCardVisisble()}
            </div>
          </div>
        ) : (
          <div className="flex inner-container px-0">
            <div className="card-wrap flex">
              <StreamCardSkeleton count={7} name={catId} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(memo(CategoryStream));
