import React from "react";

import Newsletters from "../../components/partials/commons/Newletters";
import FooterDefault from "../../components/shared/footers/FooterDefault";
import HeaderDefault from "../../components/shared/headers/HeaderDefault";
import BreadCrumb from "../../components/elements/BreadCrumb";
import Login from "../../components/partials/account/Login";
import HeaderMobile from "../../components/shared/headers/HeaderMobile";
import NavigationList from "../../components/shared/navigation/NavigationList";
import FooterFullwidth from "../../components/shared/footers/FooterFullwidth";
import ThemeChanger from "../../components/elements/color/themeControl";
import { useSelector } from "react-redux";
import { TostMessage } from "../../components/partials/ToastMessage/ToastMessage";
const LoginPage = () => {
  const toast = useSelector((state) => state?.toast?.toast);
  const breadCrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Login",
    },
  ];
  return (
    <div className="site-content">
      {/* <HeaderDefault />
            <HeaderMobile /> */}
      <ThemeChanger />
      {/* <NavigationList /> */}
      <div className="ps-page--my-account">
        <Login />
      </div>
      {!!toast.message && <TostMessage data={toast}></TostMessage>}
      {/* <FooterFullwidth /> */}
    </div>
  );
};

export default LoginPage;
