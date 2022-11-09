import APIServices from "../../services";
import DefaultConstants from "../../utilities/constants";
import { show } from "../../store/toast/action";
import { getErrorMessage } from "../../utilities/common-helpers";
export async function editProfileApi(
  values,
  newDpName,
  Router,
  setLoader,
  dispatch
) {
  const data = {
    firstName: values.firstName,
    lastName: values.lastName,
    emailId: values.emailId,
    image: newDpName,
    phoneNumber: values.phoneNumber.toString(),
    bio: values.bio,
    twitterUrl: values.twitterUrl,
    facebookUrl: values.facebookUrl,
    path: DefaultConstants.CommonConstants.IMAGE_UPLOAD_PATH,
  };
  if (values?.userName) {
    data.username = values.userName;
  }
  const JSONdata = JSON.stringify(data);
  const result = await APIServices.create("customer/edit-profile", JSONdata);
  if (result && result.data && result.data.status === 1) {
    localStorage.setItem("blazingUser", JSON.stringify(result.data.data));
    dispatch(show({ message: result.data.message, type: "success" }));
    Router.push("/account/myprofile");
  } else {
    const errorMessage = getErrorMessage(result);
    dispatch(show({ message: errorMessage, type: "error" }));
  }
  return result.data;
}
