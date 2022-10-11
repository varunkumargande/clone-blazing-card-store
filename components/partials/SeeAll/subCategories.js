import { useState, useEffect } from "react";
import Router from "next/router";

export default function SeeAllSubCategories({
  categories,
  activeCategory,
  setActiveSubCategory,
  activeSubCategory
}) {
  const handleSubCategorySelect = () => {};

  const getAllSubCategoriesCard = () => {
    if (categories) {
      return categories.map((element) => {
        if (element.name === activeCategory) {
          return element?.children.map((item) => {
            return (
              <>
                <div className="category-list">
                  <button className="title active">{item.name}</button>
                </div>
              </>
            );
          });
        }
      });
    }
  };

  return (
    <>
      <section className="category-wrapper cotegories-border mb35">
        <div className="overflow-wrap">
          <div className="Category-list-wrap inner-container flex">
            <div className="category-list">
              <button className="title active">All</button>
            </div>
            {getAllSubCategoriesCard()}
          </div>
        </div>
      </section>
    </>
  );
}
