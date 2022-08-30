import React, { useEffect } from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import Router from 'next/router';
import { useState } from 'react';
import { VendorRegister } from '../../../api/auth/vendorRegister';
import { modalWarning } from '../../../api/intercept';
import { EmailValidator } from '../../helper/emailValidator';
import { upperPresent, lowerPresent, numPresent, specialPresent } from './PasswordValidation'
import Head from 'next/head'
import { useTranslation } from '../../../i18n';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';


function VendorSignUpIndex() {
    const [name, setName] = useState("")
    const [lname, setLname] = useState("")
    const [mail, setMail] = useState("")
    const [pass, setpass] = useState("")
    const [cpass, setCpass] = useState("")
    const [number, setNumber] = useState("")
    const [cpersonName, seCpersonName] = useState("")
    const [nameValid, setNameValid] = useState("")
    const [cnameValid, setCnameValid] = useState("")
    const [mailValid, setMailValid] = useState("")
    const [passValid, setPassValid] = useState([])
    const [cpassValid, setCpassValid] = useState("")
    const [numValid, setNumValid] = useState("")
    const [submit, setSubmit] = useState(0)
    const [nameFocus, setNameFocus] = useState(false)
    const [mailFocus, setMailFocus] = useState(false)
    const [numFocus, setNumFocus] = useState(false)
    const [lnameFocus, setLnameFocus] = useState(false)
    const [cnameFocus, setCnameFocus] = useState(false)
    const [passFocus, setPassFocus] = useState(false)
    const [cpassFocus, setCpassFocus] = useState(false)
    const [privacyCheck, setPrivacyCheck] = useState(false)
    const { t } = useTranslation('common');
    const [passShow, setPassShow] = useState(false)
    const [conpassShow, setConPassShow] = useState(false)

  
    const FullNameInputRef = React.useRef(null);
    useEffect(()=>{
        FullNameInputRef.current.focus();
      }, []);
    const handleSubmit = e => {
        //  e.preventDefault();
  
        setSubmit(1)
        
        if(validMessage()){
            
            if (privacyCheck) {
            
                VendorRegister(name, mail, pass, cpass, number, Router, cpersonName, lname)
            } else {
                modalWarning("error", "Please agree the privacy policy")
            }

        }
   
     
       
    };
    useEffect(() => {
        if (submit) {
            validMessage()
        }
        }, [name, mail, pass, cpass, number, Router, cpersonName, lname]);
        
    const validMessage = () => {
        let validateObj = { nameValid: true, mailValid: true, passValid: true, cpassValid: true, numValid: true, cpersonName: true }

        if (name.length < 3 && name.length !== 0) {
            setNameValid("Full name isn't long enough, minimum of 3 characters")
            validateObj.nameValid = false;
        }
        else if (name.length === 0) {
            setNameValid("Vendor name is required")
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



        if (cpass === "") {
      
            setCpassValid("Confirm password is required")
        } else if (pass !== cpass) {
            setCpassValid("Doesn't match")
            validateObj.cpassValid = false
        } else {
            setCpassValid("")
            validateObj.cpassValid = true
        }

        if (number) {
            setNumValid("")
            validateObj.numValid = true
        }
        else {
            setNumValid("Phone number is required")
            validateObj.numValid = false
        }

        if (cpersonName.length < 3 && cpersonName.length !== 0) {
            setCnameValid("Contact name isn't long enough, minimum of 3 characters")
            validateObj.cpersonName = false
        }
        else if (cpersonName.length === 0) {
            setCnameValid("Contact name is required")
            validateObj.cpersonName = false
        }
        else {
            setCnameValid("")
            validateObj.cpersonName = true
        }
        if (validateObj.nameValid===true && validateObj.mailValid===true && validateObj.passValid && validateObj.numValid && validateObj.cpassValid &&  validateObj.cpersonName) {
            return true;
        }
        else {
            return false;
        }

    }



    const registerOnChange = (e) => {
        const { name, value } = e.target;
 
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
            
                if (value && value !== pass) {
                    setCpassValid(" Passwords do not match")
                }
                else {
                    setCpassValid("")
                }
            }
       

    }




    const enterKeyEvent=e=>{
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
           
            handleSubmit()
            }
       

    }

    const validNameFill = (value) => {
        var roleExpression = /[-!$@#%^&*1234567890()_+|~=`{}\[\]:";'<>?,.\/]/;
        var regex = new RegExp(roleExpression);
        var t = value;
        if (!t.match(regex)) {
            setName(value);
        }
      };

      const validLastNameFill = (value) => {
        var roleExpression = /[-!$@#%^&*1234567890()_+|~=`{}\[\]:";'<>?,.\/]/;
        var regex = new RegExp(roleExpression);
        var t = value;
        if (!t.match(regex)) {
            setLname(value);
        }
      };
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
   
    return (
        <div className="ps-my-account vendor-my-account" onKeyPress={e => enterKeyEvent(e)} >
            <Head>
                <title>Vendor Sign Up</title>
              
            </Head>
            <div className="vendor-sign-main">
                <div className="vendor-sign-container">

                    <div className="vendor-main-contain">
                        <h3>{t('Shared.VendorSignUp')}</h3>
                     
                        <div className="vendor-sign-input-container">
                            <p>First Name</p>
                            <input className="vendor-sign-input" placeholder='First Name' name="fullname" maxlength="30" value={name} ref={FullNameInputRef} onFocus={e => setNameFocus(true)} onBlur={e => setNameFocus(false)}
                                onChange={e => validNameFill(e.target.value)} style={{borderColor: nameValid && "red"}}/>
                          
                            {nameValid !== "" && <span className='custom-field-error'>{nameValid}</span>}
                        </div>
                        <div className="vendor-sign-input-container">
                            <p>Last Name</p>
                            <input className="vendor-sign-input" placeholder='Last Name' name="lastname" maxlength="30" value={lname}
                                onChange={e => validLastNameFill(e.target.value)} onFocus={e => setLnameFocus(true)} onBlur={e => setLnameFocus(false)} />
                                
                      
                        </div>
                        <div className="vendor-sign-input-container">
                            <p>Contact Person Name</p>
                            <input className="vendor-sign-input" placeholder='Contact Person Name' name="contactperson" maxlength="30" value={cpersonName} onChange={e => seCpersonName(e.target.value)}
                                onFocus={e => setCnameFocus(true)} onBlur={e => setCnameFocus(false)} style={{borderColor: cnameValid && "red"}}/>
                      
                            {cnameValid !== "" && <span className='custom-field-error'>{cnameValid}</span>}
                        </div>
                        <div className="vendor-sign-input-container">
                            <p>Email ID</p>
                            <input className="vendor-sign-input" placeholder='Email ID' value={mail} name="email"
                                onChange={e => setMail(e.target.value)} onFocus={e => setMailFocus(true)} onBlur={e => setMailFocus(false)} style={{borderColor: mailValid && "red"}}/>
                            {/* <label className={mailFocus || mail !=="" ? "vendor-sign-label-focus" :"vendor-sign-label"}>Email ID *</label> */}
                            {mailValid !== "" && <span className='custom-field-error'>{mailValid}</span>}
                        </div>
                        <div className="vendor-sign-input-container">
                            <p>Mobile Number</p>
                            <input  className="vendor-sign-input" placeholder='Mobile Number'   name="number" maxlength="15" value={number}
                                onChange={e => validnumber(e.target.value)} onFocus={e => setNumFocus(true)} onBlur={e => setNumFocus(false)} style={{borderColor: numValid && "red"}}/>
                            {/* <label className={numFocus || number !=="" ? "vendor-sign-label-focus" :"vendor-sign-label"}>Mobile Number *</label> */}
                            {numValid !== "" && <span className='custom-field-error'>{numValid}</span>}
                        </div>
                        <div className="vendor-sign-input-container">
                            <p>Password</p>
                            <input className="vendor-sign-input" placeholder='Password' value={pass} type={passShow ? "text" : "password"} name="password" onChange={e => registerOnChange(e)} onFocus={e => setPassFocus(true)} onBlur={e => setPassFocus(false)} style={{borderColor: passValid.length===0?"": "red"}}/>
                            {passShow ? <EyeOutlined style={{ position: "absolute", right: "14px", top: "32px", fontSize: "18px", color: "#c0c4cc" }} onClick={e => setPassShow(!passShow)} /> : <EyeInvisibleOutlined style={{ position: "absolute", right: "14px", top: "32px", fontSize: "18px", color: "#c0c4cc" }} onClick={e => setPassShow(!passShow)} />}
                            {/* <label className={passFocus || pass !=="" ? "vendor-sign-label-focus" :"vendor-sign-label"}>Password</label> */}
                     
                          
                            {passValid !== "" &&passValid.map((error,index)=>(
                                <span className='custom-field-error'>{error}<br></br></span>
                            )) }
                        </div>
                        <div className="vendor-sign-input-container">
                            <p>Confirm Password</p>
                            <input className="vendor-sign-input" placeholder='Confirm Password' value={cpass} type={conpassShow ? "text" : "password"} name="cpass" onChange={e => registerOnChange(e)} onFocus={e => setCpassFocus(true)} onBlur={e => setCpassFocus(false)} style={{borderColor: cpassValid && "red"}}/>
                            {conpassShow ? <EyeOutlined style={{ position: "absolute", right: "14px", top: "32px", fontSize: "18px", color: "#c0c4cc" }} onClick={e => setConPassShow(!conpassShow)} /> : <EyeInvisibleOutlined style={{ position: "absolute", right: "14px", top: "32px", fontSize: "18px", color: "#c0c4cc" }} onClick={e => setConPassShow(!conpassShow)} />}
                                
                            {/* <label className={cpassFocus || cpass !=="" ? "vendor-sign-label-focus" :"vendor-sign-label"}>Confirm Password</label> */}
                            {cpassValid !== "" && <span className='custom-field-error'>{cpassValid}</span>}
                        </div>
                        <div className="vendor-policy-agree">
                            <input type="checkbox" onClick={e => setPrivacyCheck(e.target.checked)} />
                            <span>{t('Shared.AgreePrivacyPolicy')} </span>
                        </div>
                        <div className="vendor-policy-agree">
                            <button onClick={e => handleSubmit(e)}>{t('Auth.submit')}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VendorSignUpIndex





