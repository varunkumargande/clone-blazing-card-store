import React from "react";
import IconUpload from "../../Icons/IconUpload";
import { Formik, Form, useField } from "formik";
import { basicDetailvalidation } from "../../../pages/become-seller/validations/basicDetails";
import { TextInput } from "../../CommonComponents/TextInput";
import FileUpload from "../../CommonComponents/fileUpload";
import { useRouter } from "next/router";
useRouter;

export default function BasicDetails() {
  const router = useRouter();
  return (
    <div className="step-container">
      <h3>Basic Details</h3>
      <div className="sub-title">
        Blazing Cards takes marketplace safety seriously. Sellers must have a
        valid payment method on file. In rare occasions, sellers are charged a
        $100 fee for severe or repeated infractions of our policies.
      </div>
      <Formik
        initialValues={{
          fullName: "",
          ssn: "",
          address: "",
          upload: "",
        }}
        validationSchema={basicDetailvalidation}
        onSubmit={(values) => {
          if (values) {
            // router.push('/become-seller/shippingDetails', undefined, { shallow: true })
          }
          console.log(values);
        }}
      >
        <Form>
          <div className="flex space-between">
            <TextInput
              className="input-control wd48"
              label="Full Name *"
              name="fullName"
              type="text"
              placeholder="Enter here"
            />

            <TextInput
              className="input-control wd48"
              label="SSN *"
              name="ssn"
              type="text"
              placeholder="Enter here"
            />
          </div>
          <div className="flex space-between">
            <TextInput
              className="input-control wd48"
              label="Address *"
              name="address"
              type="text"
              placeholder="Enter here"
            />
          </div>
          <div className="flex space-between">
            <FileUpload
              className="input-control wd48"
              label="Address *"
              name="upload"
              type="file"
              id="upload"
              placeholder="Enter here"
          />
          </div>
          <div className="submit-wrapper flex space-between">
            <button className="border-btn">Cancel</button>
            <button type="submit" className="primary-btn">
              Save & Next
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
