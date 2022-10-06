import React,{useEffect} from "react";
import MySelect from "../../CommonComponents/MySelect";
import { Formik, Form } from "formik";
import { TextInput } from "../../CommonComponents/TextInput";
import {paymentDetailsvalidation} from "../../../utilities/validations/paymentDetails"
import { CardNumber } from "../../CommonComponents/CardNumber";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { addPaymentData } from "../../../store/becomeSeller/action";
import { useSelector } from "react-redux";
import IconBack from '../../Icons/IconBack';



export default function PaymentDetails() {

  const router = useRouter();
  const dispatch = useDispatch();
  const paymentDetails = useSelector(
    (state) => state?.becomeSeller?.paymentDetails
  );

  const handleSubmit = (values) => {
    const data = {
      paymentMethod :values.paymentMethod,
      expireDate : values.expiry,
      cardNumber : values.cardNumber,
      cvv :  values.cvv,
      country : values.country,
      countryId : 99
    }
    dispatch(addPaymentData(data, router));
  };

  return (
    <div className="step-container">
      <h3 className="flex flex-center"><div className="edit-back" onClick={() => router.back()} ><IconBack/></div>Payment Details</h3>
      <div className="sub-title">
        Blazing Cards takes marketplace safety seriously. Sellers must have a
        valid payment method on file. In rare occasions, sellers are charged a
        $100 fee for severe or repeated infractions of our policies.
      </div>
      <Formik
        initialValues={{
          cardNumber:  "",
          cvv: "",
          expiry: "",
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
            <option >Select here</option>
            <option value="credit card">Credit Card</option>
          </MySelect>
          <CardNumber
            className="input-control wd48"
            label="Card Number *"
            name="cardNumber"
            type="text"
            placeholder="Enter here"
            formProps={formProps}
          />
        </div>
        <div className="flex space-between">
        <TextInput
            className="input-control wd48"
            label="Expiry *"
            name="expiry"
            type="text"
            placeholder="Enter here"
          />
          <TextInput
            className="input-control wd48"
            label="CVV *"
            name="cvv"
            type="text"
            placeholder="Enter here"
          />
        </div>
        <div className="flex space-between">
        <MySelect
            className="input-control wd48"
            label="Country *"
            name="country"
          >
            <option>Select here</option>
              <option value="india">India</option>
              <option value="australia">Australia</option>
              <option value="america">America</option>
          </MySelect>
        </div>
        <div className="sub-title">
          By providing your card information, you allow BLAZING CARDS to
          charge your card for future payments in accordance with their terms.
        </div>
        <div className="submit-wrapper flex space-between">
          <button type="reset" className="border-btn">Cancel</button>
          <button type="submit" className="primary-btn">Save & Next</button>
        </div>
      </Form>
      )}
      </Formik>
    </div>
  );
}
