import React from "react";
import { useRouter } from "next/router";
import IconBack from "../Icons/IconBack";

const ErrorMessage = ({ errors, touched }) => {
  return (
    <>
      <span className="errorMessage">
        {errors && touched ? errors : null}
      </span>
    </>
  );
};
export default ErrorMessage;
