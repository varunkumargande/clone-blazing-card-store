import React from "react";
import { useRouter } from "next/router";
import IconBack from "../Icons/IconBack";

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
