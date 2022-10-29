import APIServices from "../../services";
import { apiConstant } from "../../components/Constants/apis";

/**
 * vendor login feature from store
 */
export async function vendorAuthApi() {
  const token = sessionStorage.getItem("blazingToken");
  const chatHeader = {
    Authorization: `Bearer ${token}`,
  };
  const result = await APIServices.getAll(apiConstant.vendor.VENDOR_AUTH_API);
  if (result.status == 200) {
    window.open(
      apiConstant.vendor.VENDOR_LOGIN_URL +
        "?auth=" +
        result?.data?.data?.token,
      "_blank",
      "noopener,noreferrer"
    );
  }
}
/**
 * =================================================================================
 */
