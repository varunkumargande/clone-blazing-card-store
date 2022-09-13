import React from "react";
import Link from "next/link";
import IconKey from "../../Icons/IconKey";
import IconBack from "../../Icons/IconBack";
export default function SendMail(props){
    return(
        <div className="login-wrapper">
            <div className="back mb32"><IconBack /></div>
            <div className="iconkey mb32"><IconKey /></div>
            <h1 className="title mb8">Check Your Email</h1>
            <div className="infotext mb32">We sent a password reset link to {props.mail}</div>
            <div className="sent flex space-between">
                <div className="mb32 already">
                    Don’t receive the email? <Link href="/reset-password"><a>Click to resend</a></Link> 
                </div>
                <div className="already">
                    Go Back to <Link href="/login"><a>Sign In</a></Link> 
                </div>
                <div className="copyright flex flex-center justify-center">
                    © Blazing Cards. 2022, All Rights Reserved
                </div>
            </div>
        </div>
    );
}