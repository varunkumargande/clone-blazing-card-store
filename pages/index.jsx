<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import Header from "../components/partials/LandingPage/Header";
import MobileHeader from "../components/partials/LandingPage/MobileHeader";
=======
import React,{useState,useEffect} from "react";
import Header from "../components/shared/headers/modules/Header";
import MobileHeader from "../components/shared/headers/MobileHeader";
>>>>>>> pre-dev
import Category from "../components/partials/LandingPage/Category";
import LiveShow from "../components/partials/LandingPage/LiveShow";
import ScheduledShow from "../components/partials/LandingPage/ScheduledShow";
import Footer from "../components/partials/LandingPage/Footer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { categoryApi } from "../api/category/category";
import Electronic from "../components/partials/LandingPage/Electronic";
<<<<<<< HEAD
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
      </div>
      <Footer />
    </div>
  );
}
=======
import { connect } from 'react-redux';
import HeaderDefault from '../components/shared/headers/HeaderDefault';

function landingpage(props){

    const [windowWidth, setWindowWidth] = useState(0);
    let resizeWindow = () => {
      setWindowWidth(window.innerWidth);
    };
    const categories = useSelector((state)=>state?.category?.categories)
    const dispatch = useDispatch();

  

    useEffect(() => {
      resizeWindow();
      window.addEventListener("resize", resizeWindow);
      return () => window.removeEventListener("resize", resizeWindow);
    }, []);

    useEffect(()=>{
      
      categoryApi(dispatch);
    },[])


    const getCatStream=()=>{
      return categories?.map((cat)=>{
        return <div className="card-wrapper">
        <Electronic name={cat?.name} catId={cat?.categoryId}/>
    </div>
      })
    }


    return(
        <div className="home-container">
            {windowWidth <= 1024 ? <MobileHeader/> : <HeaderDefault />}
            <Category />
            <div className="card-wrapper">
                <LiveShow />
                <ScheduledShow />
                {/* <Electronic />
                <Jewellery /> */}
                 {getCatStream()}
            </div>
           
            <Footer />
        </div>
    );
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(landingpage);
>>>>>>> pre-dev
