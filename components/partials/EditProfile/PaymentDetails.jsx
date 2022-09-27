import React from "react";
import IconDelete from "../../Icons/IconDelete";
import Link from "next/link";

export default function PaymentDetails(){
    return(
        <div className="profile-detail">
            <h3>Payment Details</h3>
            <div className="box">
                <div className="inner-box">
                <div className="discriptionlg">A return address must be added before going live on Blazing Cards. This will be used on your shipment labels.</div>
                    <div className="flex space-between">
                        <div className="input-control">
                            <label>Full Name *</label>
                            <input name="passwod" placeholder={"Enter here"} className="grey-bg" />
                            <span className="errorMessage"></span>
                        </div>
                        <div className="input-control wd50">
                            <label>Address Line 1 *</label>
                            <input name="passwod" placeholder={"Enter here"} className="grey-bg" />
                            <span className="errorMessage"></span>
                        </div>
                        <div className="input-control wd50">
                                <label htmlFor="usr">Address Line 2</label>
                            <input name="passwod" placeholder={"Enter here"} id="usr" className="grey-bg" />
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
                        <div className="input-control wd50">
                                <label htmlFor="usr">Postal Code *</label>
                            <input name="passwod" placeholder={"Enter here"} id="usr" className="grey-bg" />
                            <span className="errorMessage"></span>
                        </div>
                        <div className="input-control wd50">
                            <label htmlFor="usr">City *</label>
                            <select className="grey-bg" >
                                <option>Select</option>
                                <option>Delhi</option>
                                <option>Mumbai</option>
                            </select>
                            <span className="errorMessage"></span>
                        </div>
                        <div className="input-control wd50">
                            <label htmlFor="usr">State *</label>
                            <select className="grey-bg" >
                                <option>Select</option>
                                <option>Delhi</option>
                                <option>U.P.</option>
                            </select>
                            <span className="errorMessage"></span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="button-wrapper flex mb40">
                <button className="border-btn mr16">Cancel</button>
                <button className="primary-btn disable">Save</button>
            </div>
        </div>
    );
}