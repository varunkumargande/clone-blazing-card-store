import Link from "next/link";
//import {ConnectPlugin} from '../../../connectPlugins';
import React from "react";
import { useTranslation } from "../../../../i18n";

function SignINLINks() {
  const { t } = useTranslation("common");
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
        <li style={{ padding: "0", margin: "0" }}>
          <Link href="/vendor">
            <a style={{ padding: "0 4px", color: "#fff" }}>
              {t("Shared.Vendor")}
            </a>
          </Link>
        </li>
      </ul>
    </>
  );
}
export default SignINLINks;
