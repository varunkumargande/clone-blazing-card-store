import React, { useState, useEffect, useRef } from "react";
import HeaderDefault from "../../components/shared/headers/HeaderDefault";
import MobileHeader from "../../components/partials/LandingPage/MobileHeader";
import IconEye from "../../components/Icons/IconEye";
import IconLike from "../../components/Icons/IconLike";
import IconDropdown from "../../components/Icons/IconDropdown";
import Footer from "../../components/partials/LandingPage/Footer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { subcatstreamDetailApi } from "../../api/stream/subStreamDetail";
import { connect } from "react-redux";
import { categoryApi } from "../../api/category/category";
import SeeAllParentCategories from "../../components/partials/SeeAll/parentCategories";
import SeeAllSubCategories from "../../components/partials/SeeAll/subCategories";
import StreamCard from "../../components/elements/StreamCard";
import Router from "next/router";

function categoryStream({ auth }) {
  const [active, setActive] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubCategoryId, setActiveSubCategoryId] = useState(null);
  const [activeSubCategory, setActiveSubCategory] = useState("all");

  const wrapperRef = useRef(null);
  const handleOnClick = () => {
    setActive(!active);
  };
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

  const dispatch = useDispatch();
  const categories = useSelector((state) => state?.category?.categories);
  const streamDetail = useSelector(
    (state) => state?.stream?.streamdetails?.category
  );
  useEffect(() => {
    subcatstreamDetailApi(dispatch);
  }, []);
  useEffect(() => {
    categoryApi(dispatch);
  }, []);

  useEffect(() => {
    if (!!categories) {
      setActiveCategory(categories[0]?.name);
    }
  }, [categories]);

  const getStreamCards = () => {
    if (activeCategory != null) {
      return streamDetail?.[activeCategory].map((detail) => {
        if (detail?.subCategory_id == parseInt(activeSubCategoryId)) {
          return <StreamCard isLive={false} detail={detail} />;
        }
        if (!activeSubCategoryId) {
          return <StreamCard isLive={false} detail={detail} />;
        }
      });
    }
  };

  const handleShowParentCategories = () => {
    if (!!categories) {
      return (
        <SeeAllParentCategories
          categories={categories}
          setActiveCategory={setActiveCategory}
          activeCategory={activeCategory}
          setActiveSubCategory={setActiveSubCategory}
        />
      );
    }
  };

  const handleShowSubCategories = () => {
    if (!!categories) {
      return (
        <SeeAllSubCategories
          categories={categories}
          activeCategory={activeCategory}
          setActiveSubCategory={setActiveSubCategory}
          activeSubCategory={activeSubCategory}
          setActiveSubCategoryId={setActiveSubCategoryId}
        />
      );
    }
  };

  const handleToGoHome = () => {
    Router.push("/");
  };

  return (
    <div className="home-container">
      {windowWidth <= 1024 ? <MobileHeader /> : <HeaderDefault />}
      <section className="breadcrumbs-wrapper">
        <div className="inner-container">
          <ul className="breadcrumbs flex flex-center">
            <li onClick={() => handleToGoHome()}>Home</li>/
            <li className="current">All Categories</li>
          </ul>
        </div>
      </section>
      <section className="category-wrapper">
        <div className="inner-container">
          <div className="title-wrap flex space-between flex-center">
            <div className="flex flex-center">
              <h3 className="title">All Categories</h3>
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
