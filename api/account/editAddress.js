import APIServices from "../../services";
import { show } from "../../store/toast/action";
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
  if (result.data.status === 1) {
    addressList();
    dispatch(show({ message: result.data.message, type: "success" }));
  } else {
    dispatch(show({ message: "Error updating information", type: "error" }));
    setAddressLoader(false);
  }
  return result.data;
}
