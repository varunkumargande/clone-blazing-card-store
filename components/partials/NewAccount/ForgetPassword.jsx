import React from "react";
import Link from "next/link";
import IconKey from "../../Icons/IconKey";
import IconBack from "../../Icons/IconBack";
import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import SendMail from "./SentMail";
import { forgotApi } from '../../../api/auth/forgotPassword'
import { forgotPasswordConstant } from "../../Constants/forgot-password";

export default function ForgetPassword() {

    const [mail, setMail] = useState("")
    const [mailError, setMailError] = useState("")
    const [forgotSuccess, setForgotSuccess] = useState(false)
    const [forError, setForError] = useState("");

    const router = useRouter();
    const handleSetEmail = (e) => {
        e.preventDefault()
        setMail(e.target.value)
    }

    const handleSubmit = () => {
        if(mail == "") {
            setMailError(forgotPasswordConstant["requiredEmail"])
        }else {
            forgotApi(mail, setForgotSuccess, setForError)
        }
    }

     //go back to previous page
   const handleBackButton = () => {
    router.back()
   }
    return (
        <div className="login-wrapper">
            {forgotSuccess ? <SendMail mail={mail} /> : (
                <>
                    <div className="back mb32" onClick={handleBackButton}><IconBack /></div>
                    <h1 className="title mb8">Forgot Password</h1>
                    <div className="infotext wd328 mb32">Enter your registered email id below. We will send the link to
reset your password.</div>
                    <div className="input-control mb32">
                        <label>Email Address*</label>
                        <input type="email" value={mail} name="email" placeholder="Enter here" onChange={e => handleSetEmail(e)} />
                        <div className="errorText">{mail == "" ? <span>{mailError}</span> : ""}</div>
                    </div>
                    <div className="submitWrap mb32 mt32">
                        <button type="submit" className="primary-btn" onClick={handleSubmit}>Reset Password</button>
                    </div>
                    <div className="text-center mb16 already">
                        Go Back to <Link href="/account/login"><a>Sign In</a></Link>
                    </div>
                </>
            )}
            <div className="copyright flex justify-center flex-center">&copy; Blazing Cards. {new Date().getFullYear()}, All Rights Reserved</div>
        </div>
    );
}
