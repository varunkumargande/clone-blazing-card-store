import React, { useEffect, useMemo, useState } from "react";
import MySelect from "../../CommonComponents/MySelect";
import { Formik, Form } from "formik";
import { TextInput } from "../../CommonComponents/TextInput";
import { paymentDetailsvalidation } from "../../../utilities/validations/paymentDetails";
import { CardNumber } from "../../CommonComponents/CardNumber";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import {
  addPaymentData,
  setClearState,
  clearState as becomeSellerClearState,
} from "../../../store/becomeSeller/action";
import { useSelector } from "react-redux";
import { CardExpiry } from "../../CommonComponents/CardExpiry";
import BackButton from "../../CommonComponents/BackButton";
import { countryListApi } from "../../../api";
import { getCardImagesByName } from "../../helper/cardImageHelper";
import { regex } from "../../Constants/regex";

export default function PaymentDetails() {
  const router = useRouter();
  const dispatch = useDispatch();
  const paymentDetails = useSelector(
    (state) => state?.becomeSeller?.paymentDetails
  );
  const clearState = useSelector((state) => state?.becomeSeller?.clearState);
  const [countryData, setCountryData] = useState(null);
  const [cardNumber, setCardNumber] = useState(null);
  const [cardType, setCardType] = useState("");

  useEffect(() => {
    countryListApi(setCountryData);
    return () => {
      dispatch(setClearState());
    };
  }, []);

  useEffect(() => {
    if (cardNumber?.length >= 3) {
      const [type] = getCardImagesByName(cardNumber);
      setCardType(type);
    } else {
      setCardType("");
    }
  }, [cardNumber]);

  const checkInitialPaymentDetail = (paymentDetails) => {
    return (
      paymentDetails?.cardNumber &&
      paymentDetails?.expireDate &&
      paymentDetails?.countryId &&
      paymentDetails?.paymentMethod
    );
  };

  const initialPaymentDetailFlag = useMemo(
    () => checkInitialPaymentDetail(paymentDetails),
    [paymentDetails]
  );
  /**
   * @method: resetCardValues
   * @description: when card values are prefilled and user changes card type or country
   *               this method will reset the card values.
   */
  const resetCardValues = (event, formProps, field) => {
    if (
      !!formProps?.initialValues?.cardNumber &&
      !!formProps?.initialValues?.expiry &&
      !!formProps?.initialValues?.cvv
    ) {
      if (!clearState) {
        dispatch(becomeSellerClearState());
        formProps?.setValues({
          ...formProps.values,
          cvv: "",
          expiry: "",
          cardNumber: "",
        });
      }
    }
    formProps.setFieldValue(field, event.target.value);
  };

  const handleSubmit = (values) => {
    const data = {
      paymentMethod: values.paymentMethod,
      expireDate: values.expiry,
      cardNumber: values.cardNumber,
      cvv: values.cvv,
      country: values.country,
      countryId: values.country,
      lastFourDigits: values.cardNumber.slice(-4),
      termCheckBox: values.termCheckBox,
    };
    dispatch(addPaymentData(data, router));
  };

  const redirectToNext = () => {
    router.push("/become-seller/shippingDetails", undefined, {
      shallow: true,
    });
  };

  const getFormatedCardNumber = (cardNumber) => {
    const format = "XXXXXXXXXXXX" + cardNumber;
    return format;
  };
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
          cardNumber: paymentDetails?.cardNumber
            ? getFormatedCardNumber(paymentDetails?.lastFourDigits)
            : "",
          cvv: paymentDetails?.cardNumber ? "XXX" : "",
          expiry: paymentDetails?.expireDate ?? "",
          country: paymentDetails?.countryId ?? "",
          paymentMethod: paymentDetails?.paymentMethod ?? "",
          termCheckBox: !!paymentDetails?.termCheckBox
        }}
        validationSchema={paymentDetailsvalidation(cardType)}
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
                label="Select a Payment Method*"
                name="paymentMethod"
                onChange={(event) =>
                  resetCardValues(event, formProps, "paymentMethod")
                }
              >
                <option>Select here</option>
                <option value="credit card">Credit Card</option>
                <option value="debit card">Debit Card</option>
              </MySelect>
              <CardNumber
                className="input-control wd48"
                label="Card Number*"
                name="cardNumber"
                type="text"
                placeholder="Enter here"
                formProps={formProps}
                onChange={(event) => {
                  setCardNumber(
                    event.target.value.replace(regex.onlyNumbers, "")
                  );
                  formProps.setFieldValue(
                    "cardNumber",
                    event.target.value.replace(regex.onlyNumbers, "")
                  );
                }}
                maxLength={cardType === "amex" ? 18 : 19}
                clearState={clearState}
                dispatch={dispatch}
                hideError={initialPaymentDetailFlag && !formProps.dirty}
              />
            </div>
            <div className="flex space-between">
              <CardExpiry
                className="input-control wd48"
                label="Expiry*"
                name="expiry"
                type="text"
                placeholder="Enter here (MM/YY)"
                formProps={formProps}
                clearState={clearState}
                dispatch={dispatch}
              />
              <TextInput
                className="input-control wd48"
                label="CVV*"
                name="cvv"
                type="password"
                placeholder="Enter here"
                maxLength={cardType === "amex" ? 4 : 3}
                formProps={formProps}
                onChange={(event) =>
                  formProps.setFieldValue(
                    "cvv",
                    event.target.value.replace(regex.onlyNumbers, "")
                  )
                }
                clearState={clearState}
                // minLength is set as 0 so that the popup error does not get displayed.
                minLength="0"
                hideError={initialPaymentDetailFlag && !formProps.dirty}
                dispatch={dispatch}
              />
            </div>
            <div className="flex space-between">
              <MySelect
                className="input-control wd48"
                label="Country*"
                name="country"
                onChange={(event) =>
                  resetCardValues(event, formProps, "country")
                }
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
            <div className="checkbox-wrap mb32">
              <label className="checkbox">
                <input
                  checked={!!formProps.values.termCheckBox}
                  disabled={!!paymentDetails?.termCheckBox}
                  required
                  name="termCheckBox"
                  type="checkbox"
                  onChange={(event) => {
                    formProps.setFieldValue(
                      "termCheckBox",
                      !formProps.values.termCheckBox
                    );
                  }}
                />
                <span className="checkmark"></span>
                <div className="discriptionlg">
                  By providing your card information, you allow BLAZING CARDS to
                  charge your card for future payments in accordance with their
                  terms.
                </div>
              </label>
              <div className="errorMessage">
                {formProps?.errors?.termCheckBox}
              </div>
            </div>
            <div className="submit-wrapper flex space-between">
              <button type="reset" className="border-btn">
                Cancel
              </button>
              {initialPaymentDetailFlag && !formProps.dirty ? (
                <button onClick={redirectToNext} className="primary-btn">
                  Save & Next
                </button>
              ) : (
                <button type="submit" className="primary-btn">
                  Save & Next
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
