import React, { useState, useEffect } from "react";
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

export function ShareModalModal(props) {
  const { setIsShareModalOpen } = props;
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
            <button>
              <IconShareWhatsup />
            </button>
            <button>
              <IconShareTwitter />
            </button>
            <button>
              <IconShareFacebook />
            </button>
          </div>
          <div className="copy flex space-between flex-center nowrap">
            <span>https://www.blazingcards.com/live/5...</span>
            <button className="copy-btn">Copy</button>
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
      <div className="modal-header flex Space-between flex-center">
        <h5 className="modal-title"></h5>
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
              placeholder={amountToBid}
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
            <button className="primary-btn" onClick={handleConfirmBid}>
              Confrrm
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
      ? "Add shipment"
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
                <span className="errorMessage"></span>
              </div>
              <div className="input-control with-bg">
                <label>Card Number *</label>
                <input
                  readOnly
                  name="text"
                  placeholder={cardDetails}
                  className="payment"
                  onClick={handlePaymentMethod}
                />
                <span className="errorMessage"></span>
              </div>
            </div>
          </>
        )}

        <div className="modal-footer flex justify-center">
          <div className="flex space-between btn-wrap wd310">
            <button className="disable-btn" onClick={() => openPayment(false)}>
              Cancel
            </button>
            {isBuyNowPaymentModal ? (
              <button
                className="primary-btn"
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
          ? payDetail[0]?.card.exp_year + "-" + payDetail[0]?.card.exp_month
          : "",
    },
    onSubmit: (values) => {
      let expDate = "";
      let year = values.expireDate.split("-")[0].slice(-2);
      let month = values.expireDate.split("-")[1];
      expDate = month + "/" + year;

      const jsonData = JSON.stringify({
        cardNumber: values.cardNumber,
        expireDate: expDate,
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
                onChange={formik.handleChange}
              />
              <span className="errorMessage">{formik.errors.cardNumber}</span>
            </div>
            <div className="flex space-between">
              <div className="input-control wd50">
                <label>Expiration</label>
                <input
                  type="month"
                  name="expireDate"
                  placeholder={"Enter here"}
                  value={formik.values.expireDate}
                  onChange={formik.handleChange}
                />
                <span className="errorMessage">{formik.errors.expireDate}</span>
              </div>
              <div className="input-control wd50">
                <label>CVC</label>
                <input
                  type="text"
                  name="cvc"
                  placeholder={"Enter here"}
                  value={formik.values.cvc}
                  onChange={formik.handleChange}
                />
                <span className="errorMessage">{formik.errors.cvc}</span>
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
                  <span className="errorMessage"></span>
                </div>
                {/* <div className="input-control">
                  <label>Phone Number *</label>
                  <input
                    name="phoneNumber"
                    placeholder={"Enter here"}
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                  />
                  <span className="errorMessage"></span>
                </div>
                <div className="input-control">
                  <label>Email Address *</label>
                  <input
                    name="email"
                    placeholder={"Enter here"}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  <span className="errorMessage"></span>
                </div> */}
                <div className="input-control">
                  <label>Address Line 1 *</label>
                  <input
                    name="address1"
                    placeholder={"Enter here"}
                    value={formik.values.address1}
                    onChange={formik.handleChange}
                  />
                  <span className="errorMessage"></span>
                </div>
                <div className="input-control">
                  <label>Address Line 2 *</label>
                  <input
                    name="address2"
                    placeholder={"Enter here"}
                    value={formik.values.address2}
                    onChange={formik.handleChange}
                  />
                  <span className="errorMessage"></span>
                </div>
                <div className="input-control">
                  <label>Post Code *</label>
                  <input
                    name="postcode"
                    placeholder={"Enter here"}
                    value={formik.values.postcode}
                    onChange={formik.handleChange}
                  />
                  <span className="errorMessage"></span>
                </div>
                <div className="input-control" hidden>
                  <input name="addressId" value={formik.values.addressId} />
                  <span className="errorMessage"></span>
                </div>

                <div className="input-control">
                  <label>City *</label>
                  <input
                    name="city"
                    placeholder={"Enter here"}
                    value={formik.values.city}
                    onChange={formik.handleChange}
                  />
                  <span className="errorMessage"></span>
                </div>

                <div className="input-control">
                  <label>State *</label>
                  <input
                    name="state"
                    placeholder={"Enter here"}
                    value={formik.values.state}
                    onChange={formik.handleChange}
                  />
                  <span className="errorMessage"></span>
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
                  <p className="errorMessage">{formik.errors.countryId}</p>
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
              <span className="errorMessage">{formik.errors.emailId}</span>
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
              <span className="errorMessage">{formik.errors.password}</span>
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

export function ChatUserModal({ setIsOpen }) {
  const [userData, setUserData] = useState([]);
  const [userDataLoader, setUserDataLoader] = useState(false);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");

  const handleUsername = async (e) => {
    setUserDataLoader(true);
    if (e.target.value != "") {
      const data = await axios.post(searchUsers, {
        slang: e.target.value,
      });
      if (data.status == 200) {
        //
        setUserData(data.data.user);
        setUserDataLoader(false);
      }
    } else {
      setUserData([]);
      setUserDataLoader(false);
    }
  };

  const handleAddUserForChat = (id, name) => {
    setUserId(id)
    setUsername(name)
    console.log(id)
  }

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
              <>
                {userData.map((item, index) => {
                  return (
                    <>
                      <div
                        className=
                        {!!userId ? "profile-chat-list flex space-between active-user" : "profile-chat-list flex space-between" }
                        onClick={() => handleAddUserForChat(item._id, item.username)}
                      >
                        <div className="profile-image-title flex flex-center">
                          <div className="image br50">
                            <img src={item?.avatarImage == "" ? "/static/img/no-image.png" : item?.avatarImage} alt="" />
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
            )}
          </div>
          <div className="btn-wrap delete" align={"center"}>
            <button className="primary-btn" type="submit">
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
      <div className="modal">
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
          <div className="Stream-title text-center mb24">
            Signup to join the stream
          </div>
          <button className="google-btn mb24">
            <IconGoogle />
            Continue with Google
          </button>
          <div class="or mb32 flex flex-center justify-center">
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
