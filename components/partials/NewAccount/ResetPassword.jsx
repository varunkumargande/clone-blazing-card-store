import React from "react";
import IconKey from "../../Icons/IconKey";
import IconBack from "../../Icons/IconBack";
import IconEye from "../../Icons/IconEye";
export default function SentMail(){
    return(
        <div className="login-wrapper">
            <div className="back mb32"><IconBack /></div>
            <div className="iconkey mb32"><IconKey /></div>
            <h1 className="title mb8">Set New Password</h1>
            <div className="infotext mb32">Your new password must be different to previously used passwords.</div>
            <form className="reset flex space-between">
                <div className="input-control">
                    <label>Password</label>
                    <input type="password" placeholder="Enter here" />
                    <button className="show-hide"><IconEye /></button>
                </div>
                <div className="input-control">
                    <label>Conform Password</label>
                    <input type="password" placeholder="Enter here" />
                    <button className="show-hide"><IconEye /></button>
                </div>
                <div className="submitWrap mb32 mt16">
                    <button type="submit" className="primary-btn">Reset Password</button>
                </div>
            </form>
        </div>
    );
}