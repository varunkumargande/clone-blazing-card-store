import React, {useEffect } from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import Link from 'next/link';
import Router from 'next/router';
import { connect } from 'react-redux';
import { useState } from 'react';
import { UserRegister } from '../../../api';
import { EmailValidator,upperPresent,lowerPresent,numPresent,specialPresent } from '../../helper/emailValidator';
import { useTranslation } from '../../../i18n';
import Head from 'next/head'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
function Register(auth) {

    const [name, setName] = useState("")
    const [mail, setMail] = useState("")
    const [pass, setpass] = useState("")
    const [cpass, setCpass] = useState("")
    const [number, setNumber] = useState("")
    const [nameValid, setNameValid] = useState("")
    const [mailValid, setMailValid] = useState("")
    const [passValid, setPassValid] = useState([])
    const [cpassValid, setCpassValid] = useState("")
    const [numValid, setNumValid] = useState("")
    const [submit, setSubmit] = useState(0)
    const { t } = useTranslation('common');
    const [passShow, setPassShow] = useState(false)
    const [conpassShow, setConPassShow] = useState(false)

    const FullNameInputRef = React.useRef(null);
    useEffect(()=>{
        FullNameInputRef.current.focus();
      }, []);

    const handleSubmit = e => {
       
        setSubmit(1)
        validMessage()
        if (validMessage()) {
            UserRegister(name, mail, pass, cpass, number, Router)
        }
      
    };



    const validMessage = () => {
        let validateObj = { nameValid: false, mailValid: false, passValid: false, cpassValid: false, numValid: false }

        if (name.length < 3 && name.length !== 0) {
            setNameValid("Minimum of 3 characters")
            validateObj.nameValid = false;
        }
        else if (name.length === 0) {
            setNameValid("Full name is required")
            validateObj.nameValid = false;
        }
        else {
            setNameValid("")
            validateObj.nameValid = true;
        }

        if (mail) {
            let emailCheck = EmailValidator(mail)
            if (emailCheck) {
                setMailValid("")
                validateObj.mailValid = true
            }
            else {
                setMailValid("Invalid email address")
                validateObj.mailValid = false;
            }
        }
        else {
            setMailValid("Email is required")

        }


        if (pass === "") {
            setPassValid(["Password is required"])
            validateObj.passValid = false


        } else {
            let arrayValue = []
            if (!upperPresent(pass)) {
                arrayValue.push("Must contain at least 1 in capital case!")
            }
            if (!numPresent(pass)) {
                arrayValue.push("Must have at least 1 number")
            }
            if (!lowerPresent(pass)) {
                arrayValue.push("Must contain at least 1 lower case!")
            }
            if (!specialPresent(pass)) {
                arrayValue.push("Must contain at least 1 special characters!")
            }
            if (pass.length < 8) {
                arrayValue.push("Must be at least 8 characters!")
            }
            if (arrayValue.length > 0) {
                validateObj.passValid = false
            } else {
                validateObj.passValid = true
            }
            setPassValid(arrayValue)
        }

        
        if (cpass) {
            if (cpass && cpass !== pass) {
                setCpassValid(" Passwords do not match")
                validateObj.cpassValid = false
            }
            else {
                setCpassValid("")
                validateObj.cpassValid = true
            }
        }
        else {
            setCpassValid()
        }

        if (number) {
            setNumValid("")
            validateObj.numValid = true
        }
        else {
            setNumValid("Phone number is required")
            validateObj.numValid = false
        }

        if (validateObj.numValid && validateObj.passValid && validateObj.nameValid && validateObj.cpassValid && validateObj.mailValid) {
            return true;
        }
        else {
            return false;
        }

    }

    const validNameFill = (value) => {
        var roleExpression = /[-!$@#%^&*1234567890()_+|~=`{}\[\]:";'<>?,.\/]/;
        var regex = new RegExp(roleExpression);
        var t = value;
        if (!t.match(regex)) {
            setName(value)
        }
        if (submit) {
            if (t.length < 3 && t.length !== 0) {
                setNameValid("Minimum of 3 characters")
            }
            else if (t.length === 0) {
                setNameValid("Full name is required")
            }
            else {
                setNameValid("")
            }
        }
    }
    const validnumber=(value)=>{
        var roleExpression = /[^0-9]/g;
        var regex = new RegExp(roleExpression);
        var t = value;
        if (!t.match(regex)) {
            setNumber(value)
        }
            if (submit) {
                if(t.length === 0){
                    setNumValid("Phone number is required")
                }
                else {
                    setNumValid("")
                }
            }
        // }

    }
    // /^[0-9\b]+$/


    const registerOnChange = (e) => {
        const { name, value } = e.target;
        if (name === "fullname") {
            setName(value)
            if (submit) {
                
                if (value.length < 3 && value.length !== 0) {
                    setNameValid("Minimum of 3 characters")
                }
                else if (value.length === 0) {
                    setNameValid("Full name is required")
                }
               
                else {
                    setNameValid("")
                }
            }
        }

        if (name === "email") {
            setMail(value)
            if (submit) {
                if (value) {
                    let emailCheck = EmailValidator(value)
                    if (emailCheck) {
                        setMailValid("")
                    }
                    else {
                        setMailValid("Invalid email address")
                    }
                }
                else {
                    setMailValid("Email is required")
                }
            }
        }


        if(name==="password"){
            if(value===""){
                setPassValid(["New password is required"])
                setpass(value)
            }
            else{
                
                setpass(value)
                let arrayValue = []
                if (!upperPresent(value)) {
                    arrayValue.push("Must contain at least 1 in capital case!")
                }
                if (!numPresent(value)) {
                    arrayValue.push("Must have at least 1 number")
                }
                if (!lowerPresent(value)) {
                    arrayValue.push("Must contain at least 1 lower case!")
                }
                if (!specialPresent(value)) {
                    arrayValue.push("Must contain at least 1 special characters!")
                }
                if (value.length < 8) {
                    arrayValue.push("Must be at least 8 characters!")
                }
                if (arrayValue.length > 0) {
                    setPassValid(arrayValue)
                   
                } else {
                    
                    setPassValid([])
                }
                
             
            }
        }

      

        if (name == "cpass") {
            setCpass(e.target.value)
            // if(value) {
            // if (submit) {
                if (value && value !== pass) {
                    setCpassValid(" Passwords do not match")
                }
                else {
                    setCpassValid("")
                }
            }
            // else {
            //     setCpassValid()
            // }
        // }

        if (name === "number") {
            value.length <= 15 && setNumber(e.target.value)
            if (submit) {
                if (value) {
                    setNumValid("")
                }
                else {
                    setNumValid("Phone number is required")
                }
            }
        }
    }


    const validateMessages = {
        required: '${name} is required!',
        types: {
            email: 'Please enter a valid email',
            
        },
       
    };

  

    
    const enterKeyEvent=e=>{
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
           
            handleSubmit()
            }
       

    }

    return (
        <div className="ps-my-account" onKeyPress={e => enterKeyEvent(e)}>
             <Head>
                <title>Register</title>
              
            </Head>
            <div className="ps-login-container">
                <div className="ps-login-sub-container flex-common">
                    {/* <div className="col-lg-6 col-sm-12"> */}
                    <div className="ps-login-left">
                        <div className="ps-login-left-main">
                            <h3>{t('Register.Registration')}</h3>
                            <div className="ps-login-email-contain">
                                <p>{t('Register.FullName')}</p>
                                <input name="fullname" placeholder={t('Register.FullName')} ref={FullNameInputRef} value={name} maxlength="30"
                                    onChange={e => validNameFill(e.target.value)} style={{borderColor:nameValid && "red"}}
                                />
                                {nameValid !== "" && <span>{nameValid}</span>}
                            </div>
                            <div className="ps-login-email-contain">
                                <p>{t('Register.E-mail')}</p>
                                <input name="email" placeholder={t('Register.UserName')}
                                    value={mail}
                                    onChange={e => registerOnChange(e)}
                                    style={{borderColor:mailValid && "red"}}
                                />
                                {mailValid !== "" && <span>{mailValid}</span>}
                            </div>
                            <div className="ps-login-email-contain">
                                <p>{t('Register.Password')}</p>
                                <div className="ps-login-passcontain">
                                    <input name="password" placeholder={t('Register.Password')} type={passShow ? "text" : "password"}
                                        value={pass}
                                        onChange={e => registerOnChange(e)}
                                    // onChange={e=>loginOnChange(e)}
                                    style={{borderColor:passValid.length==!0? "red":""}}
                                    />
                                     {passShow ? <EyeOutlined style={{ position: "absolute", right: "10px", top: "12px", fontSize: "18px", color: "#c0c4cc" }} onClick={e => setPassShow(!passShow)} /> : <EyeInvisibleOutlined style={{ position: "absolute", right: "10px", top: "12px", fontSize: "18px", color: "#c0c4cc" }} onClick={e => setPassShow(!passShow)} />}
                                      
                                    {passValid !== "" && <span style={{ color: "#ff5252" }}>{passValid.map((error)=><>
                                        {/* <ul className="ps-pass-restrict"><li style={{listStyle:"none"}} >{error}</li></ul> */}
                                        <span className='custom-field-error'>{error}<br></br></span>
                                    </>)}</span>}
                            
                                </div>
                                {/* <ul className="ps-pass-restrict">
                                    <li>Must be at least 8 characters long</li>
                                    <li>Must not duplicate any part of the email address</li>
                                    <li>Must contain at least one lowercase and one uppercase letter</li>
                                    <li>Must contain at least one symbol or number</li>
                                </ul> */}
                            </div>
                            <div className="ps-login-email-contain">
                                <p>{t('Register.ConfrimPassword')}</p>
                                <input name="cpass" placeholder={t('Register.ConfrimPassword')} type={conpassShow ? "text" : "password"}
                                    value={cpass}
                                    onChange={e => registerOnChange(e)}
                                    style={{borderColor:cpassValid===""?"":cpassValid===undefined?"red":""}}
                                // onChange={e=>loginOnChange(e)}PhoneNumber
                                />
                              
                                {conpassShow ? <EyeOutlined style={{ position: "absolute", right: "10px", top: "32px", fontSize: "18px", color: "#c0c4cc" }} onClick={e => setConPassShow(!conpassShow)} /> : <EyeInvisibleOutlined style={{ position: "absolute", right: "10px", top: "32px", fontSize: "18px", color: "#c0c4cc" }} onClick={e => setConPassShow(!conpassShow)} />}
                                
                               
                              
                                {/* {emailValid !== "" && <span>{emailValid}</span>} */}
                                {cpassValid !== "" && <span style={{ color: "#ff5252" }}>{cpassValid}</span>}
                            </div>
                            <div className="ps-login-email-contain">
                                <p>{t('Register.PhoneNumber')}</p>
                                <input name="number" placeholder={t('Register.PhoneNumber')}
                                    value={number}
                                    onChange={e => validnumber(e.target.value)}
                                // onChange={e=>loginOnChange(e)}
                                maxlength="15"
                                style={{borderColor:numValid && "red"}}
                                />
                                {/* {emailValid !== "" && <span>{emailValid}</span>} */}
                                {numValid !== "" && <span style={{ color: "#ff5252" }}>{numValid}</span>}
                            </div>
                            {/* <div className="ps-forgot-container">
                            <Link href="/account/forgot-password">
                                <a>Forgot Password ?</a>
                            </Link>
                            </div> */}
                            <button className="ps-login-button" onClick={e => handleSubmit(e)}
                            // onClick={e=>handleLoginSubmit(e)}AlreadyHaveanAccount
                            >{t('Register.REGISTER')}</button>
                            <p className="ps-login-reg-link">{t('Register.AlreadyHaveanAccount')}?
                                <Link href="/account/login">
                                    <a> {t('Register.Signin')}</a>

                                </Link></p>
                        </div>
                    </div>
                    {/* </div> */}
                    {/* <div className="col-lg col-sm-12"> */}
                    <div className="ps-login-right">
                        <img src="/static/img/reg-img.svg" />
                    </div>
                </div>
                {/* </div> */}
            </div>
        </div>

    );

}

const mapStateToProps = state => {
    return state.auth;
};
export default connect(mapStateToProps)(Register);
