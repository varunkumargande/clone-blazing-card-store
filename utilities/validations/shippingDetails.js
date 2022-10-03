import * as yup from "yup";

export const shippingDetailsvalidation = yup.object().shape({
  fullName: yup.string().required('Required'),
  addressLine1: yup.string().required('Required'),
  addressLine2: yup.string().required('Required'),
  postalcode: yup.number().typeError("Invalid details entered").required('Required'),
  country: yup.string().required('Required'),
  city: yup.string().required('Required'),
  state: yup.string().required('Required'),
});
