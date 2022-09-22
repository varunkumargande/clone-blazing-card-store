import React from "react";
export default function PaymentDetails(){
    return(
        <div className="step-container">
            <h3>Payment Details</h3>
            <div className="sub-title">Blazing Cards takes marketplace safety seriously. Sellers must have a valid payment method on file. In rare occasions, sellers are charged a $100 fee for severe or repeated infractions of our policies.</div>
            <form>
                <div className="flex space-between">
                    <div className="input-control wd48">
                        <label>Select a Payment Method *</label>
                        <select>
                            <option>Select here</option>
                            <option>Credit Card</option>
                            <option>Net Bannking</option>
                        </select>
                    </div>
                    <div className="input-control wd48">
                        <label>Card Number *</label>
                        <input type="text" name="CardNumber " placeholder={"Enter here"} />
                    </div>
                </div>
                <div className="flex space-between">
                    <div className="input-control wd48">
                        <label>Expiry *</label>
                        <input type="text" name="Expiry" placeholder={"Enter here"} />
                    </div>
                    <div className="input-control wd48">
                        <label>CVV *</label>
                        <input type="text" name="CVV" placeholder={"Enter here"} />
                    </div>
                </div>
                <div className="flex space-between">
                    <div className="input-control wd48">
                        <label>Country *</label>
                        <select>
                            <option>Select here</option>
                            <option>India</option>
                            <option>Australia</option>
                            <option>America</option>
                        </select>
                    </div>
                </div>
                <div className="sub-title">By providing your card information, you allow BLAZING CARDS to charge your card for future payments in accordance with their terms.</div>
                <div className="submit-wrapper flex space-between">
                    <button className="border-btn">Cancel</button>
                    <button className="primary-btn">Save & Next</button>
                </div>
            </form>
        </div>
    );
}