import APIServices from "../../services";
import { show } from "../../store/toast/action";
export async function changePasswordApi(values, setPassLoader, dispatch) {
  const data = JSON.stringify({
    oldPassword: values.currentPassword,
    newPassword: values.newPassword,
  });
  const result = await APIServices.create("customer/change-password", data);

  if (result && result.data) {
    setPassLoader(false);

    if (result && result.data && result.data.status === 1) {
      dispatch(show({ message: result.data.message, type: "success" }));
    } else {
      dispatch(show({ message: result.data.message, type: "error" }));
    }
    return result.data; 
  }
}
