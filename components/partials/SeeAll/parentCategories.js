import { useState, useEffect } from "react";
import Router from "next/router";
import { stringFormatter } from "../../../utilities/utils";
import { useRouter } from "next/router";
import { useDispatch, connect } from "react-redux";
import { saveCategoryName, saveSubCategoryName } from "../../../store/category/action";

function SeeAllParentCategories({
  categories,
  category,
}) {
  const dispatch = useDispatch();
  const { query } = useRouter();

  const handleSelectCategory = (name, id) => {
    dispatch(saveCategoryName(name))
    dispatch(saveSubCategoryName("all"))
    Router.push({
      pathname: "/see-all",
      query: {
        page: query.page,
        category: name,
        subCategory: "all"
      },
    });
  };

  useEffect(() => {
    if (Object.keys(query).length != 0 && query?.category != "") {
      dispatch(saveCategoryName(query?.category))
    } else {
      Router.push({
        pathname: "/see-all",
        query: {
          page: query.page,
          category: categories[0]?.name,
          subCategory: category?.subCategoryName
        },
      });
    }
  }, [query]);

  const getAllCategoriesCard = () => {
    if (categories) {
      return categories.map((element) => {
        return (
          <li
            className={category?.categoryName === element?.name ? "active" : ""}
            onClick={() =>
              handleSelectCategory(element?.name, element?.categoryId)
            }
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