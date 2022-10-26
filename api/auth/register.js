import { modalSuccess, modalWarning } from "../intercept";
import APIServices from "../../services";
import { registerRoute } from "../../chatService";
import axios from "axios";
import { chatConstant } from "../../components/Constants/chatLocal";

export async function UserRegister(
  firstname,
  lastname,
  email,
  password,
  confirmPassword,
  number,
  usernameInput,
  Router,
  setSingupError
) {
  const data = JSON.stringify({
    name: firstname,
    lastName: lastname,
    emailId: email,
    password: password,
    confirmPassword: confirmPassword,
    phoneNumber: number,
    userName: usernameInput,
  });
  const result = await APIServices.create("customer/register", data);
  if (result.status == 200) {
    if (result && result.data && result.data.status) {
      Router.push("/account/login");
    } else {
      setSingupError(result.data.message);
    }
  } else {
    setSingupError(result.data.message);
  }
}
