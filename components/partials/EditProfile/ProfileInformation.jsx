import React, { useState, useEffect, useRef } from "react";
import IconDelete from "../../Icons/IconDelete";
import Link from "next/link";
import { Formik } from "formik";
import * as Yup from "yup";
import { editProfileApi } from "../../../api";
import Router from "next/router";
import { DeletAccountModal } from "../Modal/Modal";
import { imageUrl } from "../../../api/url";
import { Loader } from "../../reusable/Loader";
import { uploadImageToServer } from "../../../utilities/common-helpers";
import DefaultConstants from "../../../utilities/constants";
import CloudinaryImage from "../../CommonComponents/CloudinaryImage";
import { ImageTransformation } from "../../Constants/imageTransformation";
import DefaultServices from "../../Services/DefaultServices";
import { regex } from "../../Constants/regex";
import ErrorMessage from "../../CommonComponents/ErrorMessage";
import { useDispatch } from "react-redux";
import { DefaultImagePath } from "../../Constants/defaultImage";
export default function ProfileInformation() {
  const dispatch = useDispatch();
  const MaxProfileImageSize = 5; // in MB
  const [profileData, setProfileData] = useState(null);
  const [newDpError, setNewDpError] = useState("");
  const [impuploadsuccess, setimpuploadsuccess] = useState(false);
  const [newDp, setNewDp] = useState("");
  const [newDpName, setNewDpName] = useState("");
  const inputFile = useRef(null);
  const [loader, setLoader] = useState(false);
  const [showImageLoader, setShowImageLoader] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("blazingUser")) {
      setLoader(true);
      let jsonObject = {
        firstName: JSON.parse(localStorage.getItem("blazingUser"))?.firstName,
        lastName: JSON.parse(localStorage.getItem("blazingUser"))?.lastName,
        bio: JSON.parse(localStorage.getItem("blazingUser"))?.bio,
        twitterUrl: JSON.parse(localStorage.getItem("blazingUser"))
          ?.twitterUrl,
        facebookUrl: JSON.parse(localStorage.getItem("blazingUser"))
          ?.facebookUrl,
        phoneNumber: JSON.parse(localStorage.getItem("blazingUser"))
          ?.mobileNumber,
        emailId: JSON.parse(localStorage.getItem("blazingUser"))?.email,
        avatar: JSON.parse(localStorage.getItem("blazingUser"))?.avatar,
        avatarPath: JSON.parse(localStorage.getItem("blazingUser"))
          ?.avatarPath,
        username: JSON.parse(localStorage.getItem("blazingUser"))?.username,
      };
      setProfileData(jsonObject);
      setLoader(false);
    }
  }, [loader]);

  const changeDP = (e) => {
    setNewDpError("");
    const { files } = e.target;
    if (
      files &&
      files[0] &&
      files[0].name.toLowerCase().match(/\.(jpg|jpeg|png)$/)
    ) {
      const fsize = files[0].size;
      const file = Math.round(fsize / 1024);
      if (file < 1024 * MaxProfileImageSize) {
        // setNewDp(files[0])
        const reader = new FileReader();
        reader.onloadend = () => {
          uploadImage(files[0], reader.result);
        };
        reader.readAsDataURL(files[0]);
      } else {
        setNewDpError(`Profile image must be of max ${MaxProfileImageSize}MB`);
      }
    } else {
      setNewDpError("Please upload a valid Profile Image");
    }
  };

  const uploadImage = async (file, base64) => {
    setShowImageLoader(true);
    const uploadImage = await uploadImageToServer(
      file,
      DefaultConstants.CommonConstants.IMAGE_UPLOAD_PATH
    );
    setShowImageLoader(false);
    if (uploadImage) {
      setNewDp(base64);
      setNewDpName(uploadImage?.fileName);
      setimpuploadsuccess(true);
    }
  };

  const profileSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    phoneNumber: Yup.string().required("Required")
      .matches(
        regex.phoneNumber,
        'Please enter a valid mobile number with country and area code(Ex: +19999999999 or 9999999999)'),
    bio: Yup.string().max(300),
    twitterUrl: Yup.string()
      .matches(
        /(?:http:\/\/)?(?:www\.)?twitter\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/,
        "Invalid twitter Link !"
      )
      .nullable(),
    facebookUrl: Yup.string()
      .matches(
        /(?:https?:\/\/)?(?:www\.)?(?:facebook|fb|m\.facebook)\.(?:com|me)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]+)(?:\/)?/i,
        "Invalid facebook Link !"
      )
      .nullable(),
  });

  const handleImage = () => {
    return (
      imageUrl +
      `?path=${profileData?.avatarPath}&name=/${profileData?.avatar}&width=300&height=300`
    );
  };

  const handleCancelButton = () => {
    setLoader(true);
  };

  const handleImageUpload = () => {
    return (
      <>
        <div className="box">
          <div className="profile-image-upload flex flex-center">
            <div className="prifile-image br50">
              {profileData != null ? (
                showImageLoader ? (
                  <Loader />
                ) : (
                  <>
                    {newDp != "" ? (
                      <>
                        <img
                          style={{ borderRadius: "50%" }}
                          width={"172"}
                          height={"172"}
                          src={newDp}
                          alt="Profile"
                        />
                      </>
                    ) : (
                      <>
                        {profileData?.avatar ? (
                          <CloudinaryImage
                            imageUrl={DefaultServices?.GetFullImageURL(
                              profileData,
                              "profile"
                            )}
                            keyId={DefaultServices?.GetFullImageURL(
                              profileData,
                              "profile"
                            )}
                            transformation={
                              ImageTransformation.profilePageImage
                            }
                            alternative="Profile"
                          />
                        ) : (
                          <img
                           onError={() => {
                            currentTarget.onerror = null;
                            currentTarget.src = "/static/images/profileImg.png";
                           }}
                           height={172}
                           width={131}
                           src={DefaultImagePath.defaultProfileImage}
                           alt="Profile"
                          />
                        )}
                      </>
                    )}
                  </>
                )
              ) : (
                ""
              )}
            </div>
            <div className="profile-text">
              <div className="profile-btn-wrap flex flex-center mb16">
                <label
                  className={`upload-btn flex justify-center flex-center ${
                    showImageLoader && "disable-upload-image-btn"
                  }`}
                >
                  Update Profile Image
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    ref={inputFile}
                    disabled={showImageLoader}
                    onChange={(e) => changeDP(e)}
                  />
                </label>
                {/* <button className="delete-btn flex justify-center flex-center br50">
                <IconDelete />
              </button> */}
              </div>
              <div className="dicscription">
                {newDpError ||
                  `Must be JPEG, JPG, PNG and cannot exceed ${MaxProfileImageSize}MB`}
              </div>
              <div className="input-control wd50">
                <ErrorMessage errors={newDpError} />
              </div>
            </div>
          </div>
        </div>
        <h3>Profile Settings</h3>
        <div className="dicscription">
          Identification details for your account
        </div>
      </>
    );
  };

  const handleProfileForm = () => {
    if (loader == false) {
      if (!!profileData) {
        return (
          <>
            {handleImageUpload()}
            <Formik
              initialValues={{
                firstName: !!profileData?.firstName
                  ? profileData?.firstName
                  : "",
                lastName: !!profileData?.lastName ? profileData?.lastName : "",
                bio: !!profileData?.bio ? profileData?.bio : "",
                twitterUrl: !!profileData?.twitterUrl
                  ? profileData?.twitterUrl
                  : "",
                facebookUrl: !!profileData?.facebookUrl
                  ? profileData?.facebookUrl
                  : "",
                phoneNumber: !!profileData?.phoneNumber
                  ? profileData?.phoneNumber
                  : "",
                emailId: !!profileData?.emailId ? profileData?.emailId : "",
                userName: profileData?.username || ""
              }}
              validationSchema={profileSchema}
              onSubmit={(values) => {
                setLoader(true);
                editProfileApi(values, newDpName, Router, setLoader, dispatch);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                setFieldValue,
                handleBlur,
                handleSubmit,
                isSubmitting,
                resetForm,
              }) => (
                <>
                  <form onSubmit={handleSubmit}>
                    <div className="box">
                      <div className="inner-box">
                        <div className="flex space-between">
                          <div className="input-control wd50">
                            <label>First Name*</label>
                            <input
                              placeholder={"Enter here"}
                              className="grey-bg"
                              name="firstName"
                              onChange={(e) =>
                                setFieldValue(
                                  e.target.name,
                                  e.target.value.replace(
                                    regex.onlyAlphabetsWithSpaces,
                                    ""
                                  ),
                                  true
                                )
                              }
                              value={values.firstName}
                              type="text"
                            />
                            <ErrorMessage
                              errors={errors.firstName}
                              touched={touched.firstName}
                            />
                          </div>
                          <div className="input-control wd50">
                            <label>Last Name*</label>
                            <input
                              name="lastName"
                              placeholder={"Enter here"}
                              className="grey-bg"
                              onChange={(e) =>
                                setFieldValue(
                                  e.target.name,
                                  e.target.value.replace(
                                    regex.onlyAlphabetsWithSpaces,
                                    ""
                                  ),
                                  true
                                )
                              }
                              value={values.lastName}
                            />
                            <ErrorMessage
                              errors={errors.lastName}
                              touched={touched.lastName}
                            />
                          </div>
                        </div>
                        <div className="flex space-between">
                          <div className="input-control wd50">
                            <div className="flex space-between flex-center">
                              <label htmlFor="usr">Username*</label>
                            </div>
                            <input
                              name="text"
                              placeholder={"Enter here"}
                              id="usr"
                              className="grey-bg"
                              value={profileData?.username}
                              disabled
                            />
                          </div>
                          <div className="input-control wd50">
                            <label htmlFor="usr">Phone Number*</label>
                            <input
                              name="phoneNumber"
                              placeholder={"Enter here"}
                              id="usr"
                              className="grey-bg"
                              onChange={(e) =>
                                setFieldValue(
                                  "phoneNumber",
                                  e.target.value.replace(
                                    regex.excludePlusAndNumber,
                                    ""
                                  )
                                )
                              }
                              value={values.phoneNumber}
                              maxLength={12}
                              type="tel"
                            />
                            <ErrorMessage
                              errors={errors.phoneNumber}
                              touched={touched.phoneNumber}
                            />
                          </div>
                        </div>

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
                            maxLength={300}
                          ></textarea>
                          <ErrorMessage
                            errors={errors.bio}
                            touched={touched.bio}
                          />
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

                            <ErrorMessage
                              errors={errors.twitterUrl}
                              touched={touched.twitterUrl}
                            />
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
                            <ErrorMessage
                              errors={errors.facebookUrl}
                              touched={touched.facebookUrl}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="button-wrapper flex mb40">
                      <button
                        className="border-btn mr16"
                        type="button"
                        onClick={() => handleCancelButton()}
                      >
                        Cancel
                      </button>
                      <button className="primary-btn" type="submit">
                        Save
                      </button>
                    </div>
                  </form>
                </>
              )}
            </Formik>
          </>
        );
      }
    } else {
      return (
        <>
          <Loader />
        </>
      );
    }
  };

  return (
    <div className="profile-detail">
      <h3>Profile Image</h3>

      {handleProfileForm()}

      {isOpen ? (
        <>
          <DeletAccountModal setIsOpen={setIsOpen} userName={profileData?.username} />
        </>
      ) : (
        ""
      )}

      <h3>Delete Your Blazing Cards Account</h3>
      <div className="dicscription">
        Deleting your account will completely erase your data and information
        related to your account.
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
