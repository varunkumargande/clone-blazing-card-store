import * as yup from "yup";

export const paymentDetailsvalidation = yup.object().shape({
  paymentMethod: yup.string().required('Required'),
  cardNumber: yup.number().required('Required').max(16).min(16),
  expiry: yup.string().matches(/^\d{2}\/\d{2}$/g, 'Inavlid Expiry').required('Required').min(5).max(5),
  cvv: yup.number().required('Required').min(3).max(3),
  country: yup.string().required('Required'),
});
