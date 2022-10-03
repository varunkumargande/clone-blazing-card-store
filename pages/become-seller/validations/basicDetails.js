import * as yup from "yup";

export const basicDetailvalidation = yup.object().shape({
  fullName: yup.string().required('Please Enter Your Full name Here'),
  ssn: yup.string().required("Please Enter your SSN"),
  address: yup.string().required("Please enter your adress"),
  // upload: yup
  //   .mixed()
  //   .required("A file is required")
    // .test(
    //   "fileSize",
    //   "File too large",
    //   value => value && value.size <= 2000000000
    // )
    // .test(
    //   "fileFormat",
    //   "Unsupported Format",
    //   value => value && ['jpg', 'jpeg', 'png'].includes(value.type)
    // )
});
