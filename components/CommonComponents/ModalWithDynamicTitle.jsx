import React from "react";
import Link from "next/link";
import IconClose from "../Icons/IconClose";
import IconGoogle from "../Icons/IconGoogle";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { GoogleLoginApi } from "../../api/auth/GoogleLoginApi";
import Router from "next/router";

export default function DynamicModal(props) {
    const {
        title,
        setShowModal
    } = props;

    const responseGoogle = (response) => {
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
          Router, 
          response,
        );
    };

    const responseGoogleFailure = (response) => {
        console.error("Failure response", response);
    };
    return (
        <div className="modalOverlay flex justify-center flex-center">
            <div className="modal signup">
                <div className="modal-header flex Space-between flex-center nobg">
                    <h5 className="modal-title"></h5>
                    <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        onClick={() => setShowModal(false)}
                    >
                        <span aria-hidden="true">
                            <IconClose />
                        </span>
                    </button>
                </div>
                <div className="modal-body text-center">
                    <div className="Stream-title text-center mb16">
                        {title}
                    </div>
                    <GoogleOAuthProvider clientId="951035021628-hd5p0lgeej6askb3ooie363aft037iun.apps.googleusercontent.com">
                        <GoogleLogin
                            render={(renderProps) => (
                            <button className="google-btn" onClick={renderProps.onClick}>
                                <IconGoogle />
                                Sign up with Google
                            </button>
                            )}
                            onSuccess={credentialResponse => {
                            let data = jwt_decode(credentialResponse.credential);
                            responseGoogle(data);
                            }}
                            onError={(response) => {
                            
                            responseGoogleFailure(response);
                            }}
                        />
                    </GoogleOAuthProvider>
                    <div class="or mb16 flex flex-center justify-center">
                        <span>Or</span>
                    </div>
                    <div className="signin-signup">
                        <Link href="/account/register">
                            <a>Sign Up</a>
                        </Link>
                        /
                        <Link href="/account/login">
                            <a>Sign In</a>
                        </Link>{" "}
                        on Blazing Cards
                    </div>
                </div>
            </div>
        </div>
    );
}