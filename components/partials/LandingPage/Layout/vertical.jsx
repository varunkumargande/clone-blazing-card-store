import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { catSubStreamDetailApi } from "../../../../api/stream/subStreamDetail";
import CategoryStream from "../Electronic";

function Vertical({ category, showLoginModal }) {
  const [categories, setCategories] = useState(null);
  useEffect(() => {
    catSubStreamDetailApi(setCategories, category?.categoryId);
  }, [category?.categoryName]);

  const handleCardDetail = () => {
    if (categories) {
      const categoriesData = Object.entries(categories);
      return categoriesData.map((element) => {
        return (
          <CategoryStream
            showLoginModal={showLoginModal}
            categoryData={element}
          />
        );
      });
    }
  };

  return <div className="home-container">{handleCardDetail()}</div>;
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Vertical);
