import React, { useState, useEffect, memo } from "react";
import { connect } from "react-redux";
import { catSubStreamDetailApi } from "../../../../api/stream/subStreamDetail";
import CategoryStream from "../Electronic";

function Vertical({ category, showLoginModal }) {
  const [subCategories, setSubCategories] = useState([]);
  const [data, setData] = useState({});
  const [page, setPage] = useState(0);
  const [catId, setCatId] = useState(null);
  const [loader, setLoader] = useState({});
  const [apiCount, setApiCount] = useState(0);
  const [seeMoreLoader, setSeeMoreLoader] = useState(true);

  useEffect(() => {
    if (category?.categoryName) {
      setApiCount(0);
      setData({});
      const data = { ...loader };
      data[category?.categoryId] = false;
      setLoader(true);
    }
    if (category?.categories?.length) {
      const catData = category?.categories.find(
        (obj) => obj.categoryId === parseInt(category?.categoryId)
      );
      setSubCategories(catData?.children);
    }
  }, [category]);

  useEffect(() => {
    const catLength = subCategories?.length;
    if (apiCount < catLength) {
      catSubStreamDetailApi(
        setData,
        page,
        subCategories[apiCount]?.categoryId,
        data,
        setLoader,
        setApiCount,
        setSubCategories,
        setSeeMoreLoader
      );
    }
  }, [apiCount, subCategories]);

  useEffect(() => {
    if (!!catId) {
      setSeeMoreLoader(true);
      catSubStreamDetailApi(
        setData,
        page,
        catId,
        data,
        setLoader,
        setApiCount,
        setSubCategories,
        setSeeMoreLoader
      );
    }
  }, [page]);

  const showCardDetail = () => {
    if (subCategories) {
      return subCategories.map((item) => {
        return (
          <React.Fragment key={`vertical-${item?.categoryId}`}>
            <CategoryStream
              catData={data}
              showLoginModal={showLoginModal}
              catName={item?.name}
              catSlug={item?.categorySlug}
              catId={item?.categoryId}
              loader={loader}
              setPage={setPage}
              page={page}
              setCatId={setCatId}
              seeMoreLoader={seeMoreLoader}
            />
          </React.Fragment>
        );
      });
    }
  };

  return <div className="home-container">{showCardDetail()}</div>;
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(memo(Vertical));
