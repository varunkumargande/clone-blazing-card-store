import React, { useState, useEffect } from "react";
import IconKey from "../../Icons/IconKey";
import IconBack from "../../Icons/IconBack";
import IconEye from "../../Icons/IconEye";
import { useRouter } from "next/router";
import { Formik } from "formik";
import * as Yup from "yup";
import { changePasswordApi } from "../../../api";
import {
  resetPassApi,
  resetConfomPassApi,
} from "../../../api/account/resetPass";
import { handleClientScriptLoad } from "next/script";
import Router from "next/router";

export default function SentMail() {
  var router = useRouter();
  const [conpassShow, setConPassShow] = useState(false);
  const [passShow, setPassShow] = useState(false);
  const [error, setError] = useState(false);
  const [pageTrue, setPageTrue] = useState(false);

  useEffect(() => {
    resetConfomPassApi(router.query.auth, setPageTrue, Router);
  }, []);

  const loginSchema = Yup.object().shape({
    oldPass: Yup.string().required("Required"),
    newPass: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("oldPass"), null], "Passwords must match"),
  });

  const handleResetPassword = () => {
    if (pageTrue == true) {
      return (
        <>
          <Formik
            initialValues={{ oldPass: "", newPass: "" }}
            validationSchema={loginSchema}
            onSubmit={(values) => {
              resetPassApi(router.query.auth, values.newPass, Router, setError);
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
                <form
                  className="reset flex space-between"
                  onSubmit={handleSubmit}
                >
                  <div className="input-control">
                    <label>Password</label>
                    <input
                      type={passShow ? "text" : "password"}
                      placeholder="Enter here"
                      name="oldPass"
                      onChange={handleChange}
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
                    <div className="errorText">{errors.oldPass}</div>
                  </div>
                  <div className="input-control">
                    <label>Conform Password</label>
                    <input
                      type={conpassShow ? "text" : "password"}
                      placeholder="Enter here"
                      name="newPass"
                      onChange={handleChange}
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
                    <div className="errorText">{errors.newPass}</div>
                  </div>
                  <div className="submitWrap mb32 mt16">
                    <button type="submit" className="primary-btn">
                      Reset Password
                    </button>
                  </div>
                </form>
              </>
            )}
          </Formik>
        </>
      );
    } else {
      return <>Loading ....</>;
    }
  };

  return (
    <div className="login-wrapper">
      {/* <div className="back mb32"><IconBack /></div> */}
      <div className="iconkey mb32">
        <IconKey />
      </div>
      <h1 className="title mb8">Set New Password</h1>
      <div className="infotext mb32">
        Your new password must be different to previously used passwords.
      </div>
      {handleResetPassword()}
    </div>
  );
}
