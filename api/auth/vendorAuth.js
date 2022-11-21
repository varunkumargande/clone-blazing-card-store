import APIServices from "../../services";
import { apiConstant } from "../../components/Constants";
import { show } from "../../store/toast/action";
import { getErrorMessage } from "../../utilities/common-helpers";

/**
 * vendor login feature from store
 */
export async function vendorAuthApi(dispatch) {
  const token = localStorage.getItem("blazingToken");
  const result = await APIServices.getAll(
    `${apiConstant.vendor.VENDOR_AUTH_API}?loginType=${apiConstant.vendor.VENDOR_AUTH_TYPE}`
  );
  if (result.status == 200) {
    window
      .open(`${apiConstant.vendor.VENDOR_LOGIN_URL}?auth=${token}`, "mywindow")
      .focus();
  } else {
    const errorMessage = getErrorMessage(result);
    dispatch(show({ message: errorMessage, type: "error" }));
  }
}
/**
 * =================================================================================
 */
