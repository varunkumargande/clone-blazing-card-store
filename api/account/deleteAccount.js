import { ViewAllQuestionApi } from "../product/viewAllQuestionApi";
import APIServices from "../../services";
import { modalSuccess, modalWarning } from "../intercept";
import { logOut } from "../../store/auth/action";
import Router from "next/router";

export async function deleteAccountApi(values) {
  const data = JSON.stringify({
    userId: values.userName,
    password: values.password,
    type: "normal",
  });

  const result = await APIServices.create("customer/delete", data);
  if (result && result?.data && result?.data?.status === 1) {
    modalSuccess("success", "Your Account has been deleted!");
    localStorage.clear();
    sessionStorage.clear();
    Router.push("/");
  } else {
    modalSuccess("success", "UnAuthorized user");
  }
}
