import React from "react";
import { stringFormatter } from "../../../utilities/utils";
import Router from "next/router";
import StreamCard from "../../elements/StreamCard";
import { connect } from "react-redux";

function CategoryStream({ categoryData, showLoginModal, category }) {

  const handleSeeAll = (name) => {
    if (!!category?.categoryName) {
      Router.push({
        pathname: "/see-all",
        query: {
          page: "all Categories",
          category: category?.categoryName,
          subCategory: name,
        },
      });
    } else {
      Router.push({
        pathname: "/see-all",
        query: {
          page: "all Categories",
          category: name,
          subCategory: "all",
        },
      });
    }
  };

  const getStreamCards = () => {
    if (categoryData)
      return categoryData[1]?.map((detail) => {
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
          <div className="seeAll">
            <a
              className="flex flex-center"
              onClick={() => handleSeeAll(categoryData[0])}
            >
              View All
            </a>
          </div>
        </div>
      </div>
      <div className="overflow-wrap">
        <div className="flex inner-container">
          <div className="card-wrap flex">
            {/*  */}
            {getStreamCards()}
          </div>
        </div>
      </div>
    </section>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(CategoryStream);
