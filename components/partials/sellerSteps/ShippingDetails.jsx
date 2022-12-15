import React, { useEffect, useState } from "react";
import MySelect from "../../CommonComponents/MySelect";
import { Formik, Form } from "formik";
import { TextInput } from "../../CommonComponents/TextInput";
import { shippingDetailsvalidation } from "../../../utilities/validations/shippingDetails";
import IconBack from "../../Icons/IconBack";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addShippingData } from "../../../store/becomeSeller/action";
import BackButton from "../../CommonComponents/BackButton";
import { countryListApi } from "../../../api";
import { getStateList } from "../../../api/common/common";
import { US_CODE } from "../../Constants";
import { getStateName } from "../../../utilities/utils";
import { useFetchZipCodeList } from "../../../hooks/useFetchZipCodeList";
import { Loader } from "../../reusable/Loader";

export default function ShippingDetails() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [countryData, setCountryData] = useState(null);
  const [stateList, setStateList] = useState([]);
  const shippingDetails = useSelector(
    (state) => state?.becomeSeller?.shippingDetails
  );
  const [setZipCode, isLoading, zipList] = useFetchZipCodeList();

  useEffect(() => {
    if (shippingDetails?.state) setZipCode(shippingDetails?.state);
  }, [shippingDetails]);

  useEffect(() => {
    countryListApi(setCountryData);
    getStateList(setStateList);
  }, []);

  const handleSubmit = (values) => {
    const data = {
      shipFirstName: values?.firstName,
      shipLastName: values?.lastName,
      addressLine1: values?.addressLine1,
      addressLine2: values?.addressLine2,
      countryId: Number(values?.country),
      postalCode: values?.postalCode,
      city: values?.city,
      state: values?.state,
    };
    dispatch(addShippingData(data, router));
  };

  /**
   * @method: handlePreviousClick
   * @description: handle the previous click button. Basically send it to previous step.
   */
  const handlePreviousClick = () => {
    router.push("/become-seller/paymentDetails");
  };

  return (
    <div className="step-container">
      <BackButton name={"Shipping Details"} backUrl="/" />
      <div className="sub-title">
        A return address must be added before going live on Blazing Cards. This
        will be used on your shipment labels.
      </div>
      <Formik
        initialValues={{
          firstName: shippingDetails?.shipFirstName ?? "",
          lastName: shippingDetails?.shipLastName ?? "",
          addressLine1: shippingDetails?.addressLine1 ?? "",
          addressLine2: shippingDetails?.addressLine2 ?? "",
          country: shippingDetails?.country ?? US_CODE,
          postalCode: shippingDetails?.postalCode ?? "",
          city: shippingDetails?.city ?? "",
          state: shippingDetails?.state ?? "",
        }}
        validationSchema={shippingDetailsvalidation}
        onSubmit={(values) => {
          if (values) {
            handleSubmit(values);
          }
        }}
      >
        {({ handleChange }) => (
          <Form>
            <div className="flex space-between">
              <TextInput
                className="input-control wd48"
                label="First Name*"
                name="firstName"
                type="text"
                placeholder="Enter here"
                maxLength="25"
              />
              <TextInput
                className="input-control wd48"
                label="Last Name*"
                name="lastName"
                type="text"
                placeholder="Enter here"
                maxLength="25"
              />
            </div>
            <div className="flex space-between">
              <TextInput
                className="input-control wd48"
                label="Address Line 1*"
                name="addressLine1"
                type="text"
                placeholder="Enter here"
              />
              <TextInput
                className="input-control wd48"
                label="Address Line 2"
                name="addressLine2"
                type="text"
                placeholder="Enter here"
              />
            </div>
            <div className="flex space-between ">
              <MySelect
                className="input-control wd48"
                label="Country*"
                name="country"
                disabled={true}
              >
                <option>United States</option>
                {countryData?.map((item, index) => {
                  return (
                    <>
                      <option key={item.countryId} value={item.countryId}>
                        {item.name}
                      </option>
                    </>
                  );
                })}
              </MySelect>

              <MySelect
                className="input-control wd48"
                label="State*"
                name="state"
                onChange={(e) => {
                  e.preventDefault();
                  handleChange(e);
                  setZipCode(e.target.value);
                }}
              >
                <option>Select here</option>
                {stateList?.map((item, index) => {
                  return (
                    <>
                      <option key={item.code} value={item.code}>
                        {getStateName(stateList, item.code)}
                      </option>
                    </>
                  );
                })}
              </MySelect>
            </div>
            <div className="flex space-between">
              {/* <MySelect
                className="input-control wd48"
                label="City*"
                name="city"
              >
                <option>Select here</option>
                <option value="delhi">Delhi</option>
                <option value="mumbai">Mumbai</option>
                <option value="chennai">Channai</option>
              </MySelect> */}
              <TextInput
                className="input-control wd48"
                label="City*"
                name="city"
                type="text"
                placeholder="Enter here"
              />

              {isLoading ? (
                <Loader className={"w-50"} />
              ) : (
                <MySelect
                  className="input-control wd48"
                  label="Postal Code*"
                  name="postalCode"
                >
                  <option>Select</option>
                  {!!zipList &&
                    zipList.map((item) => {
                      return (
                        <option key={item?.zipId} value={item.code}>
                          {item.code}
                        </option>
                      );
                    })}
                </MySelect>
              )}
            </div>

            <div className="submit-wrapper flex space-between conform">
              <button onClick={handlePreviousClick} className="border-btn">
                Previous
              </button>
              <button type="submit" className="primary-btn">
                Confirm Shipping Details
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
