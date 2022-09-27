import React from "react";
import IconDelete from "../../Icons/IconDelete";
import Link from "next/link";

export default function ShippingInformation(){
    return(
        <div className="profile-detail">
            <h3>Shipping Information</h3>
            <div className="box">
                <div className="inner-box">
                    <div className="discriptionlg">Blazing Cards takes marketplace safety seriously. Sellers must have a valid payment method on file. In rare
    occasions, sellers are charged a $100 fee for severe or repeated infractions of our policies. </div>
                    <div className="flex space-between">
                        <div className="input-control wd50">
                            <label htmlFor="usr">Select a Payment Method *</label>
                            <select className="grey-bg" >
                                <option>Select</option>
                                <option>Method1</option>
                                <option>Method2</option>
                            </select>
                            <span className="errorMessage"></span>
                        </div>
                        <div className="input-control wd50">
                            <label>Card Number *</label>
                            <input name="text" placeholder={"Enter here"} className="grey-bg" />
                            <span className="errorMessage"></span>
                        </div>
                        <div className="input-control wd50">
                                <label htmlFor="usr">Expiry *</label>
                            <input name="passwod" placeholder={"Enter here"}  className="grey-bg" />
                            <span className="errorMessage"></span>
                        </div>
                        <div className="input-control wd50">
                                <label htmlFor="usr">CVV *</label>
                            <input name="passwod" placeholder={"Enter here"}  className="grey-bg" />
                            <span className="errorMessage"></span>
                        </div>
                        <div className="input-control wd50">
                            <label htmlFor="usr">Country *</label>
                            <select className="grey-bg" >
                                <option>Select</option>
                                <option>India</option>
                                <option>Australia</option>
                            </select>
                            <span className="errorMessage"></span>
                        </div>
                    </div>
                    <div className="discriptionlg">By providing your card information, you allow BLAZING CARDS to charge your card for future payments in accordance with their terms.</div>
                </div>
            </div>
            <div className="button-wrapper flex mb40">
                <button className="border-btn mr16">Cancel</button>
                <button className="primary-btn disable">Save</button>
            </div>
        </div>
    );
}