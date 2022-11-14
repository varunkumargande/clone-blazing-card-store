export const loginConstant = {
  heading: {
    name: "Sign In to Blazing Cards",
  },
  form: {
    emailField: {
      emailName: "email",
      emailLabel: "Email Address*",
      emailPlaceholder: "Enter email address",
      validateEmail: "Invalid email address",
      requiredEmail: "Email is required",
    },
    passwordField: {
      passwordName: "password",
      passwordLabel: "Password *",
      passwordPlaceholder: "Enter password",
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
