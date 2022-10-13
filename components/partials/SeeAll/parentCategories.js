import { useState, useEffect } from "react";
import Router from "next/router";
import { stringFormatter } from "../../../utilities/utils";
import { useRouter } from "next/router";

export default function SeeAllParentCategories({
  categories,
  setActiveCategory,
  activeCategoryId,
  setActiveSubCategory
}) {
  const { query } = useRouter();
  const [queryState, setQueryState] = useState(null);

  const handleSelectCategory = (name, id) => {
    setActiveCategory(name);
    setActiveSubCategory("all")
    Router.push({
      pathname: "/see-all",
      query: {
        category: name,
      },
    });
  };

  useEffect(() => {
    if (Object.keys(query).length != 0 && query?.category != "") {
      setQueryState(query?.category);
    } else {
      Router.push({
        pathname: "/see-all",
        query: {
          category: categories[0]?.name,
        },
      });
    }
  }, [query]);

  const getAllCategoriesCard = () => {
    if (categories) {
      return categories.map((element) => {
        return (
          <li
            className={queryState === element?.name ? "active" : ""}
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
