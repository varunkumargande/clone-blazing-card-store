import { loginRoute } from "../../chatService";
import axios from "axios";
import { chatConstant } from "../../components/Constants";
import { modalSuccess, modalWarning } from "../intercept";
import Router from "next/router";

export async function chatLogin() {
  const token = localStorage.getItem("blazingToken");
  const chatHeader = {
    // 'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  const { data } = await axios.post(loginRoute, "", {
    headers: chatHeader,
  });
  if (data.success === true) {
    localStorage.setItem(
      chatConstant["localStorageKey"],
      JSON.stringify(data.response.user)
    );
    Router.push("/chat");
    modalSuccess("success", "success");
  } else {
    alert(data?.msg);
    modalWarning("error", "error");
  }
}

//  const chatData = {
//    username: JSON.parse(localStorage.getItem("blazingUser")).username,
//    password: localStorage.getItem("userPass"),
//  };
//  const { data } = await axios.post(loginRoute, chatData);
//  if (data.status === true) {
//    localStorage.setItem(
//      chatConstant["localStorageKey"],
//      JSON.stringify(data.user)
//    );
//    Router.push("/chat")
//    modalSuccess('success',"success")
//  } else {
//    alert(data?.msg)
//    modalWarning("error", "error")
//  }
