import React, { useEffect, memo } from "react";
import Link from "next/link";
import IconCategoryDrop from "../../Icons/IconCategoryDrop";
import IconLike from "../../Icons/IconLike";
import { connect } from "react-redux";
import Router from "next/router";
import IconBack from "../../Icons/IconBack";
import { stringFormatter } from "../../../utilities/utils";
import { useRouter } from "next/router";
import {
  saveCategoryName,
  saveCategoryId,
} from "../../../store/category/action";
import { useDispatch } from "react-redux";
import { categoryConstant } from "../../Constants/category";

function Category({ seeAllHeading, auth, category }) {
  const dispatch = useDispatch();
  const { query } = useRouter();
  useEffect(() => {
    if (Object.keys(query).length && query?.category) {
      dispatch(saveCategoryName(query?.category));
      dispatch(saveCategoryId(query?.cid));
    }
  }, [query]);

  const handleActiveCategory = (index, name, id) => {
    dispatch(saveCategoryName(name));
    dispatch(saveCategoryId(id));
    Router.push({
      pathname: "/",
      query: {
        cid: id,
        category: name,
      },
    });
  };

  const handleAllCategory = () => {
    dispatch(saveCategoryName(null));
    dispatch(saveCategoryId(null));
    Router.push({
      pathname: "/",
    });
  };

  const handleLikedShow = () => {
    dispatch(saveCategoryName("likes"));
    // dispatch(saveCategoryId(null));
  };

  const showCategoryList = () => {
    if (Object.keys(category).length != 0) {
      return (
        <>
          {auth?.isLoggedIn && (
            <>
              <div className="category-like like">
                <button
                  className={`flex justify-center flex-center Like ${
                    category.categoryName === "likes" && `Liked`
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLikedShow();
                  }}
                >
                  <span>
                    <IconLike />
                  </span>
                </button>
              </div>
            </>
          )}

          <div className="category-list">
            <button
              className={!!category.categoryName ? "title" : "title active"}
              onClick={(e) => {
                e.preventDefault();
                handleAllCategory();
              }}
            >
              {categoryConstant.homeTag}
            </button>
          </div>
          {category?.categories?.map((res, index) => (
            <div
              className="category-list"
              key={res.categoryId || `${index}-category`}
            >
              <button
                className={
                  category.categoryName === res?.categorySlug
                    ? "title active"
                    : "title"
                }
                onClick={(e) => {
                  e.preventDefault();
                  handleActiveCategory(
                    index,
                    res?.categorySlug,
                    res?.categoryId
                  );
                }}
              >
                {stringFormatter(res?.name)}
              </button>
            </div>
          ))}
        </>
      );
    }
  };

  const handleGoToSeeAll = () => {
    Router.push({
      pathname: categoryConstant.url.path,
      query: {
        page: categoryConstant.url.page,
        category: "",
        subCategory: "all",
      },
    });
  };

  const handleToGoHome = () => {
    window.location.href = "/";
  };

  const showSubCatHead = () => {
    if (!!seeAllHeading) {
      return (
        <>
          <div
            className="edit-back"
            onClick={(e) => {
              e.preventDefault();
              handleToGoHome();
            }}
          >
            <IconBack />
          </div>
          &nbsp;&nbsp;&nbsp;
          <h3 className="title">{stringFormatter(seeAllHeading)}</h3>
        </>
      );
    } else {
      return (
        <>
          <h3 className="title">{categoryConstant.headingTag}</h3>
        </>
      );
    }
  };

  return (
    <section className="category-wrapper">
      <div className="inner-container">
        <div className="title-wrap flex space-between flex-center">
          <div className="flex flex-center">
            <section className="breadcrumbs-wrapper">
              <ul className="breadcrumbs flex flex-center">
                {showSubCatHead()}
              </ul>
            </section>
          </div>
          <div
            className="seeAll"
            onClick={(e) => {
              e.preventDefault();
              handleGoToSeeAll();
            }}
          >
            <a className="flex flex-center">{categoryConstant.viewTag}</a>
          </div>
        </div>
      </div>
      <div className="overflow-wrap">
        <div className="Category-list-wrap inner-container flex">
          {showCategoryList()}
        </div>
      </div>
    </section>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(memo(Category));
