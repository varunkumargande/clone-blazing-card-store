import React, { useState } from "react";
import IconDelete from "../../Icons/IconDelete";
import Link from "next/link";
import { changePasswordApi } from "../../../api";
import { Formik } from "formik";
import * as Yup from "yup";

export default function ChangePassword() {
  const [passLoader, setPassLoader] = useState(false);

  const initialChangePassValues = {
    currentPassword: "",
    newPassword: "",
    retypeNewPassword: "",
  };

  const changePassSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Required"),
    newPassword: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      )
      .required("Required"),
    retypeNewPassword: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
  });

  return (
    <div className="profile-detail">
      <h3>Change Password</h3>

      {passLoader ? (
        <>Please wait ....</>
      ) : (
        <>
          <Formik
            initialValues={initialChangePassValues}
            validationSchema={changePassSchema}
            onSubmit={(values) => {
              setPassLoader(true);
              changePasswordApi(values, setPassLoader);
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
                <form onSubmit={handleSubmit}>
                  <div className="box">
                    <div className="inner-box">
                      <div className="input-control wd50">
                        <label>Current Password *</label>
                        <input
                          name="currentPassword"
                          placeholder={"Enter here"}
                          className="grey-bg"
                          onChange={handleChange}
                          type="password"
                        />
                        <span className="errorMessage">
                          {errors.currentPassword}
                        </span>
                      </div>
                      <div className="input-control wd50">
                        <label htmlFor="usr">New Password *</label>
                        <input
                          name="newPassword"
                          placeholder={"Enter here"}
                          id="usr"
                          className="grey-bg"
                          onChange={handleChange}
                          type="password"
                        />
                        <span className="errorMessage">
                          {errors.newPassword}
                        </span>
                      </div>
                      <div className="input-control wd50">
                        <label htmlFor="usr">Retype New Password *</label>
                        <input
                          name="retypeNewPassword"
                          placeholder={"Enter here"}
                          id="usr"
                          className="grey-bg"
                          onChange={handleChange}
                          value={values.retypeNewPassword}
                          type="password"
                        />
                        <span className="errorMessage">
                          {errors.retypeNewPassword}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="button-wrapper flex mb40">
                    {/* <button className="border-btn mr16">Cancel</button> */}
                    <button
                      className="primary-btn"
                      type="submit"
                      onSubmit={handleSubmit}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </>
            )}
          </Formik>
        </>
      )}
    </div>
  );
}
