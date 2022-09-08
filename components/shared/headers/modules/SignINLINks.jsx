import Link from "next/link";
//import {ConnectPlugin} from '../../../connectPlugins';
import React from "react";
import { useTranslation } from "../../../../i18n";

function SignINLINks() {
  const { t } = useTranslation("common");
  
  return (
    <>

<a className="btn" href="/account/login" >Start Selling</a>
<a className="btn" href="/account/login" target="_blank">Sign In</a>
<a className="btn" href="/account/register" target="_blank">Sign Up</a>
        
      {/* <ul
        className="navigation__extra"
        style={{ display: "flex", width: "192px" }}
      >
        
        <li style={{ padding: "0", margin: "0" }}>
        <button className="btn">
          <Link href="/account/login">
            <a style={{ padding: "0 4px", color: "#fff" }}>
              {t("Shared.SignIn")}
            </a>
          </Link>
          </button>
        </li>
        <li style={{ padding: "0", margin: "0" }}>
        <button className="btn">
          <Link href="/account/register">
            <a style={{ padding: "0 4px", color: "#fff" }}>
              {t("Shared.SignUp")}
            </a>
          </Link>
          </button>
        </li>
        <li style={{ padding: "0", margin: "0" }}>
        <button className="btn">
          <Link href="/vendor">
            <a style={{ padding: "0 4px", color: "#fff" }}>
              {t("Shared.Vendor")}
            </a>
          </Link>
          </button>
          
        </li>
      </ul> */}
    </>
  );
}
export default SignINLINks;
