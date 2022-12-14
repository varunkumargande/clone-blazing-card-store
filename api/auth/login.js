import { cartListApi } from "../cart/cartList";
import getProfileApi from "../home/getInfo";
import APIServices from "../../services";
import { show } from "../../store/toast/action";
import { removeCurrentUrlInLocal } from "../../utilities/utils";
import { login } from "../../store/auth/action";
import { setIsVendor } from "../../store/becomeSeller/action";

export async function UserLogin(
  email,
  password,
  loginType,
  Router,
  setLoginError,
  dispatch,
  setMail,
  setPassword,
  setLoadImg
) {
  const data = JSON.stringify({
    emailId: email,
    password: password,
    type: loginType,
  });
  dispatch(setIsVendor(false));
  
  const result = await APIServices.create("customer/login", data);

  if (result && result?.data && result?.data?.status === 1) {
    localStorage.removeItem("verification-email");
    localStorage.setItem("blazingToken", result.data.data.token);
    localStorage.setItem(
      "chat-app-current-user",
      JSON.stringify(result.data.data.chatUser)
    );
    getProfileApi();
    dispatch(login());
    if (localStorage.getItem("login_redirection_url")) {
      Router.push(localStorage.getItem("login_redirection_url"));
      removeCurrentUrlInLocal();
    } else {
      Router.push("/");
    }
    dispatch(show({ message: result.data.message, type: "success" }));
    cartListApi(dispatch);
  } else {
    setLoginError(
      result.data.message === "Invalid EmailId" ||
        result.data.message === "Invalid password"
        ? "Password/Email is not correct"
        : result?.data?.message
    );
    dispatch(show({ message: result.data.message, type: "error" }));
    setMail("");
    setPassword("");
  }
  setLoadImg(false);
}
