import React from "react";
import MobileHeader from "../../components/partials/LandingPage/MobileHeader";
import Category from "../../components/partials/LandingPage/Category";
import LiveShow from "../../components/partials/LandingPage/LiveShow";
import Pokeman from "../../components/partials/LandingPage/Pokeman";
import Footer from "../../components/partials/LandingPage/Footer";
import { useSelector } from "react-redux";
import HeaderDefault from "../../components/shared/headers/HeaderDefault";
import { useIsMobile } from "../../contexts/Devices/CurrentDevices";

export default function landingpage() {
  const { isMobile } = useIsMobile();

  const categories = useSelector((state) => state?.category?.categories);

  const getCatStream = () => {
    return categories?.map((cat) => {
      return (
        <div className="card-wrapper">
          <LiveShow name={cat?.name} catId={cat?.categoryId} />
        </div>
      );
    });
  };

  return (
    <div className="home-container">
      {isMobile ? <MobileHeader /> : <HeaderDefault />}
      <Category />
      <div className="card-wrapper">
        {/* <LiveShow />
                <ScheduledShow />
                <Electronic />
                <Jewellery /> */}
        <Pokeman />
      </div>
      {/* {getCatStream()} */}
      <Footer />
    </div>
  );
}
