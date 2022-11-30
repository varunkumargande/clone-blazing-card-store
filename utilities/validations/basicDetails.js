import * as yup from "yup";
import { regex } from "../../components/Constants/regex";

export const basicDetailvalidation = yup.object().shape({
  firstName: yup.string().matches(regex.onlyAlphabetsBothCases, 'Please enter letters only').required('Please enter a valid First Name'),
  lastName: yup.string().matches(regex.onlyAlphabetsBothCases, 'Please enter letters only').required('Please enter a valid Last Name'),
  upload: yup
    .mixed()
    .required("Please upload identification document")
    // .test(
    //   "fileSize",
    //   "File is too large",
    //   value => value && value.size <= 4000000
    // )
    // .test(
    //   "fileFormat",
    //   "Unsupported Format, Please use JPG, JPEG or PNG",
    //   value => value && ['jpg', 'jpeg', 'png'].includes(value.type)
    // )
});
