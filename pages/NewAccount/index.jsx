import React from "react";
import LeftPannel from "../../components/partials/NewAccount/LeftPannel";
import Login from "../../components/partials/NewAccount/Login";
import Signup from "../../components/partials/NewAccount/Signup";
import ForgetPassword from "../../components/partials/NewAccount/ForgetPassword";
import ResetPassword from "../../components/partials/NewAccount/ResetPassword";
import Success from "../../components/partials/NewAccount/Success";
import SentMail from "../../components/partials/NewAccount/SentMail";
export default function NewAccount(){


    return(
        <main className="form-wrapper flex space-between">
            <div className="login-left flex justify-center text-center">
                <LeftPannel />
            </div>
            <div className="login-right flex justify-center">
                {/* <Login/> */}
                {/* <Signup /> */}
                {/* <ForgetPassword /> */}
                <ResetPassword />
                {/* <Success /> */}
                {/* <SentMail /> */}
            </div>
        </main>
    );
}