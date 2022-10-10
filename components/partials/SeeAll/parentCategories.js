import { useState, useEffect } from "react";
import Router from "next/router";
import { stringFormatter } from "../../../utilities/utils";
import { useRouter } from "next/router";

export default function SeeAllParentCategories({
  categories,
  setActiveCategory,
  setActiveCategoryId,
  activeCategoryId
}) {
  const { query } = useRouter();
  const [queryState, setQueryState] = useState(null)

  const handleSelectCategory = (name, id) => {
    setActiveCategory(name);
    setActiveCategoryId(id);
    Router.push({
      pathname: "/see-all",
      query: {
        category: id,
      },
    });
  };

  useEffect(() => {
    if(Object.keys(query).length != 0){
        setQueryState(query?.category)
    }
    
    if(Object.keys(query).length == 0) {
        
        Router.push({
            pathname: "/see-all",
            query: {
              category: activeCategoryId,
            },
          });
    }
  }, [query, categories]);

  const getAllCategoriesCard = () => {
    if (categories) {
      return categories.map((element) => {
        return (
          <li
            className={parseInt(queryState) === element?.categoryId ? "active" : ""}
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
