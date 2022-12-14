import APIServices from "../../services";
import { show } from "../../store/toast/action";

export async function zipCodeListApi(
  countryId,
  zoneCode,
  setZipCodeList,
  dispatch,
  setZipCodeListLoader
) {
  setZipCodeListLoader(true);
  const result = await APIServices.getAll(
    "location/country-zone-details?countryId=" +
      countryId +
      "&zoneCode=" +
      zoneCode +
      ""
  );
  if (result?.status === 200) {
    setZipCodeList(result?.data?.response[0]?.zipcode);
  } else {
    dispatch(show({ message: result?.data?.message, type: "error" }));
  }
  setZipCodeListLoader(false);
}
