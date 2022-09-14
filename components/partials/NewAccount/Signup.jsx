import React from "react";
import Link from "next/link";
import IconGoogle from '../../Icons/IconGoogle';
import IconEye from '../../Icons/IconEye';
import { useEffect, useState } from "react";
import { EmailValidator, upperPresent, lowerPresent, numPresent, specialPresent } from '../../helper/emailValidator';
import { UserRegister } from '../../../api';
import Router from 'next/router';
import { connect, useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { modalSuccess, modalWarning } from "../../../api/intercept";

function Signup(auth) {

    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [mail, setMail] = useState("")
    const [pass, setpass] = useState("")
    const [cpass, setCpass] = useState("")
    const [number, setNumber] = useState("")

    const [nameValid, setNameValid] = useState("")
    const [lastNameValid, setLastNameValid] = useState("")
    const [mailValid, setMailValid] = useState("")
    const [passValid, setPassValid] = useState([])
    const [cpassValid, setCpassValid] = useState("")
    const [numValid, setNumValid] = useState("")
    const [submit, setSubmit] = useState(0)
    const [passShow, setPassShow] = useState(false)
    const [conpassShow, setConPassShow] = useState(false)
    const [policyCheck, setPolicyCheck] = useState(false)

    const FullNameInputRef = React.useRef(null);
    useEffect(() => {
        FullNameInputRef.current.focus();
    }, []);

    const handleSubmit = e => {

        console.log(policyCheck)
        e.preventDefault()
        if (policyCheck == true) {
            setSubmit(1)
            validMessage()
            if (validMessage()) {
                UserRegister(name, mail, pass, cpass, number, Router)
            }
        } else {
            modalWarning("error", "PLease select term and policy")
        }

    };


    const validMessage = () => {
        let validateObj = { nameValid: false, mailValid: false, passValid: false, cpassValid: false, numValid: false, lastName: false }

        if (name.length < 3 && name.length !== 0) {
            setNameValid("Minimum of 3 characters")
            validateObj.nameValid = false;
        }
        else if (name.length === 0) {
            setNameValid("First name is required")
            validateObj.nameValid = false;
        }
        else {
            setNameValid("")
            validateObj.nameValid = true;
        }


        if (lastName.length < 3 && lastName.length !== 0) {
            setLastNameValid("Minimum of 3 characters")
            validateObj.nameValid = false;
        }
        else if (lastName.length === 0) {
            setLastNameValid("Last name is required")
            validateObj.nameValid = false;
        }
        else {
            setLastNameValid("")
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
    const validnumber = (value) => {
        var roleExpression = /[^0-9]/g;
        var regex = new RegExp(roleExpression);
        var t = value;
        if (!t.match(regex)) {
            setNumber(value)
        }
        if (submit) {
            if (t.length === 0) {
                setNumValid("Phone number is required")
            }
            else {
                setNumValid("")
            }
        }

    }


    const registerOnChange = (e) => {
        const { name, value } = e.target;

        if (name === "name") {
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

        if (name === "lastname") {
            setLastName(value)
            if (submit) {

                if (value.length < 3 && value.length !== 0) {
                    setLastNameValid("Minimum of 3 characters")
                }
                else if (value.length === 0) {
                    setLastNameValid("Full name is required")
                }

                else {
                    setLastNameValid("")
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


        if (name === "password") {
            if (value === "") {
                setPassValid(["New password is required"])
                setpass(value)
            }
            else {

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




    const enterKeyEvent = e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            handleSubmit()
        }
    }

    console.log(policyCheck)

    const handlePolicyCheck = () => {
        if (policyCheck) {
            setPolicyCheck(false)
        } else {
            setPolicyCheck(true)
        }
    }


    const responseGoogle = (response) => {
        GoogleLoginApi(mail, password, "gmail", setgoogleId, setgooglePath, googleId, googlePath, response.profileObj, Router, response)
    }

    return (
        <div className="login-wrapper">
            <h1 className="title mb32">Sign up to Blazing Cards</h1>


            <GoogleLogin
                clientId="326680404078-fm2pbkgomc4nic42o6ua4difup6ff2dn.apps.googleusercontent.com"
                render={renderProps => (
                    <button className="google-btn mb42" onClick={renderProps.onClick}><IconGoogle />Sign up with Gooogle</button>
                )}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                isSignedIn={false}
            />


            <div className="or mb32 flex flex-center justify-center"><span>Or</span></div>
            <form className="signup flex space-between">
                <div className="input-control wd50">
                    <label>First Name</label>
                    <input type="text" name="firstname" placeholder={"First Name"} ref={FullNameInputRef} value={name} maxlength="30"
                        onChange={e => validNameFill(e.target.value)} style={{ borderColor: nameValid && "red" }} />
                    <div className="errorText">{nameValid !== "" && <span>{nameValid}</span>}</div>
                </div>
                <div className="input-control wd50">
                    <label>Last Name</label>
                    <input type="text" name="lastname" placeholder={"Last Name"} value={lastName}
                        onChange={e => registerOnChange(e)} style={{ borderColor: mailValid && "red" }} />
                    <div className="errorText">{lastNameValid !== "" && <span>{lastNameValid}</span>}</div>
                </div>
                <div className="input-control">
                    <label>Email Address</label>
                    <input type="email" name="email" placeholder={"Email Address"}
                        value={mail}
                        onChange={e => registerOnChange(e)}
                        style={{ borderColor: mailValid && "red" }} />
                    <div className="errorText">{mailValid !== "" && <span>{mailValid}</span>}</div>
                </div>

                <div className="input-control">
                    <label>Contact Number</label>
                    <input name="number" placeholder={"Contact Number"}
                        value={number}
                        onChange={e => validnumber(e.target.value)}
                        maxlength="15"
                        style={{ borderColor: numValid && "red" }} />
                    <div className="errorText">{numValid !== "" && <span>{numValid}</span>}</div>
                </div>

                <div className="input-control wd50">
                    <label>Password</label>
                    <input name="password" placeholder={"Password"} type={passShow ? "text" : "password"}
                        value={pass}
                        onChange={e => registerOnChange(e)}
                        style={{ borderColor: passValid.length == !0 ? "red" : "" }} />
                    {passShow ? <button className="show-hide" onClick={e => setPassShow(!passShow)}><IconEye /></button> : (<> <button className="show-hide" onClick={e => setPassShow(!passShow)}><IconEye /></button> </>)}
                    <div className="errorText">{passValid !== "" && <span>{passValid}</span>}</div>

                </div>

                <div className="input-control wd50">
                    <label>Confirm Password</label>
                    <input name="cpass" placeholder={"Confirm Password"} type={conpassShow ? "text" : "password"}
                        value={cpass}
                        onChange={e => registerOnChange(e)}
                        style={{ borderColor: cpassValid === "" ? "" : cpassValid === undefined ? "red" : "" }} />
                    {conpassShow ? <button className="show-hide" onClick={e => setConPassShow(!conpassShow)}><IconEye /></button> : (<> <button className="show-hide" onClick={e => setConPassShow(!conpassShow)}><IconEye /></button> </>)}

                    <div className="errorText">{cpassValid !== "" && <span>{cpassValid}</span>}</div>

                </div>

                <div className="checkbox-wrap mb32">
                    <label className="checkbox">
                        <input type="checkbox" onClick={handlePolicyCheck} />
                        <span class="checkmark"></span>
                        I’ve read and agree with Terms of Service & Privacy Policy
                    </label>
                </div>

                <div className="submitWrap mb32">
                    <button onClick={e => handleSubmit(e)} className="primary-btn">Sign Up</button>
                </div>

                <div className="text-center mb16 already">
                    Already have an account? <Link href="/account/login"><a>Sign In</a></Link>
                </div>
            </form>
        </div>
    );
}

const mapStateToProps = state => {
    return state.auth;
};
export default connect(mapStateToProps)(Signup);