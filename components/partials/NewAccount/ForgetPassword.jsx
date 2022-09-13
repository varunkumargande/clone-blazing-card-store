import React from "react";
import Link from "next/link";
import IconKey from "../../Icons/IconKey";
import IconBack from "../../Icons/IconBack";
import { useState, useEffect } from 'react';
import SendMail from "./SentMail";
import {forgotApi} from '../../../api/auth/forgotPassword'

export default function ForgetPassword() {

    const [mail, setMail] = useState("")
    const [forgotSuccess, setForgotSuccess] = useState(false)


    const validateMessages = {
        required: '${name} id is required!',
        types: {
            email: 'Invalid Email Id'
        },
    };


    const handleSetEmail = (e) =>{
        e.preventDefault()
        setMail(e.target.value)
    }  

    const handleSubmit = () => {
        // e.preventDefault()
        forgotApi(mail, setForgotSuccess)
    }

    return (
        <div className="login-wrapper">

            {forgotSuccess ? <SendMail mail={mail} /> : (
                <>
                    <div className="back mb32"><IconBack /></div>
                    <div className="iconkey mb32"><IconKey /></div>
                    <h1 className="title mb8">Forgot Password</h1>
                    <div className="infotext wd328 mb32">Enter your registered email id below. We will sent the link to reset your password</div>
                    {/* <form className="forget flex space-between" > */}
                        <div className="input-control mb32">
                            <label>Email Address</label>
                            <input type="email" value={mail} name="email" placeholder="Email address" onChange={e => handleSetEmail(e)} />
                        </div>
                        <div className="submitWrap mb32 mt16">
                            <button type="submit" className="primary-btn" onClick={handleSubmit}>Reset Password</button>
                        </div>
                        <div className="text-center mb16 already">
                            Go Back to <Link href="/login"><a>Sign In</a></Link>
                        </div>
                        {/* <div className="copyright flex flex-center justify-center">
                    © Blazing Cards. 2022, All Rights Reserved
                </div> */}
                    {/* </form> */}
                </>
            )}

        </div>
    );
}