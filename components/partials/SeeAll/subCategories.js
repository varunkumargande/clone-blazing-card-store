import { useState, useEffect } from "react";
import Router from "next/router";

export default function SeeAllSubCategories({
  categories,
  activeCategory,
  setActiveSubCategory,
  activeSubCategory,
  setActiveSubCategoryId
}) {
  const handleSubCategorySelect = (name, id) => {
    setActiveSubCategory(name)
    setActiveSubCategoryId(id)
  };

  const getAllSubCategoriesCard = () => {
    if (!!categories) {
      return categories.map((element) => {
        console.log(activeCategory)
        if (element.name === activeCategory) {
          console.log(element)
          return element?.children.map((item) => {
            return (
              <>
                <div className="category-list">
                  <button className=
                  {activeSubCategory === item.name ? "title active" : "title"}
                  onClick={() => handleSubCategorySelect(item.name, item.categoryId)}
                  >{item.name}</button>
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
              <button 
              className={activeSubCategory === "all" ? "title active" : "title"}
              onClick={() => handleSubCategorySelect("all")}
              >All</button>
            </div>
            {getAllSubCategoriesCard()}
          </div>
        </div>
      </section>
    </>
  );
}
