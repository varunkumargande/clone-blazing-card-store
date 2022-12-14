import APIServices from "../../services";
import { apiValidation } from "../utils/apiValidation";

export async function editAddressApi(
  values,
  addressId,
  setAddressLoader,
  addressList,
  dispatch
) {
  const data = JSON.stringify({
    address1: values.address1,
    address2: values.address2,
    city: values.city,
    state: values.state,
    postcode: values.postcode,
    countryId: values.countryId,
    addressType: 1,
    company: values.company,
  });

  const result = await APIServices.update(
    "CustomerAddress/update-address",
    addressId,
    data
  );
  const resp = apiValidation(result, dispatch);
  if (resp) {
    addressList();
  }
  setAddressLoader(false);

  return result.data;
}
