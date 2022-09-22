import React from "react";
import IconClose from "../../Icons/IconClose";
import IconShareFacebook from "../../Icons/IconShareFacebook";
import IconShareTwitter from "../../Icons/IconShareTwitter";
import IconShareWhatsup from "../../Icons/IconShareWhatsup";

export function ShareModalModal(){
    return(
        <div className="modalOverlay flex justify-center flex-center">
            <div className="modal">
               <div className="modal-header flex Space-between flex-center">
                    <h5 className="modal-title">Share</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true"><IconClose /></span>
                    </button>
               </div> 
               <div className="modal-body">
                    <div className="flex justify-center social-link">
                        <button><IconShareWhatsup /></button>
                        <button><IconShareTwitter /></button>
                        <button><IconShareFacebook /></button>
                    </div>
                    <div className="copy flex space-between flex-center nowrap">
                        <span>https://www.blazingcards.com/live/5...</span>
                        <button className="copy-btn">Copy</button>
                    </div>
               </div>
            </div>
        </div>
    );
}

export function ShippingTaxesModal(){
    return(
        <div className="modalOverlay flex justify-center flex-center">
            <div className="modal">
               <div className="modal-header flex Space-between flex-center">
                    <h5 className="modal-title">Shipping & Taxes</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true"><IconClose /></span>
                    </button>
               </div> 
               <div className="modal-body">
                    <h6>Shipping</h6>
                    <p>You must add your shipping address before you can view prices.</p>
                    <h6>Taxes</h6>
                    <p>We're required by law to collect sales taxes and applicable fees for certain tax authorities. Sales taxes vary depending on state.</p>
                    <h6>Help</h6>
                    <p>If you need help on the above please write to support@blazingcards.com</p>
               </div>
            </div>
        </div>
    );
}
export function CustomBidModal(){
    return(
        <div className="modalOverlay flex justify-center flex-center">
            <div className="modal">
               <div className="modal-header flex Space-between flex-center">
                    <h5 className="modal-title">Custom Bid</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true"><IconClose /></span>
                    </button>
               </div> 
               <div className="modal-body">
                    <div className="flex space-between bid-status column mb16">
                        <div className="left">
                            <strong>Time left - </strong>
                            <span>0m 15s</span>
                        </div>
                        <div className="right">
                            <strong>Current Bid - </strong>
                            <span>$110 +Ship/Tax</span>
                        </div>
                    </div>
                    <div className="flex space-between increment mb32">
                        <button className="decrease flex flex-center justify-center">-</button>
                        <input type="number" className="text-center" placeholder="0"/>
                        <button className="increase flex flex-center justify-center">+</button>
                    </div>
               </div>
               <div className="modal-footer">
                    <div className="flex space-between btn-wrap">
                        <button className="disable-btn">Cancel</button>
                        <button className="primary-btn disable">Conform</button>
                    </div> 
               </div>
            </div>
        </div>
    );
}
export function PaymentInfoMOdal(){
    return(
        <div className="modalOverlay flex justify-center flex-center">
            <div className="modal medium">
               <div className="modal-header flex Space-between flex-center">
                    <h5 className="modal-title">Payment Info</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true"><IconClose /></span>
                    </button>
               </div> 
               <div className="modal-body-upper">
                    <div className="flex space-between item-amount">
                        <div className="left">
                            <strong>PSA SLAB #81 1 item</strong>
                        </div>
                        <div className="right">
                            <span className="link">$23.00</span>
                        </div>
                    </div>
               </div>
               <div className="modal-body">
                    <div className="input-control with-bg">
                        <label>Shipping Details</label>
                        <input name="text" placeholder={"Add Address"} className="address" />
                        <span className="errorMessage"></span>
                    </div>
                    <div className="input-control with-bg">
                        <label>Card Number *</label>
                        <input name="text" placeholder={"Add Payment"}  className="payment" />
                        <span className="errorMessage"></span>
                    </div>     
               </div>
               <div className="modal-footer flex justify-center">
                    <div className="flex space-between btn-wrap wd310">
                        <button className="disable-btn">Cancel</button>
                        <button className="primary-btn">Conform</button>
                    </div> 
               </div>
            </div>
        </div>
    );
}

export function AddNewCardModal(){
    return(
        <div className="modalOverlay flex justify-center flex-center">
            <div className="modal medium">
               <div className="modal-header flex Space-between flex-center">
                    <h5 className="modal-title">Add New Card</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true"><IconClose /></span>
                    </button>
               </div> 
               <div className="modal-body">
                    <div className="input-control">
                        <label>Name on Card *</label>
                        <input name="text" placeholder={"Enter here"}  />
                        <span className="errorMessage"></span>
                    </div>
                    <div className="input-control">
                        <label>Card Number *</label>
                        <input name="text" placeholder={"Enter here"}  />
                        <span className="errorMessage"></span>
                    </div>
                    <div className="flex space-between">
                        <div className="input-control wd50">
                            <label>Expiration</label>
                            <input name="text" placeholder={"Enter here"}  />
                            <span className="errorMessage"></span>
                        </div>
                        <div className="input-control wd50">
                            <label>CVV</label>
                            <input name="text" placeholder={"Enter here"}  />
                            <span className="errorMessage"></span>
                        </div>
                    </div>
                    <div className="input-control">
                        <label>Country *</label>
                        <select>
                            <option>India</option>
                            <option>Australia</option>
                            <option>America</option>
                        </select>
                        <span className="errorMessage"></span>
                    </div>
                    <div className="infotext">By providing your card information, you allow Blazing Cards to charge your card for future payments in accordance with their terms.</div>
               </div>
               <div className="modal-footer">
                    <div className="flex justify-center btn-wrap">
                        <button className="primary-btn disable">Save card</button>
                    </div> 
               </div>
            </div>
        </div>
    );
}
export function AddAddressModal(){
    return(
        <div className="modalOverlay flex justify-center flex-center">
            <div className="modal medium">
               <div className="modal-header flex Space-between flex-center">
                    <h5 className="modal-title">Add Address</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true"><IconClose /></span>
                    </button>
               </div> 
               <div className="modal-body">
                    <div className="input-control">
                        <label>Full Name *</label>
                        <input name="text" placeholder={"Enter here"}  />
                        <span className="errorMessage"></span>
                    </div>
                    <div className="input-control">
                        <label>Phone Number *</label>
                        <input name="text" placeholder={"Enter here"}  />
                        <span className="errorMessage"></span>
                    </div>
                    <div className="input-control">
                        <label>Email Address *</label>
                        <input name="email" placeholder={"Enter here"}  />
                        <span className="errorMessage"></span>
                    </div>
                    <div className="input-control">
                        <label>Address Line 1 *</label>
                        <input name="text" placeholder={"Enter here"}  />
                        <span className="errorMessage"></span>
                    </div>
                    <div className="input-control">
                        <label>Address Line 2 *</label>
                        <input name="text" placeholder={"Enter here"}  />
                        <span className="errorMessage"></span>
                    </div>
               </div>
               <div className="modal-footer">
                    <div className="flex justify-center btn-wrap">
                        <button className="primary-btn">Save Changes</button>
                    </div> 
               </div>
            </div>
        </div>
    );
}