import React, { useState, useEffect, memo } from "react";
import MobileHeader from "../components/shared/headers/MobileHeader";
import Category from "../components/partials/LandingPage/Category";
import LiveShow from "../components/partials/LandingPage/LiveShow";
import ScheduledShow from "../components/partials/LandingPage/ScheduledShow";
import Footer from "../components/partials/LandingPage/Footer";
import { useSelector, useDispatch } from "react-redux";
import CategoryStream from "../components/partials/LandingPage/Electronic";
import LikedList from "../components/partials/LandingPage/Layout/LikedList";
import HeaderDefault from "../components/shared/headers/HeaderDefault";
import Vertical from "../components/partials/LandingPage/Layout/vertical";
import { getBecomeSellerInfo } from "../store/becomeSeller/action";
import { connect } from "react-redux";
import { catStreamDetailApi } from "../api/stream/subStreamDetail";
import { useIsMobile } from "../contexts/Devices/CurrentDevices";
import { SignUPGoogle } from "../components/partials/Modal/Modal";

function landingPage({ category }) {
  const { isMobile } = useIsMobile();

  const dispatch = useDispatch();
  const [loader, setLoader] = useState(null);
  const [catIds, setCatIds] = useState(null);
  const [apiCount, setApiCount] = useState(0);
  const [catVisible, setCatVisible] = useState(true);
  const [data, setData] = useState({});
  const [page, setPage] = useState(0);
  const [catId, setCatId] = useState(null);
  const [fetch, setFetch] = useState(true);

  useEffect(() => {
    dispatch(getBecomeSellerInfo());
  }, []);

  // ========================= category for home page ==============================
  const [categories, setCategories] = useState([]);
  const [isLikedShow, setIsLikedShow] = useState(false);
  const [isSeeAll, setIsSeeAll] = useState(false);
  const [isSeeAllCate, setIsSeeAllCate] = useState(true);
  const [seeAllHeading, setSeeAllHeading] = useState(null);
  const [catStreamData, setCateStreamData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [seeMoreLoader,setSeeMoreLoader] = useState(true);

  const streamLiveDetail = useSelector(
    (state) => state?.stream?.liveDetails
  )?.length;
  const streamSchDetail = useSelector(
    (state) => state?.stream?.streamdetails
  )?.length;

  /**
   * appending category ids in object for handling home page
   */
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
    setApiCount(0);
    setFetch(true);
  }, [category?.categories]);
  /**
   * ==================================================================================
   */

  /**
   * fetching data from api for homepage streaming data based on categories
   */
  useEffect(() => {
    const catLength = category?.categories?.length;
    if ((apiCount < catLength || fetch) && catLength) {
      catStreamDetailApi(
        setData,
        page,
        category?.categories[apiCount]?.categoryId,
        setApiCount,
        setLoader,
        data,
        setCategories,
       setSeeMoreLoader
      );
      if (fetch) {
        setFetch(false);
      }
    }
  }, [category?.categories, apiCount]);
  /**
   * ==========================================================================
   */

  /**
   * fetching data from loaderall based on category
   */
  useEffect(() => {
    if (!!catId) {
     setSeeMoreLoader(true);
      catStreamDetailApi(
        setData,
        page,
        catId,
        setApiCount,
        setLoader,
        data,
        setCategories,
       setSeeMoreLoader
      );
    }
  }, [page]);
  /**
   * ===============================================
   */

  /**
   * showing stream data carousel based on categories
   */
  const getAllCategoriesCard = () => {
    if (!!data && !!categories) {
      return categories.map((elem) => (
        <CategoryStream
          key={elem?.name}
          catData={data}
          showLoginModal={setShowModal}
          catName={elem?.name}
          catSlug={elem?.categorySlug}
          catId={elem?.categoryId}
          loader={loader}
          setCategories={setCategories}
          categories={categories}
          catVisible={catVisible}
          setPage={setPage}
          page={page}
          setCatId={setCatId}
          seeMoreLoader={seeMoreLoader}
        />
      ));
    }
  };
  /**
   * ==================================================
   */

  const getAllLikedCard = () => {
    if (categories) {
      const categoriesData = Object.entries(categories);
      return (
        <LikedList
          setSeeAllHeading={setSeeAllHeading}
          setIsSeeAll={setIsSeeAll}
        />
      );
    }
  };

  return (
    <div className="home-container">
      {isMobile ? <MobileHeader /> : <HeaderDefault />}
      {showModal && (
        <SignUPGoogle
          customMsg={"Signup to Join Blazing Cards"}
          onDismiss={(e) => {
            e.preventDefault();
            setShowModal(false);
          }}
        />
      )}
      <Category
        seeAllHeading={seeAllHeading}
        setCateStreamData={setCateStreamData}
      />
      <div className="card-wrapper">
        {category.categoryName == "likes" ? (
          getAllLikedCard()
        ) : category.categoryName === null ? (
          <>
            <LiveShow showLoginModal={setShowModal} />
            <ScheduledShow showLoginModal={setShowModal} />
            {getAllCategoriesCard()}
          </>
        ) : (
          <Vertical showLoginModal={setShowModal} />
        )}
      </div>
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(memo(landingPage));
