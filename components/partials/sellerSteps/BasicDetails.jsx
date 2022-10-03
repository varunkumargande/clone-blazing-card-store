import React from "react";
import { Formik, Form } from "formik";
import { basicDetailvalidation } from "../../../pages/become-seller/validations/basicDetails";
import { TextInput } from "../../CommonComponents/TextInput";
import FileUpload from "../../CommonComponents/fileUpload";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addBasicData } from "../../../store/becomeSeller/action";
import { useSelector } from "react-redux";
import { useState } from "react";


export default function BasicDetails() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [imageData, setImageData] = useState(null)
  const BasicDetails = useSelector(
    (state) => state?.becomeSeller?.basicDetails
  );

  const handleSubmit = (values) => {
    const data = {
      fullName: values.fullName,
      ssn: values.ssn,
      address: values.address,
      documents: {
        fileName: values?.upload?.name,
        image: imageData,
        path: "user/",
      },
    };
    dispatch(addBasicData(data, router));
  };

  const setImage = (file) => {
    getBase64(file, (result) => {
      setImageData(result)
    });
  }

  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  // useEffect(() => {
  //   if (!!BasicDetails) {
  //     router.push("/become-seller/shippingDetails", undefined, {
  //       shallow: true,
  //     });
  //   }
  // }, [BasicDetails]);

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
            handleSubmit(values);
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
                label="Document *"
                name="upload"
                type="file"
                id="upload"
                placeholder="Enter here"
                formProps={formProps}
                setImage={setImage}
              />
            </div>
            <div className="submit-wrapper flex space-between">
              <button type="reset" onClick={ () => {
              } } className="border-btn">Cancel</button>
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
