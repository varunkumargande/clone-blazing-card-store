import { chatConstant } from "../Constants";
import Router from "next/router";
import { loginRoute } from "../../chatService";
import axios from "axios";
import { modalWarning } from "../../api/intercept";

export const storageHelper = (callback) => {
  if (localStorage.getItem("blazingUser")) {
    const userData = JSON.parse(localStorage.getItem("blazingUser"));
    callback(userData);
  }
};
