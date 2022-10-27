import React from "react";
import IconMasterCardWhite from "../../Icons/IconMasterCardWhite";
import Link from "next/link";

export default function PaymentCard({cardData, setIsCardData, setIsCardEdit}){

    const userData = JSON.parse(sessionStorage.getItem("spurtUser"));

    const handleCardFeature = () => {
        setIsCardEdit(true)
        setIsCardData(false)
    }

    return(
        <div className="profile-detail">
            <div className="box">
                <div className="inner-box">
                    <div className="discriptionlg sb">Your Payment Card</div>
                    <div className="payment-card-wrapper flex flex-start">
                        <div className="payment-card-wrap">
                            <div className="payment-card">
                                <div className="paymentCard">
                                    <div className="bank-name">{cardData?.card?.brand}</div>
                                    <div className="card-no">**** **** **** {cardData?.card?.last4}</div>
                                    <div className="cardholder-wrapper flex space-between">
                                        <div className="card-holder">
                                            <div className="label">Card Holder</div>
                                            <div className="value">{userData.firstName} {userData.lastName}</div>
                                        </div>
                                        <div className="card-holder">
                                            <div className="label">Expires</div>
                                            <div className="value">{cardData?.card?.exp_month} / {cardData?.card?.exp_year}</div>
                                        </div>
                                        <div className="card-name">
                                            {cardData?.card?.brand == "visa" ? (
                                                <>
                                                    Visa
                                                </>
                                            ) : (
                                                <>
                                                    <IconMasterCardWhite />
                                                </>
                                            )}
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="payemnt-edits flex justify-right flex-center">
                                {/* <button className="remove">Remove</button> */}
                                <button className="edit ml20" onClick={handleCardFeature}>Edit Details</button>
                            </div>
                        </div>
                        {/* <div className="add-card flex justify-center flex-center column">
                            <span className="flex justify-center flex-center">+</span>
                            <div className="another-card">Add another card</div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}