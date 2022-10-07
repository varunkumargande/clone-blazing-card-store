import { modalSuccess } from "../intercept";
import APIServices from "../../services";
export async function UserAddAddress(values, setAddressLoader, addressList) {
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
  if (result.status == 200) {
    addressList();
    setAddressLoader(false)
    modalSuccess("success", "Address Added")
  }
}
