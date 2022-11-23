import React from "react";
import { useRouter } from "next/router";
import IconBack from "../Icons/IconBack";

// Error Message is common component for all forms error messages
const ErrorMessage = ({ errors, touched }) => {
  return (
    <>
      <span className="errorMessage">{errors && touched && errors}</span>
    </>
  );
};
export default ErrorMessage;
// ===============================================================
