import React, { useState, useEffect, useRef } from "react";
import HeaderDefault from "../../components/shared/headers/HeaderDefault";
import IconBack from "../../components/Icons/IconBack";
import Footer from "../../components/partials/LandingPage/Footer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  subcatstreamDetailApi,
  catStreamDetailApi,
  catSubStreamDetailApi,
} from "../../api/stream/subStreamDetail";
import { connect } from "react-redux";
import { categoryApi } from "../../api/category/category";
import SeeAllParentCategories from "../../components/partials/SeeAll/parentCategories";
import SeeAllSubCategories from "../../components/partials/SeeAll/subCategories";
import StreamCard from "../../components/elements/StreamCard";
import Router from "next/router";
import { useRouter } from "next/router";
import { stringFormatter } from "../../utilities/utils";
import {
  saveCategoryName,
  saveSubCategoryName,
} from "../../store/category/action";

function categoryStream({ auth, category }) {
  const dispatch = useDispatch();
  const { query } = useRouter();
  const [active, setActive] = useState(false);
  const [subCatId, setSubCatId] = useState("all");
  const [catIndex, setCatIndex] = useState(null);
  const [streamData, setStreamData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const wrapperRef = useRef(null);
  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setActive(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);
  const [windowWidth, setWindowWidth] = useState(0);
  let resizeWindow = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);
  useEffect(() => {
    categoryApi(dispatch);
    setCatIndex(0);
  }, []);

  useEffect(() => {
    if (Object.keys(query).length && query?.category) {
      dispatch(saveCategoryName(query?.category));
    } else {
      if (!!category?.categories) {
        dispatch(saveCategoryName(category?.categories[0]?.categorySlug));
      }
    }
  }, [query]);

  const getStreamCards = (pageType) => {
    if (!!streamData) {
      return streamData.map((item) => {
        return <StreamCard detail={item} showLoginModal={setShowModal} />;
      });
    }
  };

  const handleShowParentCategories = () => {
    if (!!category?.categories) {
      return (
        <SeeAllParentCategories
          setCatIndex={setCatIndex}
          setStreamData={setStreamData}
        />
      );
    }
  };

  const handleShowSubCategories = () => {
    if (!!category?.categories) {
      return (
        <SeeAllSubCategories
          catIndex={catIndex}
          setSubCatId={setSubCatId}
          setStreamData={setStreamData}
        />
      );
    }
  };

  const handleToGoHome = () => {
    dispatch(saveCategoryName(null));
    Router.push({
      pathname: "/",
    });
  };

  return (
    <div className="home-container">
      {windowWidth <= 1024 ? "" : <HeaderDefault />}
      {windowWidth <= 1024 ? (
        ""
      ) : (
        <section className="breadcrumbs-wrapper">
          <div className="inner-container">
            <ul className="breadcrumbs flex flex-center">
              <li onClick={() => handleToGoHome()}>Home</li>/
              <li className="current">{stringFormatter(query?.page)}</li>
            </ul>
          </div>
        </section>
      )}
      <section className="category-wrapper">
        <div className="inner-container">
          <div className="title-wrap see-all-back flex space-between flex-center">
            <div className="flex flex-center">
              <div className="edit-back" onClick={() => handleToGoHome()}>
                <IconBack />
              </div>
              &nbsp;&nbsp;&nbsp;{" "}
              <h3 className="title">
                {stringFormatter(query?.page)}
                {/* All Categories */}
              </h3>
            </div>
          </div>
        </div>
      </section>
      <div className="card-wrapper">
        <section className="Live-wrapper card-inner">
          <div className="inner-container">
            <div className="aside-content-wrap flex flex-start space-between">
              {handleShowParentCategories()}
              <div className="overflow-none">
                {handleShowSubCategories()}
                <div className="card-wrap flex inner-container">
                  {getStreamCards()}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(categoryStream);
