import React, { useEffect } from "react";
import MySelect from "../../CommonComponents/MySelect";
import { Formik, Form } from "formik";
import { TextInput } from "../../CommonComponents/TextInput";
import { shippingDetailsvalidation } from "../../../pages/become-seller/validations/shippingDetails";
import IconBack from '../../Icons/IconBack';
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addShippingData } from "../../../store/becomeSeller/action";

export default function ShippingDetails() {
  const router = useRouter();
  const dispatch = useDispatch();
  const shippingDetails = useSelector(
    (state) => state?.becomeSeller?.shippingDetails
  );

  const handleSubmit = (values) => {

    const data = {
      shipFromName: values?.fullName,
      addressLine1: values?.addressLine1,
      addressLine2: values?.addressLine2,
      country: values?.country,
      postalCode: values?.postalCode,
      city: values?.city,
      state: values?.state,
    };
    dispatch(addShippingData(data, router));
  };

  return (
    <div className="step-container">
      <h3 className="flex flex-center"><div className="edit-back"><IconBack/></div>Shipping Details</h3>
      <div className="sub-title">
        A return address must be added before going live on Blazing Cards. This
        will be used on your shipment labels.
      </div>
      <Formik
        initialValues={{
          fullName: "",
          addressLine1: "",
          addressLine2: "",
          country: "",
          postalCode: "",
          city: "",
          state: "",
        }}
        validationSchema={shippingDetailsvalidation}
        onSubmit={(values) => {

          if (values) {
            handleSubmit(values)
          }
        }}
      >
        {(formProps) => (
          <Form>
            <div className="flex space-between">
              <TextInput
                className="input-control wd48"
                label="Full Name *"
                name="fullName"
                type="text"
                placeholder="Enter here"
              />
            </div>
            <div className="flex space-between">
              <TextInput
                className="input-control wd48"
                label="Address Line 1 *"
                name="addressLine1"
                type="text"
                placeholder="Enter here"
              />
              <TextInput
                className="input-control wd48"
                label="Address Line 2 *"
                name="addressLine2"
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

              <TextInput
                className="input-control wd48"
                label="Postal Code *"
                name="postalCode"
                type="text"
                placeholder="Enter here"
              />
            </div>
            <div className="flex space-between">
              <MySelect
                className="input-control wd48"
                label="City *"
                name="city"
              >
                <option>Select here</option>
                <option value="delhi">Delhi</option>
                <option value="mumbai">Mumbai</option>
                <option value="chennai">Channai</option>
              </MySelect>
              <MySelect
                className="input-control wd48"
                label="State *"
                name="state"
              >
                <option>Select here</option>
                <option value="delhi">Delhi</option>
                <option value="up">Utter Pradesh</option>
              </MySelect>
            </div>

            <div className="submit-wrapper flex space-between conform">
              <button type="reset" className="border-btn">Cancel</button>
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
