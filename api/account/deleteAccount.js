import { ViewAllQuestionApi } from "../product/viewAllQuestionApi";
import APIServices from "../../services";
import { modalSuccess, modalWarning } from "../intercept";
import { logOut } from "../../store/auth/action";
import Router from "next/router";

export async function deleteAccountApi(values) {
  const data = JSON.stringify({
    emailId: values.emailId,
    password: values.password,
    type: "normal",
  });

  const result = await APIServices.create("customer/delete", data);
  if (result && result.data && result.data.data) {
    modalSuccess("success", "Accout has deleted !");
    localStorage.clear();
    Router.push("/account/login")
  } else {
    modalSuccess("success", "UnAuthorized user");
    Router.push("/account/login")
  }
}
