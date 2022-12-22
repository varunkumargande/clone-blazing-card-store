import APIServices from "../../services";
import { show } from "../../store/toast/action";
import { getErrorMessage } from "../../utilities/common-helpers";
import getProfileApi from "../home/getInfo";

export async function deleteProfileImageApi(
  dispatch,
  setIsProfileImageDelete,
  setClearAvatar
) {
  const result = await APIServices.deleteAll(
    "customer/deleteCustomerProfileImage"
  );
  if (result?.status === 200) {
    getProfileApi();
    setIsProfileImageDelete(false);
    setClearAvatar(true);
    dispatch(show({ message: result.data.message, type: "success" }));
  } else {
    const errorMessage = getErrorMessage(result);
    dispatch(show({ message: errorMessage, type: "error" }));
  }
}
