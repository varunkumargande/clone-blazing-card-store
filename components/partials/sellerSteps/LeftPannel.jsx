import React from "react";

export default function LeftPannel(){
    return(
        <div className="left-pannel flex column">
            <div className="step1 step flex flex-center completed">
                <span className="count br50 flex flex-center justify-center">1</span>
                <div className="label">Important Guidelines</div>
            </div>
            <div className="step1 step flex flex-center process">
                <span className="count br50 flex flex-center justify-center">2</span>
                <div className="label">Basic Details</div>
            </div>
            <div className="step1 step flex flex-center">
                <span className="count br50 flex flex-center justify-center">3</span>
                <div className="label">Payment Details</div>
            </div>
            <div className="step1 step flex flex-center">
                <span className="count br50 flex flex-center justify-center">4</span>
                <div className="label">Shipping Details</div>
            </div>
            <div className="step1 step flex flex-center">
                <span className="count br50 flex flex-center justify-center">5</span>
                <div className="label">Application Submitted</div>
            </div>
        </div>
    );
}