import { modalSuccess, modalWarning } from "../intercept";
import APIServices from "../../services";

export async function getUsername(username, setUsernameAvailable) {
  const result = await APIServices.getAll(`customer/userName/${username}`);
  if (result && result.data) {
    setUsernameAvailable(result.data);
  } else {
    modalWarning("error", result?.data?.message);
  }
}
