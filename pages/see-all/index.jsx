import React, { useState, useEffect, useRef } from "react";
import HeaderDefault from "../../components/shared/headers/HeaderDefault";
import IconBack from "../../components/Icons/IconBack";
import Footer from "../../components/partials/LandingPage/Footer";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import SeeAllParentCategories from "../../components/partials/SeeAll/parentCategories";
import SeeAllSubCategories from "../../components/partials/SeeAll/subCategories";
import StreamCard from "../../components/elements/StreamCard";
import Router from "next/router";
import { useRouter } from "next/router";
import { stringFormatter } from "../../utilities/utils";
import {
  saveCategoryName,
  saveSubCategoryName,
  savePageType,
} from "../../store/category/action";
import { useIsMobile } from "../../contexts/Devices/CurrentDevices";
import StreamCardSkeleton from "../../skeleton/StreamCardSkeleton";
import SeeMoreLoader from "../../components/reusable/SeeMoreLoader";
import { limit } from "../../components/Constants";

function categoryStream({ auth, category }) {
  const dispatch = useDispatch();
  const { query } = useRouter();
  const { isMobile } = useIsMobile();
  const [active, setActive] = useState(false);
  const [subCatId, setSubCatId] = useState("all");
  const [catIndex, setCatIndex] = useState(null);
  const [streamData, setStreamData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loader, setLoader] = useState(true);
  const [loaderSeeMore, setSeeMoreLoader] = useState(true);
  const [offset, setOffset] = useState(0);

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

  useEffect(() => {
    if (Object.keys(query).length && query?.category) {
      dispatch(saveCategoryName(query?.category));
      dispatch(saveSubCategoryName(query?.subCategory));
      dispatch(savePageType(query?.page.replace(/\s/g, "")));
    } else {
      if (!!category?.categories) {
        dispatch(saveCategoryName(category?.categories[0]?.categorySlug));
        dispatch(saveSubCategoryName("all"));
        dispatch(savePageType("all category"));
      }
    }
  }, [query]);

  const getStreamCards = () => {
    if (streamData.length) {
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
          setLoader={setLoader}
          offset={offset}
          streamData={streamData}
          setOffset={setOffset}
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
          setLoader={setLoader}
          offset={offset}
          streamData={streamData}
          setOffset={setOffset}
          setSeeMoreLoader={setSeeMoreLoader}
        />
      );
    }
  };

  const handleToGoHome = () => {
    dispatch(saveCategoryName(null));
    dispatch(saveSubCategoryName("all"));
    Router.push({
      pathname: "/",
    });
  };

  /**
   *
   * @returns showing header title of pages
   */
  const showHeader = () => {
    if (query?.page == "scheduled") {
      return "Scheduled Shows";
    } else if (query?.page == "live") {
      return "Live Shows";
    } else {
      return <> {stringFormatter(query?.page)} </>;
    }
  };

  return (
    <div className="home-container">
      {isMobile ? "" : <HeaderDefault />}
      {isMobile ? (
        ""
      ) : (
        <section className="breadcrumbs-wrapper">
          <div className="inner-container">
            <ul className="breadcrumbs flex flex-center">
              <li onClick={() => handleToGoHome()}>Home</li>/
              <li className="current">{showHeader()}</li>
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
                {showHeader()}
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
                  {loader ? (
                    <StreamCardSkeleton
                      count={10}
                      name={`home-intrenal-page-${query?.category}-${query?.subCategory}`}
                    />
                  ) : (
                    getStreamCards()
                  )}
                  {loaderSeeMore && (
                    <StreamCardSkeleton
                      count={3}
                      name={`home-intrenal-page-${query?.category}-${query?.subCategory}`}
                    />
                  )}
                </div>
                <div>
                  {streamData?.length >= limit && (
                    <SeeMoreLoader setOffset={setOffset} offset={offset} />
                  )}
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
