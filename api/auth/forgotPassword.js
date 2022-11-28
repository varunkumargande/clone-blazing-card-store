import APIServices from "../../services";
import { show } from "../../store/toast/action";
export async function forgotApi(
  email,
  setForgotSuccess,
  setForError,
  dispatch
) {
  const result = await APIServices.getAll(
    "customer/forgot-password-link?email=" + email
  );
  if (result && result?.data && result?.data?.status === 1) {
    dispatch(show({ message: result?.data?.message, type: "success" }));
    setForgotSuccess(true);
  } else {
    dispatch(show({ message: result?.data?.message, type: "error" }));
    setForError(result?.data?.message);
  }
}
