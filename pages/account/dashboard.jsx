import React, { useEffect, useState } from "react";
import HeaderDefault from "../../components/shared/headers/HeaderDefault";
import BreadCrumb from "../../components/elements/BreadCrumb";
import UserInformation from "../../components/partials/account/UserInformation";
import ThemeChanger from "../../components/elements/color/themeControl";
import useNetwork from "../../components/reusable/NetworkCheck";
import Router from "next/router";
import FooterFullwidth from "../../components/shared/footers/FooterFullwidth";
import MobileHeader from "../../components/shared/headers/MobileHeader";
import { useIsMobile } from "../../contexts/Devices/CurrentDevices";

const UserInformationPage = () => {
  const network = useNetwork();

  const { isMobile } = useIsMobile();

  useEffect(() => {
    if (network === false) {
      Router.push("/network-error");
    }
  }, []);

  const breadCrumb = [
    {
      text: "Account",
      url: "/",
    },
    {
      text: "Account Dashboard",
    },
  ];

  return (
    <div className="site-content">
      {isMobile ? <MobileHeader /> : <HeaderDefault />}
      <ThemeChanger />
      <div className="ps-page--my-account">
        <div style={{ backgroundColor: "#f1f1f1", padding: "16px" }}>
          <BreadCrumb breacrumb={breadCrumb} />
        </div>
        <UserInformation />
      </div>
      {/* <Newsletters layout="container" /> */}
      <FooterFullwidth />
    </div>
  );
};

export default UserInformationPage;
