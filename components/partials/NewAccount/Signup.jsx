import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import IconGoogle from "../../Icons/IconGoogle";
import IconEye from "../../Icons/IconEye";
import IconBack from "../../Icons/IconBack";
import { UserRegister } from "../../../api";
import Router from "next/router";
import { connect, useDispatch } from "react-redux";
import { GoogleLoginApi } from "../../../api/auth/GoogleLoginApi";
import { registerConstant } from "../../Constants/auth";
import { Formik } from "formik";
import * as Yup from "yup";
import { getUsername } from "../../../api/auth/getUsername";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";
import { registerSchema } from "../../../utilities/validations/signupDetail";
import { registerInitialValues } from "../../../utilities/validations/signupDetail";
import { TextInput } from "../../CommonComponents/TextInput";
import ErrorMessage from "../../CommonComponents/ErrorMessage";
import MySelect from "../../CommonComponents/MySelect";
import Styles from "../../../modular_scss/Signup.module.scss";
import { openInNewTab } from "../../../utilities/utils";

function Signup(auth) {
  const dispatch = useDispatch();

  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const usernameInput = useRef();
  const [passShow, setPassShow] = useState(false);
  const [conpassShow, setConPassShow] = useState(false);
  const [policyCheck, setPolicyCheck] = useState(false);

  const FullNameInputRef = React.useRef(null);
  const router = useRouter();

  const handlePolicyCheck = () => {
    if (policyCheck) {
      setPolicyCheck(false);
    } else {
      setPolicyCheck(true);
    }
  };

  const responseGoogle = (response) => {
    GoogleLoginApi(
      response.given_name,
      response.family_name,
      response.email,
      "",
      "",
      response.email.split("@")[0],
      "gmail",
      "",
      "",
      "",
      "",
      response.picture,
      response,
      dispatch
    );
  };

  const responseGoogleFailure = (response) => {};

  const submitBtnState = (errors) =>
    Object.keys(errors).length > 0 || policyCheck === false
      ? "disable-btn"
      : "primary-btn";

  const isDisable = (errors) =>
    Object.keys(errors).length > 0 || !policyCheck;

  //go back to previous page
  const handleBackButton = () => {
    router.back();
  };

  const checkUsernameExists = async (usernameToCheck) => {
    if (!!usernameToCheck) {
      const res = await getUsername(usernameToCheck);
      setUsernameAvailable(res);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="back mb32" onClick={handleBackButton}>
        <IconBack />
      </div>
      <h1 className="title mb32">Sign Up to Blazing Cards</h1>
      <div className="GoogleWrap mb42">
        <GoogleOAuthProvider clientId="951035021628-hd5p0lgeej6askb3ooie363aft037iun.apps.googleusercontent.com">
          <GoogleLogin
            render={(renderProps) => (
              <button className="google-btn" onClick={renderProps.onClick}>
                <IconGoogle />
                Continue with Google
              </button>
            )}
            onSuccess={(credentialResponse) => {
              let data = jwt_decode(credentialResponse.credential);
              responseGoogle(data);
            }}
            onError={(response) => {
              responseGoogleFailure(response);
            }}
          />
        </GoogleOAuthProvider>
      </div>

      <div className="or mb32 flex flex-center justify-center">
        <span>Or</span>
      </div>

      <Formik
        initialValues={registerInitialValues()}
        validationSchema={registerSchema}
        onSubmit={(values) => {
          if (!!policyCheck && usernameAvailable) {
            UserRegister(values, Router, dispatch);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <>
            <form className="signup flex space-between" onSubmit={handleSubmit}>
              {/* <div className="input-control wd50"> */}
              {/* <label>First Name*</label> */}

              <TextInput
                className="input-control wd50"
                label={registerConstant.form.firstNameField.label}
                name={registerConstant.form.firstNameField.name}
                type="text"
                placeholder={registerConstant.form.firstNameField.placeholder}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstname}
              />

              <TextInput
                className="input-control wd50"
                label={registerConstant.form.lastNameField.label}
                name={registerConstant.form.lastNameField.name}
                type="text"
                placeholder={registerConstant.form.lastNameField.placeholder}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastname}
              />

              <TextInput
                className="input-control"
                label={registerConstant.form.emailField.label}
                name={registerConstant.form.emailField.name}
                type="email"
                placeholder={registerConstant.form.emailField.placeholder}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />

              <div className="input-control">
                <label>Username*</label>
                <input
                  name={registerConstant.form.usernameField.name}
                  placeholder={registerConstant.form.usernameField.placeholder}
                  value={values.username}
                  onChange={handleChange}
                  onInput={(e) => {
                    if (e?.target?.value?.length === 8)
                      checkUsernameExists(e?.target?.value);
                  }}
                  ref={usernameInput}
                  onBlurCapture={handleBlur}
                />
                <ErrorMessage
                  errors={
                    !!errors.username
                      ? errors.username
                      : !(!!usernameAvailable) && "Username already exist"
                  }
                  touched={touched.username}
                />
                {/* <div className="userSuggestion flex nowrap">
                  <div className={Styles.label}>Available:</div>
                  <div className={`${Styles.label} flex flex-wrap`}><span className={Styles.link}>aasthahanda12</span><span className={Styles.link}>aasthahanda12</span><span className={Styles.link}>aasthahanda12</span></div>
                </div> */}
              </div>

              <div className="input-control">
                <label>{registerConstant.form.contactField.label}</label>
                <div className="d-flex space-between">
                  <MySelect
                    className={Styles.country_code}
                    label={registerConstant.form.countryCodeField.label}
                    name={registerConstant.form.countryCodeField.name}
                    onChange={handleChange}
                    value={values.countryCode}
                    onBlur={handleBlur}
                  >
                    <option value="+1">+1</option>
                    <option value="+91">+91</option>
                  </MySelect>

                  <input
                    className={Styles.phone_number}
                    name={registerConstant.form.contactField.name}
                    placeholder={registerConstant.form.contactField.placeholder}
                    value={values.number}
                    onChange={handleChange}
                    inputMode="tel"
                    maxlength="12"
                    onBlur={handleBlur}
                  />
                </div>
                <ErrorMessage errors={errors.number} touched={touched.number} />
              </div>

              <div className="input-control wd50 pass">
                <label>Password*</label>
                <input
                  name={registerConstant.form.passwordField.name}
                  placeholder={registerConstant.form.passwordField.placeholder}
                  type={passShow ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {passShow ? (
                  <button
                    className="show-hide"
                    onClick={(e) => setPassShow(!passShow)}
                  >
                    <IconEye />
                  </button>
                ) : (
                  <>
                    {" "}
                    <button
                      className="show-hide"
                      onClick={(e) => setPassShow(!passShow)}
                    >
                      <IconEye />
                    </button>{" "}
                  </>
                )}
                <ErrorMessage
                  errors={errors.password}
                  touched={touched.password}
                />
              </div>

              <div className="input-control wd50 pass">
                <label>Confirm Password*</label>
                <input
                  name={registerConstant.form.conPasswordField.name}
                  placeholder={
                    registerConstant.form.conPasswordField.placeholder
                  }
                  type={conpassShow ? "text" : "password"}
                  value={values.cpass}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {conpassShow ? (
                  <button
                    className="show-hide"
                    onClick={(e) => setConPassShow(!conpassShow)}
                  >
                    <IconEye />
                  </button>
                ) : (
                  <>
                    {" "}
                    <button
                      className="show-hide"
                      onClick={(e) => setConPassShow(!conpassShow)}
                    >
                      <IconEye />
                    </button>{" "}
                  </>
                )}

                <ErrorMessage errors={errors.cpass} touched={touched.cpass} />
              </div>

              <div className="checkbox-wrap mb32">
                <label className="checkbox">
                  <input type="checkbox" onClick={() => handlePolicyCheck()} />
                  <span className="checkmark"></span>
                  I’ve read and agree with{" "}
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      openInNewTab("/terms-conditions");
                    }}
                  >
                    <a>Terms of Service</a>
                  </span>
                  &{" "}
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      openInNewTab("/privacy-policy");
                    }}
                  >
                    <a>Privacy Policy</a>
                  </span>
                </label>
              </div>

              <div className="submitWrap mb32">
                <button
                  className={submitBtnState(errors)}
                  disabled={() => {
                    isDisable(errors);
                  }}
                >
                  Sign Up
                </button>
              </div>

              <div className="text-center mb16 already">
                Already have an account?{" "}
                <Link href="/account/login">
                  <a>Sign In</a>
                </Link>
              </div>
            </form>
          </>
        )}
      </Formik>
      <div className="copyright flex justify-center flex-center">
        &copy; Blazing Cards. {new Date().getFullYear()}, All Rights Reserved
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state.auth;
};
export default connect(mapStateToProps)(Signup);
