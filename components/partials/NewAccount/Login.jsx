import React from "react";
import Link from "next/link";
import IconGoogle from '../../Icons/IconGoogle';
import IconEye from '../../Icons/IconEye';
export default function Login(){
    return(
        <div className="login-wrapper">
            <h1 className="title mb32">Sign in to Blazing Cards</h1>
            <button className="google-btn mb42"><IconGoogle />Sign in with Gooogle</button>
            <div className="or mb32 flex flex-center justify-center"><span>Or</span></div>
            <form className="login flex space-between">
                <div className="input-control">
                    <label>Email Address or Username</label>
                    <input type="email" placeholder="Enter here" />
                </div>
                <div className="input-control">
                    <label>Password</label>
                    <input type="password" placeholder="Enter here" />
                    <button className="show-hide"><IconEye /></button>
                    <div className="flex justify-right mb16 forget mb32">
                        <Link href="/forget-password"><a>Forget Password</a></Link> 
                    </div>
                </div>
                <div className="submitWrap mb32">
                    <button type="submit" className="primary-btn">Sign in</button>
                </div>
                <div className="text-center mb16 already">
                    Don’t have an account yet?  <Link href="/signup"><a>Sign Up</a></Link> 
                </div>
                <div className="copyright flex flex-center justify-center">
                    © Blazing Cards. 2022, All Rights Reserved
                </div>
            </form>
        </div>
    );
}