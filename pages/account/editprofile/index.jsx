import React, { useState, useEffect } from "react";
import Header from "../../../components/partials/LandingPage/Header";
import HeaderDefault from "../../../components/shared/headers/HeaderDefault";
import MobileHeader from "../../../components/partials/LandingPage/MobileHeader";
import Footer from "../../../components/partials/LandingPage/Footer";
import { useSelector } from "react-redux";
import Link from "next/link";
import IconBack from "../../../components/Icons/IconBack";
import ProfileInformation from "../../../components/partials/EditProfile/ProfileInformation";
import ChangePassword from "../../../components/partials/EditProfile/ChangePassword";
import PaymentDetails from "../../../components/partials/EditProfile/PaymentDetail";
import ShippingInformation from "../../../components/partials/EditProfile/ShippingInformation";
import Router from "next/router";
import EditProfileTab from "../../../components/partials/EditProfile/EditProfileTab";
import BackButton from "../../../components/CommonComponents/BackButton";
import { useIsMobile } from "../../../contexts/Devices/CurrentDevices";
export default function categoryStream() {
  const [activeTab, setActiveTab] = useState("PROFILE");

  const [editProfileTab, setEditProfileTab] = useState([
    {
      type: "PROFILE",
      component: <ProfileInformation />,
    },
    {
      type: "PASSWORD",
      component: <ChangePassword />,
    },
    {
      type: "SHIPPING",
      component: <ShippingInformation />,
    },
    {
      type: "PAYMENT",
      component: <PaymentDetails />,
    },
  ]);

  const { isMobile } = useIsMobile();

  const streamDetail = useSelector(
    (state) => state?.stream?.streamdetails?.stream
  );

  useEffect(() => {
    if (sessionStorage.getItem("blazingUser") == null) {
      Router.push("/");
    }
  }, []);

  const handleEditProfiles = () => {
    return editProfileTab?.map((item, index) => {
      if (item.type === activeTab) {
        return item.component;
      }
    });
  };

  const handleToGoHome = () => {
    Router.push("/");
  };
  const handleToGoProfile = () => {
    Router.push("/account/myprofile");
  };
  return (
    <div className="Edit-profile">
      {isMobile ? null : <HeaderDefault />}

      <div className="edit-inner-container">
        <div className="edit-inner">
          {isMobile ? (
            ""
          ) : (
            <section className="breadcrumbs-wrapper mb32">
              <ul className="breadcrumbs flex flex-center">
                <li onClick={() => handleToGoHome()}>Home</li>/
                <li onClick={() => handleToGoProfile()}>Profile</li>/
                <li className="current">Edit Profile</li>
              </ul>
            </section>
          )}
          <div className="edit-profile-title">
            <BackButton name={"Edit Profile"} />
          </div>

          <EditProfileTab setActiveTab={setActiveTab} activeTab={activeTab} />

          {handleEditProfiles()}
        </div>
      </div>

      <Footer />
    </div>
  );
}
