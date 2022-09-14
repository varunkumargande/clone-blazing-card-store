import React from "react";
import Link from "next/link";
import IconGoogle from '../../Icons/IconGoogle';
import IconEye from '../../Icons/IconEye';
export default function Login(){
    return(
        <div className="login-wrapper">
            <h1 className="title mb32">Sign up to Blazing Cards</h1>
            <button className="google-btn mb42"><IconGoogle />Sign Up with Gooogle</button>
            <div className="or mb32 flex flex-center justify-center"><span>Or</span></div>
            <form className="signup flex space-between">
                <div className="input-control wd50">
                    <label>First Name</label>
                    <input type="text" placeholder="Enter here" />
                    <div className="errorText"></div>
                </div>
                <div className="input-control wd50">
                    <label>Last Name</label>
                    <input type="text" placeholder="Enter here" />
                </div>
                <div className="input-control">
                    <label>Email Address</label>
                    <input type="email" placeholder="Enter here" />
                </div>
                <div className="input-control">
                    <label>Userame</label>
                    <input type="text" placeholder="Enter here" />
                </div>
                <div className="input-control wd50">
                    <label>Password</label>
                    <input type="password" placeholder="Enter here" />
                    <button className="show-hide"><IconEye /></button>
                </div>
                <div className="input-control wd50">
                    <label>Conform Password</label>
                    <input type="password" placeholder="Enter here" />
                    <button className="show-hide"><IconEye /></button>
                </div>
                <div className="checkbox-wrap mb32">
                    <label className="checkbox">
                        <input type="checkbox" />
                        <span class="checkmark"></span>
                        I’ve read and agree with Terms of Service & Privacy Policy
                    </label>
                </div>
                <div className="submitWrap mb32">
                    <button type="submit" className="primary-btn">Sign Up</button>
                </div>
                <div className="text-center mb16 already">
                    Already have an account? <Link href="/login"><a>Sign In</a></Link> 
                </div>
                <div className="copyright flex flex-center justify-center">
                    © Blazing Cards. 2022, All Rights Reserved
                </div>
            </form>
        </div>
    );
}