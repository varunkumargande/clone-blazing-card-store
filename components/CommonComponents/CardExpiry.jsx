import React from "react";
import { useField } from "formik";
import { clearState } from "../../store/becomeSeller/action";

export const CardExpiry = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta, helpers] = useField(props);
  const handleChangeText = () => {
    if (
      !!props?.formProps?.initialValues?.cardNumber &&
      !!props?.formProps?.initialValues?.cvv
    ) {
      if(!props.clearState){
        props.dispatch(clearState())
      props?.formProps?.setFieldValue("cvv", "");
      props?.formProps?.setFieldValue("cardNumber", "");
      }
    }
  };
 
  return (
    <>
      <div className={props.className}>
        <label htmlFor={props.id || props.name}>{label}</label>
        <input
          maxLength={5}
          className="text-input"
          {...field}
          {...props}
          onInput={() => handleChangeText()}
        />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    </>
  );
};
