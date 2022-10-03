import React, { useState, useEffect } from "react";
import MobileHeader from "../../components/partials/LandingPage/MobileHeader";
import HeaderDefault from "../../components/shared/headers/HeaderDefault";
import LeftPannel from "../../components/partials/sellerSteps/LeftPannel";
import ImportantGuidelines from "../../components/partials/sellerSteps/ImportantGuidelines";
import BasicDetails from "../../components/partials/sellerSteps/BasicDetails";
import PaymentDetails from "../../components/partials/sellerSteps/PaymentDetails";
import ShippingDetails from "../../components/partials/sellerSteps/ShippingDetails";
import ApplicationSubmitted from "../../components/partials/sellerSteps/ApplicationSubmitted";
import Footer from "../../components/partials/LandingPage/Footer";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { getBecomeSellerInfo } from "../../store/becomeSeller/action";
import { useSelector } from "react-redux";

export default function Steps() {
  const [windowWidth, setWindowWidth] = useState(0);
  const dispatch = useDispatch();
  const stage = useSelector((state) => state?.becomeSeller)

  let resizeWindow = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  useEffect(()=>{
    dispatch(getBecomeSellerInfo());
  }, [])

  const route = useRouter();
  let { pageName } = route.query;
  

  const getComponent = () => {
    switch (pageName) {
      case "basicDetails":
       return < BasicDetails />;
      case "paymentDetails":
       return < PaymentDetails />;
      case "guidelines":
       return < ImportantGuidelines />;
      case "shippingDetails":
       return < ShippingDetails />;
      case "applicationSubmitted":
       return < ApplicationSubmitted />;
      default:
        return < ImportantGuidelines />;
    }
  };

  return (
    <>
      {windowWidth <= 1024 ? <MobileHeader /> : <HeaderDefault />}
      <section className="steps-wrapper flex">
        <div className="step-left">
          <LeftPannel />
        </div>
        <div className="step-right">
          {getComponent()}
        </div>
      </section>
      <Footer />
    </>
  );
}
