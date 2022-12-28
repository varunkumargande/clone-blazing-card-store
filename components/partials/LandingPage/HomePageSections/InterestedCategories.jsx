import React, { memo, useEffect, useState, useMemo } from "react";
import Router from "next/router";

import { getInterestsApi } from "../../../../api/home/categories";
import ShowSectionCards from "./ShowSectionCards";

import Styles from "../../../../modular_scss/InterestedCategories.module.scss";

function InterestedCategories({ showLoginModal }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getInterestsApi("interested", setCategories);
  }, []);

  return (
    <section>
      <div className="inner-container title-wrap">
        <h3 className="title text-capitalize mb-4">Categories you follow</h3>
        <div>
          {categories?.data?.data?.map((datum) => (
            <button
              key={`${datum.categoryId}-${datum?.type}-interested-home-page`}
              className={`btn text-capitalize ${Styles.category_btn} btn-outline-dark px-4 mr-3 mb-3`}
              onClick={(e) => {
                e.preventDefault();
                Router.push(
                  `/see-all?page=allCategory&category=${
                    datum?.categorySlug
                  }&subCategory=${
                    datum?.type === "category" ? "all" : datum?.subCategorySlug
                  }`
                );
              }}
            >
              {datum.name}
            </button>
          ))}
        </div>
      </div>
      {categories?.data?.data?.map((datum) => (
        <ShowSectionCards
          showLoginModal={showLoginModal}
          key={`${datum.categoryId}-${datum?.type}-interested-home-category`}
          section={datum}
        />
      ))}
    </section>
  );
}

export default memo(InterestedCategories);
