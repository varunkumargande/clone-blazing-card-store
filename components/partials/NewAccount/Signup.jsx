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
import { registerConstant } from "../../Constants/register"
import { Formik } from 'formik';
import * as Yup from 'yup';

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

    const registerSchema = Yup.object().shape({
        firstname: Yup.string().required('Required'),
        lastname: Yup.string().required('Required'),
        email: Yup.string().required('Required'),
        number: Yup.string().required('Required'),
        password: Yup.string().required('Required'),
        cpass: Yup.string().required('Required').oneOf([Yup.ref('password'), null], 'Passwords must match')
    });


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

            <Formik
                initialValues={{ firstname: '', lastname: '', number: '', email: '', password: '', cpass: '' }}
                validationSchema={registerSchema}
                onSubmit={(values) => {
                    if (policyCheck == true) {
                        let name = values.firstname + " " + values.lastname
                        UserRegister(name, values.email, values.password, values.cpass, values.number, Router)
                    } else {
                        modalWarning("error", "Please select term and condition")
                    }
                }}
            >
                {({
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

                            <div className="checkbox-wrap mb32">
                                <label className="checkbox">
                                    <input type="checkbox" onClick={handlePolicyCheck} />
                                    <span class="checkmark"></span>
                                    I’ve read and agree with Terms of Service & Privacy Policy
                                </label>
                            </div>

                            <div className="submitWrap mb32">
                                <button className="primary-btn">Sign Up</button>
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