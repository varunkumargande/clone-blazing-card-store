import { modalWarning, modalSuccess } from "../intercept";
import APIServices from "../../services";

export async function editProfileApi(values, newDp, Router, setLoader) {
  const data = JSON.stringify({
    firstName: values.firstName,
    lastName: values.lastName,
    emailId: values.emailId,
    image: newDp,
    phoneNumber: values.phoneNumber,
    bio: values.bio,
    twitterUrl: values.twitterUrl,
    facebookUrl: values.facebookUrl,
  });

  const result = await APIServices.create("customer/edit-profile", data);
  if (result && result.data && result.data.status === 1) {
    modalSuccess("success", result.data.message);
    sessionStorage.setItem("spurtUser", JSON.stringify(result.data.data));
    setLoader(false)
    Router.push("/account/myprofile");
  } else {
    modalWarning("error", result.data.message);
    setLoader(false)
  }
  return result.data;
}
