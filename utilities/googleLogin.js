import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { GoogleLoginApi } from "../api/auth/GoogleLoginApi";
import IconGoogle from "../components/Icons/IconGoogle";
import jwt_decode from "jwt-decode";

const GoogleLoginComponent = () => {
  const dispatch = useDispatch();

  const responseGoogle = useCallback((response) => {
    GoogleLoginApi(
      response.given_name,
      response.family_name,
      response.email,
      "",
      "",
      response.email.split("@")[0],
      "gmail",
      "",
      "",
      "",
      "",
      response.picture,
      response,
      dispatch
    );
  });

  const responseGoogleFailure = (response) => {};

  return (
    <GoogleOAuthProvider clientId="951035021628-hd5p0lgeej6askb3ooie363aft037iun.apps.googleusercontent.com">
      <GoogleLogin
        render={(renderProps) => (
          <button className="google-btn" onClick={renderProps.onClick}>
            <IconGoogle />
            Continue with Google
          </button>
        )}
        onSuccess={(credentialResponse) => {
          let data = jwt_decode(credentialResponse.credential);
          responseGoogle(data);
        }}
        onError={(response) => {
          responseGoogleFailure(response);
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginComponent;
