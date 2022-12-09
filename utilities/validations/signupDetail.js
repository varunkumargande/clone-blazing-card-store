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
    .max(12)
    .min(8)
    .required(registerConstant.form.usernameField.required)
    .matches(
      registerConstant.form.usernameField.regex,
      registerConstant.form.usernameField.regexMessage
    ),
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
  };
};
