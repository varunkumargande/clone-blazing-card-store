import * as yup from "yup";

export const paymentDetailsvalidation = yup.object().shape({
  paymentMethod: yup.string().required('Required'),
  cardNumber: yup.number().typeError("Invalid details entered").required('Required'),
  expiry: yup.string().length(5).required('Required').matches(/^\d{2}\/\d{2}$/g, 'Inavlid Expiry'),
  cvv: yup.number().typeError("Invalid details entered").required('Required'),
  country: yup.string().required('Required'),
});
