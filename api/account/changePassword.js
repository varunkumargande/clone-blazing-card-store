import APIServices from "../../services";
import { logOut } from "../../store/auth/action";
import { show } from "../../store/toast/action";
import Router from "next/router";
import { getErrorMessage } from "../../utilities/common-helpers";
export async function changePasswordApi(values, setPassLoader, dispatch) {
  const data = JSON.stringify({
    oldPassword: values.currentPassword,
    newPassword: values.newPassword,
  });
  const result = await APIServices.create("customer/change-password", data);

  if (result) {
    setPassLoader(false);
    if (result?.data.status === 1) {
      dispatch(show({ message: result.data.message, type: "success" }));
      localStorage.clear();
      dispatch(logOut());
      Router.push("/account/login");
    } else {
      const errorMessage = getErrorMessage(result);
      dispatch(show({ message: errorMessage, type: "error" }));
    }
    return result.data; 
  }
}
