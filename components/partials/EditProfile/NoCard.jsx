import React from "react";
import IconDelete from "../../Icons/IconDelete";
import Link from "next/link";

export default function NoCard(){
    return(
        <div className="profile-detail">
            <h3>Payment Details</h3>
            <div className="box">
                <div className="inner-box">
                    <div className="NoCard flex justify-center flex-center column">
                        <div className="Image">
                            <img src="/static/images/nocard.png" alt="" />
                        </div>
                        <div className="no-payment">
                            No payment details added
                        </div>
                        <div className="Addcard-btn">
                            <button className="primary-btn">Add Card</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}