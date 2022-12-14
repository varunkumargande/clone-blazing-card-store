import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import IconEye from "../../Icons/IconEye";
import IconBack from "../../Icons/IconBack";
import { UserRegister } from "../../../api";
import Router from "next/router";
import { useDispatch } from "react-redux";
import { registerConstant } from "../../../components/Constants/auth";
import { Formik } from "formik";
import { getUsername } from "../../../api/auth/getUsername";
import { useRouter } from "next/router";
import { registerSchema } from "../../../utilities/validations/signupDetail";
import { registerInitialValues } from "../../../utilities/validations/signupDetail";
import { TextInput } from "../../CommonComponents/TextInput";
import ErrorMessage from "../../CommonComponents/ErrorMessage";
import SuccessMessage from "../../CommonComponents/SuccessMessage";
import useDebounce from "../../../hooks/useDebounce";
import { openInNewTab } from "../../../utilities/utils";
import Styles from "../../../modular_scss/Signup.module.scss";
import FacebookLoginComponent from "../../../utilities/facebookLogin";
import GoogleLoginComponent from "../../../utilities/googleLogin";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function Signup() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const usernameInput = useRef();
  const [passShow, setPassShow] = useState(false);
  const [username, setUsername] = useState(null);
  const [conpassShow, setConPassShow] = useState(false);
  const [policyCheck, setPolicyCheck] = useState(false);
  const [searchUsername, setSearchUsername] = useState("");
  const debouncedSearchTerm = useDebounce(searchUsername, 500);

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        checkUsernameExists(debouncedSearchTerm);
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  const handlePolicyCheck = () => {
    if (policyCheck) {
      setPolicyCheck(false);
    } else {
      setPolicyCheck(true);
    }
  };

  const isDisable = (errors) => {
    return Boolean(
      Object.keys(errors).length > 0 || !policyCheck || !usernameAvailable
    );
  };

  //go back to previous page
  const handleBackButton = () => {
    router.back();
  };

  const checkUsernameExists = async (usernameToCheck) => {
    if (!!usernameToCheck) {
      await getUsername(usernameToCheck, setUsernameAvailable);
    }
  };

  const showUsernameSuggestionList = (setFieldValue) => {
    if (!usernameAvailable?.status) {
      return usernameAvailable?.suggestion?.map((item) => {
        return (
          <span
            className="username-list"
            onClick={(e) => {
              e.preventDefault(),
                setFieldValue("username", item),
                checkUsernameExists(item);
            }}
          >
            <b>{item}</b> &nbsp;
          </span>
        );
      });
    }
  };

  return (
    <div className="login-wrapper">
      <div className="back mb32" onClick={handleBackButton}>
        <IconBack />
      </div>
      <h1 className="title mb32">Sign Up to Blazing Cards</h1>
      <div className="GoogleWrap mb42">
        <GoogleLoginComponent />
        <FacebookLoginComponent />
      </div>

      <div className="or mb32 flex flex-center justify-center">
        <span>Or</span>
      </div>

      <Formik
        initialValues={registerInitialValues()}
        validationSchema={registerSchema}
        onSubmit={(values) => {
          if (!!policyCheck && !!usernameAvailable) {
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
          setFieldValue,
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
                    if (e?.target?.value?.length >= 8)
                      setSearchUsername(e?.target?.value);
                  }}
                  ref={usernameInput}
                  onBlurCapture={handleBlur}
                  maxLength={10}
                  minLength={8}
                />

                {!!errors.username ? (
                  <ErrorMessage
                    errors={
                      !!errors.username
                        ? errors.username
                        : usernameAvailable?.message
                    }
                    touched={touched.username}
                  />
                ) : (
                  <SuccessMessage
                    message={usernameAvailable?.message}
                    status={usernameAvailable?.status}
                  />
                )}
              </div>
              <div>
                {!!usernameAvailable && !usernameAvailable?.status && (
                  <b>Available : </b>
                )}
                {showUsernameSuggestionList(setFieldValue)}
              </div>

              <div className="input-control">
                <label>{registerConstant.form.contactField.label}</label>

                <div className="flex space-between">
                  <PhoneInput
                    country={"us"}
                    inputProps={{
                      name: registerConstant.form.contactField.name,
                      className: "input-control phone-input",
                      required: true,
                    }}
                    placeholder={registerConstant.form.contactField.placeholder}
                    value={values.number}
                    onChange={(e) => setFieldValue("number", e)}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    errors={errors.number}
                    touched={touched.number}
                  />
                </div>
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
                  </span>{" "}
                  &#38;{" "}
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
                  className={isDisable(errors) ? "disable-btn" : "primary-btn"}
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

export default Signup;
