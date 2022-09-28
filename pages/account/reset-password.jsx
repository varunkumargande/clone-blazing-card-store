import React from "react";
import LeftPannel from "../../components/partials/NewAccount/LeftPannel";
import ResetPassword from "../../components/partials/NewAccount/ResetPassword";

export default function NewAccount(){


    return(
        <main className="form-wrapper flex space-between">
            <div className="login-left flex justify-center text-center">
                <LeftPannel />
            </div>
            <div className="login-right flex justify-center">
                <ResetPassword />
            </div>
        </main>
    );
}