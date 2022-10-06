import * as yup from "yup";

export const shippingDetailsvalidation = yup.object().shape({
  fullName: yup.string().required('Required'),
  addressLine1: yup.string().required('Required'),
  addressLine2: yup.string().required('Required'),
  postalCode: yup.number().required('Required'),
  country: yup.string().required('Required'),
  city: yup.string().required('Required'),
  state: yup.string().required('Required'),
});
