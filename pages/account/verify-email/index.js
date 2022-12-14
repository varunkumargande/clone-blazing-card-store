import React from "react";
import IconEmailVerify from "../../../components/Icons/IconEmailVerify";
import IconGoogle from "../../../components/Icons/IconGoogle";
import IconCheckBlue from "../../../components/Icons/IconCheckBlue";
import Styles from "../../../modular_scss/verifyEmail.module.scss";
import GoogleLoginComponent from "../../../utilities/googleLogin";
import { useDispatch, useSelector } from "react-redux";
import { TostMessage } from "../../../components/partials/ToastMessage/ToastMessage";

/**
 *
 * @returns importing api for resed email verification link
 */
import { resendEmailVerfification } from "../../../api/auth/resendEmailVerifyApi";
// ************************************************************************************

const VerifyEmailAddress = () => {
  const toast = useSelector((state) => state?.toast?.toast);

  const dispatch = useDispatch();
  const showUserEmailAddress = () => {
    const emailId =
      typeof window !== "undefined"
        ? localStorage.getItem("verification-email")
        : null;

    return emailId;
  };

  const handleResendEmailVerificationLink = () => {
    resendEmailVerfification(dispatch);
  };

  return (
    <div className="email-wrapper text-center static-container">
      <div className="medium-container">
        <IconEmailVerify />
        <h4 className={`mb24 ${Styles.title}`}>
          Please verify your email address
        </h4>
        <div className={`mb24 ${Styles.info_text}`}>
          Get started with Blazing Cards! Continue with Google to verify
        </div>
        <div className={`mb24 ${Styles.email_text_size}`}>
          {showUserEmailAddress()}
        </div>
        <div
          className={`btn-wrap text-center mb32 flex justify-center ${Styles.signup_google_wrap}`}
        >
          <GoogleLoginComponent />
        </div>
        <div
          className={`or mb32 flex flex-center justify-center ${Styles.seperator}`}
        >
          <span className={`${Styles.fs_20}`}>Or</span>
        </div>
        <div
          className={`resend-text flex justify-center ${Styles.verify_text}`}
        >
          Check your email inbox for a verification email. Didn’t receive an
          email?{" "}
          <span
            className="link blue flex flex-center"
            onClick={
              ((e) => e.preventDefault(), handleResendEmailVerificationLink)
            }
          >
            <span className={`mx-2 flex ${Styles.icon_width}`}>
              {" "}
              <IconCheckBlue />
            </span>
            Resend Email
          </span>
        </div>
      </div>
      {!!toast.message && <TostMessage data={toast}></TostMessage>}
    </div>
  );
};

export default VerifyEmailAddress;
