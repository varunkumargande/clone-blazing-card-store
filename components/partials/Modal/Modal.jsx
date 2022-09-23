import React, { useState, useEffect } from "react";
import IconClose from "../../Icons/IconClose";
import IconShareFacebook from "../../Icons/IconShareFacebook";
import IconShareTwitter from "../../Icons/IconShareTwitter";
import IconShareWhatsup from "../../Icons/IconShareWhatsup";
import Timer from "../../elements/streaming/Timer";
import { useFormik } from "formik";
import * as Yup from "yup";
import { array, element } from "prop-types";
import { addCardDetail } from '../../../api/stream/payment';

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
    productDetail
  } = props;

  const addressInfo =
    addressList?.length == 0
      ? "Add Address"
      : addressList[0].address1 +
        " ," +
        addressList[0].address2 +
        " ," +
        addressList[0].city +
        " ," +
        addressList[0].state +
        " ," +
        addressList[0].postcode;

  const shipSchema = Yup.object().shape({
    fullName: Yup.string().min(2, "Too Short!").required("Required"),
  });

  const cardDetails = cardDetail?.length == 0 ? "Add shipment" : cardDetail[0].card.brand +" " +"XXXX XXXX XXXX "+cardDetail[0].card.last4 

  console.timeLog(addressInfo, cardDetail)
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
        <div className="modal-footer flex justify-center">
          <div className="flex space-between btn-wrap wd310">
            <button className="disable-btn" onClick={() => openPayment(false)}>
              Cancel
            </button>
            <button
              className="primary-btn"
              onClick={() => handleSubmitBuyProduct()}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AddNewCardModal(props) {
  
    const { payDetail, close, productDetail } = props;

  const userDetail = JSON.parse(sessionStorage.getItem("spurtUser"));

  const shipSchema = Yup.object().shape({
    cardHolderName: Yup.string().min(2, "Too Short!").required("Required"),
    cardNumber: Yup.string().required("Required").max(16, "Card Number is invalid !").min(15, "Card Number is invalid !"),
    cvv: Yup.string().min(2, "Too Short!").required("Required"),
    expiration: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      cardHolderName: userDetail != null ? JSON.parse(sessionStorage.getItem("spurtUser"))?.firstName ?? "" : "",
      cardNumber: payDetail.length != 0 ? "XXXX XXXX XXXX "+payDetail[0].card.last4 : "",
      cvv: payDetail.length != 0 ? payDetail[0].cvc : "",
      expiration: payDetail.length != 0 ? payDetail[0].card.exp_year+"-"+ payDetail[0].card.exp_month : "",
      country: payDetail.length != 0 ? payDetail[0].country : "",
    },
    onSubmit: (values) => {
        addCardDetail(values, productDetail)
    },
    validationSchema: () => shipSchema,
  });

  return (
    <div className="modalOverlay flex justify-center flex-center">
      <div className="modal medium">
        <div className="modal-header flex Space-between flex-center">
          <h5 className="modal-title">Add New Card</h5>
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
              <label>Name on Card *</label>
              <input
                type="text"
                name="cardHolderName"
                placeholder={"Enter here"}
                value={formik.values.cardHolderName}
                onChange={formik.handleChange}
              />
              <span className="errorMessage">{formik.errors.cardHolderName}</span>
            </div>
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
                  name="expiration"
                  placeholder={"Enter here"}
                  value={formik.values.expiration}
                  onChange={formik.handleChange}
                />
                <span className="errorMessage">{formik.errors.expiration}</span>
              </div>
              <div className="input-control wd50">
                <label>CVV</label>
                <input
                  type="text"
                  name="cvv"
                  placeholder={"Enter here"}
                  value={formik.values.cvv}
                  onChange={formik.handleChange}
                />
               <span className="errorMessage">{formik.errors.cvv}</span>
              </div>
            </div>
            <div className="input-control">
              <label>Country *</label>
              <select name="country" onChange={formik.handleChange}>
                <option value="">Select Country</option>
                <option>India</option>
                <option>Australia</option>
                <option>America</option>
              </select>
              <span className="errorMessage">{formik.errors.country}</span>
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
  } = props;

  const shipSchema = Yup.object().shape({
    fullName: Yup.string().min(2, "Too Short!").required("Required"),
    address1: Yup.string().min(2, "Too Short!").required("Required"),
    address1: Yup.string().min(2, "Too Short!").required("Required"),
    country: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    postcode: Yup.string().min(4, "Invalide PinCode").required("Required"),
    phoneNumber: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
  });
  //   console.log("addresslist", addressList[0])
  const formik = useFormik({
    initialValues: {
      fullName: addressList[0]?.firstName ?? "",
      phoneNumber: addressList[0]?.phoneNo ?? "",
      email: addressList[0]?.emailId ?? "",
      address1: addressList[0]?.address1 ?? "",
      address2: addressList[0]?.address2 ?? "",
      country: addressList[0]?.countryId ?? "",
      postcode: addressList[0]?.postcode ?? "",
      addressId: addressList[0]?.addressId ?? "",
      state: addressList[0]?.state ?? "",
    },
    onSubmit: (values) => {
      console.log("values", values);
      setShip(values);
      fetchShiipmentApi()
      close(false);
    },
    validationSchema: () => shipSchema,
  });

  console.log("formik", formik);
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
                  <label>Full Name *</label>
                  <input
                    name="fullName"
                    placeholder={"Enter here"}
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                  />
                  <span className="errorMessage"></span>
                </div>
                <div className="input-control">
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
                </div>
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

                {/* <div className="input-control" hidden>
                  <input
                    name="id"
                    value={formik.values.addressId}
                  />
                  <span className="errorMessage"></span>
                </div> */}

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
                    name="country"
                    onChange={formik.handleChange}
                    value={shipData?.countryId}
                  >
                    {countryData?.map((item, index) => {
                      return (
                        <>
                          <option value={item.countryId}>{item.name}</option>
                        </>
                      );
                    })}
                  </select>
                  <p className="errorMessage">{formik.errors.country}</p>
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
