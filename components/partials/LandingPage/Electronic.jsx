import React, { useState, useEffect } from "react";
import { stringFormatter } from "../../../utilities/utils";
import Router from "next/router";
import StreamCard from "../../elements/StreamCard";
import { connect, useDispatch } from "react-redux";
import {
  saveSubCategoryName,
  saveCategoryName,
} from "../../../store/category/action";
import { regex } from "../../Constants/regex";
import { categoryConstant } from "../../Constants/category";
import { catStreamDetailApi } from "../../../api/stream/subStreamDetail";
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
  const getStreamCards = () => {
    if (!!catData[catId]) {
      return catData[catId]?.data?.map((detail) => {
        return <StreamCard showLoginModal={showLoginModal} detail={detail} />;
      });
    }
  };

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
              {getStreamCards()}
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

export default connect(mapStateToProps)(CategoryStream);
