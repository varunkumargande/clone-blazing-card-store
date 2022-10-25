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

export function ShareModalModal({ setIsShareModalOpen }) {
  const pageUrl = window.location.href;
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
            <a
              href={`${SocialMediaShareLink.whatsapp}${apiUrl}`}
              target="_blank"
            >
              <button>
                <IconShareWhatsup />
              </button>
            </a>
            <a
              href={`${SocialMediaShareLink.twitter}${apiUrl}`}
              target="_blank"
            >
              <button>
                <IconShareTwitter />
              </button>
            </a>
            <a
              href={`${SocialMediaShareLink.facebook}${apiUrl}`}
              target="_blank"
            >
              <button>
                <IconShareFacebook />
              </button>
            </a>
          </div>
          <div className="copy flex space-between flex-center nowrap">
            <span className="url">{pageUrl}</span>
            <button
              className="copy-btn"
              onClick={() => {
                navigator.clipboard.writeText(pageUrl);
              }}
            >
              Copy
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
    setAmountToBid
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
              onChange={(e) => setAmountToBid(e.target.value) }
              
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
            <button className={bidAmount <= amountToBid ? "primary-btn" : "primary-btn disable"}onClick={handleConfirmBid}>
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
    fetchShiipmentApi,
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

  const shipSchema = Yup.object().shape({
    fullName: Yup.string().min(2, "Too Short!").required("Required"),
  });

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
                className={`primary-btn ${paymentLoader && 'disable-btn'}`}
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
  const {
    payDetail,
    close,
    productDetail,
    countryData,
    fetchShiipmentApi,
    setPaymentLoader,
    fetchCardDetail,
  } = props;

  const userDetail = JSON.parse(sessionStorage.getItem("spurtUser"));
  const [isCardEdit, setIsCardEdit] = useState(false);
  const [expValid, setExpValid] = useState(null);
  const [initialValueFlag, setInitialValueFlag] = useState(Array.isArray(payDetail) && payDetail[0]?.card?.last4 && payDetail[0]?.card?.last4 !== "" ? true : false);

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
      expireDate:(payDetail != false) != 0? payDetail[0]?.card.exp_month + "/" + payDetail[0]?.card?.exp_year.toString().slice(-2): "",
    },
    onSubmit: (values) => {
      const jsonData = JSON.stringify({
        cardNumber: values.cardNumber,
        expireDate: values.expireDate,
        cvc: values.cvc,
      });

      if (payDetail == false) {
        setPaymentLoader(true);
        handleCardApi(jsonData, false, fetchCardDetail, setPaymentLoader);
        fetchShiipmentApi();
        close(false);
      } else {
        setPaymentLoader(true);
        handleCardApi(jsonData, true, fetchCardDetail, setPaymentLoader);
        fetchShiipmentApi();
        close(false);
      }
    },
    validationSchema: () => shipSchema,
  });

  const resetFormData = () => {
    if (initialValueFlag) {
      setInitialValueFlag(false);
      formik.setValues({
        expireDate: '',
        cardNumber: '',
        cvc: '',
      });
    }
  }

  const handleExpDate = (values) => {
    const dateExp = values.expireDate
      .replace(/^(\d\d)(\d)$/g, "$1/$2")
      .replace(/^(\d\d\/\d\d)(\d+)$/g, "$1/$2")
      .replace(/[^\d\/]/g, "")
      .trim();
    return dateExp;
  };

  const CardImage =
    formik?.values?.cardNumber >= 3
      ? getCardImagesByName(formik?.values?.cardNumber)
      : "";

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
                maxLength={
                  CardImage?.type?.name === "IconAmericanExpressCard" ? 15 : 16
                }
              />
              <span className="card-icon">
                {formik?.values?.cardNumber >= 3
                  ? getCardImagesByName(formik.values.cardNumber)
                  : ""}
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
                    formik.handleChange(event)
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
                    )
                  }
                  }
                  maxLength={
                    CardImage?.type?.name === "IconAmericanExpressCard" ? 4 : 3
                  }
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
              <button className="primary-btn">Save card</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export function AddAddressModal(props) {
  const {
    setShipIndex,
    shipIndex,
    setShipData,
    shipData,
    close,
    setShip,
    addressList,
    countryData,
    setAddressList,
  } = props;

  const shipSchema = Yup.object().shape({
    company: Yup.string().min(2, "Too Short!").required("Required"),
    address1: Yup.string().min(2, "Too Short!").required("Required"),
    address1: Yup.string().min(2, "Too Short!").required("Required"),
    countryId: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    postcode: Yup.string().min(4, "Invalide PinCode").required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      company: addressList[0]?.company ?? "",
      address1: addressList[0]?.address1 ?? "",
      address2: addressList[0]?.address2 ?? "",
      countryId: addressList[0]?.countryId ?? "",
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
            <form onSubmit={formik.handleSubmit}>
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
                {/* <div className="input-control">
                  <label>Phone Number *</label>
                  <input
                    name="phoneNumber"
                    placeholder={"Enter here"}
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                  />
                  <ErrorMessage errors={errors} />                </div>
                <div className="input-control">
                  <label>Email Address *</label>
                  <input
                    name="email"
                    placeholder={"Enter here"}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  <ErrorMessage errors={errors} />                </div> */}
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
                  <ErrorMessage errors={errors} />{" "}
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

                <div className="input-control">
                  <label>State *</label>
                  <input
                    name="state"
                    placeholder={"Enter here"}
                    value={formik.values.state}
                    onChange={formik.handleChange}
                  />
                  <ErrorMessage errors={formik.errors.state} />{" "}
                </div>

                <div className="input-control">
                  <label>Country *</label>
                  <select
                    className="input-control"
                    name="countryId"
                    onChange={formik.handleChange}
                    value={formik.values.countryId}
                  >
                    {countryData?.map((item, index) => {
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
                  <button type="submit" className="primary-btn">
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

export function DeletAccountModal({ setIsOpen }) {
  const deleteSchema = Yup.object().shape({
    emailId: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      emailId: "",
      password: "",
    },
    onSubmit: (values) => {
      deleteAccountApi(values);
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
              <label>User Name</label>
              <input
                type="email"
                name="emailId"
                onChange={formik.handleChange}
                placeholder={"Enter here"}
                value={formik.values.emailId}
              />
              <ErrorMessage errors={formik.errors.emailId} />{" "}
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
              <button className="primary-btn" type="submit">
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
  const [username, setUsername] = useState("");
  const [isButton, setIsButton] = useState(false);

  // handle username and search frend
  const handleUsername = async (e) => {
  

    setIsButton(true);
    if (e.target.value != "") {
      searchUser(setUserData, setUserDataLoader, e.target.value);
    }
  };
  // ====================================================================

  // handle add user id and username for save information
  const handleAddUserForChat = (id, name) => {
    setUserId(id);
    setUsername(name);
  };
  // ==============================================================

  // handle for submit for add frend
  const handleSubmitUser = () => {
    addChatFrend(userId, fetchUserData, setIsOpen, socket);
  };
  // =============================================================

  const showUserList = () => {
    if (!!userData) {
      return (
        <>
          {userData.map((item, index) => {
            return (
              <>
                <div
                  className={
                    !!userId
                      ? "profile-chat-list flex space-between active-user"
                      : "profile-chat-list flex space-between"
                  }
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
                      <div className="name">
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
    }
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

export function UnfollowModal() {
  return (
    <div className="modalOverlay flex justify-center flex-center">
      <div className="modal">
        <div className="modal-body text-center">
          <div className="profile-icon">
            <img src="/static/images/profile-large.svg" alt="" />
          </div>
          <div className="profile-id">Want to follow @felix.bronco?</div>
          <div className="btn-wrap follow-btn-wrap flex justify-center">
            <button className="border-btn">Cancel</button>
            <button className="primary-btn">Unfollow</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SignUPGoogle() {
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
          >
            <span aria-hidden="true">
              <IconClose />
            </span>
          </button>
        </div>
        <div className="modal-body text-center">
          <div className="Stream-title text-center mb16">
            Signup to join the stream
          </div>
          <button className="google-btn mb16">
            <IconGoogle />
            Continue with Google
          </button>
          <div class="or mb26 flex flex-center justify-center">
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
