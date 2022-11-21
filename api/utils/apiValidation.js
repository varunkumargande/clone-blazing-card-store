import { show } from "../../store/toast/action";
export const apiValidation = (
    result,
    dispatch,
    setShowModal=null
  ) => {
    if (result?.status === 200) {
      if (setShowModal) {
        setShowModal(true);
      } else {
        dispatch(show({ message: result?.data?.message, type: "success" }));
      }
      return true
    } else {
      const data = result?.data?.data?.message || result?.data?.message;
      const checkIsArray = Array.isArray(data);
      dispatch(show({ message: checkIsArray ? data[0] : data, type: "error" }));
    }
    return false
  };