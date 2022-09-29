import React, { useState,  useEffect, useRef } from "react";
import Link from "next/link";
import IconGoogle from '../../Icons/IconGoogle';
import IconEye from '../../Icons/IconEye';
import IconBack from "../../Icons/IconBack";
import { EmailValidator, upperPresent, lowerPresent, numPresent, specialPresent } from '../../helper/emailValidator';
import { UserRegister } from '../../../api';
import Router from 'next/router';
import { connect, useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { GoogleLoginApi } from '../../../api/auth/GoogleLoginApi';
import { modalSuccess, modalWarning } from "../../../api/intercept";
import { registerConstant } from "../../Constants/register"
import { Formik } from 'formik';
import * as Yup from 'yup';
import { getUsername } from '../../../api/auth/getUsername';

function Signup(auth) {

    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [mail, setMail] = useState("")
    const [pass, setpass] = useState("")
    const [cpass, setCpass] = useState("")
    const [number, setNumber] = useState("")

    const [usernameAvailable, setUsernameAvailable] = useState(null)
    const usernameInput = useRef();

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
        e.preventDefault()
        if (policyCheck == true) {
            setSubmit(1)
            validMessage()
            if (validMessage()) {
                UserRegister(name, mail, pass, cpass, number, Router)
            }
        } else {
            modalWarning("error", registerConstant["policyError"])
        }
    };

    const handlePolicyCheck = () => {
        if (policyCheck) {
            setPolicyCheck(false)
        } else {
            setPolicyCheck(true)
        } 
    }

    const handleOnBlur = async() => {
        if(usernameInput) {
            const res = await getUsername(usernameInput.current.value);
            setUsernameAvailable(res);
        }
    }

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const registerSchema = Yup.object().shape({
        firstname: Yup.string().matches(/^[A-Za-z ]*$/, 'Please enter valid name').max(40).required('Required'),
        lastname: Yup.string().matches(/^[A-Za-z ]*$/, 'Please enter valid name').max(40).required('Required'),
        email: Yup.string().email('Invalid email format').required('Required'),
        number: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Required'),
        password: Yup.string().matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
          ).required('Required'),
        cpass: Yup.string().required('Required').oneOf([Yup.ref('password'), null], 'Passwords must match'),
        username: Yup.string().matches(/^[a-zA-Z0-9]*$/, 'Please enter valid username').max(40).required('Required')
    });

    // const generatePassword = () => {
    //     const alpha = 'abcdefghijklmnopqrstuvwxyz';
    //     const calpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    //     const num = '1234567890';
    //     const specials = ',.!@#$%^&*';
    //     const options = [alpha, alpha, alpha, calpha, calpha, num, num, specials];
    //     let opt, choose;
    //     let pass = "";
    //     for (let i = 0; i < 8; i++) {
    //       opt = Math.floor(Math.random() * options.length);
    //       choose = Math.floor(Math.random() * (options[opt].length));
    //       pass = pass + options[opt][choose];
    //       options.splice(opt, 1);
    //     }
    //     return pass;
    //   }
    const responseGoogle = (response) => {
        //let pass = generatePassword();
        GoogleLoginApi(response.gv.gZ, response.gv.tX, response.profileObj.email, process.env.NEXT_PUBLIC_DEFAULT_EMAIL_PASSWORD, process.env.NEXT_PUBLIC_DEFAULT_EMAIL_PASSWORD, response.googleId, "gmail", response.googleId, response.googlePath, response.googleId, response.googlePath, response.profileObj, Router, response)
    }

    const responseGoogleFailure = (response) => {
        console.error('Failure response', response)
    }

    const submitBtnState = (errors) => (Object.keys(errors).length > 0 || policyCheck===false) ? "disable-btn" : "primary-btn"
    const submitBtnDisableState = (errors) => (Object.keys(errors).length > 0  || policyCheck===false) ? true : false

    return (
        <div className="login-wrapper">
            <div className="back mb32"><IconBack /></div>
            <h1 className="title mb32">Sign up to Blazing Cards</h1>


            <GoogleLogin
                clientId="951035021628-eq7mvocc70h77117grhsdt95p343plc4.apps.googleusercontent.com"
                render={renderProps => (
                    <button className="google-btn mb42" onClick={renderProps.onClick}><IconGoogle />Sign up with Google</button>
                )}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogleFailure}
                isSignedIn={false}
            />

            <div className="or mb32 flex flex-center justify-center"><span>Or</span></div>

            <Formik
                initialValues={{ firstname: '', lastname: '', number: '', email: '', password: '', cpass: '', username: ''}}
                validationSchema={registerSchema}
                onSubmit={(values) => {
                  
                    if (policyCheck == true  && usernameAvailable) {
                        UserRegister(values.firstname, values.lastname, values.email, values.password, values.cpass, values.number,usernameInput.current.value, Router)
                    }
                }}
            >
                {({
                    formik,
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <>
                        <form className="signup flex space-between" onSubmit={handleSubmit}>
                            <div className="input-control wd50">
                                <label>First Name</label>
                                <input type="text" name="firstname" placeholder={"First Name"} ref={FullNameInputRef} value={values.name} maxlength="30"
                                    onChange={handleChange} />
                                <div className="errorText">{errors.firstname}</div>
                            </div>
                            <div className="input-control wd50">
                                <label>Last Name</label>
                                <input type="text" name="lastname" placeholder={"Last Name"} value={values.lastName}
                                    onChange={handleChange} />
                                <div className="errorText">{errors.lastname}</div>
                            </div>
                            <div className="input-control">
                                <label>Email Address</label>
                                <input type="email" name="email" placeholder={"Email Address"}
                                    value={values.email}
                                    onChange={handleChange}
                                />
                                <div className="errorText">{errors.email}</div>
                            </div>

                            <div className="input-control">
                                <label>Contact Number</label>
                                <input name="number" placeholder={"Contact Number"}
                                    value={values.number}
                                    onChange={handleChange}
                                    maxlength="15"
                                />
                                <div className="errorText">{errors.number}</div>
                            </div>

                            <div className="input-control wd50">
                                <label>Password</label>
                                <input name="password" placeholder={"Password"} type={passShow ? "text" : "password"}
                                    value={values.password}
                                    onChange={handleChange}
                                />
                                {passShow ? <button className="show-hide" onClick={e => setPassShow(!passShow)}><IconEye /></button> : (<> <button className="show-hide" onClick={e => setPassShow(!passShow)}><IconEye /></button> </>)}
                                <div className="errorText">{errors.password}</div>

                            </div>

                            <div className="input-control wd50">
                                <label>Confirm Password</label>
                                <input name="cpass" placeholder={"Confirm Password"} type={conpassShow ? "text" : "password"}
                                    value={values.cpass}
                                    onChange={handleChange}
                                />
                                {conpassShow ? <button className="show-hide" onClick={e => setConPassShow(!conpassShow)}><IconEye /></button> : (<> <button className="show-hide" onClick={e => setConPassShow(!conpassShow)}><IconEye /></button> </>)}

                                <div className="errorText">{errors.cpass}</div>

                            </div>

                            <div className="input-control">
                                <label>Username</label>
                                <input type="text" name="username" placeholder={"username"} value={values.username}
                                    onChange={handleChange} ref={usernameInput} onBlur={handleOnBlur}/>
                                <div className="errorText">{errors.username}</div>
                                { (usernameAvailable===false && usernameAvailable !== null) ? <div className="errorText">Username already taken</div> : null}
                            </div>

                            <div className="checkbox-wrap mb32">
                                <label className="checkbox">
                                    <input type="checkbox" onClick={handlePolicyCheck} />
                                    <span class="checkmark"></span>
                                    I’ve read and agree with Terms of Service & Privacy Policy
                                </label>
                            </div>

                            <div className="submitWrap mb32">
                                <button className={submitBtnState(errors)} disabled={() => submitBtnDisableState(errors)}>Sign Up</button>
                            </div>

                            <div className="text-center mb16 already">
                                Already have an account? <Link href="/account/login"><a>Sign In</a></Link>
                            </div>
                        </form>
                    </>
                )}
            </Formik>

        </div>
    );
}

const mapStateToProps = state => {
    return state.auth;
};
export default connect(mapStateToProps)(Signup);