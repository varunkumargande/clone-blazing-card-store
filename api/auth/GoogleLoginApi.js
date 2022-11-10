import { modalSuccess } from "../intercept";
import axios from "axios";
import { getProfile } from "../../store/profile/action";
import { apiBaseUrl } from "../url";

export async function GoogleLoginApi(
  firstname,
  lastname,
  mail,
  password,
  confirmPassword,
  username,
  gmail,
  setgoogleId,
  setgooglePath,
  googleId,
  googlePath,
  profie,
  Router,
  res
) {
  const data = {
    emailId: mail,
    firstName: firstname,
    lastName: lastname,
    userName: username,
    oauthData: "Gmail-login",
    type: gmail,
  };
  const result = await axios.post(`${apiBaseUrl}/gmail-login`, data);
  if (result && result.data && result.data.status === 1) {
    localStorage.setItem("blazingToken", result.data.data.token);
    localStorage.setItem("blazingUser", JSON.stringify(result.data.data.user));
    localStorage.setItem(
      "chat-app-current-user",
      JSON.stringify(result.data.data.chatUser)
    );
    getProfile(JSON.stringify(result.data.data.user));
    modalSuccess("success", result.data.message);
    // Router.push('/');
    window.location.href = "/";
  }
}
