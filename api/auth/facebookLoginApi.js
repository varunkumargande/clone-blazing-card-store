import { modalSuccess } from "../intercept";
import axios from "axios";
import { getProfile } from "../../store/profile/action";
import { apiBaseUrl } from "../url";
import { removeCurrentUrlInLocal } from "../../utilities/utils";
import Router from "next/router";
import { login } from "../../store/auth/action";

export async function facebookLoginApi(data, dispatch) {
  let splitName = data?.name.split(" ");
  const jsonData = {
    emailId: data?.email,
    firstName: splitName[0],
    lastName: splitName[1],
    oauthData: "Facebook-login",
    type: "facebook",
  };
  const result = await axios.post(`${apiBaseUrl}/facebook-login`, jsonData);
  if (result && result.data && result.data.status === 1) {
    localStorage.setItem("blazingToken", result.data.data.token);
    localStorage.setItem("blazingUser", JSON.stringify(result.data.data.user));
    localStorage.setItem(
      "chat-app-current-user",
      JSON.stringify(result.data.data.chatUser)
    );
    getProfile(JSON.stringify(result.data.data.user));
    modalSuccess("success", result.data.message);
    dispatch(login());
    if (localStorage.getItem("login_redirection_url")) {
      Router.push(localStorage.getItem("login_redirection_url"));
      removeCurrentUrlInLocal();
    } else {
      Router.push("/");
    }
  }
}
