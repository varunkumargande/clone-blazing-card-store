import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import ReactDOM from "react-dom";
import FacebookLogin from "react-facebook-login";
import { facebookLoginApi } from "../api/auth/facebookLoginApi";

const FacebookLoginComponent = () => {
  const dispatch = useDispatch();
  const responseFacebook = useCallback((response) => {
    facebookLoginApi(response, dispatch);
  });

  return null;

  return (
    <div className="text-center mt-2">
      <FacebookLogin
        appId={process.env.NEXT_PUBLIC_FACEBOOK_KEY_ID}
        fields="name,email,picture"
        callback={responseFacebook}
        icon="fa-facebook"
      />
    </div>
  );
};

export default FacebookLoginComponent;
