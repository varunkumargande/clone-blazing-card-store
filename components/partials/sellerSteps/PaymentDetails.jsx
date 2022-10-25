import React, { useEffect, useState } from "react";
import MySelect from "../../CommonComponents/MySelect";
import { Formik, Form } from "formik";
import { TextInput } from "../../CommonComponents/TextInput";
import { paymentDetailsvalidation } from "../../../utilities/validations/paymentDetails";
import { CardNumber } from "../../CommonComponents/CardNumber";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { addPaymentData, setClearState } from "../../../store/becomeSeller/action";
import { useSelector } from "react-redux";
import IconBack from "../../Icons/IconBack";
import { CardExpiry } from "../../CommonComponents/CardExpiry";
import BackButton from "../../CommonComponents/BackButton";
import { countryListApi } from "../../../api";

export default function PaymentDetails() {
  const router = useRouter();
  const dispatch = useDispatch();
  const paymentDetails = useSelector(
    (state) => state?.becomeSeller?.paymentDetails
  );
  const clearState = useSelector((state) => state?.becomeSeller?.clearState)
  const [countryData, setCountryData] = useState(null);

  useEffect(() => {
    countryListApi(setCountryData);
  },[]);
  const handleSubmit = (values) => {
    const data = {
      paymentMethod: values.paymentMethod,
      expireDate: values.expiry,
      cardNumber: values.cardNumber,
      cvv: values.cvv,
      country: values.country,
      countryId: values.country,
      lastFourDigits: values.cardNumber.slice(-4)
    };
    dispatch(setClearState())
    dispatch(addPaymentData(data, router));
  };

  const getFormatedCardNumber = (cardNumber) => {
    const format = ('XXXXXXXXXXXX'+cardNumber)
    return format
  }
  return (
    <div className="step-container">
      <BackButton name={"Payment Details"} />
      <div className="sub-title">
        Blazing Cards takes marketplace safety seriously. Sellers must have a
        valid payment method on file. In rare occasions, sellers are charged a
        $100 fee for severe or repeated infractions of our policies.
      </div>
      <Formik
        initialValues={{
          cardNumber: paymentDetails?.cardNumber ? getFormatedCardNumber(paymentDetails?.lastFourDigits) : "",
          cvv: paymentDetails?.cardNumber ? "XXX" : "",
          expiry: paymentDetails?.expireDate ?? "",
          country: paymentDetails?.country ?? "",
          paymentMethod: paymentDetails?.paymentMethod ?? "",
        }}
        validationSchema={paymentDetailsvalidation}
        onSubmit={(values) => {
          if (values) {
            handleSubmit(values);
          }
        }}
      >
        {(formProps) => (
          <Form>
            <div className="flex space-between">
              <MySelect
                className="input-control wd48"
                label="Select a Payment Method *"
                name="paymentMethod"
              >
                <option>Select here</option>
                <option value="credit card">Credit Card</option>
              </MySelect>
              <CardNumber
                className="input-control wd48"
                label="Card Number *"
                name="cardNumber"
                type="text"
                placeholder="Enter here"
                formProps={formProps}
                clearState={clearState}
                dispatch={dispatch}              
              />
            </div>
            <div className="flex space-between">
              <CardExpiry
                className="input-control wd48"
                label="Expiry *"
                name="expiry"
                type="text"
                placeholder="Enter here (MM/YY)"
                formProps={formProps}
                clearState={clearState}
                dispatch={dispatch}
              />
              <TextInput
                className="input-control wd48"
                label="CVV *"
                name="cvv"
                type="text"
                placeholder="Enter here"
                maxLength={3}
                formProps={formProps}
                clearState={clearState}
                dispatch={dispatch}
              />
            </div>
            <div className="flex space-between">
              <MySelect
                className="input-control wd48"
                label="Country *"
                name="country"
              >
                <option>Select here</option>
                {countryData?.map((item, index) => {
                  return (
                    <>
                      <option value={item.countryId}>{item.name}</option>
                    </>
                  );
                })}
              </MySelect>
            </div>
            <div className="sub-title">
              By providing your card information, you allow BLAZING CARDS to
              charge your card for future payments in accordance with their
              terms.
            </div>
            <div className="submit-wrapper flex space-between">
              <button type="reset" className="border-btn">
                Cancel
              </button>
              <button type="submit" className="primary-btn">
                Save & Next
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
