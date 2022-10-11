import { modalSuccess, modalWarning } from "../intercept";
import APIServices from "../../services";

export async function resetPassApi(key, newPass, Router, setError) {
  const data = JSON.stringify({
    key: key,
    newPassword: newPass,
  });
  const result = await APIServices.updateUser("customer/reset-password", data);

  if (result && result.data && result.data.status === 1) {
    Router.push("/account/verify-success");
    modalSuccess("success", result.data.message);
  }
}

export async function resetConfomPassApi(key, setPageTrue) {
  const result = await APIServices.get(
    "customer/forgot-password-key-check",
    key
  );
  if (result && result.data && result.data.status === 1) {
    setPageTrue(true);
    // modalSuccess("success",result.data.message)
  } else {
    modalSuccess("error", result.data.message);
  }
}
