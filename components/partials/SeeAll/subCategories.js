import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, connect } from "react-redux";
import Router from "next/router";
import {
  saveSubCategoryName,
  saveCategoryName,
  savePageType,
} from "../../../store/category/action";
import { getStreamSubCategoryBasedApi } from "../../../api/stream/subStreamDetail";
import { useCategoriesData } from "../../../contexts/Categoires/CategoriesData";
import TabsSkeleton from "../../../skeleton/TabsSkeleton";
import { stringFormatter } from "../../helper/cardImageHelper";
import { camelCase } from "../../../utilities/utils";

function SeeAllSubCategories({
  catIndex,
  category,
  setStreamData,
  setLoader,
  offset,
  streamData,
  setOffset,
  setSeeMoreLoader,
}) {
  const dispatch = useDispatch();
  const { query } = useRouter();
  const { isCategoriesFetched } = useCategoriesData();

  useEffect(() => {
    if (Object.keys(query).length && query?.category) {
      if (streamData.length) {
        setSeeMoreLoader(true);
      } else {
        setLoader(true);
      }
      getStreamSubCategoryBasedApi(
        camelCase(query?.page),
        query?.category,
        query?.subCategory,
        setStreamData,
        setLoader,
        offset,
        setSeeMoreLoader
      );
    }
  }, [query?.category, offset]);

  const handleSubCategorySelect = (name, id) => {
    dispatch(saveSubCategoryName(name));
    Router.push({
      pathname: "/see-all",
      query: {
        page: query?.page,
        category: category?.categoryName,
        subCategory: name,
      },
    });
    setStreamData([]);
    setOffset(0);
  };

  const getAllSubCategoriesCard = () => {
    if (!!category?.categories && isCategoriesFetched) {
      const index = category?.categories
        .map(function (e) {
          return e?.categorySlug;
        })
        .indexOf(category?.categoryName);
      return category?.categories[index]?.children?.map((item) => {
        return (
          <div
            className="category-list"
            key={`see-all-subcategories-${item.categoryId}`}
          >
            <button
              className={`text-capitalize title ${
                category?.subCategoryName === item.categorySlug && "active"
              }`}
              onClick={() =>
                handleSubCategorySelect(item.categorySlug, item.categoryId)
              }
            >
              {item.name}
            </button>
          </div>
        );
      });
    } else if (!isCategoriesFetched) {
      return <TabsSkeleton count={5} name={"home-tabs-section"} />;
    }
  };

  return (
    <>
      <section className="category-wrapper cotegories-border mb35">
        <div className="overflow-wrap">
          <div className="Category-list-wrap inner-container flex">
            <div className="category-list">
              <button
                className={
                  category?.subCategoryName === "all" ? "title active" : "title"
                }
                onClick={() => handleSubCategorySelect("all")}
              >
                All
              </button>
            </div>
            {getAllSubCategoriesCard()}
          </div>
        </div>
      </section>
    </>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(SeeAllSubCategories);
