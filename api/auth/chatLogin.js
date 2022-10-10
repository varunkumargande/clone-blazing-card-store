import { loginRoute } from "../../chatService";
import axios from "axios";
import { chatConstant } from "../../components/Constants/chatLocal";
import { modalSuccess, modalWarning } from "../intercept";
import Router from "next/router";

export async function chatLogin() {
  const chatData = {
    username: JSON.parse(sessionStorage.getItem("spurtUser")).username,
    password: sessionStorage.getItem("userPass"),
  };
  const { data } = await axios.post(loginRoute, chatData);
  if (data.status === true) {
    localStorage.setItem(
      chatConstant["localStorageKey"],
      JSON.stringify(data.user)
    );
    Router.push("/chat")
    modalSuccess('success',"success")
  } else {
    alert(data?.msg)
    modalWarning("error", "error")
  }
}
