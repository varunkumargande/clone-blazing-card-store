import APIServices from "../../services";
import { logOut } from "../../store/auth/action";
import Router from "next/router";
import { show } from "../../store/toast/action";
import { getErrorMessage } from "../../utilities/common-helpers";
export async function deleteAccountApi(values, dispatch) {
  const data = JSON.stringify({
    userId: values.userName,
    password: values.password,
    type: "normal",
  });

  const result = await APIServices.create("customer/delete", data);
  if (result?.data?.status === 1) {
    dispatch(show({ message: result.data.message, type: "success" }));
    localStorage.clear();
    localStorage.clear();
    dispatch(logOut());
    Router.push("/");
  } else {
    const errorMessage = getErrorMessage(result);
    dispatch(show({ message: errorMessage, type: "error" }));
  }
}
