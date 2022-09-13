import Link from "next/link";
//import {ConnectPlugin} from '../../../connectPlugins';
import React from "react";
import { useTranslation } from "../../../../i18n";

function SignINLINks() {
  const { t } = useTranslation("common");
<<<<<<< HEAD
  const [isLogin, setLogin] = React.useState(false)


  // React.useEffect(() => {
  //   if (sessionStorage.getItem("spurtToken") != null) {
  //     setLogin(true)
  //   } else {
  //     setLogin(false)
  //   }
  // }, [sessionStorage.getItem("spurtToken")])


  // const eventToVendorAdminPanel = () => {
  //   window.location.href = "http://localhost:40771/#/auth/login?uid="+sessionStorage.getItem("spurtToken")
  // }

  return (
    <>
      <ul
        className="navigation__extra"
        style={{ display: "flex", width: "192px" }}
      >
        <li style={{ padding: "0", margin: "0" }}>
          <Link href="/account/login">
            <a style={{ padding: "0 4px", color: "#fff" }}>
              {t("Shared.SignIn")}
            </a>
          </Link>
        </li>
        <li style={{ padding: "0", margin: "0" }}>
          <Link href="/account/register">
            <a style={{ padding: "0 4px", color: "#fff" }}>
              {t("Shared.SignUp")}
            </a>
          </Link>
        </li>
{/*         
        <li style={{ padding: "0", margin: "0" }}>
          <div onClick={eventToVendorAdminPanel}>
            <a style={{ padding: "0 4px", color: "#fff" }}>
              seller
            </a>
          </div>
        </li> */}
         


      </ul>
=======

  return (
    <>
      <a className="btn" href="/account/login">
        Start Selling
      </a>
      <a className="btn" href="/account/login" target="_blank">
        Sign In
      </a>
      <a className="btn" href="/account/register" target="_blank">
        Sign Up
      </a>
>>>>>>> pre-dev
    </>
  );
}
export default SignINLINks;
