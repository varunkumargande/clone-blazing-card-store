import React from "react";
import { useField  } from "formik";

export default function MySelect({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className={props.className}>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error && (
        <div className="errorMessage">{meta.error}</div>
      )}
    </div>
  );
};