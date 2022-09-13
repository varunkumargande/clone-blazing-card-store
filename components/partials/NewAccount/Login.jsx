import React, { useState, useEffect } from "react";
import Link from "next/link";
import IconGoogle from '../../Icons/IconGoogle';
import IconEye from '../../Icons/IconEye';
import { EmailValidator } from '../../helper/emailValidator';
import { UserLogin } from '../../../api';
import { connect, useDispatch } from 'react-redux';
import Router from 'next/router';
import { GoogleLogin } from 'react-google-login';

function Login(props) {

    const dispatch = useDispatch()
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const [loginError, setLoginError] = useState("")
    const [loginType, setLoginType] = useState("normal")
    const [emailValid, setEmailValid] = useState("");
    const [passValid, setPassValid] = useState("")
    const [passShow, setPassShow] = useState(false)
    const [loadImg, setLoadImg] = useState(false)
    const [googleId, setgoogleId] = useState("")
    const [googlePath, setgooglePath] = useState("")
    const [conpassShow, setConPassShow] = useState(false)
    
    const emailInputRef = React.useRef(null);
    useEffect(() => {
        emailInputRef.current.focus();
    }, []);

    useEffect(() => {
        if (props.isLoggedIn === true) {
            Router.push('/');
        }
    }, [props])

    const handleFeatureWillUpdate = (type) => {
        setLoginType(type)
        GoogleLoginApi(mail, password, type, setgoogleId, setgooglePath)
    }

    const handleLoginSubmit = e => {
        e.preventDefault()
        if (mail !== "" && password !== "" && emailValid === "" && passValid === "") {
            setLoadImg(true)
            UserLogin(mail, password, loginType, Router, setLoginError, dispatch, setMail, setPassword, setLoadImg)
        } else if (mail == "" && password == "") {
            setEmailValid("Email is required")
            setPassValid("Password is required")
        } else if (mail == "" || password == !"" && mail == !"" || password == "") {
        } else if (emailValid == !"") {
        } else {
            setEmailValid("Invalid email address")
        }
    };

    const responseGoogle = (response) => {
        GoogleLoginApi(mail, password, "gmail", setgoogleId, setgooglePath, googleId, googlePath, response.profileObj, Router, response)
        //    if(googleId){
        // UserOauthLogin(response.profileObj, Router,response,googleId,googlePath)
        //    }
    }

    const loginOnChange = (e) => {
        const { name, value } = e.target;

        if (name === "email") {
            setMail(value)
            if (value) {
                let emailCheck = EmailValidator(value)
                if (emailCheck) {
                    setEmailValid("")
                }
                else {
                    setEmailValid("Invalid email address")
                }
            }
            else {
                setEmailValid("Email is required")
            }
        }
        if (name === "password") {
            setPassword(e.target.value)
            if (value) {
                if (value.length) {
                    setPassValid("")
                }
            }
            else {
                setPassValid("Password is required")
            }
        }
    }
    const enterKeyEvent = e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            handleLoginSubmit()
        }
    }

    return (
        <div className="login-wrapper">
            <h1 className="title mb32">Sign in to Blazing Cards</h1>
            <GoogleLogin
                clientId="326680404078-fm2pbkgomc4nic42o6ua4difup6ff2dn.apps.googleusercontent.com"
                render={renderProps => (
                    <button className="google-btn mb42" onClick={renderProps.onClick}><IconGoogle />Sign in with Gooogle</button>
                )}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                isSignedIn={false}
            />

            <div className="or mb32 flex flex-center justify-center"><span>Or</span></div>
            <form className="login flex space-between">
                <div className="input-control">
                    <label>Email Address or Username</label>
                    <input name="email" placeholder={"Email"} ref={emailInputRef} value={mail}
                        onChange={e => loginOnChange(e)} style={{ border: emailValid && "1px solid red" }} />
                    {emailValid !== "" && <span style={{ color: "#ff5252" }}>{emailValid}</span>}
                </div>
                <div className="input-control">
                    <label>Password</label>
                    <input name="password" placeholder={"Password"} type={passShow ? "text" : "password"} value={password}
                        style={{ border: passValid && "1px solid red" }} onChange={e => loginOnChange(e)} />
                    {passValid !== "" && <span style={{ color: "#ff5252" }}>{passValid}</span>}

                    <button className="show-hide"><IconEye /></button>

                    <div className="flex justify-right mb16 forget mb32">
                        <Link href="/forget-password"><a>Forget Password</a></Link>
                    </div>
                </div>
                <div className="submitWrap mb32">
                    <button className="primary-btn" onClick={e => handleLoginSubmit(e)}>Sign in</button>
                </div>
                <div className="text-center mb16 already">
                    Don’t have an account yet?  <Link href="/account/register"><a>Sign Up</a></Link>
                </div>
                {/* <div className="copyright flex flex-center justify-center">
                    © Blazing Cards. 2022, All Rights Reserved
                </div> */}
            </form>
        </div>
    );
}

const mapStateToProps = state => {
    return state.auth;
};
export default connect(mapStateToProps)(Login);