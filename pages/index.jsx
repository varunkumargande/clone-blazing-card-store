import React, { useState, useEffect } from "react";
import MobileHeader from "../components/shared/headers/MobileHeader";
import Category from "../components/partials/LandingPage/Category";
import LiveScheduleCategory from "../components/partials/LandingPage/LiveScheduleCategory";
import SeeAllList from "../components/partials/LandingPage/Layout/seeAllList";
import LiveShow from "../components/partials/LandingPage/LiveShow";
import ScheduledShow from "../components/partials/LandingPage/ScheduledShow";
import Footer from "../components/partials/LandingPage/Footer";
import { useSelector, useDispatch } from "react-redux";
import { categoryApi } from "../api/category/category";
import CategoryStream from "../components/partials/LandingPage/Electronic";
import LikedList from "../components/partials/LandingPage/Layout/LikedList";
import HeaderDefault from "../components/shared/headers/HeaderDefault";
import Vertical from "../components/partials/LandingPage/Layout/vertical";
import { getBecomeSellerInfo } from "../store/becomeSeller/action";
import { connect } from "react-redux";
import DynamicModal from "../components/CommonComponents/ModalWithDynamicTitle";
import {
  streamDetailApi,
  catStreamDetailApi,
  liveDetailApi,
} from "../api/stream/subStreamDetail";

function landingPage({ auth, category }) {
  const [windowWidth, setWindowWidth] = useState(0);
  let resizeWindow = () => {
    setWindowWidth(window.innerWidth);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    streamDetailApi(dispatch);
    liveDetailApi(dispatch);
    catStreamDetailApi(setCategories);
  }, []);

  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  // ========================= category for home page ==============================
  // const [activeCategoryName, setActiveCategoryName] = useState(null);

  const [subCateId, setSubCateId] = useState("select");
  const [categories, setCategories] = useState(null);
  const [isLikedShow, setIsLikedShow] = useState(false);
  // ===============================================================================

  // ========================= category for live and schedule page ==============================
  const [liveScheduleCategoryName, setLiveScheduleCategoryName] =
    useState(null);
  const [isLiveScheduleSeeAll, setIsLiveScheduleSeeAll] = useState(false);
  // ============================================================================================

  const [isSeeAll, setIsSeeAll] = useState(false);
  const [isSeeAllCate, setIsSeeAllCate] = useState(true);

  const [seeAllHeading, setSeeAllHeading] = useState(null);
  const [catStreamData, setCateStreamData] = useState(null);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    categoryApi(dispatch);
  }, []);

  useEffect(() => {
    dispatch(getBecomeSellerInfo());
  }, []);

  const streamLiveDetail = useSelector(
    (state) => state?.stream?.liveDetails
  )?.length;
  const streamSchDetail = useSelector(
    (state) => state?.stream?.streamdetails
  )?.length;

  const getAllCategoriesCard = () => {
    if (categories) {
      const categoriesData = Object.entries(categories);
      return categoriesData.map((element) => {
        return (
          <CategoryStream
            isSeeAll={isSeeAll}
            setIsSeeAllCate={setIsSeeAllCate}
            setSeeAllHeading={setSeeAllHeading}
            setIsSeeAll={setIsSeeAll}
            categoryData={element}
            isLikedShow={isLikedShow}
            setIsLikedShow={setIsLikedShow}
            showLoginModal={setShowModal}
          />
        );
      });
    }
  };

  const getAllLikedCard = () => {
    if (categories) {
      const categoriesData = Object.entries(categories);
      return (
        <LikedList
          isSeeAll={isSeeAll}
          setIsSeeAllCate={setIsSeeAllCate}
          setSeeAllHeading={setSeeAllHeading}
          setIsSeeAll={setIsSeeAll}
          isLikedShow={isLikedShow}
          categoriesData={categoriesData}
          setIsLikedShow={setIsLikedShow}
        />
      );
    }
  };

  return (
    <div className="home-container">
      {windowWidth <= 1024 ? <MobileHeader /> : <HeaderDefault />}
      {showModal && (
        <DynamicModal
          title="Signup to Join Blazing Cards"
          setShowModal={setShowModal}
        />
      )}
      {!!categories && (
        <>
          <Category
            seeAllHeading={seeAllHeading}
            setCateStreamData={setCateStreamData}
          />
        </>
      )}

      <div className="card-wrapper">
        {category.categoryName == "likes" ? (
          <>{getAllLikedCard()}</>
        ) : (
          <>
            {category.categoryName === null ? (
              <>
                {streamLiveDetail ? (
                  <LiveShow
                    setIsLiveScheduleSeeAll={setIsLiveScheduleSeeAll}
                    setSeeAllHeading={setSeeAllHeading}
                    setIsSeeAll={setIsSeeAll}
                    showLoginModal={setShowModal}
                    streamLiveDetail={streamLiveDetail}
                  />
                ): ""}
                {streamSchDetail ? (
                  <ScheduledShow
                    liveScheduleCategoryName={liveScheduleCategoryName}
                    // activeCategoryName={activeCategoryName}
                    setIsLiveScheduleSeeAll={setIsLiveScheduleSeeAll}
                    setSeeAllHeading={setSeeAllHeading}
                    setIsSeeAll={setIsSeeAll}
                    showLoginModal={setShowModal}
                    streamSchDetail={streamSchDetail}
                  />
                ):""}

                {getAllCategoriesCard()}
              </>
            ) : (
              <>
                {categories && (
                  <Vertical
                    subCateId={subCateId}
                    setSubCateId={setSubCateId}
                    data={categories}
                    catStreamData={catStreamData}
                    showLoginModal={setShowModal}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(landingPage);
