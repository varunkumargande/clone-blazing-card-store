import { registerConstant } from "../../components/Constants/auth";
import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  firstname: Yup.string()
    .matches(
      registerConstant.form.firstNameField.regex,
      registerConstant.form.firstNameField.regexMessage
    )
    .max(20)
    .required(registerConstant.form.firstNameField.required),

  lastname: Yup.string()
    .matches(
      registerConstant.form.lastNameField.regex,
      registerConstant.form.lastNameField.regexMessage
    )
    .max(20)
    .required(registerConstant.form.lastNameField.required),

  email: Yup.string()
    .email(registerConstant.form.emailField.valid)
    .required(registerConstant.form.emailField.required),

  number: Yup.string()
    .matches(
      registerConstant.form.contactField.regex,
      registerConstant.form.contactField.regexMessage
    )
    .required(registerConstant.form.contactField.required)
    .min(10)
    .max(12),

  password: Yup.string()
    .matches(
      registerConstant.form.passwordField.regex,
      registerConstant.form.passwordField.regexMessage
    )
    .required(registerConstant.form.passwordField.required),

  cpass: Yup.string()
    .required(registerConstant.form.conPasswordField.required)
    .oneOf([Yup.ref("password"), null], "Passwords must match"),

  username: Yup.string()
    .matches(
      registerConstant.form.usernameField.regex,
      registerConstant.form.usernameField.regexMessage
    )
    .max(8)
    .required(registerConstant.form.usernameField.required),

  countryCode: Yup.string().required("Country Code is required"),
});

export const registerInitialValues = () => {
  return {
    firstname: "",
    lastname: "",
    number: "",
    email: "",
    password: "",
    cpass: "",
    username: "",
    countryCode: "",
  };
};