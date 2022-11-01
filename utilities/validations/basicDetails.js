import * as yup from "yup";
import { regex } from "../../components/Constants/regex";

export const basicDetailvalidation = yup.object().shape({
  fullName: yup.string().matches(regex.onlyAlphabetsBothCases, 'Please enter letters only').required('Please Enter Your Full name'),
  uniqueId: yup.string().matches(regex.onlyDigits, 'Please enter digits only').min(9, "Digits should be equal to 9").required("Please Enter your UniqueId"),
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
