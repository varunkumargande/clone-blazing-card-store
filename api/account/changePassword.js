import APIServices from "../../services";
import { show } from "../../store/toast/action";
import { getErrorMessage } from "../../utilities/common-helpers";
export async function changePasswordApi(values, setPassLoader, dispatch) {
  const data = JSON.stringify({
    oldPassword: values.currentPassword,
    newPassword: values.newPassword,
  });
  const result = await APIServices.create("customer/change-password", data);

  if (result) {
    setPassLoader(false);
    if (result?.data.status === 1) {
      dispatch(show({ message: result.data.message, type: "success" }));
    } else {
      const errorMessage = getErrorMessage(result);
      dispatch(show({ message: errorMessage, type: "error" }));
    }
    return result.data; 
  }
}
