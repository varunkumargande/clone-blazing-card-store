// register constant
export const registerConstant = {
  heading: {
    name: "Sign Up to Blazing Cards",
  },
  form: {
    firstNameField: {
      name: "firstname",
      placeholder: "First Name",
      label: "First Name",
      regex: /^[A-Za-z ]*$/,
      regexMessage: "Please enter a valid first name",
      required: "First name is required",
    },
    lastNameField: {
      name: "lastname",
      placeholder: "Last Name",
      label: "Last Name",
      regex: /^[A-Za-z ]*$/,
      regexMessage: "Please enter a valid last name",
      required: "Last name is required",
    },
    emailField: {
      name: "email",
      placeholder: "Email Address",
      label: "Email Address",
      valid: "Please enter a valid email address",
      required: "Email address is required",
    },
    usernameField: {
      name: "username",
      placeholder: "Username",
      label: "Username",
      regex: /^[a-zA-Z0-9]*$/,
      regexMessage: "Please enter a valid Username",
      required: "Username is required",
    },
    contactField: {
      name: "number",
      placeholder: "Contact Number",
      label: "Contact Number*",
      regex: /^([+]1){0,1}[1-9]\d{9}$/,

      // ToDo: Need to remove this code. Keeping this for reference.
      // /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,

      regexMessage:
        "Please enter a valid mobile number with country and area code(Ex: +19999999999 or 9999999999)",
      required: "Contact number is required",
    },
    countryCodeField: {
      name: "countryCode",
      placeholder: "",
      required: "Country Code is required",
    },
    passwordField: {
      name: "password",
      placeholder: "Password",
      label: "Password",
      regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      regexMessage:
        "Password must be atleast of 8 characters, One Uppercase, One Lowercase, One Number and One Special Case Character",
      required: "Password is required",
    },
    conPasswordField: {
      name: "cpass",
      placeholder: "Confirm Password",
      label: "Confirm Password",
      required: "Confirm password is required",
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

// login constants
export const loginConstant = {
  heading: {
    name: "Sign In to Blazing Cards",
  },
  form: {
    emailField: {
      emailName: "email",
      emailLabel: "Email Address *",
      emailPlaceholder: "Enter email address",
      validateEmail: "Invalid email address",
      requiredEmail: "Email is required",
    },
    passwordField: {
      passwordName: "password",
      passwordLabel: "Password *",
      passwordPlaceholder: "Enter password address",
      requiredPassword: "Password is required",
      validatePassword:
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character",
      passwordRegex:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    },
    button: {
      name: "Sign in",
    },
    link: {
      signup: "Sign Up",
    },
    forgetPassword: "Forgot Password",
  },
};

//forgot password constant
export const forgotPasswordConstant = {
  requiredEmail: "Email is required",
};
