import React, { useState, useEffect, useRef } from "react";
import IconDelete from "../../Icons/IconDelete";
import Link from "next/link";
import { Formik } from "formik";
import * as Yup from "yup";
import { editProfileApi } from "../../../api";
import Router from "next/router";
import { DeletAccountModal } from "../Modal/Modal";

export default function ProfileInformation() {
  const [profileData, setProfileData] = useState(null);
  const [newDpError, setNewDpError] = useState("");
  const [impuploadsuccess, setimpuploadsuccess] = useState(false);
  const [newDp, setNewDp] = useState("");
  const inputFile = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("spurtUser")) {
      let jsonObject = {
        firstName: JSON.parse(sessionStorage.getItem("spurtUser")).firstName,
        lastName: JSON.parse(sessionStorage.getItem("spurtUser")).lastName,
        bio: JSON.parse(sessionStorage.getItem("spurtUser")).bio,
        twitterUrl: JSON.parse(sessionStorage.getItem("spurtUser")).twitterUrl,
        facebookUrl: JSON.parse(sessionStorage.getItem("spurtUser"))
          .facebookUrl,
        phoneNumber: JSON.parse(sessionStorage.getItem("spurtUser"))
          .mobileNumber,
        emailId: JSON.parse(sessionStorage.getItem("spurtUser")).email,
        avatar: JSON.parse(sessionStorage.getItem("spurtUser")).avatar,
        avatarPath: JSON.parse(sessionStorage.getItem("spurtUser")).avatarPath,
      };
      setProfileData(jsonObject);
    }
  }, []);

  const changeDP = (e) => {
    setNewDpError("");
    const { files } = e.target;
    if (files && files[0] && files[0].name.match(/\.(jpg|jpeg|png)$/)) {
      const fsize = files[0].size;
      const file = Math.round(fsize / 1024);
      if (file < 2048) {
        // setNewDp(files[0])
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onloadend = () => setNewDp(reader.result);
        setimpuploadsuccess(true);
      } else {
        setNewDpError("Please upload minimum 2 MB");
      }
    }
  };

  const profileSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    bio: Yup.string().required("Required"),
    twitterUrl: Yup.string()
      .required("Required")
      .matches(
        /(?:http:\/\/)?(?:www\.)?twitter\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/,
        "Invalid twitter Link !"
      ),
    facebookUrl: Yup.string()
      .required("Required")
      .matches(
        /(?:https?:\/\/)?(?:www\.)?(?:facebook|fb|m\.facebook)\.(?:com|me)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]+)(?:\/)?/i,
        "Invalid facebook Link !"
      ),
  });

  return (
    <div className="profile-detail">
      <h3>Profile Image</h3>
      <div className="box">
        <div className="profile-image-upload flex flex-center">
          <div className="prifile-image br50">
            {profileData != null ? (
              <>
                {newDp != "" ? (
                  <>
                    <img
                      width={"200"}
                      height={"200"}
                      src={newDp}
                      alt="Profile"
                    />
                  </>
                ) : (
                  <>
                    <img
                      width={"200"}
                      height={"200"}
                      src={
                        profileData?.avatar != null
                          ? `https://blazing-card-backend-dev.kellton.net/api/media/image-resize?path=${profileData?.avatarPath}&name=${profileData?.avatar}&width=300&height=300`
                          : "/static/images/profile-lg-image.png"
                      }
                      alt="Profile"
                    />
                  </>
                )}
              </>
            ) : (
              ""
            )}
          </div>
          <div className="profile-text">
            <div className="profile-btn-wrap flex flex-center mb16">
              <label className="upload-btn flex justify-center flex-center">
                Update Profile Image
                <input
                  type="file"
                  ref={inputFile}
                  onChange={(e) => changeDP(e)}
                />
              </label>
              {/* <button className="delete-btn flex justify-center flex-center br50">
                <IconDelete />
              </button> */}
            </div>
            <div className="dicscription">
              Must be JPEG, JPG, PNG and cannot exceed 2MB.
            </div>
          </div>
        </div>
      </div>
      <h3>Profile Settings</h3>
      <div className="dicscription">
        Identification details for your account
      </div>

      {profileData != null ? (
        <>
          <Formik
            initialValues={{
              firstName: profileData?.firstName,
              lastName: profileData?.lastName,
              bio: profileData?.bio,
              twitterUrl: profileData?.twitterUrl,
              facebookUrl: profileData?.facebookUrl,
              phoneNumber: profileData?.phoneNumber,
              emailId: profileData?.emailId,
              }}
            validationSchema={profileSchema}
            onSubmit={(values) => {
              editProfileApi(values, newDp, Router);
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
                      <div className="flex space-between">
                        <div className="input-control wd50">
                          <label>First Name *</label>
                          <input
                            placeholder={"Enter here"}
                            className="grey-bg"
                            name="firstName"
                            onChange={handleChange}
                            value={values.firstName}
                          />
                          <span className="errorMessage">
                            {errors.firstName}
                          </span>
                        </div>
                        <div className="input-control wd50">
                          <label>Last Name *</label>
                          <input
                            name="lastName"
                            placeholder={"Enter here"}
                            className="grey-bg"
                            onChange={handleChange}
                            value={values.lastName}
                          />
                          <span className="errorMessage">
                            {errors.lastName}
                          </span>
                        </div>
                      </div>


                      {/* <div className="flex space-between">
                        <div className="input-control wd50">
                          <div className="flex space-between flex-center">
                            <label htmlFor="usr">Username *</label>
                            <button className="verify-email-btn">
                              Verify email
                            </button>
                          </div>
                          <input
                            name="text"
                            placeholder={"Enter here"}
                            id="usr"
                            className="grey-bg"
                          />
                          <span className="errorMessage"></span>
                        </div>
                        <div className="input-control wd50">
                          <div className="flex space-between flex-center">
                            <label htmlFor="usr">Phone Number *</label>
                          </div>
                          <div className="flex space-between select-input">
                            <select className="grey-bg">
                              <option>+ 1</option>
                              <option>+ 2</option>
                            </select>
                            <input
                              name="text"
                              placeholder={"Enter here"}
                              id="usr"
                              className="grey-bg"
                            />
                          </div>
                          <span className="errorMessage"></span>
                        </div>
                      </div> */}


                      <div className="input-control">
                        <div className="flex space-between flex-center">
                          <label htmlFor="bio">Bio</label>
                          <div className="max-limit">Max. 300 characters</div>
                        </div>
                        <textarea
                          name="bio"
                          id="bio"
                          placeholder={"Enter here"}
                          className="grey-bg"
                          onChange={handleChange}
                          value={values.bio}
                        ></textarea>
                        <span className="errorMessage">{errors.bio}</span>
                      </div>
                    </div>
                  </div>

                  <h3>Social Share Links</h3>
                  <div className="box">
                    <div className="inner-box">
                      <div className="flex space-between">
                        <div className="input-control">
                          <label>Twitter</label>
                          <input
                            name="twitterUrl"
                            placeholder={"Enter your profile url"}
                            className="grey-bg"
                            onChange={handleChange}
                            value={values.twitterUrl}
                          />
                          <span className="errorMessage">
                            {errors.twitterUrl}
                          </span>
                        </div>
                        <div className="input-control">
                          <div className="flex space-between flex-center">
                            <label htmlFor="usr">Facebook</label>
                          </div>
                          <input
                            name="facebookUrl"
                            placeholder={"Enter your profile url"}
                            id="usr"
                            className="grey-bg"
                            onChange={handleChange}
                            value={values.facebookUrl}
                          />
                          <span className="errorMessage">
                            {errors.facebookUrl}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="button-wrapper flex mb40">
                    {/* <button className="border-btn mr16">Cancel</button> */}
                    <button className="primary-btn" type="submit">
                      Save
                    </button>
                  </div>
                </form>
              </>
            )}
          </Formik>
        </>
      ) : (
        ""
      )}

      {isOpen ? (
        <>
          <DeletAccountModal setIsOpen={setIsOpen} />
        </>
      ) : (
        ""
      )}

      <h3>Delete Your Blazing Cards Account</h3>
      <div className="dicscription">
        This will completely deactivate your account
      </div>
      <div className="box inline">
        If you want to delete your Blazing Cards account, Please click on{" "}
        <span className="link" onClick={() => setIsOpen(true)}>
          Delete Account
        </span>
      </div>
    </div>
  );
}
