import { modalSuccess, modalWarning } from "../intercept";
import APIServices from "../../services";
export async function editAddressApi(values, addressId, setAddressLoader, addressList) {
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
  if (result.data) {
  }
  if (result.data.status === 1) {
    modalSuccess("success", result.data.message);
    addressList()
  } else {
    modalWarning("error", result.data.message);
    setAddressLoader(false)
  }
  return result.data;
}
