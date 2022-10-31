import APIServices from "../../services";
import { apiConstant } from "../../components/Constants/apis";

/**
 * vendor login feature from store
 */
export async function vendorAuthApi() {
  const token = sessionStorage.getItem("blazingToken");
  const result = await APIServices.getAll(
    `${apiConstant.vendor.VENDOR_AUTH_API}?loginType=${apiConstant.vendor.VENDOR_AUTH_TYPE}`
  );
  if (result.status == 200) {
    window.open(
      `${apiConstant.vendor.VENDOR_LOGIN_URL}?auth=${token}`,
      "_blank",
      "noopener,noreferrer"
    );
  }
}
/**
 * =================================================================================
 */
