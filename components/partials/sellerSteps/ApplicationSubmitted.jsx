import React from "react";
import IconBack from "../../Icons/IconBack";
import { useRouter } from "next/router";
import { useIsMobile } from "../../../contexts//Devices/CurrentDevices";
export default function ApplicationSubmitted() {
  const { isMobile } = useIsMobile();
  const router = useRouter();
  return (
    <div className="step-container">
      <h3>Application Submitted</h3>
      <div className="timer mb12">
        <img src="/static/images/timer.svg" alt="" />
      </div>
      <h4 className="mb16">Thank you for filling out the Application!</h4>
      <div className="sub-title">
        Please allow the Applications Team up to 2 weeks to review your
        Application.
      </div>
      {!isMobile && (
        <h6 className="flex flex-center backto-home">
          <div
            className="edit-back"
            onClick={(e) => {
              e.preventDefault();
              router.push("/");
            }}
          >
            <IconBack /> Back to home
          </div>
        </h6>
      )}
    </div>
  );
}
