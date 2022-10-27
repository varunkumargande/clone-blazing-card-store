import React, { useState } from "react";
import StreamCard from "../../../elements/StreamCard";
import { stringFormatter } from "../../../../utilities/utils";
import { connect } from "react-redux";
import Router from "next/router";
import { useSelector } from "react-redux";

function Vertical({
  categoryName,
  data,
  subCateId,
  category,
}) {

  const handleCardDetail = () => {
    if (data[category?.categoryName]) {
      return data[category?.categoryName].map((detail, index) => {
        if (subCateId == "select" || subCateId == null) {
          return <StreamCard detail={detail} />;
        } else {
          if (parseInt(subCateId) === detail.category_id) {
            return <StreamCard detail={detail} />;
          }
          if (parseInt(subCateId) === detail.subCategory_id) {
            return <StreamCard detail={detail} />;
          }
        }
      });
    }
  };

  const handleGoToSeeAll = (category) => {
    Router.push({
      pathname: "/see-all",
      query: {
        page: "all categories",
        category: category,
      },
    });
  };

  return (
    <section className="Pokomon-wrapper card-inner">
      <div className="inner-container">
        <div className="title-wrap flex space-between flex-center">
          <div className="flex flex-center">
            <h3 className="title">
              {!!category?.categoryName ? stringFormatter(category?.categoryName) : ""}
            </h3>
          </div>
          <div className="seeAll">
            <a
              className="flex flex-center"
              onClick={() => handleGoToSeeAll(categoryName)}
            >
              View All
            </a>
          </div>
        </div>
        <div className="overflow-none">
          <div className="card-wrap flex inner-container">
            {handleCardDetail()}
          </div>
        </div>
      </div>
    </section>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Vertical);
