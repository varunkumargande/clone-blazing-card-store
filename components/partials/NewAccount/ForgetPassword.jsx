import React from "react";
import Link from "next/link";
import IconKey from "../../Icons/IconKey";
import IconBack from "../../Icons/IconBack";
export default function ForgetPassword(){
    return(
        <div className="login-wrapper">
            <div className="back mb32"><IconBack /></div>
            <div className="iconkey mb32"><IconKey /></div>
            <h1 className="title mb8">Forgot Password</h1>
            <div className="infotext wd328 mb32">Enter your registered email id below. We will sent the link to reset your password</div>
            <form className="forget flex space-between">
                <div className="input-control mb32">
                    <label>Email Address</label>
                    <input type="email" placeholder="Enter here" />
                </div>
                <div className="submitWrap mb32 mt16">
                    <button type="submit" className="primary-btn">Reset Password</button>
                </div>
                <div className="text-center mb16 already">
                    Go Back to <Link href="/login"><a>Sign In</a></Link> 
                </div>
                <div className="copyright flex flex-center justify-center">
                    © Blazing Cards. 2022, All Rights Reserved
                </div>
            </form>
        </div>
    );
}