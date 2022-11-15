import { modalSuccess, modalWarning } from "../intercept";
import APIServices from "../../services";
import { getErrorMessage } from "../../utilities/common-helpers";
import { show } from "../../store/toast/action";

export async function resetPassApi(key, newPass, Router, dispatch) {
  const data = JSON.stringify({
    key: key,
    newPassword: newPass,
  });
  const result = await APIServices.updateUser("customer/reset-password", data);
  const toastMessage = {
    type: '',
    message: ''
  };
  if (result && result.data && result.data.status === 1) {
    Router.push("/account/verify-success");
    toastMessage.message = result?.data?.message;
    toastMessage.type = 'success';
  } else {
    toastMessage.message = getErrorMessage(result);
    toastMessage.type = 'error';
  }
  if (dispatch) {
    dispatch(show({ message: toastMessage.message, type: toastMessage.type }));
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
