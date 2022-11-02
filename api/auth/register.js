import APIServices from "../../services";
import { show } from "../../store/toast/action";
export async function UserRegister(
  firstname,
  lastname,
  email,
  password,
  confirmPassword,
  number,
  usernameInput,
  Router,
  setSingupError,
  dispatch
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
    dispatch(
      show({
        message: "Congratulation! your account has been created",
        type: "success",
      })
    );
    Router.push("/account/login");
  } else {
    setSingupError(result.data.message);
    dispatch(
      show({
        message: result.data.message,
        type: "success",
      })
    );
  }
}
