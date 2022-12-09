import APIServices from "../../services";
import { show } from "../../store/toast/action";
export async function UserRegister(values, Router, dispatch) {
  const data = JSON.stringify({
    name: values.firstname,
    lastName: values.lastname,
    emailId: values.email,
    password: values.password,
    confirmPassword: values.cpass,
    phoneNumber: values.number,
    userName: values.username,
  });
  const result = await APIServices.create("customer/register", data);
  if (result?.status == 200) {
    dispatch(
      show({
        message: "Congratulation! your account has been created",
        type: "success",
      })
    );
    Router.push("/account/login");
  } else {
    dispatch(
      show({
        message: result?.data?.message,
        type: "error",
      })
    );
  }
}
