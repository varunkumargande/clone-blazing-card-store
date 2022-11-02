import React from "react";
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
import ShowViewAll from "../../reusable/viewAll";

function CategoryStream({ categoryData, showLoginModal, category }) {
  const dispatch = useDispatch();

  const handleSeeAll = (name) => {
    /**
     * regex is using for change formate of category name to category slug
     */
    let outString = name
      .replace(regex.nameToSlug, "")
      .replace(/ /g, "-")
      .toLowerCase();

    if (!!category?.categoryName) {
      dispatch(saveSubCategoryName(outString));
      Router.push({
        pathname: "/see-all",
        query: {
          page: "allCategory",
          category: category?.categoryName,
          subCategory: outString,
        },
      });
    } else {
      Router.push({
        pathname: "/see-all",
        query: {
          page: "allCategory",
          category: outString,
          subCategory: "all",
        },
      });
    }
  };

  const getStreamCards = () => {
    if (categoryData)
      return categoryData[categoryConstant.categoryData].map((detail) => {
        return <StreamCard showLoginModal={showLoginModal} detail={detail} />;
      });
  };

  return (
    <section className="Live-wrapper card-inner">
      <div className="inner-container">
        <div className="title-wrap flex space-between flex-center">
          <div className="flex flex-center">
            <h3 className="title">{stringFormatter(categoryData[0])}</h3>
          </div>
          <ShowViewAll
            data={categoryData[categoryConstant.categoryData]}
            handleSeeAll={handleSeeAll}
            catName={categoryData[0]}
          />
        </div>
      </div>
      <div className="overflow-wrap">
        <div className="flex inner-container">
          <div className="card-wrap flex">{getStreamCards()}</div>
        </div>
      </div>
    </section>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(CategoryStream);
