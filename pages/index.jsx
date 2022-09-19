import React, { useState, useEffect } from "react";
import Header from "../components/partials/LandingPage/Header";
import MobileHeader from "../components/partials/LandingPage/MobileHeader";
import Category from "../components/partials/LandingPage/Category";
import LiveShow from "../components/partials/LandingPage/LiveShow";
import ScheduledShow from "../components/partials/LandingPage/ScheduledShow";
import Jewellery from "../components/partials/LandingPage/Jewellery";
import Footer from "../components/partials/LandingPage/Footer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { categoryApi } from "../api/category/category";
import Electronic from "../components/partials/LandingPage/Electronic";
import { element } from "prop-types";

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

  useEffect(() => {
    categoryApi(dispatch);
  }, []);

  // const getCatStream=()=>{
  //   return categories?.map((cat)=>{
  //     return <div className="card-wrapper">
  //     <LiveShow name={cat?.name} catId={cat?.categoryId}/>
  // </div>
  //   })
  // }
  if (categories) {
    console.log("landing page categories", categories);
  }

  const getAllCategoriesCard = () => {
    if (categories) {
      const categoriesData = Object.entries(categories);
      return categoriesData.map((element) => {
        return <Electronic categoryData={element} />;
      });
    }
  };

  return (
    <div className="home-container">
      {windowWidth <= 1024 ? <MobileHeader /> : <Header />}
      <Category />
      <div className="card-wrapper">
        <LiveShow />
        <ScheduledShow />
        {getAllCategoriesCard()}
        {/* <Electronic /> */}
        {/* <Jewellery /> */}
      </div>
      {/* {getCatStream()} */}
      <Footer />
    </div>
  );
}
