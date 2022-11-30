import React, { memo, useMemo } from "react";
import { stringFormatter } from "../../../utilities/utils";
import Router from "next/router";
import StreamCard from "../../elements/StreamCard";
import { connect } from "react-redux";
import { limit } from "../../Constants";
import { showCatCardLoader } from "../../../api/utils/showCatCardLoader";
import ShowViewAll from "../../reusable/viewAll";
import StreamCardSkeleton from "../../../skeleton/StreamCardSkeleton";
import {
  saveSubCategoryName,
  saveCategoryName,
} from "../../../store/category/action";
import { useDispatch } from "react-redux";

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
  seeMoreLoader,
}) {
  const disptach = useDispatch();

  /**
   * showing streamcard data
   */
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
  // =======================================================

  /**
   * showing and handling card loader component
   */
  const handleCatCardVisisble = () => {
    if (!!catData[catId]) {
      if (catData[catId]?.total == limit) {
        return <>{showCatCardLoader(setPage, page, catId, setCatId)} </>;
      }
    }
  };
  // =========================================================================

  const handleGoToSeeAll = () => {
    if (!!category?.categoryName && !!category?.subCategoryName) {
      disptach(saveSubCategoryName(catSlug));
      Router.push({
        pathname: "/see-all",
        query: {
          page: "all category",
          category: category?.categoryName,
          subCategory: catSlug,
        },
      });
    } else {
      disptach(saveCategoryName(catSlug));
      Router.push({
        pathname: "/see-all",
        query: {
          page: "all category",
          category: catSlug,
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
            <h3 className="title text-capitalize">
              {stringFormatter(catName)}
            </h3>
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
