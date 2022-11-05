import APIServices from "../../services";
import { logOut } from "../../store/auth/action";
import Router from "next/router";
import { show } from "../../store/toast/action";
export async function deleteAccountApi(values, dispatch) {
  const data = JSON.stringify({
    userId: values.userName,
    password: values.password,
    type: "normal",
  });

  const result = await APIServices.create("customer/delete", data);
  if (result && result?.data && result?.data?.status === 1) {
    dispatch(show({ message: "Account deleted !", type: "success" }));
    localStorage.clear();
    localStorage.clear();
    dispatch(logOut());
    Router.push("/");
  } else {
    dispatch(show({ message: "UnAuthorized user", type: "error" }));
  }
}
