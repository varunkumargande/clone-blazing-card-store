import React, { useMemo, useEffect, useState } from "react";
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

export default function Steps() {
  const { isMobile } = useIsMobile();
  const [pageType, setPageType] = useState("");

  const route = useRouter();
  let { pid } = route.query;

  useEffect(() => {
    if (typeof window !== undefined) {
      setPageType(window.location.pathname.replace("/become-seller/", ""));
    }
  }, [typeof window, pid]);

  console.log(pageType, "hello varun");

  const getComponent = useMemo(() => {
    switch (pageType) {
      case "basicDetails" || "basicDetails/":
        return <BasicDetails />;
      case "paymentDetails" || "paymentDetails/":
        return <PaymentDetails />;
      case "guidelines" || "guidelines/":
        return <ImportantGuidelines />;
      case "shippingDetails" || "shippingDetails/":
        return <ShippingDetails />;
      case "submitted" || "submitted/":
        return <ApplicationSubmitted />;
      default:
        return <ImportantGuidelines />;
    }
  }, [pageType]);

  return (
    <>
      {isMobile ? "" : <HeaderDefault />}
      <section className="steps-wrapper flex">
        <div className="step-left">
          {isMobile ? (
            <div className="header-title">
              <BackButton name={"Become a Seller"} />
            </div>
          ) : (
            ""
          )}
          <LeftPannel />
        </div>
        {pageType && <div className="step-right">{getComponent}</div>}
      </section>
      <Footer />
    </>
  );
}