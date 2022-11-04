import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { catSubStreamDetailApi } from "../../../../api/stream/subStreamDetail";
import CategoryStream from "../Electronic";

function Vertical({ category, showLoginModal }) {

  const [subCategories, setSubCategories] = useState({});


  useEffect(() => {
    const catData = category?.categories.find(
      (obj) => obj.categoryId === parseInt(category?.categoryId)
    );
    setSubCategories(catData?.children)
    // catSubStreamDetailApi(setData, page, catData?.categoryId);
  }, [category]);

  console.log(subCategories)

  const handleCardVisisble = () => {
    if (total === limit) {
      return <> {showCardLoader(setPage, page, data)} </>;
    }
  };

  const handleCardDetail = () => {
    // if (data.length) {
    //   const categoriesData = Object.entries(categories);
    //   return categoriesData.map((element) => {
    //     return (
    //       <></>
    //       // <CategoryStream
    //       //   showLoginModal={showLoginModal}
    //       //   categoryData={element}
    //       //   apiCallBack={catSubStreamDetailApi}
    //       // />
    //     );
    //   });
    // }
  };

  return <div className="home-container">{handleCardDetail()}</div>;
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Vertical);
