import { modalSuccess } from "../intercept";
import Axios from "axios";
import { getProfile } from "../../store/profile/action";
export async function UserOauthLogin(
  profie,
  Router,
  res,
  googleId,
  googlePath
) {
  const http = Axios.create({
    baseURL: googlePath,
    headers: {
      "Content-type": "application/json",
    },
  });
  const data = JSON.stringify({
    emailId: profie.email,
    oauthData: {
      email: profie.email,
      id: res.googleId,
      idToken: res.accessToken,
      image: profie.imageUrl,
      name: profie.name,
      provider: googleId,
      token: res.accessToken,
    },
  });

  const result = await http.post("", data);
  if (result && result.data && result.data.status === 1) {
    sessionStorage.setItem("blazingToken", result.data.data.token);
    sessionStorage.setItem(
      "blazingUser",
      JSON.stringify(result.data.data.user)
    );
    dispatch(getProfile(JSON.stringify(result.data.data.user)));
    modalSuccess("success", result.data.message);
    Router.push("/");
  }
}
