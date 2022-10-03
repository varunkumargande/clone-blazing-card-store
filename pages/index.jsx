
import React, { useState, useEffect } from "react";
import MobileHeader from "../components/shared/headers/MobileHeader";
import Category from "../components/partials/LandingPage/Category";
import LiveScheduleCategory from "../components/partials/LandingPage/LiveScheduleCategory";
import SeeAllList from "../components/partials/LandingPage/Layout/seeAllList";
import LiveShow from "../components/partials/LandingPage/LiveShow";
import ScheduledShow from "../components/partials/LandingPage/ScheduledShow";
import Footer from "../components/partials/LandingPage/Footer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { categoryApi } from "../api/category/category";
import Electronic from "../components/partials/LandingPage/Electronic";
import HeaderDefault from "../components/shared/headers/HeaderDefault";
import Vertical from "../components/partials/LandingPage/Layout/vertical";

export default function landingpage() {
  const [windowWidth, setWindowWidth] = useState(0);
  let resizeWindow = () => {
    setWindowWidth(window.innerWidth);
  };
  const categories = useSelector(
    (state) => state?.stream?.streamdetails?.category
  );
  const dispatch = useDispatch();
  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

// ========================= category for home page ==============================
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(null)
  const [activeCategoryName, setActiveCategoryName] = useState()
  const [activeCategory, setActiveCategory] = useState([])
  const [subCateId, setSubCateId] = useState("select")
// ===============================================================================

// ========================= category for live and schedule page ==============================
const [liveScheduleCategoryName, setLiveScheduleCategoryName] = useState(null)
const [liveScheduleCategory, setLiveScheduleCategory] = useState()
const [isLiveScheduleSeeAll, setIsLiveScheduleSeeAll] = useState(false)
// ============================================================================================

  const [isSeeAll, setIsSeeAll] = useState(false)
  const [isSeeAllCate, setIsSeeAllCate] = useState(true)


  const [seeAllHeading, setSeeAllHeading] = useState(null)
  const [seeAllData, setSeeAllData] = useState(null)

  useEffect(() => {
    categoryApi(dispatch);
  }, []);

  const getAllCategoriesCard = () => {
    if (categories) {
      const categoriesData = Object.entries(categories);
      return categoriesData.map((element) => {
        return <Electronic isSeeAll={isSeeAll} setIsSeeAllCate={setIsSeeAllCate} setSeeAllHeading={setSeeAllHeading} setIsSeeAll={setIsSeeAll} categoryData={element} />;
      });
    }
  };

  return (
    <div className="home-container">
      {windowWidth <= 1024 ? <MobileHeader /> : <HeaderDefault />}

      {isLiveScheduleSeeAll ? (
        <>
          {categories != undefined ? (
            <>
              <LiveScheduleCategory setSubCateId={setSubCateId} subCateId={subCateId} activeCategory={activeCategory} setActiveCategory={setActiveCategory} category={categories} liveScheduleCategoryName={liveScheduleCategoryName} setLiveScheduleCategoryName={setLiveScheduleCategoryName} />
            </>
          ) : ""}
        </>
      ) : (
        <>
          {categories != undefined ? (
            <>
              <Category isSeeAllCate={isSeeAllCate} isSeeAll={isSeeAll} seeAllHeading={seeAllHeading} subCateId={subCateId} setSubCateId={setSubCateId} setActiveCategoryName={setActiveCategoryName} activeCategoryName={activeCategoryName} activeCategoryIndex={activeCategoryIndex} setActiveCategoryIndex={setActiveCategoryIndex} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
            </>
          ) : ""}

        </>
      )}

      <div className="card-wrapper">
        {isSeeAll ? (
          <>
            <SeeAllList setSubCateId={setSubCateId} liveScheduleCategoryName={liveScheduleCategoryName} setIsSeeAll={setIsSeeAll} data={categories} subCateId={subCateId} seeAllHeading={seeAllHeading} activeCategory={activeCategory} />
          </>
        ) : (
          <>
            {activeCategoryIndex == null ? (
              <>
                <LiveShow setIsLiveScheduleSeeAll={setIsLiveScheduleSeeAll} setSeeAllHeading={setSeeAllHeading} setIsSeeAll={setIsSeeAll} />
                <ScheduledShow liveScheduleCategoryName={liveScheduleCategoryName} activeCategoryName={activeCategoryName} setIsLiveScheduleSeeAll={setIsLiveScheduleSeeAll} setSeeAllHeading={setSeeAllHeading} setIsSeeAll={setIsSeeAll} />
                {getAllCategoriesCard()}
              </>
            ) : (
              <>
                {categories ? (
                  <>
                    <Vertical setIsSeeAllCate={setIsSeeAllCate} subCateId={subCateId} setSubCateId={setSubCateId} categoryName={activeCategoryName} data={categories} activeCategory={activeCategory} />
                  </>
                ) : ""}
              </>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
