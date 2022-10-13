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

  const chatData = {
    email: email,
    password: password,
    username: usernameInput,
  }


  const result = await APIServices.create("customer/register", data);
  if (result.status == 200) {
    if (result && result.data && result.data.status) {
      sessionStorage.setItem("userPass", password)


      const { data } = await axios.post(registerRoute, chatData);
      if (data.status === true) {
        localStorage.setItem(
            chatConstant["localStorageKey"],
          JSON.stringify(data.user)
        );
      }

      Router.push("/account/login");
      modalSuccess("success", result.data.message);
    } else {
      setSingupError(result.data.data.data.message[0])
      modalWarning("error", result.data.data.data.message[0]);
    }
  }
}
