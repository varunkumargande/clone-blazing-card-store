import React, { useState, useEffect } from "react";
import IconDelete from "../../Icons/IconDelete";
import Link from "next/link";
import { Formik } from "formik";
import * as Yup from "yup";
import APIServices from "../../../services";
import { countryListApi } from "../../../api";
import { modalWarning, modalSuccess } from "../../../api/intercept";
import PaymentCard from "./PaymentCard";
import { handleCardApi } from "../../../api/account/editCard";
import { Loader } from "../../reusable/Loader";
import { getCardImagesByName } from "../../helper/cardImageHelper";

export default function PaymentDetail() {
  const [cardData, setCardData] = useState(null);
  const [delStatus, setDelStatus] = useState(0);
  const [cardLoader, setCardLoader] = useState(true);
  const [countryData, setCountryData] = useState([]);
  const [isCardData, setIsCardData] = useState(false);
  const [isCardEdit, setIsCardEdit] = useState(false);

  useEffect(() => {
    setDelStatus(0);
    addressList();
    apiCallFunc();
  }, [delStatus]);

  const addressList = () => {
    setCardLoader(true);
    cardListApi();
  };

  const apiCallFunc = () => {
    countryListApi(setCountryData);
  };

  const cardListApi = async () => {
    const result = await APIServices.getUser("customer-card-details/getCard");
    if (result.status == 200) {
      
      if (result.data.data != false) {
        setCardData(result.data.data[0]);
        setCardLoader(false);
        setIsCardEdit(false);
        if (result.data.data.length != 0) {
          setIsCardData(true);
        }
      } else {
        setCardLoader(false);
        setIsCardData(false);
        setCardData(null);
      }
    } else {
      modalWarning("error", result.data.message);
      setCardLoader(false);
    }
  };

  const initialCardValues = {
    expireDate: "",
    cvc: "",
    cardNumber: "",
    countryId: "",
  };

  const paySchema = Yup.object().shape({
    expireDate: Yup.string().required("Required"),
    cvc: Yup.string().required("Required"),
    cardNumber: Yup.string()
      .required("Required")
      .min(16, "Card Number is invalid")
      .max(16, "Card Number is invalid"),
    countryId: Yup.string().required("Required"),
  });

  const submitCardDetail = async (values,) => {
    setCardLoader(true)
    let expDate = "";
    let year = values.expireDate.split("-")[0].slice(-2);
    let month = values.expireDate.split("-")[1];
    expDate = month + "/" + year;

    const jsonData = JSON.stringify({
      cardNumber: values.cardNumber,
      expireDate: expDate,
      cvc: values.cvc,
      countryId: values.countryId,
    });

    handleCardApi(jsonData, isCardEdit, cardListApi, setCardLoader);
  };

  const handleCardDetail = () => {
    if (cardLoader) {
      return <Loader />
    } else {
      return (
        <>
          {isCardData ? (
            <>
              <PaymentCard
                cardData={cardData}
                setIsCardData={setIsCardData}
                setIsCardEdit={setIsCardEdit}
              />
            </>
          ) : (
            <>
              <Formik
                initialValues={initialCardValues}
                validationSchema={paySchema}
                onSubmit={(values) => {
                  submitCardDetail(values);
                  // 
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
                  resetForm,
                }) => (
                  <>
                    <form onSubmit={handleSubmit}>
                      <div className="box">
                        <div className="inner-box">
                          <div className="discriptionlg">
                            Blazing Cards takes marketplace safety seriously.
                            Sellers must have a valid payment method on file. In
                            rare occasions, sellers are charged a $100 fee for
                            severe or repeated infractions of our policies.{" "}
                          </div>
                          <div className="flex space-between">
                            <div className="input-control wd50">
                              <label>Card Number *</label>
                              <input
                                name="cardNumber"
                                placeholder={"Enter here"}
                                className="grey-bg"
                                onChange={handleChange}
                                value={values.cardNumber}
                              />
                              <span className="card-icon">
                                {values?.cardNumber?.length >= 3 ? getCardImagesByName(values.cardNumber) : ''}
                              </span>
                              <span className="errorMessage">
                                {errors.cardNumber && touched.cardNumber
                                  ? errors.cardNumber
                                  : null}
                              </span>
                            </div>
                            <div className="input-control wd50">
                              <label htmlFor="usr">Expiry *</label>
                              <input
                                name="expireDate"
                                placeholder={"Enter here"}
                                type={"month"}
                                className="grey-bg"
                                onChange={handleChange}
                                value={values.month}
                              />
                              <span className="errorMessage">
                                {errors.expireDate && touched.expireDate
                                  ? errors.expireDate
                                  : null}
                              </span>
                            </div>
                            <div className="input-control wd50">
                              <label htmlFor="usr">CVV *</label>
                              <input
                                name="cvc"
                                placeholder={"Enter here"}
                                className="grey-bg"
                                onChange={handleChange}
                                value={values.cvc}
                                type="password"
                              />
                              <span className="errorMessage">
                                {errors.cvc && touched.cvc ? errors.cvc : null}
                              </span>
                            </div>
                            <div className="input-control wd50">
                              <label htmlFor="usr">Country *</label>
                              <select
                                className="grey-bg"
                                name="countryId"
                                onChange={handleChange}
                                value={values.countryId}
                              >
                                <option>Select</option>
                                {countryData.map((item, index) => {
                                  return (
                                    <>
                                      <option value={item.countryId}>
                                        {item.name}
                                      </option>
                                    </>
                                  );
                                })}
                              </select>
                              <span className="errorMessage">
                                {errors.countryId && touched.countryId
                                  ? errors.countryId
                                  : null}
                              </span>
                            </div>
                          </div>
                          <div className="discriptionlg">
                            By providing your card information, you allow
                            BLAZING CARDS to charge your card for future
                            payments in accordance with their terms.
                          </div>
                        </div>
                      </div>
                      <div className="button-wrapper flex mb40">
                        <button className="border-btn mr16" type="button" onClick={() => setIsCardData(true)}>
                          Cancel
                        </button>

                        <button className="primary-btn">Save</button>
                      </div>
                    </form>
                  </>
                )}
              </Formik>
            </>
          )}
        </>
      );
    }
  };

  return (
    <div className="profile-detail">
      <h3>Payment Details</h3>
      {handleCardDetail()}
    </div>
  );
}
