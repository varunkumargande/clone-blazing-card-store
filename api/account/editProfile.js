import { modalWarning, modalSuccess } from "../intercept";
import APIServices from "../../services";

export async function editProfileApi(values, newDp, Router) {
  const data = JSON.stringify({
    firstName: values.firstName,
    lastName: values.firstName,
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
    Router.push("/");
  } else {
    modalWarning("error", result.data.message);
  }
  return result.data;
}
