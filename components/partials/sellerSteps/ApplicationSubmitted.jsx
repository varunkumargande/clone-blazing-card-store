import React from "react";
import IconBack from '../../Icons/IconBack';
import BackButton from "../../CommonComponents/BackButton";
import { Router, useRouter } from "next/router";

export default function ApplicationSubmitted(){
    const router = useRouter();
    return(
        <div className="step-container">
            <div className="timer mb12"><img src="/static/images/timer.svg" alt="" /></div>
            <h4 className="mb16">Thank you for filling out the Application!</h4>
            <div className="sub-title">Please allow the Applications Team up to 2 weeks to review your Application.</div>
            <h3 className="flex flex-center"><div className="edit-back" onClick={() => router.push("/")} ><IconBack/>Back to home</div></h3>
        </div>
    );
}