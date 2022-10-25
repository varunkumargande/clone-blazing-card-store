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
  const [updateFileName, setUpdateFileName] = useState(BasicDetails?.documents?.image || null)

  const handleSubmit = async (values) => {
    if (!!values?.fullName && !!values?.uniqueId && !!values?.upload) {
      const time = new Date().getTime();
      const fileName  = `${time}_${values?.upload?.name}`
      const data = {
        fullName: values.fullName,
        uniqueId: values.uniqueId,
        documents: {
          fileName: values?.upload?.name,
          image: updateFileName,
          path: DefaultConstants.CommonConstants.DOCUMENT_UPLOAD_USER_PATH,
        },
      };
      dispatch(addBasicData(data, router));
  }
  };
  const getBase64 = (file, cb) => {
    if(!!file){
      let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
    };
    }
  };
  

  const setImage = (file) => {
    if(!!file){
      getBase64(file, (result) => {
        handleFileUpload(file,result)
      });
    }
   
  }

  const handleFileUpload = async (image, base64) => {
    const uploadImage = await uploadImageToServer(image, DefaultConstants.CommonConstants.DOCUMENT_UPLOAD_USER_PATH);
    if(uploadImage.status==200){
      setImageData(base64)
      setUpdateFileName(uploadImage.fileName)
    }
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
          uniqueId: BasicDetails?.uniqueId ?? "",
          upload: BasicDetails?.documents?.fileName ? new File([""], BasicDetails?.documents?.fileName,{
            type : "image/jpeg"
          } ) : "",
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
                label="Unique Id *"
                name="uniqueId"
                type="text"
                placeholder="Enter here"
                maxLength={9}
                minLength={9}
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
                imageData={imageData}
                setImageData={setImageData}
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
