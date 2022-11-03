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
import { catStreamDetailApi } from "../api/stream/subStreamDetail";

function landingPage({ auth, category }) {
  const [windowWidth, setWindowWidth] = useState(0);
  let resizeWindow = () => {
    setWindowWidth(window.innerWidth);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    categoryApi(dispatch);
    dispatch(getBecomeSellerInfo());
  }, []);

  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  // ========================= category for home page ==============================
  // const [activeCategoryName, setActiveCategoryName] = useState(null);
  const [subCateId, setSubCateId] = useState("select");
  const [categories, setCategories] = useState([]);
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

  const streamLiveDetail = useSelector(
    (state) => state?.stream?.liveDetails
  )?.length;
  const streamSchDetail = useSelector(
    (state) => state?.stream?.streamdetails
  )?.length;

  const [loader, setLoader] = useState(null);
  const [catIds, setCatIds] = useState(null);
  const [apiCount, setApiCount] = useState(0);
  const [catVisible, setCatVisible] = useState(true);
  const [data, setData] = useState({});
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(null);
  const [catId, setCatId] = useState(null);

  useEffect(() => {
    setCategories(category?.categories);
    const catObject = {};
    const catListIds = {};
    category?.categories?.map((data) => (catObject[data.categoryId] = false));
    category?.categories?.map(
      (data) => (catListIds[data.categorySlug] = data.categoryId)
    );
    setLoader(catObject);
    setCatIds(catListIds);
  }, [category?.categories]);

  useEffect(() => {
    const catLength = category?.categories?.length;
    if (apiCount < catLength) {
      catStreamDetailApi(
        setData,
        page,
        category?.categories[apiCount]?.categoryId,
        setApiCount,
        setLoader,
        data,
        setCategories
      );
    } else {
      setCatVisible(false);
    }
  }, [category?.categories, apiCount]);

  useEffect(() => {
    if (!!catId) {
      catStreamDetailApi(
        setData,
        page,
        catId,
        setApiCount,
        setLoader,
        data,
        setCategories
      );
    }
  }, [page]);

  const getAllCategoriesCard = () => {
    if (!!data && !!categories) {
      return categories.map((elem) => {
        return (
          <CategoryStream
            catData={data}
            showLoginModal={setShowModal}
            catName={elem?.name}
            catId={elem?.categoryId}
            loader={loader}
            setCategories={setCategories}
            categories={categories}
            catVisible={catVisible}
            setPage={setPage}
            page={page}
            setCatId={setCatId}
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
      <Category
        seeAllHeading={seeAllHeading}
        setCateStreamData={setCateStreamData}
      />
      <div className="card-wrapper">
        {category.categoryName == "likes" ? (
          <>{getAllLikedCard()}</>
        ) : (
          <>
            {category.categoryName === null ? (
              <>
                <LiveShow showLoginModal={setShowModal} />
                <ScheduledShow showLoginModal={setShowModal} />
                {getAllCategoriesCard()}
              </>
            ) : (
              <>
                <Vertical showLoginModal={setShowModal} />
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
