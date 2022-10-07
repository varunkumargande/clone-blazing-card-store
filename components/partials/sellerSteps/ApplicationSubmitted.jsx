import React from "react";
import IconBack from '../../Icons/IconBack';
import BackButton from "../../CommonComponents/BackButton";
export default function ApplicationSubmitted(){
    return(
        <div className="step-container">
            <BackButton name={"Application Submitted"}/>
            <div className="timer mb12"><img src="/static/images/timer.svg" alt="" /></div>
            <h4 className="mb16">Thank you for filling out the Application!</h4>
            <div className="sub-title">Please allow the Applications Team up to 2 weeks to review your Application.</div>
            
        </div>
    );
}