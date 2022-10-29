import * as yup from "yup";

export const basicDetailvalidation = yup.object().shape({
  fullName: yup.string().required('Please Enter Your Full name'),
  uniqueId: yup.number().typeError("Invalid Details Entered").required("Please Enter your UniqueId"),
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
