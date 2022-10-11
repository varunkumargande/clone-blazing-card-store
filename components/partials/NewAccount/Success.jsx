import React from "react";
import IconSuccess from "../../Icons/IconSuccess";
import Router from "next/router";
export default function Success(){

    const handleGoToLoginPage = () => {
        Router.push("/account/login")
    }

    return(
        <div className="login-wrapper">
            <div className="iconkey mb32"><IconSuccess /></div>
            <h1 className="title mb8">Password Reset</h1>
            <div className="infotext wd300 mb32">Your password has been successfully reset. Click below to sign in</div>
            <form className="success flex space-between">
                <div className="submitWrap mb32 mt32">
                    <button type="submit" className="primary-btn" onClick={() => handleGoToLoginPage()}>Continue</button>
                </div>
                <div className="copyright flex flex-center justify-center">
                    © Blazing Cards. 2022, All Rights Reserved
                </div>
            </form>
        </div>
    );
}
