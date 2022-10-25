import React from "react";
import { useField } from "formik";


export const CardExpiry = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta, helpers] = useField(props);

  const handleData = () => {
    console.log(props.formProps.setFieldValue("cvv", "133")      )
  }

  return (
    <>
      <div className={props.className}>
        <label htmlFor={props.id || props.name}>{label}</label>
        <input maxLength={5} className="text-input" {...field} {...props} onInput={() => handleData()} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    </>
  );
};
