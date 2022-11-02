import { useState, useEffect } from "react";
import Router from "next/router";
import { stringFormatter } from "../../../utilities/utils";
import { useRouter } from "next/router";
import { useDispatch, connect } from "react-redux";
import {
  saveCategoryName,
  saveSubCategoryName,
} from "../../../store/category/action";
import { getStreamCategoryBasedApi } from "../../../api/stream/subStreamDetail";

function SeeAllParentCategories({ category, setCatIndex, setStreamData }) {
  const dispatch = useDispatch();
  const { query } = useRouter();

  const handleSelectCategory = (name, index) => {
    setCatIndex(index);
    dispatch(saveCategoryName(name));
    dispatch(saveSubCategoryName("all"));
    Router.push({
      pathname: "/see-all",
      query: {
        page: query.page,
        category: name,
        subCategory: "all",
      },
    });
    // getStreamCategoryBasedApi(name, setStreamData)
  };

  useEffect(() => {
    if (Object.keys(query).length && query?.category) {
      dispatch(saveCategoryName(query?.category));
      dispatch(saveSubCategoryName(query?.subCategory));
    } else {
      Router.push({
        pathname: "/see-all",
        query: {
          page: query?.page,
          category: category?.categories[0]?.categorySlug,
          subCategory: category?.subCategoryName,
        },
      });
      getStreamCategoryBasedApi(category?.categories[0]?.categorySlug, category?.subCategoryName, query?.page, setStreamData)
    } 
  }, [query]);

  const getAllCategoriesCard = () => {
    if (category?.categories) {
      return category?.categories.map((element, index) => {
        return (
          <li
            key={element?.categorySlug}
            className={category?.categoryName === element?.categorySlug ? "active" : ""}
            onClick={() => handleSelectCategory(element?.categorySlug, index)}
          >
            {stringFormatter(element?.name)}
          </li>
        );
      });
    }
  };

  return (
    <>
      <aside className="aside-wrapper">
        <ul className="aside-container">{getAllCategoriesCard()}</ul>
      </aside>
    </>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(SeeAllParentCategories);
