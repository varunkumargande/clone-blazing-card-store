import React, { useState, useEffect, useRef } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { editProfileApi } from "../../../api";
import Router from "next/router";
import { DeletAccountModal } from "../Modal/Modal";
import { imageUrl } from "../../../api/url";
import { Loader } from "../../reusable/Loader";
import { uploadImageToServer } from "../../../utilities/common-helpers";
import CloudinaryImage from "../../CommonComponents/CloudinaryImage";
import { ImageTransformation } from "../../Constants/imageConstants";
import { DefaultImagePath } from "../../Constants/imageConstants";
import DefaultServices from "../../Services/DefaultServices";
import { regex } from "../../Constants/regex";
import ErrorMessage from "../../CommonComponents/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { show } from "../../../store/toast/action";
import { profileSchema } from "../../../utilities/validations/profileDetails";
import { profileInitialValues } from "../../../utilities/validations/profileDetails";
import MySelect from "../../CommonComponents/MySelect";
import Styles from "../../../modular_scss/ProfileInformation.module.scss";
import DefaultConstants from "../../../utilities/constants";
import { TostMessage } from "../ToastMessage/ToastMessage";
import { countriesCodeList } from "../../Constants/countryCodeList";
import { profileConstant } from "../../Constants/profile";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import IconDelete from '../../Icons/IconDelete';
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
  const toast = useSelector((state) => state?.toast?.toast);
  const [disableUploadButton, setDisableUploadButton] = useState(false);
  const [currentChatUser, setCurrentChatUser] = useState(null);

  useEffect(() => {
    if (!!JSON.parse(localStorage.getItem("chat-app-current-user"))) {
      setCurrentChatUser(
        JSON.parse(localStorage.getItem("chat-app-current-user"))
      );
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("blazingUser")) {
      setLoader(true);
      let jsonObject = {
        firstName: JSON.parse(localStorage.getItem("blazingUser"))?.firstName,
        lastName: JSON.parse(localStorage.getItem("blazingUser"))?.lastName,
        bio: JSON.parse(localStorage.getItem("blazingUser"))?.bio,
        twitterUrl: JSON.parse(localStorage.getItem("blazingUser"))?.twitterUrl,
        facebookUrl: JSON.parse(localStorage.getItem("blazingUser"))
          ?.facebookUrl,
        phoneNumber: JSON.parse(localStorage.getItem("blazingUser"))
          ?.mobileNumber,
        emailId: JSON.parse(localStorage.getItem("blazingUser"))?.email,
        avatar: JSON.parse(localStorage.getItem("blazingUser"))?.avatar,
        avatarPath: JSON.parse(localStorage.getItem("blazingUser"))?.avatarPath,
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
        setDisableUploadButton(false);
      } else {
        if (!!inputFile.current.value) {
          dispatch(
            show({
              message: `Profile image must be of max ${MaxProfileImageSize}MB`,
              type: "error",
            })
          );
          e.target.value = null;
          inputFile.current.value = "";
          setDisableUploadButton(true);
        }
      }
    } else {
      dispatch(
        show({ message: "Please upload a valid Profile Image", type: "error" })
      );
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
                  <Loader className="d-flex w-50 m-auto" />
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
                              currentTarget.src = DefaultImagePath.defaultImage;
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
                  className={
                    disableUploadButton && !!toast.message
                      ? "upload-btn flex justify-center flex-center disable-upload-image-btn"
                      : `upload-btn flex justify-center flex-center ${
                          showImageLoader && "disable-upload-image-btn"
                        }`
                  }
                >
                  Update Profile Image
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    ref={inputFile}
                    disabled={
                      showImageLoader ||
                      (disableUploadButton && !!toast.message)
                    }
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
              initialValues={profileInitialValues(profileData)}
              validationSchema={profileSchema}
              onSubmit={(values) => {
                setLoader(true);
                editProfileApi(
                  values,
                  newDpName,
                  Router,
                  setLoader,
                  dispatch,
                  currentChatUser
                );
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
                            <label>
                              {profileConstant.form.firstNameField.label}
                            </label>
                            <input
                              placeholder={
                                profileConstant.form.firstNameField.placeholder
                              }
                              className="grey-bg"
                              name={profileConstant.form.firstNameField.name}
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
                              type={profileConstant.form.firstNameField.type}
                              onBlur={handleBlur}
                            />
                            <ErrorMessage
                              errors={errors.firstName}
                              touched={touched.firstName}
                            />
                          </div>
                          <div className="input-control wd50">
                            <label>
                              {profileConstant.form.lastNameField.label}
                            </label>
                            <input
                              name={profileConstant.form.lastNameField.name}
                              placeholder={
                                profileConstant.form.lastNameField.placeholder
                              }
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
                              onBlur={handleBlur}
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
                              <label htmlFor="usr">
                                {profileConstant.form.userNameField.label}
                              </label>
                            </div>
                            <input
                              name={profileConstant.form.userNameField.name}
                              placeholder={
                                profileConstant.form.userNameField.placeholder
                              }
                              id={profileConstant.form.userNameField.id}
                              className="grey-bg"
                              value={profileData?.username}
                              disabled
                            />
                          </div>

                          <div className="input-control wd50">
                            <label htmlFor="usr">
                              {profileConstant.form.contactNumberField.label}
                            </label>
                            <div className="d-flex space-between">
                              <PhoneInput
                                inputProps={{
                                  name: profileConstant.form.contactNumberField
                                    .phoneNumberName,
                                  className: "input-control phone-input grey-bg",
                                }}
                                enableSearch={true}
                                placeholder={
                                  profileConstant.form.contactNumberField
                                    .placeholder
                                }
                                value={values.phoneNumber}
                                onChange={(e) =>
                                  setFieldValue("phoneNumber", e)
                                }
                                onBlur={handleBlur}
                              />
                            </div>
                            <ErrorMessage
                              errors={errors.phoneNumber}
                              touched={touched.phoneNumber}
                            />
                          </div>
                        </div>

                        <div className="input-control">
                          <div className="flex space-between flex-center">
                            <label htmlFor="bio">
                              {profileConstant.form.bioField.label}
                            </label>
                            <div className="max-limit">Max. 300 characters</div>
                          </div>
                          <textarea
                            name={profileConstant.form.bioField.name}
                            id={profileConstant.form.bioField.id}
                            placeholder={
                              profileConstant.form.bioField.placeholder
                            }
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
                            <label>
                              {
                                profileConstant.form.socialShareLinksField
                                  .twitter.label
                              }
                            </label>
                            <input
                              name={
                                profileConstant.form.socialShareLinksField
                                  .twitter.name
                              }
                              placeholder={
                                profileConstant.form.socialShareLinksField
                                  .twitter.placeholder
                              }
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
                              <label htmlFor="usr">
                                {
                                  profileConstant.form.socialShareLinksField
                                    .facebook.label
                                }
                              </label>
                            </div>
                            <input
                              name={
                                profileConstant.form.socialShareLinksField
                                  .facebook.name
                              }
                              placeholder={
                                profileConstant.form.socialShareLinksField
                                  .facebook.placeholder
                              }
                              id={
                                profileConstant.form.socialShareLinksField
                                  .facebook.id
                              }
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
                        type={
                          profileConstant.form.buttonField.cancelButton.type
                        }
                        onClick={() => handleCancelButton()}
                      >
                        {profileConstant.form.buttonField.cancelButton.label}
                      </button>
                      <button
                        className="primary-btn"
                        type={
                          profileConstant.form.buttonField.submitButton.type
                        }
                      >
                        {profileConstant.form.buttonField.submitButton.label}
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

      {isOpen && (
        <DeletAccountModal
          setIsOpen={setIsOpen}
          userName={profileData?.username}
        />
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
      {!!toast.message && <TostMessage data={toast}></TostMessage>}
    </div>
  );
}
