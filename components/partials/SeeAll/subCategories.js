import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function SeeAllSubCategories({
  categories,
  setActiveSubCategory,
  activeSubCategory,
  setActiveSubCategoryId
}) {
  const { query } = useRouter();
  const [queryCategory, setQueryCategory] = useState(null);
  useEffect(() => {
    if (Object.keys(query).length != 0 && query?.category != "") {
      setQueryCategory(query?.category);
    }
  }, [query]);

  const handleSubCategorySelect = (name, id) => {
    setActiveSubCategory(name)
    setActiveSubCategoryId(id)
  };

  const getAllSubCategoriesCard = () => {
    if (!!categories) {
      return categories.map((element) => {
        
        if (element.name === queryCategory) {
          
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
