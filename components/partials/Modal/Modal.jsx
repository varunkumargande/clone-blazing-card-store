import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import IconClose from "../../Icons/IconClose";
import IconShareFacebook from "../../Icons/IconShareFacebook";
import IconShareTwitter from "../../Icons/IconShareTwitter";
import IconShareWhatsup from "../../Icons/IconShareWhatsup";
import IconGoogle from "../../Icons/IconGoogle";
import Timer from "../../elements/streaming/Timer";
import { useFormik } from "formik";
import * as Yup from "yup";
import { array, element } from "prop-types";
import { addCardDetail } from "../../../api/stream/payment";
import { deleteAccountApi } from "../../../api/account/deleteAccount";
import axios from "axios";
import { searchUsers } from "../../../chatService";
import PaymentCard from "../EditProfile/PaymentCard";
import { handleCardApi } from "../../../api/account/editCard";
import { Loader } from "../../reusable/Loader";
import { getCardImagesByName } from "../../helper/cardImageHelper";
import { addChatFrend, searchUser } from "../../../api/chat";
import { regex } from "../../Constants/regex";
import { apiUrl } from "../../../api/url";
import { SocialMediaShareLink } from "../../Constants/socialMediaShareLink";
import { io } from "socket.io-client";
import ErrorMessage from "../../CommonComponents/ErrorMessage";
import { useDispatch } from "react-redux";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { GoogleLoginApi } from "../../../api/auth/GoogleLoginApi";
import Router from "next/router";
import DefaultServices from "../../Services/DefaultServices";
import { ImageTransformation } from "../../Constants/imageTransformation";
import CloudinaryImage from "../../CommonComponents/CloudinaryImage";
import { getStateList } from "../../../api/common/common";
import { US_CODE } from "../../Constants";
import { getStateName } from "../../../utilities/utils";

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

export function ShareModalModal({ setIsShareModalOpen }) {
  const pageUrl = window.location.href;
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = (e) => {
    e.preventDefault();
    setIsCopied(true);
    navigator.clipboard.writeText(pageUrl);
    setTimeout(() => setIsCopied(false), 1000);
  };
  return (
    <div className="modalOverlay flex justify-center flex-center">
      <div className="modal">
        <div className="modal-header flex Space-between flex-center">
          <h5 className="modal-title">Share</h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={() => setIsShareModalOpen(false)}
          >
            <span aria-hidden="true">
              <IconClose />
            </span>
          </button>
        </div>
        <div className="modal-body">
          <div className="flex justify-center social-link">
            <button
              onClick={(e) => {
                e.preventDefault();
                window.open(
                  `${SocialMediaShareLink.whatsapp}${pageUrl}`,
                  "_blank"
                );
              }}
            >
              <IconShareWhatsup />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                window.open(
                  `${SocialMediaShareLink.twitter}${pageUrl}`,
                  "_blank"
                );
              }}
            >
              <IconShareTwitter />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                window.open(
                  `${SocialMediaShareLink.facebook}${pageUrl}`,
                  "_blank"
                );
              }}
            >
              <IconShareFacebook />
            </button>
          </div>
          <div className="copy flex space-between flex-center nowrap">
            <span className="url">{pageUrl}</span>
            <button
              className="copy-btn"
              onClick={(e) => {
                handleCopy(e);
              }}
            >
              {isCopied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ShippingTaxesModal(props) {
  const { setOpenShipPayDetails } = props;
  return (
    <div className="modalOverlay flex justify-center flex-center">
      <div className="modal">
        <div className="modal-header flex Space-between flex-center">
          <h5 className="modal-title">Shipping & Taxes</h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={() => setOpenShipPayDetails(false)}
          >
            <span aria-hidden="true">
              <IconClose />
            </span>
          </button>
        </div>
        <div className="modal-body">
          <h6>Shipping</h6>
          <p>You must add your shipping address before you can view prices.</p>
          <h6>Taxes</h6>
          <p>
            We're required by law to collect sales taxes and applicable fees for
            certain tax authorities. Sales taxes vary depending on state.
          </p>
          <h6>Help</h6>
          <p>
            If you need help on the above please write to
            support@blazingcards.com
          </p>
        </div>
      </div>
    </div>
  );
}
export function CustomBidModal(props) {
  const {
    setOpen,
    minutes,
    seconds,
    bidAmount,
    amountToBid,
    handleConfirmBid,
    increaseBidAmount,
    checkBidAmount,
    setAmountToBid,
  } = props;
  return (
    <div className="modalOverlay flex justify-center flex-center">
      <div className="modal">
        <div className="modal-header flex Space-between flex-center">
          <h5 className="modal-title">Custom Bid</h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={() => setOpen(false)}
          >
            <span aria-hidden="true">
              <IconClose />
            </span>
          </button>
        </div>
        <div className="modal-body">
          <div className="flex space-between bid-status column mb16">
            <div className="left">
              <strong>Time left - </strong>
              <span>
                <Timer minutes={minutes} seconds={seconds} />
              </span>
            </div>
            <div className="right">
              <strong>Current Bid - </strong>
              <span>${bidAmount} +Ship/Tax</span>
            </div>
          </div>
          <div className="flex space-between increment mb16">
            <button
              className="decrease flex flex-center justify-center"
              onClick={checkBidAmount}
            >
              -
            </button>
            <input
              type="number"
              className="text-center"
              // placeholder={amountToBid}
              value={amountToBid}
              onChange={(e) => setAmountToBid(e.target.value)}
            />
            <button
              className="increase flex flex-center justify-center"
              onClick={increaseBidAmount}
            >
              +
            </button>
          </div>
        </div>
        <div className="modal-footer">
          <div className="flex space-between btn-wrap">
            <button className="disable-btn" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button
              className={
                bidAmount <= amountToBid ? "primary-btn" : "primary-btn disable"
              }
              onClick={handleConfirmBid}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PaymentInfoModal(props) {
  const {
    openPayment,
    handlePaymentMethod,
    handleShippmentMethod,
    handleSubmitBuyProduct,
    addressList,
    cardDetail,
    productDetail,
    paymentLoader,
    addressLoader,
    isBuyNowPaymentModal,
  } = props;

  const addressInfo =
    addressList?.length == 0
      ? "Add Address"
      : addressList[0]?.address1 +
        " ," +
        addressList[0]?.address2 +
        " ," +
        addressList[0]?.city +
        " ," +
        addressList[0]?.state +
        " ," +
        addressList[0]?.postcode;

  const cardDetails =
    cardDetail == false
      ? "Add Card Detail"
      : cardDetail[0]?.card.brand +
        "" +
        "XXXX XXXX XXXX " +
        cardDetail[0]?.card.last4;

  return (
    <div className="modalOverlay flex justify-center flex-center">
      <div className="modal medium">
        <div className="modal-header flex Space-between flex-center">
          <h5 className="modal-title">Payment Info</h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={() => openPayment(false)}
          >
            <span aria-hidden="true">
              <IconClose />
            </span>
          </button>
        </div>
        {isBuyNowPaymentModal ? (
          <div className="modal-body-upper">
            <div className="flex space-between item-amount">
              <div className="left">
                <strong>{productDetail.name}</strong>
              </div>
              <div className="right">
                <span className="link">{productDetail.price}</span>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        {paymentLoader || addressLoader ? (
          <>
            <div align={"center"}>
              <Loader />
            </div>
          </>
        ) : (
          <>
            <div className="modal-body">
              <div className="input-control with-bg">
                <label>Shipping Details</label>
                <input
                  readOnly
                  name="text"
                  placeholder={addressInfo}
                  className="address"
                  onClick={handleShippmentMethod}
                />
              </div>
              <div className="input-control with-bg">
                <label>Payment Details</label>
                <input
                  readOnly
                  name="text"
                  placeholder={cardDetails}
                  className="payment"
                  onClick={handlePaymentMethod}
                />
              </div>
            </div>
          </>
        )}

        <div className="modal-footer flex justify-center">
          <div className="flex space-between btn-wrap wd310">
            <button className="border-btn" onClick={() => openPayment(false)}>
              Cancel
            </button>
            {isBuyNowPaymentModal ? (
              <button
                disabled={paymentLoader}
                className={`primary-btn ${paymentLoader && "disable-btn"}`}
                onClick={() => {
                  handleSubmitBuyProduct();
                }}
              >
                Confirm
              </button>
            ) : (
              <button
                className="primary-btn"
                onClick={() => {
                  openPayment(false);
                }}
              >
                Continue
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AddNewCardModal(props) {
  const { payDetail, close, setPaymentLoader, fetchCardDetail } = props;

  const dispatch = useDispatch();
  const [expValid, setExpValid] = useState(null);
  const [initialValueFlag, setInitialValueFlag] = useState(
    Array.isArray(payDetail) &&
      payDetail[0]?.card?.last4 &&
      payDetail[0]?.card?.last4 !== ""
      ? true
      : false
  );

  const shipSchema = Yup.object().shape({
    // cardHolderName: Yup.string().min(2, "Too Short!").required("Required"),
    cardNumber: Yup.string()
      .required("Required")
      .max(16, "Card Number is invalid !")
      .min(15, "Card Number is invalid !"),
    cvc: Yup.string().min(2, "Too Short!").required("Required"),
    expireDate: Yup.string().required("Required"),
    // countryId: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      cardNumber:
        payDetail != false ? "XXXX XXXX XXXX " + payDetail[0]?.card.last4 : "",
      cvc: (payDetail != false) != 0 ? payDetail[0]?.cvc : "",
      expireDate:
        (payDetail != false) != 0
          ? payDetail[0]?.card.exp_month +
            "/" +
            payDetail[0]?.card?.exp_year.toString().slice(-2)
          : "",
    },
    onSubmit: (values) => {
      const jsonData = JSON.stringify({
        cardNumber: values.cardNumber,
        expireDate: values.expireDate,
        cvc: values.cvc,
      });

      if (payDetail == false) {
        setPaymentLoader(true);
        handleCardApi(
          jsonData,
          false,
          fetchCardDetail,
          setPaymentLoader,
          dispatch
        );
        close(false);
      } else {
        setPaymentLoader(true);
        handleCardApi(
          jsonData,
          true,
          fetchCardDetail,
          setPaymentLoader,
          dispatch
        );
        close(false);
      }
    },
    validationSchema: () => shipSchema,
  });

  const resetFormData = () => {
    if (initialValueFlag) {
      setInitialValueFlag(false);
      formik.setValues({
        expireDate: "",
        cardNumber: "",
        cvc: "",
      });
    }
  };

  const handleExpDate = (values) => {
    const dateExp = values.expireDate
      .replace(/^(\d\d)(\d)$/g, "$1/$2")
      .replace(/^(\d\d\/\d\d)(\d+)$/g, "$1/$2")
      .replace(/[^\d\/]/g, "")
      .trim();
    return dateExp;
  };

  const [type, CardImage] =
    formik?.values?.cardNumber >= 3
      ? getCardImagesByName(formik?.values?.cardNumber)
      : ["", ""];

  return (
    <div className="modalOverlay flex justify-center flex-center">
      <div className="modal medium">
        <div className="modal-header flex Space-between flex-center">
          <h5 className="modal-title">Card Detail</h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={() => close(false)}
          >
            <span aria-hidden="true">
              <IconClose />
            </span>
          </button>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="modal-body">
            <div className="input-control">
              <label>Card Number *</label>
              <input
                type="text"
                name="cardNumber"
                placeholder={"Enter here"}
                value={formik.values.cardNumber}
                onChange={(e) =>
                  formik.setFieldValue(
                    "cardNumber",
                    e.target.value.replace(regex.onlyNumbers, "")
                  )
                }
                maxLength={type === "amex" ? 15 : 16}
              />
              <span className="card-icon">
                {formik?.values?.cardNumber >= 3 ? CardImage : ""}
              </span>
              <ErrorMessage errors={formik.errors.cardNumber} />
            </div>
            <div className="flex space-between">
              <div className="input-control wd50">
                <label>Expiration</label>
                <input
                  type="text"
                  name="expireDate"
                  placeholder={"MM/YY"}
                  onChange={(event) => {
                    resetFormData();
                    formik.handleChange(event);
                  }}
                  value={handleExpDate(formik.values)}
                  maxLength={5}
                />
                <ErrorMessage errors={formik.errors.expireDate} />
                {expValid == false ? "Expiary date is invalide" : ""}
              </div>
              <div className="input-control wd50">
                <label>CVV</label>
                <input
                  name="cvc"
                  placeholder={"Enter here"}
                  value={formik.values.cvc}
                  type="password"
                  onChange={(e) => {
                    resetFormData();
                    formik.setFieldValue(
                      "cvc",
                      e.target.value.replace(regex.onlyNumbers, "")
                    );
                  }}
                  maxLength={type === "amex" ? 4 : 3}
                />
                <ErrorMessage errors={formik.errors.cvc} />{" "}
              </div>
            </div>
            <div className="infotext">
              By providing your card information, you allow Blazing Cards to
              charge your card for future payments in accordance with their
              terms.
            </div>
          </div>
          <div className="modal-footer">
            <div className="flex justify-center btn-wrap">
              <button className="primary-btn" onClick={formik.handleSubmit}>
                Save card
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export function AddAddressModal(props) {
  const { close, setShip, addressList, countryData } = props;

  const [stateList, setStateList] = useState([]);
  useEffect(() => {
    getStateList(setStateList);
  }, []);

  const shipSchema = Yup.object().shape({
    company: Yup.string().min(2, "Too Short!").required("Required"),
    address1: Yup.string().min(2, "Too Short!").required("Required"),
    address1: Yup.string().min(2, "Too Short!").required("Required"),
    countryId: Yup.number().required("Required").typeError(),
    state: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    postcode: Yup.string().min(4, "Invalide PinCode").required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      company: addressList[0]?.company ?? "",
      address1: addressList[0]?.address1 ?? "",
      address2: addressList[0]?.address2 ?? "",
      countryId: addressList[0]?.countryId ?? US_CODE,
      postcode: addressList[0]?.postcode ?? "",
      addressId: addressList[0]?.addressId ?? "",
      state: addressList[0]?.state ?? "",
      city: addressList[0]?.city ?? "",
    },
    onSubmit: (values) => {
      setShip(values);
      fetchShiipmentApi();
      close(false);
    },
    validationSchema: () => shipSchema,
  });
  return (
    <>
      {formik ? (
        <div className="modalOverlay flex justify-center flex-center">
          <div className="modal medium">
            <div className="modal-header flex Space-between flex-center">
              <h5 className="modal-title">Add Address</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => close(false)}
              >
                <span aria-hidden="true">
                  <IconClose />
                </span>
              </button>
            </div>
            <form>
              <div className="modal-body">
                <div className="input-control">
                  <label>Company *</label>
                  <input
                    name="company"
                    placeholder={"Enter here"}
                    value={formik.values.company}
                    onChange={formik.handleChange}
                  />
                  <ErrorMessage errors={formik.errors.company} />{" "}
                </div>
                <div className="input-control">
                  <label>Address Line 1 *</label>
                  <input
                    name="address1"
                    placeholder={"Enter here"}
                    value={formik.values.address1}
                    onChange={formik.handleChange}
                  />
                  <ErrorMessage errors={formik.errors.address1} />{" "}
                </div>
                <div className="input-control">
                  <label>Address Line 2 *</label>
                  <input
                    name="address2"
                    placeholder={"Enter here"}
                    value={formik.values.address2}
                    onChange={formik.handleChange}
                  />
                  <ErrorMessage errors={formik.errors.address2} />{" "}
                </div>
                <div className="input-control">
                  <label>Post Code *</label>
                  <input
                    name="postcode"
                    placeholder={"Enter here"}
                    value={formik.values.postcode}
                    onChange={formik.handleChange}
                  />
                  <ErrorMessage errors={formik.errors.postcode} />{" "}
                </div>
                <div className="input-control" hidden>
                  <input name="addressId" value={formik.values.addressId} />
                </div>
                <div className="input-control">
                  <label>City *</label>
                  <input
                    name="city"
                    placeholder={"Enter here"}
                    value={formik.values.city}
                    onChange={formik.handleChange}
                  />
                  <ErrorMessage errors={formik.errors.city} />{" "}
                </div>

                {/* <div className="input-control"> Please do not remove this code 
                  <label>State *</label> A quick fix for the stable build
                  <input
                    name="state"
                    placeholder={"Enter here"}
                    value={formik.values.state}
                    onChange={formik.handleChange}
                  />
                  <ErrorMessage errors={formik.errors.state} />{" "}
                </div> */}

                <div className="input-control">
                  <label>State *</label>
                  <select
                    className="input-control"
                    name="state"
                    onChange={formik.handleChange}
                    value={formik.values.state}
                  >
                    <option>Select here</option>
                    {stateList?.map((item) => {
                      return (
                        <>
                          <option value={item.code}>
                            {getStateName(stateList, item.code)}
                          </option>
                        </>
                      );
                    })}
                  </select>
                  <ErrorMessage errors={formik.errors.state} />
                </div>

                <div className="input-control">
                  <label>Country *</label>
                  <select
                    className="input-control"
                    name="countryId"
                    onChange={formik.handleChange}
                    value={formik.values.countryId}
                    disabled={true}
                  >
                    <option>United States</option>
                    {countryData?.map((item) => {
                      return (
                        <>
                          <option value={item.countryId}>{item.name}</option>
                        </>
                      );
                    })}
                  </select>
                  <ErrorMessage errors={formik.errors.countryId} />
                </div>
              </div>
              <div className="modal-footer">
                <div className="flex justify-center btn-wrap">
                  <button
                    className="primary-btn"
                    type="submit"
                    onClick={formik.handleSubmit}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export function DeletAccountModal({ setIsOpen, userName }) {
  const dispatch = useDispatch();

  const deleteSchema = Yup.object().shape({
    userName: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      userName: userName,
      password: "",
    },
    validateOnMount: true,
    onSubmit: async (values) => {
      await deleteAccountApi(values, dispatch);
      setIsOpen(false);
    },
    validationSchema: () => deleteSchema,
  });

  return (
    <div className="modalOverlay flex justify-center flex-center">
      <div className="modal medium">
        <div className="modal-header flex Space-between flex-center">
          <h5 className="modal-title">Delete Account</h5>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">
              <IconClose />
            </span>
          </button>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="modal-body">
            <div className="infotextlg">Are you sure you want to leave?</div>
            <div className="input-control">
              <label className="disable-opacity">Username</label>
              <input
                type="text"
                name="userName"
                className="disable-opacity"
                onChange={formik.handleChange}
                placeholder={"Enter here"}
                value={formik.values.userName}
                disabled
              />
              <ErrorMessage errors={formik.errors.userName} />{" "}
            </div>
            <div className="input-control">
              <label>Password *</label>
              <input
                type="password"
                name="password"
                placeholder={"Enter here"}
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <ErrorMessage errors={formik.errors.password} />{" "}
            </div>
            <div className="flex btn-wrap delete">
              <button
                className="border-btn mr16"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className={`primary-btn ${
                  !formik.isValid && "disable-opacity"
                }`}
                disabled={!formik.isValid}
                type="submit"
              >
                Delete Account
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export function ChatUserModal({ setIsOpen, fetchUserData, socket }) {
  const [userData, setUserData] = useState([]);
  const [userDataLoader, setUserDataLoader] = useState(false);
  const [userId, setUserId] = useState(null);

  // handle username and search frend
  const handleUsername = async (e) => {
    e.preventDefault();
    searchUser(setUserData, setUserDataLoader, e.target.value);
  };
  // ====================================================================

  // handle add user id for pass information
  const handleAddUserForChat = (id, name) => {
    setUserId(id);
  };
  // ==============================================================

  // handle for submit for add frend
  const handleSubmitUser = () => {
    addChatFrend(userId, fetchUserData, setIsOpen, socket);
  };
  // =============================================================

  const showUserList = () => {
    return (
      <>
        {userData.map((item, index) => {
          return (
            <>
              <div
                className="profile-chat-list flex space-between"
                onClick={() => handleAddUserForChat(item._id, item.username)}
              >
                <div className="profile-image-title flex flex-center">
                  <div className="image br50">
                    <img
                      src={
                        item?.avatarImage == ""
                          ? "/static/img/no-image.png"
                          : item?.avatarImage
                      }
                      alt=""
                    />
                  </div>
                  <div className="profile-text">
                    <div
                      className={userId == item?._id ? "name active" : "name"}
                    >
                      {item.username} <span className="new"></span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };

  return (
    <div className="modalOverlay flex justify-center flex-center">
      <div className="modal medium">
        <div className="modal-header flex Space-between flex-center">
          <h5 className="modal-title">New Message</h5>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">
              <IconClose />
            </span>
          </button>
        </div>

        <div className="modal-body">
          <div className="input-control">
            <label>User Name</label>
            <input
              type="text"
              name="username"
              placeholder={"Enter Username"}
              onChange={(e) => handleUsername(e)}
            />
          </div>
          <div className="profile-chat-list-wrap">
            {userDataLoader ? (
              <>
                <div align={"center"}>
                  <Loader />
                </div>
              </>
            ) : (
              <>{showUserList()}</>
            )}
          </div>
          <div className="btn-wrap delete" align={"center"}>
            <button
              className="primary-btn"
              type="submit"
              onClick={() => handleSubmitUser()}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function UnfollowModalMultiple(props) {
  const {
    profile,
    setIsOpenFollowUnfollow,
    profileMethods,
    following,
    setFollowing,
    pathname,
  } = props;
  const userDetail = JSON.parse(localStorage.getItem("blazingUser"));
  const handleUnfollowClick = () => {
    const personToFollow = profile?.following_id ?? profile?.f_follower_id;
    if (!!personToFollow) {
      profileMethods.FollowUser(
        userDetail.id,
        personToFollow,
        setFollowing,
        following,
        setIsOpenFollowUnfollow,
        pathname
      );
    }
  };
  return (
    <div className="modalOverlay flex justify-center flex-center">
      <div className="modal">
        <div className="modal-body text-center">
          <div className="profile-icon">
            {!!profile && (
              <CloudinaryImage
                imageUrl={DefaultServices?.GetFullImageURL(profile, "profile")}
                keyId={DefaultServices?.GetFullImageURL(profile, "profile")}
                transformation={ImageTransformation.streamPageProfile}
                alternative={"profileImg"}
              />
            )}
          </div>
          <div className="profile-id">
            Want to unfollow @
            {profile?.follower_username ?? profile?.following_username}
          </div>
          <div className="btn-wrap follow-btn-wrap flex justify-center">
            <button
              className="border-btn"
              onClick={(e) => {
                e.preventDefault();
                setIsOpenFollowUnfollow(false);
              }}
            >
              Cancel
            </button>
            <button
              className="primary-btn"
              onClick={(e) => {
                e.preventDefault();
                handleUnfollowClick();
              }}
            >
              Unfollow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function UnfollowModal(props) {
  const { profile, setIsOpenFollowUnfollow, profileMethods, setKey, pathname } =
    props;
  const userDetail = JSON.parse(localStorage.getItem("blazingUser"));
  const handleUnfollowClick = () => {
    if (profile?.id) {
      profileMethods.UserFollowUser(
        userDetail.id,
        profile.id,
        setKey,
        setIsOpenFollowUnfollow,
        pathname
      );
    }
  };
  return (
    <div className="modalOverlay flex justify-center flex-center">
      <div className="modal">
        <div className="modal-body text-center">
          <div className="profile-icon">
            {!!profile && (
              <CloudinaryImage
                imageUrl={DefaultServices?.GetFullImageURL(profile, "profile")}
                keyId={DefaultServices?.GetFullImageURL(profile, "profile")}
                transformation={ImageTransformation.streamPageProfile}
                alternative={"profileImg"}
              />
            )}
          </div>
          <div className="profile-id">
            Want to unfollow @{profile?.username}
          </div>
          <div className="btn-wrap follow-btn-wrap flex justify-center">
            <button
              className="border-btn"
              onClick={(e) => {
                e.preventDefault();
                setIsOpenFollowUnfollow(false);
              }}
            >
              Cancel
            </button>
            <button
              className="primary-btn"
              onClick={(e) => {
                e.preventDefault();
                handleUnfollowClick();
              }}
            >
              Unfollow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function OrderSuccessful({ message, subMessage, setPaymentSuccessful }) {
  return (
    <div className="modalOverlay flex justify-center flex-center">
      <div className="modal">
        <div className="modal-body text-center">
          <div className="flex justify-content-end flex-center">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => setPaymentSuccessful(false)}
            >
              <span aria-hidden="true">
                <IconClose />
              </span>
            </button>
          </div>
          <div className="profile-icon">
            <img src="/static/images/order-successfull.svg" alt="" />
          </div>
          <h5 className="modal-title profile-id">{message}</h5>
          <div className="profile-id text-black-50">{subMessage}</div>
          <div className="btn-wrap follow-btn-wrap flex justify-center">
            <button
              onClick={() => setPaymentSuccessful(false)}
              className="primary-btn w-75 my-4"
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SignUPGoogle({ onDismiss, customMsg }) {
  return (
    <div className="modalOverlay flex justify-center flex-center">
      <div className="modal signup">
        <div className="modal-header flex Space-between flex-center nobg">
          <h5 className="modal-title"></h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={(e) => {
              onDismiss(e);
            }}
          >
            <span aria-hidden="true">
              <IconClose />
            </span>
          </button>
        </div>
        <div className="modal-body text-center">
          <div className="Stream-title text-center mb16">
            {customMsg || "Signup to join the stream"}
          </div>
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
          <div className="or mb26 flex flex-center justify-center">
            <span>Or</span>
          </div>
          <div className="signin-signup">
            <Link href="/account/register">
              <a>Sign Up</a>
            </Link>
            /
            <Link href="/account/login">
              <a>Sign In</a>
            </Link>{" "}
            on Blazing Cards
          </div>
        </div>
      </div>
    </div>
  );
}

export function BidCreatedModal(props) {
  const { setIsBidResponseModal } = props;
  return (
    <div className="modalOverlay flex justify-center flex-center">
      <div className="modal">
        <div className="modal-header flex Space-between flex-center nobg">
          <h5 className="modal-title"></h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={() => setIsBidResponseModal(false)}
          >
            <span aria-hidden="true">
              <IconClose />
            </span>
          </button>
        </div>
        <div className="modal-body text-center">
          <div className="Stream-title text-center mb24">Bid Placed</div>
          <div className="">You have bid successfully!!</div>
        </div>
      </div>
    </div>
  );
}
