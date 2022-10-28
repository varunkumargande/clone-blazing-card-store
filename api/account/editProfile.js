import { modalWarning, modalSuccess } from "../intercept";
import APIServices from "../../services";
import DefaultConstants from "../../utilities/constants";

export async function editProfileApi(values, newDpName, Router, setLoader) {
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
    modalSuccess("success", result.data.message);
    sessionStorage.setItem("blazingUser", JSON.stringify(result.data.data));
    setLoader(false);
    Router.push("/account/myprofile");
  } else {
    modalWarning("error", result.data.message);
    setLoader(false);
  }
  return result.data;
}
