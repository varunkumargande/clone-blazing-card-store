import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { catSubStreamDetailApi } from "../../../../api/stream/subStreamDetail";
import CategoryStream from "../Electronic";

function Vertical({ category, showLoginModal }) {
  useEffect(() => {
    catSubStreamDetailApi(setData, page, category?.categoryId);
  }, [category?.categoryName]);

  const [data, setData] = useState(null);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

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
