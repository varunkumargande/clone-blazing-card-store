export const registerConstant = {
  heading: {
    name: "Sign Up to Blazing Cards",
  },
  form: {
    firstNameField: {
      name: "firstname",
      placeholder: "Firstname",
      label: "First Name",
      regex: /^[A-Za-z ]*$/,
      regexMessage: "Please enter valid firstname",
      required: "Required",
    },
    lastNameField: {
      name: "lastname",
      placeholder: "Lastname",
      label: "Last Name",
      regex: /^[A-Za-z ]*$/,
      regexMessage: "Please enter valid lastname",
      required: "Required",
    },
    emailField: {
      name: "email",
      placeholder: "Email Address",
      label: "Email Address",
      valid: "Invalid email format",
      required: "Required",
    },
    usernameField: {
      name: "username",
      placeholder: "Username",
      label: "Username",
      regex: /^[a-zA-Z0-9]*$/,
      regexMessage: "Please enter valid username",
      required: "Required",
    },
    contactField: {
      name: "number",
      placeholder: "Contact Number",
      label: "Contact Number",
      regex:
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      regexMessage: "Phone number is not valid",
      required: "Required",
    },
    passwordField: {
      name: "password",
      placeholder: "Password",
      label: "Password",
      regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      regexMessage:
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character",
      required: "Required",
    },
    conPasswordField: {
      name: "cpass",
      placeholder: "Confirm Password",
      label: "Confirm Password",
      required: "Required",
      valid: "Passwords must match",
    },
    button: {
      name: "Sign up",
    },
    link: {
      signin: "Sign in",
    },
    forgetPassword: "Forgot Password",
  },
};
