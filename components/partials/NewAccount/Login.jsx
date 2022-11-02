import React, { useState, useEffect } from "react";
import Link from "next/link";
import IconGoogle from "../../Icons/IconGoogle";
import IconEye from "../../Icons/IconEye";
import IconBack from "../../Icons/IconBack";
import { EmailValidator } from "../../helper/emailValidator";
import { UserLogin } from "../../../api";
import { connect, useDispatch } from "react-redux";
import Router from "next/router";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { loginConstant } from "../../Constants/login";
import { GoogleLoginApi } from "../../../api/auth/GoogleLoginApi";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";

// ==================== import input common =====================
import ErrorMessage from "../../CommonComponents/ErrorMessage";
import { TextInput } from "../../CommonComponents/TextInput";
// ==============================================================

function Login(props) {
  const dispatch = useDispatch();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginType, setLoginType] = useState("normal");
  const [emailValid, setEmailValid] = useState("");
  const [passValid, setPassValid] = useState("");
  const [passShow, setPassShow] = useState(false);
  const [loadImg, setLoadImg] = useState(false);
  const [googleId, setgoogleId] = useState("");
  const [googlePath, setgooglePath] = useState("");
  const [conpassShow, setConPassShow] = useState(false);
  const emailInputRef = React.useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (props.isLoggedIn === true) {
      Router.push("/");
    }
  }, [props]);

  const responseGoogle = (response, encyrpted) => {
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

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email(loginConstant.form.emailField.validateEmail)
      .required(loginConstant.form.emailField.requiredEmail),
    password: Yup.string()
      .matches(
        loginConstant.passwordRegex,
        loginConstant.form.passwordField.validatePassword
      )
      .required(loginConstant.form.passwordField.requiredPassword),
  });
  //go back to previous page
  const handleBackButton = () => {
    router.back();
  };
  return (
    <div className="login-wrapper">
      <div className="back mb32" onClick={handleBackButton}>
        <IconBack />
      </div>

      <h1 className="title mb32">{loginConstant.heading.name}</h1>

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
            onError={() => {}}
          />
        </GoogleOAuthProvider>
      </div>
      <div className="or mb32 flex flex-center justify-center">
        <span>Or</span>
      </div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          UserLogin(
            values.email,
            values.password,
            loginType,
            Router,
            setLoginError,
            dispatch,
            setMail,
            setPassword,
            setLoadImg
          );
        }}
      >
        {({ errors, touched, values, handleChange, handleBlur }, formProps) => (
          <>
            <Form className="login flex space-between">
              <TextInput
                className="input-control wd100"
                label={loginConstant.form.emailField.emailLabel}
                name={loginConstant.form.emailField.emailName}
                type="text"
                placeholder={loginConstant.form.emailField.emailPlaceholder}
              />

              {/* <TextInput
                className="input-control wd100"
                label={loginConstant.form.passwordField.passwordLabel}
                name={loginConstant.form.passwordField.passwordName}
                type={conpassShow ? "text" : "password"}
                placeholder={
                  loginConstant.form.passwordField.passwordPlaceholder
                }
              /> */}

              <div className="input-control wd100 pass">
                <label>Password*</label>
                <input
                  name={loginConstant.form.passwordField.passwordName}
                  placeholder={
                    loginConstant.form.passwordField.passwordPlaceholder
                  }
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
                    <button
                      className="show-hide"
                      onClick={(e) => setPassShow(!passShow)}
                    >
                      <IconEye />
                    </button>
                  </>
                )}
                <ErrorMessage errors={errors.password} touched={touched.password} />
                <div className="flex justify-right mb16 forget mb32">
                  <Link href="/account/forgot-password">
                    <a>{loginConstant.form.forgetPassword}</a>
                  </Link>
                </div>
              </div>
              <div className="errorMessage text-center mb16">
                {loginError}
              </div>
              <div className="submitWrap mb32">
                <button type="submit" className="primary-btn">
                  {loginConstant.form.button.name}
                </button>
              </div>
              <div className="text-center mb16 already">
                Don’t have an account yet?
                <Link href="/account/register">
                  <a> {loginConstant.form.link.signup}</a>
                </Link>
              </div>
            </Form>
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
export default connect(mapStateToProps)(Login);
