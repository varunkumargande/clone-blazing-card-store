import React from "react";
import { useField  } from "formik";
import IconUpload from "../Icons/IconUpload";


export default function FileUpload({ label, ...props }){
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <>
      <div className={props.className}>
        <label htmlFor={props.id || props.name}>{label}</label>
        <label className="upload flex column justify-center flex-center">
          <input {...field} {...props}
          />
          {meta.touched && meta.error ? (
            <div className="error">{meta.error}</div>
          ) : null}
          <IconUpload />
          <span className="drag">Drag & Drop your files here</span>
          <span className="primary-btn">Upload</span>
        </label>
      </div>
    </>
  );
};
