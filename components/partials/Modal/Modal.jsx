import React, { useState, useEffect } from "react";
import IconClose from "../../Icons/IconClose";
import IconShareFacebook from "../../Icons/IconShareFacebook";
import IconShareTwitter from "../../Icons/IconShareTwitter";
import IconShareWhatsup from "../../Icons/IconShareWhatsup";
import IconGoogle from "../../Icons/IconGoogle";
import Timer from "../../elements/streaming/Timer";
import { useFormik } from "formik";
import * as Yup from "yup";
import { deleteAccountApi } from "../../../api/account/deleteAccount";
import { handleCardApi } from "../../../api/account/editCard";
import { Loader } from "../../reusable/Loader";
import { getCardImagesByName } from "../../helper/cardImageHelper";
import { addChatFrend, searchUser } from "../../../api/chat";
import { regex } from "../../Constants/regex";
import { SocialMediaShareLink } from "../../Constants";
import ErrorMessage from "../../CommonComponents/ErrorMessage";
import { useDispatch } from "react-redux";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { GoogleLoginApi } from "../../../api/auth/GoogleLoginApi";
import Router from "next/router";
import DefaultServices from "../../Services/DefaultServices";
import {
  ImageTransformation,
  DefaultImagePath,
} from "../../Constants/imageConstants";
import CloudinaryImage from "../../CommonComponents/CloudinaryImage";
import { getStateList } from "../../../api/common/common";
import { US_CODE } from "../../Constants";
import {
  getStateName,
  handleModalClick,
  setCurrentUrlInLocal,
} from "../../../utilities/utils";
import IconStar from "../../Icons/IconStar";
import saveSelectedCategories from "../../../api/home/saveSelectedCategories";
import Styles from "../../../modular_scss/Signup.module.scss";
import { useFetchZipCodeList } from "../../../hooks/useFetchZipCodeList";

const responseGoogleFailure = (response) => {};

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
    <div
      className="modalOverlay flex justify-center flex-center"
      onClick={(event) => {
        handleModalClick(event, setIsShareModalOpen);
      }}
    >
      <div
        className="modal"
        onClick={(event) => {
          handleModalClick(event);
        }}
      >
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
    <div
      className="modalOverlay flex justify-center flex-center"
      onClick={(event) => {
        handleModalClick(event, setOpenShipPayDetails);
      }}
    >
      <div
        className="modal"
        onClick={(event) => {
          handleModalClick(event);
        }}
      >
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
    <div
      className="modalOverlay flex justify-center flex-center"
      onClick={(event) => {
        handleModalClick(event, setOpen);
      }}
    >
      <div
        className="modal"
        onClick={(event) => {
          handleModalClick(event);
        }}
      >
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
    <div
      className="modalOverlay flex justify-center flex-center"
      onClick={(event) => {
        handleModalClick(event, openPayment);
      }}
    >
      <div
        className="modal medium"
        onClick={(event) => {
          handleModalClick(event);
        }}
      >
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
    termCheckbox: Yup.bool()
      .oneOf([true], "Please accept terms & conditions")
      .required("Please accept terms & conditions"),
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
      termCheckbox: !!payDetail[0]?.termCheckBox,
    },
    onSubmit: (values) => {
      const jsonData = JSON.stringify({
        cardNumber: values.cardNumber,
        expireDate: values.expireDate,
        cvc: values.cvc,
        termCheckBox: values.termCheckbox,
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
    <div
      className="modalOverlay flex justify-center flex-center"
      onClick={(event) => {
        handleModalClick(event, close);
      }}
    >
      <div
        className="modal medium"
        onClick={(event) => {
          handleModalClick(event);
        }}
      >
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
                inputMode="numeric"
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
              <ErrorMessage
                errors={formik.errors.cardNumber}
                touched={formik.touched.cardNumber}
              />
            </div>
            <div className="flex space-between">
              <div className="input-control wd50">
                <label>Expiration Date</label>
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
                <ErrorMessage
                  errors={formik.errors.expireDate}
                  touched={formik.touched.expireDate}
                />
              </div>
              <div className="input-control wd50">
                <label>CVV</label>
                <input
                  name="cvc"
                  placeholder={"Enter here"}
                  value={formik.values.cvc}
                  type="password"
                  inputMode="numeric"
                  onChange={(e) => {
                    resetFormData();
                    formik.setFieldValue(
                      "cvc",
                      e.target.value.replace(regex.onlyNumbers, "")
                    );
                  }}
                  maxLength={type === "amex" ? 4 : 3}
                />
                <ErrorMessage
                  errors={formik.errors.cvc}
                  touched={formik.touched.cvc}
                />
              </div>
            </div>
            <div className="checkbox-wrap mb32">
              <label className="checkbox">
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    formik.setFieldValue(
                      "termCheckbox",
                      !formik.values.termCheckbox
                    );
                  }}
                >
                  <input
                    name="termCheckbox"
                    type="checkbox"
                    checked={formik.values.termCheckbox}
                    onChange={(e) => {}}
                  />
                  <span className="checkmark"></span>
                </div>
                <div className="discriptionlg">
                  By providing your card information, you allow BLAZING CARDS to
                  charge your card for future payments in accordance with their
                  terms.
                </div>
              </label>
              <ErrorMessage
                errors={formik.errors.termCheckbox}
                touched={formik.touched.termCheckbox}
              />
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
  const [countryId, setCountryId] = useState("223");
  const [zipCodeList, setZipCodeList] = useState([]);
  const [zipCodeListLoader, setZipCodeListLoader] = useState(false);
  const [setZipCode, isLoading, zipList] = useFetchZipCodeList();

  useEffect(() => {
    getStateList(setStateList);
  }, []);

  useEffect(() => {
    if (addressList[0]?.state) setZipCode(addressList[0]?.state);
  }, [addressList]);

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
        <div
          className="modalOverlay flex justify-center flex-center"
          onClick={(event) => {
            handleModalClick(event, close);
          }}
        >
          <div
            className="modal medium"
            onClick={(event) => {
              handleModalClick(event);
            }}
          >
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
                  <label>Full Name *</label>
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
                          <option key={item.countryId} value={item.countryId}>
                            {item.name}
                          </option>
                        </>
                      );
                    })}
                  </select>
                  <ErrorMessage errors={formik.errors.countryId} />
                </div>

                <div className="input-control">
                  <label>State *</label>
                  <select
                    className="input-control"
                    name="state"
                    onChange={(e) => {
                      e.preventDefault();
                      formik.handleChange(e);
                      setZipCode(e.target.value);
                    }}
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
                  <label>Post Code *</label>
                  {isLoading ? (
                    <Loader className={"w-25"} />
                  ) : (
                    <select
                      className="grey-bg"
                      name="postcode"
                      onChange={formik.handleChange}
                      value={formik.values.postcode}
                    >
                      <option>Select</option>
                      {!!zipList &&
                        zipList.map((item) => {
                          return (
                            <option key={item?.zipId} value={item?.code}>
                              {item.code}
                            </option>
                          );
                        })}
                    </select>
                  )}
                  <ErrorMessage errors={formik.errors.postcode} />{" "}
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
    <div
      className="modalOverlay flex justify-center flex-center"
      onClick={(event) => {
        handleModalClick(event, setIsOpen);
      }}
    >
      <div
        className="modal medium"
        onClick={(event) => {
          handleModalClick(event);
        }}
      >
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
  const [currentChatUser, setCurrentChatUser] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!!JSON.parse(localStorage.getItem("chat-app-current-user"))) {
      setCurrentChatUser(
        JSON.parse(localStorage.getItem("chat-app-current-user"))
      );
    }
  }, []);
  // handle username and search frend
  const handleUsername = async (e) => {
    e.preventDefault();
    searchUser(
      setUserData,
      setUserDataLoader,
      e.target.value,
      dispatch,
      setIsOpen
    );
  };
  // ====================================================================

  // handle add user id for pass information
  const handleAddUserForChat = (id, name) => {
    setUserId(id);
  };
  // ==============================================================

  // handle for submit for add frend
  const handleSubmitUser = () => {
    if (currentChatUser?._id)
      addChatFrend(
        userId,
        fetchUserData,
        setIsOpen,
        socket,
        dispatch,
        currentChatUser?._id
      );
  };
  // =============================================================

  const showUserList = () => {
    return (
      <>
        {userData.map((item, index) => {
          return (
            <>
              <div
                className={`profile-chat-list flex space-between ${
                  userId == item?._id && `active`
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleAddUserForChat(item._id, item.username);
                }}
                key={`${item.username}-chat-panel`}
              >
                <div className="profile-image-title flex flex-center">
                  <div className="image br50">
                    <img
                      src={
                        item?.avatarImage == ""
                          ? DefaultImagePath.defaultProfileImage
                          : `${process.env.NEXT_PUBLIC_CLOUD_IMAGE_URL}${process.env.NEXT_PUBLIC_CHAT_PROFILE_IMAGE_SIZE}${item?.avatarImage}`
                      }
                      width="40"
                      height="40"
                      alt=""
                    />
                  </div>
                  <div className="profile-text">
                    <div className="name">
                      {item.username} <span className="new"></span>
                    </div>
                    <div className="time">@{item?.username}</div>
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
    <div
      className="modalOverlay flex justify-center flex-center"
      onClick={(event) => {
        handleModalClick(event, setIsOpen);
      }}
    >
      <div
        className="modal medium"
        onClick={(event) => {
          handleModalClick(event);
        }}
      >
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
          <div className="input-control search">
            <input
              type="search"
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
              onClick={(e) => {
                e.preventDefault();
                handleSubmitUser();
              }}
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
    <div
      className="modalOverlay flex justify-center flex-center"
      onClick={(event) => {
        handleModalClick(event, setIsOpenFollowUnfollow);
      }}
    >
      <div
        className="modal"
        onClick={(event) => {
          handleModalClick(event);
        }}
      >
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
            {profile?.follower_username ?? profile?.following_username}?
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
    <div
      className="modalOverlay flex justify-center flex-center"
      onClick={(event) => {
        handleModalClick(event, setIsOpenFollowUnfollow);
      }}
    >
      <div
        className="modal"
        onClick={(event) => {
          handleModalClick(event);
        }}
      >
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
            Want to unfollow @{profile?.username}?
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

export function SuccessMessageModal({
  message,
  subMessage,
  setPaymentSuccessful,
}) {
  return (
    <div
      className="modalOverlay flex justify-center flex-center"
      onClick={(event) => {
        handleModalClick(event, setPaymentSuccessful);
      }}
    >
      <div
        className="modal"
        onClick={(event) => {
          handleModalClick(event);
        }}
      >
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
  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentUrlInLocal();
  }, []);

  useEffect(() => {
    if (
      localStorage.getItem("blazingUser") &&
      document.getElementById("signup-modal-close")
    ) {
      document.getElementById("signup-modal-close").click();
    }
  }, [localStorage.getItem("blazingUser")]);

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
      response,
      dispatch
    );
  };
  return (
    <div
      className="modalOverlay flex justify-center flex-center"
      onClick={(event) => {
        handleModalClick(event, onDismiss);
      }}
    >
      <div
        className="modal signup"
        onClick={(event) => {
          handleModalClick(event);
        }}
      >
        <div className="modal-header flex Space-between flex-center nobg">
          <h5 className="modal-title"></h5>
          <button
            type="button"
            id="signup-modal-close"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={(e) => {
              e.preventDefault();
              onDismiss(false);
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
                const credentials = jwt_decode(credentialResponse.credential);
                responseGoogle(credentials);
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
            <button
              onClick={(e) => {
                e.preventDefault();
                setCurrentUrlInLocal();
                Router.push("/account/register");
              }}
            >
              <a>Sign Up</a>
            </button>
            /
            <button
              onClick={(e) => {
                e.preventDefault();
                setCurrentUrlInLocal();
                Router.push("/account/login");
              }}
            >
              <a>Sign In</a>
            </button>
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
    <div
      className="modalOverlay flex justify-center flex-center"
      onClick={(event) => {
        handleModalClick(event, setIsBidResponseModal);
      }}
    >
      <div
        className="modal"
        onClick={(event) => {
          handleModalClick(event);
        }}
      >
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
export function ProductReviewModal(props) {
  return (
    <div className="modalOverlay flex justify-center flex-center">
      <div className="modal large">
        <div className="modal-header flex Space-between flex-center">
          <h5 className="modal-title">Write a Product Review</h5>
          <button
            type="button"
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
          <div className="prduct-reviews flex space-between">
            <div className="review-left wd50">
              <div className="title">
                Rate the following aspects of the product
              </div>
              <div className="reviewBox flex space-between flex-center">
                <div className="label">Shipping*</div>
                <div className="review">
                  <span className="active">
                    <IconStar />
                  </span>
                  <span className="active">
                    <IconStar />
                  </span>
                  <span className="active">
                    <IconStar />
                  </span>
                  <span>
                    <IconStar />
                  </span>
                  <span>
                    <IconStar />
                  </span>
                </div>
              </div>
              <div className="reviewBox flex space-between flex-center">
                <div className="label">Packaging*</div>
                <div className="review">
                  <span>
                    <IconStar />
                  </span>
                  <span>
                    <IconStar />
                  </span>
                  <span>
                    <IconStar />
                  </span>
                  <span>
                    <IconStar />
                  </span>
                  <span>
                    <IconStar />
                  </span>
                </div>
              </div>
              <div className="reviewBox flex space-between flex-center">
                <div className="label">Accuracy*</div>
                <div className="review">
                  <span>
                    <IconStar />
                  </span>
                  <span>
                    <IconStar />
                  </span>
                  <span>
                    <IconStar />
                  </span>
                  <span>
                    <IconStar />
                  </span>
                  <span>
                    <IconStar />
                  </span>
                </div>
              </div>
            </div>
            <div className="review-right wd50">
              <div className="input-control mb32">
                <label>Description*</label>
                <textarea
                  className="grey-bg"
                  placeholder="Enter here"
                ></textarea>
                <div className="errorText"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <div className="flex space-between btn-wrap">
            <button className="border-btn">Cancel</button>
            <button className={"primary-btn disable"}>Submit Review</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export function ReturnOrderModal(props) {
  return (
    <div className="modalOverlay flex justify-center flex-center">
      <div className="modal large">
        <div className="modal-header flex Space-between flex-center">
          <h5 className="modal-title">Return Order</h5>
          <button
            type="button"
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
            <label>Select a Reason for Return*</label>
            <select className="grey-bg">
              <option>Select Reason</option>
              <option>Reason1</option>
              <option>Reason2</option>
            </select>
            <div className="errorText"></div>
          </div>
          <div className="input-control mb0">
            <label>Additional Information</label>
            <textarea
              className="grey-bg"
              placeholder="Enter information"
            ></textarea>
            <div className="errorText"></div>
          </div>
        </div>
        <div className="modal-footer">
          <div className="flex space-between btn-wrap">
            <button className="border-btn">Cancel</button>
            <button className={"primary-btn disable"}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export function IntrestedModal(props) {
  const { categoryList, setIsInterestedCategoryOpen } = props;
  let selectedCategories = [];
  const handleSelectedCategoryList = () => {
    if (selectedCategories.length > 0) {
      saveSelectedCategories(selectedCategories, setIsInterestedCategoryOpen);
    }
  };
  return (
    <div className="modalOverlay flex justify-center flex-center">
      <div className="modal large">
        <div className="modal-header flex justify-center flex-center">
          <h5 className="modal-title">Tell us what you’re interested in</h5>
        </div>
        <div className="modal-body">
          <div className="categories-wrap flex-wrap">
            {!!categoryList &&
              categoryList.map((category, index) => {
                return (
                  <div className="catgories">
                    <button
                      className="cate-btn"
                      value={category?.categoryId}
                      onClick={(event) => {
                        if (event.target.className === "cate-btn active") {
                          event.target.className = "cate-btn";
                          selectedCategories.splice(
                            selectedCategories.indexOf(
                              Number(event.target.value)
                            ),
                            1
                          );
                        } else {
                          if (selectedCategories.length < 10) {
                            event.target.className = "cate-btn active";
                            selectedCategories.push(Number(event.target.value));
                          }
                        }
                      }}
                    >
                      {category?.name}
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="modal-footer">
          <div className="flex justify-center wd100">
            <button
              className="primary-btn"
              onClick={(e) => {
                e.preventDefault();
                handleSelectedCategoryList();
              }}
            >
              Pick atleast 1 or more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export function UserSuggestionModal(props) {
  return (
    <div className="modalOverlay flex justify-center flex-center">
      <div className="modal large">
        <div className="modal-header flex justify-center flex-center nobg hauto">
          <h5
            className={`${Styles.width520} modal-title text-center mt20 mb20`}
          >
            Your username is how other community members will see you. What
            should we call you?
          </h5>
        </div>
        <div className="modal-body">
          <div className="innerBody flex justify-center">
            <div className={`${Styles.width520} input-control`}>
              <label>Username*</label>
              <input
                name="username"
                type="text"
                placeholder="Username"
                value=""
              />
              <div className="errorText"></div>
              <div className="userSuggestion flex nowrap">
                <div className={Styles.label}>Available:</div>
                <div className={`${Styles.label} flex flex-wrap`}>
                  <span className={Styles.link}>aasthahanda12</span>
                  <span className={Styles.link}>aasthahanda12</span>
                  <span className={Styles.link}>aasthahanda12</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <div className="flex justify-center wd100">
            <button className="primary-btn">Great, Let’s Go</button>
          </div>
        </div>
      </div>
    </div>
  );
}
