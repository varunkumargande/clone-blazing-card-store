import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import IconCategoryDrop from "../../Icons/IconCategoryDrop";
import IconLike from "../../Icons/IconLike";
import { connect } from "react-redux";
import { stringFormatter } from "../../../utilities/utils";

function Category({
  isSeeAllCate,
  isSeeAll,
  subCateId,
  seeAllHeading,
  setSubCateId,
  category,
  setActiveCategoryName,
  activeCategoryName,
  activeCategoryIndex,
  setActiveCategoryIndex,
  activeCategory,
  setActiveCategory,
  setIsLikedShow,
  isLikedShow,
  auth,
}) {
  const [active, setActive] = useState(false);
  const [categoryName, setCategoryName] = useState([]);

  const wrapperRef = useRef(null);
  const handleOnClick = () => {
    setActive(!active);
  };
  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setActive(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleActiveCategory = (index, name, id) => {
    setActiveCategoryIndex(index);
    setActiveCategoryName(name);
    setActiveCategory(category["categories"][index]);
    setSubCateId(id);
    setIsLikedShow(false);
  };

  const handleAllCate = () => {
    setSubCateId("select");
    setActiveCategoryIndex(null);
    setIsLikedShow(false);
  };

  const handleLikedShow = () => {
    if (isLikedShow) {
      setIsLikedShow(false);
      setSubCateId(null);
      setActiveCategoryIndex(null);
    } else {
      setIsLikedShow(true);
      setSubCateId("liked");
      setActiveCategoryIndex(false);
    }
  };

  console.log(subCateId);

  const getCategoryList = () => {
    if (isSeeAll == true) {
      if (Object.keys(category).length != 0) {
        return (
          <>
            {auth?.isLoggedIn ? (
              <>
                <div className="category-like like">
                  <button
                    className={
                      subCateId === "liked"
                        ? "Like flex justify-center flex-center"
                        : "flex justify-center flex-center"
                    }
                    onClick={() => handleLikedShow()}
                  >
                    <IconLike />
                  </button>
                </div>
              </>
            ) : (
              ""
            )}
            <div className="category-list">
              <button
                className={
                  activeCategoryIndex === null ? "title active" : "title"
                }
                onClick={handleAllCate}
              >
                Explore
              </button>
            </div>
            {category["categories"].map((res, index) => {
              if (res.name === seeAllHeading) {
                if (res.length != 0) {
                  return (
                    <>
                      {res?.children?.map((item, index2) => {
                        return (
                          <>
                            <div className="category-list">
                              <button
                                className={
                                  activeCategoryIndex === index2
                                    ? "title active"
                                    : "title"
                                }
                                onClick={() =>
                                  handleActiveCategory(
                                    index2,
                                    item?.name,
                                    item?.categoryId
                                  )
                                }
                              >
                                {stringFormatter(item?.name)}
                              </button>
                            </div>
                          </>
                        );
                      })}
                    </>
                  );
                }
              }
            })}
          </>
        );
      }
    } else {
      if (Object.keys(category).length != 0) {
        return (
          <>
            {auth?.isLoggedIn ? (
              <>
                <div className="category-like like">
                  <button
                    className={
                      subCateId === "liked"
                        ? "Like Liked flex justify-center flex-center"
                        : "flex justify-center flex-center Like"
                    }
                    onClick={() => handleLikedShow()}
                  >
                    <IconLike />
                  </button>
                </div>
              </>
            ) : (
              ""
            )}

            <div className="category-list">
              <button
                className={
                  activeCategoryIndex === null ? "title active" : "title"
                }
                // onClick={() => setActiveCategoryIndex(null)}
                onClick={handleAllCate}
              >
                Explore
              </button>
            </div>
            {category["categories"]?.map((res, index) => (
              <>
                <div className="category-list">
                  <button
                    className={
                      activeCategoryIndex === index ? "title active" : "title"
                    }
                    onClick={() =>
                      handleActiveCategory(index, res?.name, res?.categoryId)
                    }
                  >
                    {stringFormatter(res?.name)}
                  </button>
                </div>
              </>
            ))}
          </>
        );
      }
    }
  };

  return (  
    <section className="category-wrapper">
      <div className="inner-container">
        <div className="title-wrap flex space-between flex-center">
          <div className="flex flex-center">
            <section className="breadcrumbs-wrapper">
              <ul className="breadcrumbs flex flex-center">
                <div className="flex flex-center">
                  <h3 className="title">Categories</h3>
                </div>
              </ul>
            </section>
            <div className="category-btn-wrap">
              {/* <button className="category-btn flex flex-center justify-center" onClick={handleOnClick} ref={wrapperRef}><IconCategoryDrop /></button>
                                <ul className={active ? "dropDown active" : "dropDown"} >
                                    <li className="active">Creator</li>
                                    <li>Athelete</li>
                                    <li>Artist</li>
                                </ul> */}
            </div>
          </div>
          <div className="seeAll">
            <Link href="/">
              <a className="flex flex-center">View All</a>
            </Link>
          </div>
        </div>
      </div>
      <div className="overflow-wrap">
        <div className="Category-list-wrap inner-container flex">
          {getCategoryList()}
        </div>
      </div>
    </section>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Category);
