import { modalSuccess, modalWarning } from "../intercept";
import APIServices from "../../services";
export async function changePasswordApi(values, setPassLoader) {
  const data = JSON.stringify({
    oldPassword: values.currentPassword,
    newPassword: values.newPassword,
  });
  const result = await APIServices.create("customer/change-password", data);

  if (result && result.data) {
    setPassLoader(false);

    if (result && result.data && result.data.status === 1) {
      modalSuccess("success", result.data.message);
    } else {
      modalWarning("error", result.data.message);
    }
    return result.data; //unwanted
  }
}
