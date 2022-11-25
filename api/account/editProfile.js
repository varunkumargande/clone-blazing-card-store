import APIServices from "../../services";
import DefaultConstants from "../../utilities/constants";
import { show } from "../../store/toast/action";
import { getErrorMessage } from "../../utilities/common-helpers";
import { setAvatarRoute } from "../../chatService";
import axios from "axios";
import { useEffect, useState } from "react";

export async function editProfileApi(
  values,
  newDpName,
  Router,
  setLoader,
  dispatch,
  currentChatUser
) {
  const data = {
    firstName: values.firstName,
    lastName: values.lastName,
    emailId: values.emailId,
    image: newDpName,
    phoneNumber: values.countryCode + "-" + values.phoneNumber.toString(),
    bio: values.bio,
    twitterUrl: values.twitterUrl,
    facebookUrl: values.facebookUrl,
    path: DefaultConstants.CommonConstants.IMAGE_UPLOAD_PATH,
  };
  const chatData = {
    image: newDpName,
  };
  if (values?.userName) {
    data.username = values.userName;
  }
  const JSONdata = JSON.stringify(data);
  const result = await APIServices.create("customer/edit-profile", JSONdata);
  if (result && result.data && result.data.status === 1) {
    const token = localStorage.getItem("blazingToken");
    const chatHeader = {
      Authorization: `Bearer ${token}`,
    };
    if (!!currentChatUser?.user?._id) {
      await axios
        .post(`${setAvatarRoute}/${currentChatUser?.user?._id}`, chatData, {
          headers: chatHeader,
        })
        .then((res) => {})
        .catch((err) => {});
    }
    localStorage.setItem("blazingUser", JSON.stringify(result.data.data));
    dispatch(show({ message: result.data.message, type: "success" }));
    setLoader(false);
    Router.push("/account/myprofile");
  } else {
    const errorMessage = getErrorMessage(result);
    dispatch(show({ message: errorMessage, type: "error" }));
  }
  return result.data;
}
