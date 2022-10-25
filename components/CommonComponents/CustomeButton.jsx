import React from "react";
import { useRouter } from "next/router";
import IconBack from "../Icons/IconBack";

// Custome Button is common component for all pages.
const CustomeButton = ({ name, type }) => {
  const router = useRouter();
  return (
    <>
      <button className="primary-btn" type={type}>
        {name}
      </button>
    </>
  );
};
export default CustomeButton;
// =================================================
