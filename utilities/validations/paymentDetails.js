import * as yup from "yup";

export const paymentDetailsvalidation = (cardType) => {
  const schema = {
    paymentMethod: yup.string().required('Required'),
    cardNumber: yup.string()
      .required('Required')
      .min(cardType === 'amex' ? 15 : 16, "Card Number is invalid")
      .max(cardType === 'amex' ? 15 : 16, "Card Number is invalid"),
    expiry: yup.string().length(5).required('Required').matches(/^\d{2}\/\d{2}$/g, 'Invalid Expiry'),
    cvv: yup.string().required('Required')
    .min(cardType === 'amex' ? 4 : 3, "Invalid cvv")
    .max(cardType === 'amex' ? 4 : 3, "Invalid cvv"),
    country: yup.string().required('Required'),  
    termCheckBox: yup.bool().oneOf([true], 'Please accept terms & conditions').required('Please accept terms & conditions')
  }

  return yup.object().shape(schema);
} 