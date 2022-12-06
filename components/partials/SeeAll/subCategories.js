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
import { useIsMobile } from "../../../contexts/Devices/CurrentDevices";
import Styles from "../../../modular_scss/CategoriesMobile.module.scss";
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
  const { isMobile } = useIsMobile();
  useEffect(() => {
    if (Object.keys(query).length && query?.category && query?.subCategory) {
      if (streamData.length) {
        setSeeMoreLoader(true);
      } else {
        setLoader(true);
      }
      console.log("apicall");
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
  }, [query?.subCategory, query?.category, offset]);

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
    console.log("11111111");
    if (!!category?.categories && isCategoriesFetched) {
      const index = category?.categories
        .map(function (e) {
          return e?.categorySlug;
        })
        .indexOf(category?.categoryName);
      return category?.categories[index]?.children?.map((item) => {
        if (isMobile) {
          return (
            <li
              className={`flex space-between flex-center ${Styles.List}`}
              onClick={(e) => {
                e.preventDefault();
                handleSubCategorySelect(item.categorySlug, item.categoryId);
              }}
            >
              {item?.name}
              <button className={`${Styles.CheckBtn}`}></button>
            </li>
          );
        } else {
          return (
            <div
              className="category-list"
              key={`see-all-subcategories-${item.categoryId}`}
            >
              <button
                className={`text-capitalize title ${
                  category?.subCategoryName === item.categorySlug && "active"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleSubCategorySelect(item.categorySlug, item.categoryId);
                }}
              >
                {item.name}
              </button>
            </div>
          );
        }
      });
    } else if (!isCategoriesFetched) {
      return <TabsSkeleton count={5} name={"home-tabs-section"} />;
    }
  };
  console.log("999");
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
                onClick={(e) => {
                  e.preventDefault();
                  handleSubCategorySelect("all");
                }}
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
