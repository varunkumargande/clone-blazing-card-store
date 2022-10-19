import React, { useState } from "react";
import { useField, Field } from "formik";
import IconUpload from "../Icons/IconUpload";
import IconChecked from "../Icons/IconChecked";
import IconClose from "../Icons/IconClose";
import { uploadImageToServer } from "../../utilities/common-helpers";
import DefaultConstants from "../../utilities/constants";
import useSelection from "antd/lib/table/hooks/useSelection";
import { useSelector } from "react-redux";

export default function FileUpload({ label, ...props }) {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  const [fileName, setFileName] = useState(null);
  const handleFileSubmission = (event) => {
    props.formProps.setFieldValue("upload", event.currentTarget.files[0]);
    props.setImage(event.currentTarget.files[0]);
    setFileName(event.currentTarget.files[0].name);
  };
  
  const handleCloseImage = () =>{
    props.setImageData(null)
  }
  return (
    <>
      <div className={props.className}>
        <div className="flex space-between flex-center">
          <label htmlFor={props.id || props.name}>{label}</label>{" "}
          {/* <span className="max-limit">
            Please upload identification document
          </span> */}
        </div>
        <div className="uplad-wrapper flex justify-center flex-center">
          {/* Processing */}
          {/* <div className="processing flex column justify-center flex-center">
            <div className="process mb8">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 34 34">
                <circle cx="16" cy="16" r="16" class="progress-bar__background" />
                <circle cx="16" cy="16" r="16" strokeDashoffset="25" class="progress-bar__progress " />
              </svg>
              <span className="remaing-time">
                <strong>75%</strong><br />
                <span className="uploading">Uploading...</span>
              </span>
            </div>
            <button className="border-btn">Cancel</button>
          </div>     */}
          {/* processed */}
          {/* <div className="processing flex column justify-center flex-center">
            <div className="process mb8">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 34 34">
                <circle cx="16" cy="16" r="16" class="progress-bar__background" />
                <circle cx="16" cy="16" r="16" strokeDashoffset="0" class="progress-bar__progress " />
              </svg>
              <span className="remaing-time">
                <IconChecked />
              </span>
            </div>
            <div className="uploaded">File Uploaded!</div>
          </div>     */}
          {/* Uploaded */}
          { !!props.imageData ? (
            <>
              <div className="processing flex column justify-center flex-center">
                <div className="imagewrapper mb16">
                  <img src={props.imageData} height="200px" width="100%" alt="" />
                </div>
                <div className="imageName flex space-between flex-center">
                  <span>{fileName}</span>
                  <button className="remove flex flex-center justify-center" onClick={handleCloseImage}>
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
                {meta.touched && meta.error ? (
                  <div className="error">{meta.error}</div>
                ) : null}
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
      </div>
    </>
  );
}
