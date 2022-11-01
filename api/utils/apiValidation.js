import { show } from "../../store/toast/action";
export const apiValidation = (
    result,
    dispatch,
  ) => {
    if (result?.status === 200) {
      dispatch(show({ message: result?.data?.message, type: "success" }));
      return true
    } else {
      const data = result?.data?.data?.message || result?.data?.message;
      const checkIsArray = Array.isArray(data);
      dispatch(show({ message: checkIsArray ? data[0] : data, type: "error" }));
    }
    return false
  };