import React from "react";
import IconMasterCard from "../../Icons/IconMasterCard";
import IconTrack from "../../Icons/IconTrack";
import IconDownload from "../../Icons/IconDownload";
export default function OrderDetails(){
    return(
        <>
            <div className="order-list-wrap">
                <div className="order-list mb16">
                    <div className="order-header flex flex-center space-between">
                        <div className="order-head">
                            <strong>Order ID: TL02749303</strong>
                        </div>
                    </div>
                    <div className="order-body-wrapper">
                        <div className="order-body flex space-between">
                            <div className="order-text flex">
                                {/* <img src="/static/images/card.png" alt="" /> */}
                                <div className="order-details">
                                    <div className="flex mb12">
                                        <div className="order-title">Pokemon Cards</div>
                                        <button className="status delivered">Delivered</button>
                                    </div>
                                    <div className="order-disc mb16">Get Free Shipping On Your First Order. Giving Away Spots From Our Mystery Pull Game</div>
                                    <div className="qty-bought-wrap flex">
                                        <div className="qty">Qty: 1</div><span className="divide">|</span>
                                        <div className="bought">Bought By: Auction</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="order-body flex space-between mb16">
                            <div className="order-text flex">
                                {/* <img src="/static/images/card.png" alt="" /> */}
                                <div className="order-details">
                                    <div className="flex mb12">
                                        <div className="order-title">Pokemon Cards</div>
                                        <button className="status delivered">Delivered</button>
                                    </div>
                                    <div className="order-disc mb16">Get Free Shipping On Your First Order. Giving Away Spots From Our Mystery Pull Game</div>
                                    <div className="qty-bought-wrap flex">
                                        <div className="qty">Qty: 1</div><span className="divide">|</span>
                                        <div className="bought">Bought By: Auction</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="billing-shipping-wrap flex space-between">
                    <div className="billing-shipping wd50 box">
                        <div className="heading">
                            Billing Information
                        </div>
                        <div className="body">
                            <h5>Credit Card</h5>
                            <div className="bodyText flex flex-center">
                                <span className="mastr"><IconMasterCard/></span> Mastercard ending in 8372
                            </div>
                        </div>
                    </div>
                    <div className="billing-shipping wd50 box">
                        <div className="heading">
                            Shipping Information
                        </div>
                        <div className="body">
                            <div className="bodyText flex flex-center">
                            2nd Floor, 4943 Maple Street
                            , Irvine. California - 92614, United States.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="order-summery-wrap">
                <div className="order-summery box mb24">
                    <div className="heading">
                        Order Summary
                    </div>
                    <div className="order-value">
                        <div className="flex space-between amount">
                            <div className="label">Subtotal (2 items)</div>
                            <div className="value">$23.00</div>
                        </div>
                        <div className="flex space-between amount">
                            <div className="label">Tax (3.2%)</div>
                            <div className="value">$6.21</div>
                        </div>
                        <div className="flex space-between amount">
                            <div className="label">Shipping</div>
                            <div className="value">$3.00</div>
                        </div>
                    </div>
                    <div className="total-order flex space-between flex-center">
                        <div className="label">Total</div>
                        <div className="value">$30.00</div>
                    </div>
                </div>
                <div className="download-wrap flex space-between flex-center">
                    <button className="border-btn flex flex-center justify-center">Download Invoice</button>
                    {/* <button className="track flex flex-center justify-center"><IconTrack/>Track</button> */}
                    {/* <button className="download flex flex-center justify-center"><IconDownload/>Track</button> */}
                </div>
            </div>
        </>
    );
}