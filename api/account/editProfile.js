import APIServices from "../../services";
import DefaultConstants from "../../utilities/constants";
import { show } from "../../store/toast/action";
export async function editProfileApi(
  values,
  newDpName,
  Router,
  setLoader,
  dispatch
) {
  const data = JSON.stringify({
    firstName: values.firstName,
    lastName: values.lastName,
    emailId: values.emailId,
    image: newDpName,
    phoneNumber: values.phoneNumber,
    bio: values.bio,
    twitterUrl: values.twitterUrl,
    facebookUrl: values.facebookUrl,
    path: DefaultConstants.CommonConstants.IMAGE_UPLOAD_PATH,
  });

  const result = await APIServices.create("customer/edit-profile", data);
  if (result && result.data && result.data.status === 1) {
    sessionStorage.setItem("blazingUser", JSON.stringify(result.data.data));
    dispatch(show({ message: result.data.message, type: "success" }));
    setLoader(false);
    Router.push("/account/myprofile");
  } else {
    dispatch(show({ message: result.data.message, type: "error" }));
    setLoader(false);
  }
  return result.data;
}
