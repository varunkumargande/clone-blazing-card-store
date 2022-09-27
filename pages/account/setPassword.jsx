import React from "react";
import SentMail from "../../components/partials/NewAccount/ResetPassword";
import ThemeChanger from "../../components/elements/color/themeControl";
import LeftPannel from "../../components/partials/NewAccount/LeftPannel";
import Head from 'next/head'

const SetPassword = () => {
  const breadCrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Register an account",
    },
  ];

  return (
    <div className="site-content">
      {/* <HeaderDefault />
            <HeaderMobile />
            <NavigationList /> */}
      <ThemeChanger />
      <div className="ps-page--my-account">
        <div className="ps-my-account">
          <Head>
            <title>Login</title>
          </Head>
          <main className="form-wrapper flex space-between">
            <div className="login-left flex justify-center text-center">
              <LeftPannel />
            </div>
            <div className="login-right flex justify-center">
              <SentMail />
            </div>
          </main>
        </div>

        {/* <FooterFullwidth /> */}
      </div>
    </div>
  );
};

export default SetPassword;
