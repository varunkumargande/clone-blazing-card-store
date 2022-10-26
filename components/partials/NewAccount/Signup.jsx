import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import IconGoogle from "../../Icons/IconGoogle";
import IconEye from "../../Icons/IconEye";
import IconBack from "../../Icons/IconBack";
import {
  EmailValidator,
  upperPresent,
  lowerPresent,
  numPresent,
  specialPresent,
} from "../../helper/emailValidator";
import { UserRegister } from "../../../api";
import Router from "next/router";
import { connect, useDispatch } from "react-redux";
import { GoogleLoginApi } from "../../../api/auth/GoogleLoginApi";
import { modalSuccess, modalWarning } from "../../../api/intercept";
import { registerConstant } from "../../Constants/register";
import { Formik } from "formik";
import * as Yup from "yup";
import { getUsername } from "../../../api/auth/getUsername";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";

// ======== import form components ==========
import ErrorMessage from "../../CommonComponents/ErrorMessage";
import { TextInput } from "../../CommonComponents/TextInput";
// ==========================================

function Signup(auth) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mail, setMail] = useState("");
  const [pass, setpass] = useState("");
  const [cpass, setCpass] = useState("");
  const [number, setNumber] = useState("");

  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const usernameInput = useRef();
  const [singupError, setSingupError] = useState("");
  const [nameValid, setNameValid] = useState("");
  const [lastNameValid, setLastNameValid] = useState("");
  const [mailValid, setMailValid] = useState("");
  const [passValid, setPassValid] = useState([]);
  const [cpassValid, setCpassValid] = useState("");
  const [numValid, setNumValid] = useState("");
  const [submit, setSubmit] = useState(0);
  const [passShow, setPassShow] = useState(false);
  const [conpassShow, setConPassShow] = useState(false);
  const [policyCheck, setPolicyCheck] = useState(false);

  const FullNameInputRef = React.useRef(null);
  const router = useRouter();
  useEffect(() => {
    FullNameInputRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (policyCheck == true) {
      setSubmit(1);
      validMessage();
      if (validMessage()) {
        UserRegister(name, mail, pass, cpass, number, Router);
      }
    } else {
      modalWarning("error", registerConstant["policyError"]);
    }
  };

  const handleOnBlur = async () => {
    if (usernameInput) {
      const res = await getUsername(usernameInput.current.value);
      setUsernameAvailable(res);
    }
  };

  const handlePolicyCheck = () => {
    if (policyCheck) {
      setPolicyCheck(false);
    } else {
      setPolicyCheck(true);
    }
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const registerSchema = Yup.object().shape({
    firstname: Yup.string()
      .matches(
        registerConstant.form.firstNameField.regex,
        registerConstant.form.firstNameField.regexMessage
      )
      .max(20)
      .required(registerConstant.form.required),

    lastname: Yup.string()
      .matches(
        registerConstant.form.lastNameField.regex,
        registerConstant.form.lastNameField.regexMessage
      )
      .max(20)
      .required(registerConstant.form.lastNameField.required),

    email: Yup.string()
      .email(registerConstant.form.emailField.valid)
      .required("Required"),

    number: Yup.string()
      .matches(
        registerConstant.form.contactField.regex,
        registerConstant.form.contactField.regexMessage
      )
      .required(registerConstant.form.contactField.required)
      .min(10)
      .max(12),

    password: Yup.string()
      .matches(
        registerConstant.form.passwordField.regex,
        registerConstant.form.passwordField.regexMessage
      )
      .required(registerConstant.form.passwordField.required),

    cpass: Yup.string()
      .required(registerConstant.form.conPasswordField.required)
      .oneOf([Yup.ref("password"), null], "Passwords must match"),

    username: Yup.string()
      .matches(registerConstant.form.usernameField.regex, registerConstant.form.usernameField.regexMessage)
      .max(8)
      .required(registerConstant.form.usernameField.required),
  });

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
      Router,
      response
    );
  };

  const responseGoogleFailure = (response) => {
    console.error("Failure response", response);
  };

  const submitBtnState = (errors) =>
    Object.keys(errors).length > 0 || policyCheck === false
      ? "disable-btn"
      : "primary-btn";
  const submitBtnDisableState = (errors) =>
    Object.keys(errors).length > 0 || policyCheck === false ? true : false;

  //go back to previous page
  const handleBackButton = () => {
    router.back();
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
        initialValues={{
          firstname: "",
          lastname: "",
          number: "",
          email: "",
          password: "",
          cpass: "",
          username: "",
        }}
        validationSchema={registerSchema}
        onSubmit={(values) => {
          if (policyCheck == true && usernameAvailable) {
            UserRegister(
              values.firstname,
              values.lastname,
              values.email,
              values.password,
              values.cpass,
              values.number,
              values.username,
              // usernameInput.current.value,
              Router,
              setSingupError
            );
          }
        }}
      >
        {({
          formik,
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <>
            <form className="signup flex space-between" onSubmit={handleSubmit}>
              <div className="input-control wd50">
                <label>First Name*</label>

                <input
                  type="text"
                  name="firstname"
                  placeholder={"First Name"}
                  ref={FullNameInputRef}
                  value={values.firstname}
                  maxlength="20"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <div className="errorText">
                  {touched.firstname && errors.firstname
                    ? errors.firstname
                    : null}
                </div>
              </div>
              <div className="input-control wd50">
                <label>Last Name*</label>
                <input
                  type="text"
                  name="lastname"
                  maxlength="20"
                  placeholder={"Last Name"}
                  value={values.lastname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="errorText">
                  {errors.lastname && touched.lastname ? errors.lastname : null}
                </div>
              </div>
              <div className="input-control">
                <label>Email Address*</label>
                <input
                  type="email"
                  name="email"
                  placeholder={"Email Address"}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="errorText">
                  {errors.email && touched.email ? errors.email : null}
                </div>
              </div>
              <div className="input-control">
                <label>Username*</label>
                <input
                  type="text"
                  name="username"
                  placeholder={"username"}
                  value={values.username}
                  onChange={handleChange}
                  ref={usernameInput}
                  onBlur={handleOnBlur}
                />
                <div className="errorText">
                  {errors.username ? errors.username : null}
                </div>
                {usernameAvailable === false && usernameAvailable !== null ? (
                  <div className="errorText">Username already taken</div>
                ) : null}
              </div>
              <div className="input-control">
                <label>Contact Number*</label>
                <input
                  name="number"
                  placeholder={"Contact Number"}
                  value={values.number}
                  onChange={handleChange}
                  maxlength="12"
                  onBlur={handleBlur}
                />
                <div className="errorText">
                  {errors.number && touched.number ? errors.number : null}
                </div>
              </div>

              <div className="input-control wd50 pass">
                <label>Password*</label>
                <input
                  name="password"
                  placeholder={"Password"}
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
                <div className="errorText">
                  {errors.password && touched.password ? errors.password : null}
                </div>
              </div>

              <div className="input-control wd50 pass">
                <label>Confirm Password*</label>
                <input
                  name="cpass"
                  placeholder={"Confirm Password"}
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

                <div className="errorText">
                  {errors.cpass && touched.cpass ? errors.cpass : null}
                </div>
              </div>

              <div className="checkbox-wrap mb32">
                <label className="checkbox">
                  <input type="checkbox" onClick={() => handlePolicyCheck()} />
                  <span class="checkmark"></span>
                  I’ve read and agree with{" "}
                  <Link href="/terms-conditions">
                    <a>Terms of Service</a>
                  </Link>{" "}
                  &{" "}
                  <Link href="/privacy-policy">
                    <a>Privacy Policy</a>
                  </Link>
                </label>
              </div>
              <div align={"center"}>
                <h5 className="errorMessage" style={{ color: "red" }}>
                  {singupError}
                </h5>
              </div>

              <div className="submitWrap mb32">
                <button
                  className={submitBtnState(errors)}
                  disabled={() => submitBtnDisableState(errors)}
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
