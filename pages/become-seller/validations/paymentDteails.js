import * as yup from "yup";

export const basicDetailvalidation = yup.object().shape({
  paymentMethod: yup.string().required('Required'),
  cardNumber: yup.number().required('Required'),
  expiry: yup.number().required('Required'),
  cvv: yup.number().required('Required'),
  country: yup.string().required('Required'),
});
