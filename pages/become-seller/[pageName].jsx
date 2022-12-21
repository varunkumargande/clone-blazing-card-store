import React, { useEffect } from "react";
import HeaderDefault from "../../components/shared/headers/HeaderDefault";
import LeftPannel from "../../components/partials/sellerSteps/LeftPannel";
import ImportantGuidelines from "../../components/partials/sellerSteps/ImportantGuidelines";
import BasicDetails from "../../components/partials/sellerSteps/BasicDetails";
import PaymentDetails from "../../components/partials/sellerSteps/PaymentDetails";
import ShippingDetails from "../../components/partials/sellerSteps/ShippingDetails";
import ApplicationSubmitted from "../../components/partials/sellerSteps/ApplicationSubmitted";
import Footer from "../../components/partials/LandingPage/Footer";
import { useRouter } from "next/router";
import { useIsMobile } from "../../contexts/Devices/CurrentDevices";
import BackButton from "../../components/CommonComponents/BackButton";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { getBecomeSellerInfo } from "../../store/becomeSeller/action";
import { useDispatch } from "react-redux";

export default function Steps() {
  const { isMobile } = useIsMobile();
  const { isLoggedIn } = useIsLoggedIn();
  const dispatch = useDispatch();

  const route = useRouter();
  let { pageName } = route.query;

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getBecomeSellerInfo());
    }
  }, [isLoggedIn]);

  const getComponent = () => {
    switch (pageName) {
      case "basicDetails":
        return <BasicDetails />;
      case "paymentDetails":
        return <PaymentDetails />;
      case "guidelines":
        return <ImportantGuidelines />;
      case "shippingDetails":
        return <ShippingDetails />;
      case "submitted":
        return <ApplicationSubmitted />;
      default:
        return <ImportantGuidelines />;
    }
  };

  return (
    <>
      {isMobile ? "" : <HeaderDefault />}
      <section className="steps-wrapper flex">
        <div className="step-left">
          {isMobile ? <div className="header-title"><BackButton name={"Become a Seller"} /></div> : ""}
          <LeftPannel />
        </div>
        <div className="step-right">{getComponent()}</div>
      </section>
      <Footer />
    </>
  );
}
