import React, { useEffect, useState } from "react";
import { useField, Field } from "formik";
import IconUpload from "../Icons/IconUpload";
import IconClose from "../Icons/IconClose";
import { useSelector } from "react-redux";
import { ImageTransformation } from "../Constants/imageConstants";
import CloudinaryImage from "./CloudinaryImage";

export default function FileUpload({ label, ...props }) {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  const [fileName, setFileName] = useState(null);
  const documents = useSelector(
    (state) => state?.becomeSeller?.basicDetails?.documents
  );
  const [uploadErrorMessage, setUploadErrorMessage] = useState("");  
  const handleFileSubmission = (event) => {
    const file = event.currentTarget.files[0];
    if (
      file &&
      ["jpeg", "jpg", "png"].includes(file.type.split("/")[1]) &&
      parseFloat((file.size / 1000000).toFixed(2)) < 5
    ) {
      props.formProps.setFieldValue("upload", file);
      props.setImage(file);
      setFileName(file.name);
      setUploadErrorMessage("")
    } else {
      setUploadErrorMessage("File size should be less than 5MB and format should be png, jpg, jpeg");
    }
  };

  const handleCloseImage = () => {
    if (!!props.imageData) {
      props.setImageData(null);
    }
    if (!!documents?.image) {
      documents.image = null;
      setFileName(null);
    }
    props?.formProps?.setFieldValue("upload", "");
  };

  useEffect(() => {
    if (!!documents?.image && !!documents?.path && !!documents?.fileName) {
      setFileName(documents?.fileName);
    }
  }, []);

  return (
    <>
      <div className={props.className}>
        <div className="flex space-between flex-center">
          <label htmlFor={props.id || props.name}>{label}</label>{" "}
          {(!!uploadErrorMessage.length || (meta.touched && meta.error)) && (
            <span className="errorMessage">{uploadErrorMessage || meta.error}</span>
          )}

        </div>
        <div className="uplad-wrapper flex justify-center flex-center">
          {/* Processing */}
          {/* <div className="processing flex column justify-center flex-center">
            <div className="process mb8">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 34 34">
                <circle cx="16" cy="16" r="16" className="progress-bar__background" />
                <circle cx="16" cy="16" r="16" strokeDashoffset="25" className="progress-bar__progress " />
              </svg>
              <span className="remaing-time">
                <strong>75%</strong><br />
                <span className="uploading">Uploading...</span>
              </span>
            </div>max-width: 206px
            <button className="border-btn">Cancel</button>
          </div>     */}
          {/* processed */}
          {/* <div className="processing flex column justify-center flex-center">
            <div className="process mb8">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 34 34">
                <circle cx="16" cy="16" r="16" className="progress-bar__background" />
                <circle cx="16" cy="16" r="16" strokeDashoffset="0" className="progress-bar__progress " />
              </svg>
              <span className="remaing-time">
                <IconChecked />
              </span>
            </div>
            <div className="uploaded">File Uploaded!</div>
          </div>     */}
          {/* Uploaded */}
          {!!props.imageData || (!!documents?.image && !!documents?.path) ? (
            <>
              <div className="processing flex column justify-center flex-center">
                <div className="imagewrapper mb16">
                  {!!props.imageData ? (
                    <>
                      <img
                        src={props.imageData}
                        height="130px"
                        width="206px"
                        alt=""
                      />
                    </>
                  ) : !!documents?.image && !!documents?.path ? (
                    <>
                      <CloudinaryImage
                        imageUrl={`${documents?.path}/${documents?.image}`}
                        keyId={`${documents?.path}/${documents?.image}`}
                        transformation={ImageTransformation.sellerDocument}
                        alternative="Document"
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="imageName flex space-between flex-center">
                  <span>{fileName}</span>
                  <button
                    className="remove flex flex-center justify-center"
                    onClick={handleCloseImage}
                  >
                    <IconClose />
                  </button>
                </div>
              </div>{" "}
            </>
          ) : (
            <>
              <label className="upload flex column justify-center flex-center">
                <Field
                  {...field}
                  {...props}
                  value={undefined}
                  onChange={(event) => handleFileSubmission(event)}
                />
                <IconUpload />
                <span className="drag">Drag & Drop your files here</span>
                <span className="primary-btn">Upload</span>
              </label>
            </>
          )}
          {/* {
            !!props.imageData && props.percentage < 100 ? (<p>{props.percentage & !!props.imageData}</p>) : (<>{props.percentage & !!props.imageData}</>)
          } */}
        </div>
        <div className="flex justify-right fs-12">File size max. upto 5mb</div>
      </div>
    </>
  );
}
