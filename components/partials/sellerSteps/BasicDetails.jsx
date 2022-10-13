import React from "react";
import { Formik, Form } from "formik";
import { basicDetailvalidation } from "../../../utilities/validations/basicDetails";
import { TextInput } from "../../CommonComponents/TextInput";
import FileUpload from "../../CommonComponents/fileUpload";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addBasicData } from "../../../store/becomeSeller/action";
import { useSelector } from "react-redux";
import { useState } from "react";
import IconBack from '../../Icons/IconBack';
import BackButton from "../../CommonComponents/BackButton";
import { uploadImageToServer } from "../../../utilities/common-helpers";
import DefaultConstants from "../../../utilities/constants";


export default function BasicDetails() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [imageData, setImageData] = useState(null)
  const BasicDetails = useSelector(
    (state) => state?.becomeSeller?.basicDetails
  );

  const handleSubmit = async (values) => {
    const uploadImage = await uploadImageToServer(imageData, DefaultConstants.CommonConstants.DOCUMENT_UPLOAD_USER_PATH);
    if (uploadImage) {
      const data = {
        fullName: values.fullName,
        ssn: values.ssn,
        documents: {
          fileName: values?.upload?.name,
          image: uploadImage?.fileName,
          path: DefaultConstants.CommonConstants.DOCUMENT_UPLOAD_USER_PATH,
        },
      };
      dispatch(addBasicData(data, router));
  }
  };

  const setImage = (file) => {
    setImageData(file)
  }


  return (
    <div className="step-container">
      <BackButton name={"Basic Details"}/>
      <div className="sub-title">
        Blazing Cards takes marketplace safety seriously. Sellers must have a
        valid payment method on file. In rare occasions, sellers are charged a
        $100 fee for severe or repeated infractions of our policies.
      </div>
      <Formik
        initialValues={{
          fullName: BasicDetails?.fullName ?? "",
          ssn: BasicDetails?.ssn ?? "",
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
              <FileUpload
                className="input-control uplaoad-wrapper wd48"
                label="Upload Doc *"
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
