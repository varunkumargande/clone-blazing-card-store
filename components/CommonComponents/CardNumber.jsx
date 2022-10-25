import React from "react";
import { useField } from "formik";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearState } from "../../store/becomeSeller/action";


export const CardNumber = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta, helpers] = useField(props);
  
  const getCardValue = () => {
    return props.formProps.values.cardNumber
      .replace(/\s/g, "")
      .replace(/(\w{4})/g, "$1 ")
      .trim()
  }
  const handleChangeText = () => {
    if (
      !!props?.formProps?.initialValues?.expiry &&
      !!props?.formProps?.initialValues?.cvv
    ) {
      if(!props.clearState){
        props.dispatch(clearState())
        props?.formProps?.setFieldValue("cvv", "");
      props?.formProps?.setFieldValue("expiry", "");
      }
    }
  };
  return (
    <>
      <div className={props.className}>
        <label htmlFor={props.id || props.name}>{label}</label>
        <input className="text-input" maxLength={19} {...field} {...props} value={getCardValue()} onInput={() => handleChangeText()} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    </>
  );
};
