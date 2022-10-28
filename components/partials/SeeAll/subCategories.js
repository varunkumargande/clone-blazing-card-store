import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, connect } from "react-redux";
import Router from "next/router";
import { saveSubCategoryName } from "../../../store/category/action";

function SeeAllSubCategories({ catIndex, category }) {
  const dispatch = useDispatch();
  const { query } = useRouter();
  const [queryCategory, setQueryCategory] = useState(null);

  useEffect(() => {
    if (Object.keys(query).length && query?.category) {
      setQueryCategory(query?.category);
    }
  }, [query]);

  const handleSubCategorySelect = (name, id) => {
    dispatch(saveSubCategoryName(name));
    Router.push({
      pathname: "/see-all",
      query: {
        page: query.page,
        category: category?.categoryName,
        subCategory: name,
      },
    });
  };

  const getAllSubCategoriesCard = () => {
    if (!!category?.categories) {
      console.log(category?.categories[catIndex]?.children);
      return category?.categories[catIndex]?.children?.map((item) => {
        // if (element.name === queryCategory) {
        return (
          <div className="category-list">
            <button
              className={
                category?.subCategoryName === item.name
                  ? "title active"
                  : "title"
              }
              onClick={() =>
                handleSubCategorySelect(item.name, item.categoryId)
              }
            >
              {item.name}
            </button>
          </div>
        );
        // }
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
