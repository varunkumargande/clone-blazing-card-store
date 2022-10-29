import { cartListApi } from "../cart/cartList";
import getProfileApi from "../home/getInfo";
import APIServices from "../../services";
import { show } from "../../store/toast/action";
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

  if (result && result?.data && result?.data?.status === 1) {
    sessionStorage.setItem("blazingToken", result.data.data.token);
    sessionStorage.setItem("userPass", password);
    getProfileApi();
    dispatch(show({ message: result.data.message, type: "success" }));
    Router.push("/");
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
