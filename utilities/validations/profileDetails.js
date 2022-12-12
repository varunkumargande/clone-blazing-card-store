import * as Yup from "yup";
import { regex } from "../../components/Constants/regex";

export const profileSchema = Yup.object().shape({
  firstName: Yup.string().required("First name Required"),
  lastName: Yup.string().required("Last name Required"),
  phoneNumber: Yup.string().required("Contact Number is Required"),
  bio: Yup.string().max(300),
  twitterUrl: Yup.string()
    .matches(
      /(?:http:\/\/)?(?:www\.)?twitter\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/,
      "Invalid twitter Link !"
    )
    .nullable(),
  facebookUrl: Yup.string()
    .matches(
      /(?:https?:\/\/)?(?:www\.)?(?:facebook|fb|m\.facebook)\.(?:com|me)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]+)(?:\/)?/i,
      "Invalid facebook Link !"
    )
    .nullable(),
});

export const profileInitialValues = (profileData) => {
  return {
    firstName: !!profileData?.firstName ? profileData?.firstName : "",
    lastName: !!profileData?.lastName ? profileData?.lastName : "",
    bio: !!profileData?.bio ? profileData?.bio : "",
    twitterUrl: !!profileData?.twitterUrl ? profileData?.twitterUrl : "",
    facebookUrl: !!profileData?.facebookUrl ? profileData?.facebookUrl : "",
    phoneNumber: !!profileData?.phoneNumber ? profileData?.phoneNumber : "",
    emailId: !!profileData?.emailId ? profileData?.emailId : "",
    userName: profileData?.username || "",
  };
};
