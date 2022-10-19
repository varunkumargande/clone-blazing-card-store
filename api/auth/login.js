import { cartListApi } from "../cart/cartList";
import getProfileApi from "../home/getInfo";
import APIServices from "../../services";
import { modalSuccess, modalWarning } from "../intercept";
import { getProfile } from "../../store/profile/action";

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
  const result = await APIServices.create("customer/login", data);
  const errrorMessage = result.data.message;

  if (result && result.data && result.data.status === 1) {
    sessionStorage.setItem("spurtToken", result.data.data.token);
    sessionStorage.setItem("userPass", password);
    getProfileApi();
    modalSuccess("success", result.data.message);
    Router.push("/");
    cartListApi(dispatch);
    // dispatch(getProfile(result.data))
  } else {
    setLoginError(
      result.data.message === "Invalid EmailId" ||
        result.data.message === "Invalid password"
        ? "Password/Email is not correct"
        : errrorMessage
    );
    modalWarning("error", errrorMessage);
    setMail("");
    setPassword("");
  }
  setLoadImg(false);
}
