import { useState, useEffect, memo } from "react";
import Router from "next/router";
import { stringFormatter } from "../../../utilities/utils";
import { useRouter } from "next/router";
import { useDispatch, connect } from "react-redux";
import {
  saveCategoryName,
  saveSubCategoryName,
  savePageType,
} from "../../../store/category/action";
import { getStreamCategoryBasedApi } from "../../../api/stream/subStreamDetail";
import CategoriesMobile from "../CategoiesMobile/CategoriesMobile";
import { useIsMobile } from "../../../contexts/Devices/CurrentDevices";

function SeeAllParentCategories({
  category,
  setCatIndex,
  setStreamData,
  setLoader,
  offset,
  setOffset,
  streamData,
  setSubCatId,
  setSeeMoreLoader,
}) {
  const dispatch = useDispatch();
  const { query } = useRouter();
  const { isMobile } = useIsMobile();

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
    setStreamData([]);
    setOffset(0);
  };

  useEffect(() => {
    if (Object.keys(query).length && query?.category) {
      dispatch(saveCategoryName(query?.category));
      dispatch(savePageType(query?.page));
    } else {
      Router.push({
        pathname: "/see-all",
        query: {
          page: query?.page,
          category: category?.categories[0]?.categorySlug,
          subCategory: category?.subCategoryName,
        },
      });
      setStreamData([]);
    }
  }, [query]);

  const getAllCategoriesCard = () => {
    if (category?.categories) {
      if (isMobile) {
        return (
          <CategoriesMobile
            category={category}
            handleSelectCategory={handleSelectCategory}
            setCatIndex={setCatIndex}
            setStreamData={setStreamData}
            setLoader={setLoader}
            offset={offset}
            streamData={streamData}
            setOffset={setOffset}
            setSubCatId={setSubCatId}
            setSeeMoreLoader={setSeeMoreLoader}
          />
        );
      } else {
        return category?.categories.map((element, index) => {
          return (
            <li
              key={element?.categorySlug}
              className={
                category?.categoryName === element?.categorySlug ? "active" : ""
              }
              onClick={(e) => {
                e.preventDefault();
                handleSelectCategory(element?.categorySlug, index);
              }}
            >
              {stringFormatter(element?.name)}
            </li>
          );
        });
      }
    }
  };

  return (
    <aside className="aside-wrapper">
      <ul className="aside-container text-capitalize">
        {getAllCategoriesCard()}
      </ul>
    </aside>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(memo(SeeAllParentCategories));
