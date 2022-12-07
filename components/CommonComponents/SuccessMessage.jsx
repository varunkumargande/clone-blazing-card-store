import React from "react";
import { useRouter } from "next/router";
import IconBack from "../Icons/IconBack";
import Styles from "../../modular_scss/Signup.module.scss";

// Error Message is common component for all forms error messages
const SuccessMessage = ({ message, status }) => {
  return (
    <span className={status ? Styles.success_message : "errorMessage"}>
      {message}
    </span>
  );
};
export default SuccessMessage;
// ===============================================================
