import React from "react";
import IconMasterCardWhite from "../../Icons/IconMasterCardWhite";
import Link from "next/link";

export default function PaymentCard(){
    return(
        <div className="profile-detail">
            <h3>Payment Details</h3>
            <div className="box">
                <div className="inner-box">
                    <div className="discriptionlg sb">Your Payment Card</div>
                    <div className="payment-card-wrapper flex flex-start">
                        <div className="payment-card-wrap">
                            <div className="payment-card">
                                <div className="paymentCard">
                                    <div className="bank-name">Bank of America</div>
                                    <div className="card-no">**** **** **** 9373</div>
                                    <div className="cardholder-wrapper flex space-between">
                                        <div className="card-holder">
                                            <div className="label">Card Holder</div>
                                            <div className="value">Alejandro Felix</div>
                                        </div>
                                        <div className="card-holder">
                                            <div className="label">Expires</div>
                                            <div className="value">06/24</div>
                                        </div>
                                        <div className="card-name">
                                            <IconMasterCardWhite />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="payemnt-edits flex justify-right flex-center">
                                <button className="remove">Remove</button>
                                <button className="edit ml20">Edit Details</button>
                            </div>
                        </div>
                        <div className="add-card flex justify-center flex-center column">
                            <span className="flex justify-center flex-center">+</span>
                            <div className="another-card">Add another card</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}