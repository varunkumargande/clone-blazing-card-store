import APIServices from "../../services";
import { show } from "../../store/toast/action";
import { apiValidation } from "../utils/apiValidation";

export async function UserAddAddress(
  values,
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
  const result = await APIServices.create("CustomerAddress/add-address", data);
  const resp = apiValidation(result, dispatch);
  if (resp) {
    addressList();
  }
  setAddressLoader(false)
}
