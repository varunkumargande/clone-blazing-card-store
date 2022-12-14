import APIServices from "../../services";
import { show } from "../../store/toast/action";

export const resendEmailVerfification = async (dispatch) => {
  const emailId =
    typeof window !== "undefined"
      ? localStorage.getItem("verification-email")
      : null;
  const result = await APIServices.get(`customer/resendVerifyEmailId`, emailId);
  if (result.status === 200) {
    dispatch(
      show({
        message: result?.data?.message,
        type: "success",
      })
    );
  } else {
    dispatch(
      show({
        message: result?.data?.message,
        type: "error",
      })
    );
  }
};
