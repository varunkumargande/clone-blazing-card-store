import React from "react";
import LeftPannel from "../../components/partials/NewAccount/LeftPannel";
import Login from "../../components/partials/NewAccount/Login";
import Signup from "../../components/partials/NewAccount/Signup";
export default function NewAccount(){
    return(
        <main className="form-wrapper flex space-between">
            <div className="login-left flex justify-center text-center">
                <LeftPannel />
            </div>
            <div className="login-right flex justify-center">
                <Login/>
                {/* <Signup /> */}
            </div>
        </main>
    );
}