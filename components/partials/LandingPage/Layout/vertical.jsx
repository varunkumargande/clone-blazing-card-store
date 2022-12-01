import { useRouter } from "next/router";
import React, { useState, useEffect, memo } from "react";
import { connect } from "react-redux";
import { catSubStreamDetailApi } from "../../../../api/stream/subStreamDetail";
import CategoryStream from "../Electronic";

function Vertical({ category, showLoginModal }) {
  const { query } = useRouter();
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
      setLoader({});
    }
    if (category?.categories?.length) {
      const catData = category?.categories.find(
        (obj) => obj.categoryId === parseInt(category?.categoryId)
      );
      setSubCategories(catData?.children);
    }
  }, [category?.categoryName, category?.categories?.length]);

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
        setSeeMoreLoader,
        false
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
        setSeeMoreLoader,
        true
      );
    }
  }, [page]);

  const showCardDetail = () => {
    if (subCategories) {
      return subCategories
        .filter((item) => {
          if (
            !loader[item?.categoryId] ||
            data[item?.categoryId]?.data?.length
          ) {
            return item;
          }
        })
        .map((item) => {
          return (
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
              key={`vertical-${item?.categoryId}`}
            />
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
