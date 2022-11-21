import { chatConstant } from "../Constants";
import Router from "next/router";
import { loginRoute } from "../../chatService";
import axios from "axios";
import { modalWarning } from "../../api/intercept";

export const chatHelper = async () => {
  if (localStorage.getItem(chatConstant["localStorageKey"])) {
    Router.push("/chat");
  } else {
    const userJson = {
      username: JSON.parse(localStorage.getItem("blazingUser")).username,
      password: localStorage.getItem("userPass"),
    };

    const { data } = await axios.post(loginRoute, userJson);
    if (data.status === true) {
      localStorage.setItem(
        chatConstant["localStorageKey"],
        JSON.stringify(data.user)
      );
      Router.push("/chat");
    }

    if (data.status === false) {
      modalWarning("error", "Something went wrong !");
    }
  }
};
