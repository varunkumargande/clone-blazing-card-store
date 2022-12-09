import * as yup from "yup";
import { regex } from "../../components/Constants/regex";

export const shippingDetailsvalidation = yup.object().shape({
  firstName: yup.string().matches(regex.onlyAlphabetsBothCases, 'Please enter letters only').required('Required'),
  lastName: yup.string().matches(regex.onlyAlphabetsBothCases, 'Please enter letters only').required('Required'),
  addressLine1: yup.string().required('Required'),
  addressLine2: yup.string(),
  postalCode: yup.number().required('Required').typeError('Please enter digits only'),
  country: yup.string().required('Required'),
  city: yup.string().required('Required'),
  state: yup.string().required('Required'),
});
