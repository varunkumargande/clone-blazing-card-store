import Link from "next/link";
//import {ConnectPlugin} from '../../../connectPlugins';
import React from "react";
import { useTranslation } from "../../../../i18n";

function SignINLINks() {
  const { t } = useTranslation("common");

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
    </>
  );
}
export default SignINLINks;
