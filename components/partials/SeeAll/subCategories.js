import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, connect } from "react-redux";
import Router from "next/router";
import {
  saveSubCategoryName,
  saveCategoryName,
} from "../../../store/category/action";
import { getStreamSubCategoryBasedApi } from "../../../api/stream/subStreamDetail";

function SeeAllSubCategories({ catIndex, category, setStreamData, setLoader }) {
  const dispatch = useDispatch();
  const { query } = useRouter();
  const [queryCategory, setQueryCategory] = useState(null);

  useEffect(() => {
    if (Object.keys(query).length && query?.category) {
      setQueryCategory(query);
      dispatch(saveCategoryName(query?.category));
      dispatch(saveSubCategoryName(query?.subCategory));
      getStreamSubCategoryBasedApi(
        query?.page,
        query?.category,
        query?.subCategory,
        setStreamData,
        setLoader
      );
    }
  }, [query]);

  const handleSubCategorySelect = (name, id) => {
    dispatch(saveSubCategoryName(name));
    Router.push({
      pathname: "/see-all",
      query: {
        page: queryCategory?.page,
        category: category?.categoryName,
        subCategory: name,
      },
    });
  };

  const getAllSubCategoriesCard = () => {
    if (!!category?.categories) {
      var index = category?.categories.map(function(e) { return e?.categorySlug; }).indexOf(category?.categoryName);
      return category?.categories[index]?.children?.map((item) => {
        return (
          <div className="category-list">
            <button
              className={
                category?.subCategoryName === item.categorySlug
                  ? "title active"
                  : "title"
              }
              onClick={() =>
                handleSubCategorySelect(item.categorySlug, item.categoryId)
              }
            >
              {item.name}
            </button>
          </div>
        );
      });
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
