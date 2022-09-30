import { chatConstant } from "../Constants/chatLocal";
import Router from "next/router";
import { loginRoute } from "../../chatService";
import axios from "axios";
import { modalWarning } from "../../api/intercept";

export const storageHelper = (callback) => {
  if (sessionStorage.getItem("spurtUser")) {
    const userData = JSON.parse(sessionStorage.getItem("spurtUser"));
    callback(userData);
  }
};
