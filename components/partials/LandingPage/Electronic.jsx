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
import ShowViewAll from "../../reusable/viewAll";
import { catStreamDetailApi } from "../../../api/stream/subStreamDetail";
import { limit } from "../../Constants";
import { showCatCardLoader } from "../../../api/utils/showCatCardLoader";

function CategoryStream({
  showLoginModal,
  catData,
  catName,
  catId,
  loader,
  setPage,
  page,
  setCatId,
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

  return (
    <section className="Live-wrapper card-inner">
      
      {!!catData[catId] ? (
        <div className="inner-container">
          <div className="title-wrap flex space-between flex-center">
            <h3 className="title">{stringFormatter(catName)}</h3>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="overflow-wrap">
        <div className="flex inner-container">
          {loader[catId] ? (
            <div className="card-wrap flex">
              {getStreamCards()}
              {handleCatCardVisisble()}
            </div>
          ) : (
            <div>
              {" "}
              <h3 className="title">{stringFormatter(catName)}</h3> "loading
              ..."
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(CategoryStream);
