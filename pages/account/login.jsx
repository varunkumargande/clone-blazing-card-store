import React from "react";
import Login from "../../components/partials/account/Login";
import ThemeChanger from "../../components/elements/color/themeControl";
import { useSelector } from "react-redux";
import { TostMessage } from "../../components/partials/ToastMessage/ToastMessage";

const LoginPage = () => {
  const toast = useSelector((state) => state?.toast?.toast);

  return (
    <div className="site-content">
      <ThemeChanger />
      <div className="ps-page--my-account">
        <Login />
      </div>
      {!!toast.message && <TostMessage data={toast}></TostMessage>}
    </div>
  );
};

export default LoginPage;
