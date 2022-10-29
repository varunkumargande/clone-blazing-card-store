import { chatConstant } from "../Constants/chatLocal";
import Router from "next/router";
import { loginRoute } from "../../chatService";
import axios from "axios";
import { modalWarning } from "../../api/intercept";

export const storageHelper = (callback) => {
  if (sessionStorage.getItem("blazingUser")) {
    const userData = JSON.parse(sessionStorage.getItem("blazingUser"));
    callback(userData);
  }
};
