import React from "react";
import IconBack from '../../Icons/IconBack';
export default function PaymentDetails(){
    return(
        <div className="step-container">
            <h3 className="flex flex-center"><div className="edit-back"><IconBack/></div>Shipping Details</h3>
            <div className="sub-title">A return address must be added before going live on Blazing Cards. This will be used on your shipment labels.</div>
            <form>
                <div className="flex space-between">
                    <div className="input-control">
                        <label>Full Name *</label>
                        <input type="text" name="CardNumber " placeholder={"Enter here"} />
                    </div>
                </div>
                <div className="flex space-between">
                    <div className="input-control wd48">
                        <label>Address Line 1 *</label>
                        <input type="text" name="Add1 " placeholder={"Enter here"} />
                    </div>
                    <div className="input-control wd48">
                        <label>Address Line 2</label>
                        <input type="text" name="Add2 " placeholder={"Enter here"} />
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
                    <div className="input-control wd48">
                        <label>Postal Code *</label>
                        <input type="text" name="postal-code" placeholder={"Enter here"} />
                    </div>
                </div>
                <div className="flex space-between">
                    <div className="input-control wd48">
                        <label>City *</label>
                        <select>
                            <option>Select here</option>
                            <option>Delhi</option>
                            <option>Mumbai</option>
                            <option>Channai</option>
                        </select>
                    </div>
                    <div className="input-control wd48">
                        <label>State *</label>
                        <select>
                            <option>Select here</option>
                            <option>Delhi</option>
                            <option>Utter Pradesh</option>
                        </select>
                    </div>
                </div>
                
                <div className="submit-wrapper flex space-between conform">
                    <button className="border-btn">Cancel</button>
                    <button className="primary-btn">Confirm Shipping Details</button>
                </div>
            </form>
        </div>
    );
}