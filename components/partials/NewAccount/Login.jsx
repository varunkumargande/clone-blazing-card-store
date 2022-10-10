import React, { useState, useEffect } from "react";
import Link from "next/link";
import IconGoogle from "../../Icons/IconGoogle";
import IconEye from "../../Icons/IconEye";
import IconBack from "../../Icons/IconBack";
import { EmailValidator } from "../../helper/emailValidator";
import { UserLogin } from "../../../api";
import { connect, useDispatch } from "react-redux";
import Router from "next/router";
import { GoogleLogin } from "react-google-login";
import { Formik } from "formik";
import * as Yup from "yup";
import { loginConstant } from "../../Constants/login";
import { GoogleLoginApi } from "../../../api/auth/GoogleLoginApi";
import { useRouter } from "next/router";

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
    emailInputRef.current.focus();
  }, []);

  useEffect(() => {
    if (props.isLoggedIn === true) {
      Router.push("/");
    }
  }, [props]);

  const responseGoogle = (response) => {
    GoogleLoginApi(
      response.gv.gZ,
      response.gv.tX,
      response.profileObj.email,
      process.env.NEXT_PUBLIC_DEFAULT_EMAIL_PASSWORD,
      process.env.NEXT_PUBLIC_DEFAULT_EMAIL_PASSWORD,
      response.googleId,
      "gmail",
      response.googleId,
      response.googlePath,
      response.googleId,
      response.googlePath,
      response.profileObj,
      Router,
      response
    );
  };

  // const responseGoogle = (response) => {
  //   GoogleLoginApi(
  //     mail,
  //     password,
  //     "gmail",
  //     setgoogleId,
  //     setgooglePath,
  //     googleId,
  //     googlePath,
  //     response.profileObj,
  //     Router,
  //     response
  //   );
  // };

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      )
      .required("Required"),
  });

   //go back to previous page
   const handleBackButton = () => {
    router.back()
   }

  return (
    <div className="login-wrapper">
      <div className="back mb32" onClick={handleBackButton}><IconBack /></div>
      <h1 className="title mb32">Sign in to Blazing Cards</h1>
      <GoogleLogin
        clientId="326680404078-fm2pbkgomc4nic42o6ua4difup6ff2dn.apps.googleusercontent.com"
        render={(renderProps) => (
          <button className="google-btn mb42" onClick={renderProps.onClick}>
            <IconGoogle />
            Continue with Google
          </button>
        )}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        isSignedIn={false}
      />
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
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <>
            <form className="login flex space-between" onSubmit={handleSubmit}>
              <div className="input-control">
                <label>Email Address or Username*</label>
                <input
                  name="email"
                  placeholder={"Email"}
                  ref={emailInputRef}
                  value={values.email}
                  onChange={handleChange}
                  className="errorBorder"
                />
                <span className="errorMessage">{errors.email && touched.email ? errors.email : null}</span>
              </div>
              <div className="input-control pass">
                <label>Password*</label>
                <input
                  name="password"
                  placeholder={"Password"}
                  type={conpassShow ? "text" : "password"}
                  value={values.password}
                  className="errorBorder"
                  onChange={handleChange}
                />
                <span className="errorMessage">{errors.password && touched.password ? errors.password : null}</span>
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
                <div className="flex justify-right mb16 forget mb32">
                  <Link href="/account/forgot-password">
                    <a>Forgot Password</a>
                  </Link>
                </div>
              </div>
              <div className="submitWrap mb32">
                <button type="submit" className="primary-btn">
                  Sign in
                </button>
              </div>
              <div className="text-center mb16 already">
                Don’t have an account yet?{" "}
                <Link href="/account/register">
                  <a>Sign Up</a>
                </Link>
              </div>
            </form>
          </>
        )}
      </Formik>
      <div className="copyright flex justify-center flex-center">&copy; Blazing Cards. {new Date().getFullYear()}, All Rights Reserved</div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state.auth;
};
export default connect(mapStateToProps)(Login);
