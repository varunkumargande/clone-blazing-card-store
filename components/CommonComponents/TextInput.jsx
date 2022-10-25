import React from "react";
import { useField } from "formik";
import { clearState } from "../../store/becomeSeller/action";

export const TextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta, helpers] = useField(props);
  const stringLength = props?.maxLength ?? 80;

  const handleChangeText=()=>{
    if(props?.name=='cvv' && !!props?.formProps?.initialValues?.expiry &&
    !!props?.formProps?.initialValues?.cardNumber){
      if(!props.clearState){
        props.dispatch(clearState())
      props?.formProps?.setFieldValue("cardNumber", "");
      props?.formProps?.setFieldValue("expiry", "");
      }
    }
  }
  return (
    <>
      <div className={props.className}>
        <label htmlFor={props.id || props.name}>{label}</label>
        <input className="text-input" maxLength={stringLength} minLength={3} {...field} {...props}  onInput={() => handleChangeText()}/>
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    </>
  );
};
