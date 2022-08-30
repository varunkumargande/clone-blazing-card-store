
import React from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import Link from 'next/link';
import Router from 'next/router';
import FacebookLogin from 'react-facebook-login';
import {notification } from 'antd';
import { connect, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { UserOauthLogin } from '../../../api';
import { UserLogin } from '../../../api';
import { EmailValidator } from '../../helper/emailValidator';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { useTranslation } from '../../../i18n';
import Head from 'next/head'
import { GoogleLoginApi } from '../../../api/auth/GoogleLoginApi';

function Login(props) {
    const dispatch = useDispatch()
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const [loginError, setLoginError] = useState("")
    const [loginType, setLoginType] = useState("normal")
    const [emailValid, setEmailValid] = useState("");
    const [passValid, setPassValid] = useState("")
    const [passShow, setPassShow] = useState(false)
    const [loadImg,setLoadImg]=useState(false)
    const [googleId,setgoogleId]=useState("")
    const [googlePath,setgooglePath]=useState("")
    const { t } = useTranslation('common');


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
        GoogleLoginApi(mail, password, type,setgoogleId,setgooglePath)
     
    }

    const handleLoginSubmit = e => {
        
         if(mail !== "" && password !== "" && emailValid === "" && passValid === ""){
            setLoadImg(true)
            UserLogin(mail, password, loginType, Router, setLoginError,dispatch,setMail, setPassword,setLoadImg)
         }else if(mail == ""&& password == "" ){
            
                  setEmailValid("Email is required")
            setPassValid("Password is required")
         }else if(mail == ""|| password == !"" && mail == !""|| password == "" ){
            
           
         }else if( emailValid ==!""){
            
         }else{
            setEmailValid("Invalid email address")
         }

    };

    const responseGoogle = (response) => {
      
      
       GoogleLoginApi(mail, password, "gmail",setgoogleId,setgooglePath,googleId,googlePath,response.profileObj,Router,response)
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
        <div className="ps-my-account" onKeyPress={e => enterKeyEvent(e)}>
            <Head>
                <title>Login</title>
              
            </Head>
           
            <div className="ps-login-container">
                <div className="ps-login-sub-container flex-common">
                    <div className="ps-login-left">
                        <div className="ps-login-left-main">
                            <h3>{t('login.login')}</h3>
                            <div className="ps-login-email-contain">
                                <p>{t('login.E-mail')}</p>
                                <input name="email" placeholder={t('login.gmail')} ref={emailInputRef} value={mail}
                                    onChange={e => loginOnChange(e)} style={{border:emailValid && "1px solid red"}}/>
                                {emailValid !== "" && <span>{emailValid}</span>}
                            </div>
                            <div className="ps-login-email-contain ps-bottom-pass">
                                <p>{t('login.Password')}</p>
                                <div className="ps-login-passcontain">
                                    <input name="password" placeholder={t('login.password')} type={passShow ? "text" : "password"} value={password}
                                     style={{border:passValid && "1px solid red"}}   onChange={e => loginOnChange(e)} onKeyPress={e => enterKeyEvent(e)} />
                                    {passShow ? <EyeOutlined style={{ position: "absolute", right: "10px", top: "10px", fontSize: "18px", color: "#c0c4cc" }} onClick={e => setPassShow(!passShow)} /> : <EyeInvisibleOutlined style={{ position: "absolute", right: "10px", top: "10px", fontSize: "18px", color: "#c0c4cc" }} onClick={e => setPassShow(!passShow)} />}
                                </div>
                                {passValid !== "" && <span style={{ color: "#ff5252" }}>{passValid}</span>}
                            </div>
                            <div className="ps-forgot-container">
                                <Link href="/account/forgot-password">
                                    <a>{t('login.forgetpassword')} ?</a>
                                </Link>
                            </div>
                            <button className="ps-login-button" onClick={e => handleLoginSubmit(e)}>{loadImg?<img src="/static/img/loading.gif" style={{height:"40px",width:"40px"}}/>:<>{t('login.login')}</>}
                                </button>
                            <p className="ps-login-reg-link">{t('login.Donothaveanaccount')}?
                                <Link href="/account/register">
                                    <a> {t('login.registernow')}</a>
                                </Link></p>
                            <div className="ps-social-link-container">

                                <FacebookLogin
                                    appId="2579235238767200"

                                    autoLoad={false}
                                    fields="name,email,picture"
                                  
                                    textButton="Sign In with Facebook"
                                    
                                    icon="fab fa-facebook-f"
                                    cssClass="ps-social-button"

                               
                                />

                                {console.log(googleId,'googleId')}
                                <GoogleLogin
                                    clientId="326680404078-fm2pbkgomc4nic42o6ua4difup6ff2dn.apps.googleusercontent.com"
                                    
                                    render={renderProps => (
                                        
                                        <button className="ps-social-button" onClick={renderProps.onClick}>
                                            <img src="/static/img/google-sign.svg" /> Sign In with Google
                                        </button>)}
                                    buttonText="Login"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    isSignedIn={false}
                               
                                />

                            </div>
                        </div>
                    </div>
                    <div className="ps-login-right">
                        <img src="/static/img/logo-img.svg" />
                    </div>
                </div>
            </div>
        </div>
    );
}
const mapStateToProps = state => {
    return state.auth;
};
export default connect(mapStateToProps)(Login);




