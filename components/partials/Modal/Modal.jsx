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
export function CustomBidModal(setOpen, Timer, minutes, seconds, bidAmount, setBidAmount, amountToBid, setAmountToBid, handleConfirmBid){
    console.log("----------")
    return(
        <div className="modalOverlay flex justify-center flex-center">
            <div className="modal">
               <div className="modal-header flex Space-between flex-center">
                    <h5 className="modal-title">Custom Bid</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setOpen(false)}>
                        <span aria-hidden="true"><IconClose /></span>
                    </button>
               </div> 
               <div className="modal-body">
                    <div className="flex space-between bid-status mb16">
                        <div className="left">
                            <strong>Time left - </strong>
                            <span>
                        <Timer minutes={minutes} seconds={seconds} />
                      </span>
                        </div>
                        <div className="right">
                            <strong>Current Bid - </strong>
                            <span>${bidAmount} +Ship/Tax</span>
                        </div>
                    </div>
                    <div className="flex space-between increment mb16">
                        <button className="decrease flex flex-center justify-center" onClick={() => checkBidAmount()}>-</button>
                        <input type="number" className="text-center" placeholder="0"/>
                        <button className="increase flex flex-center justify-center" onClick={() => setAmountToBid(amountToBid + 1)}>+</button>
                    </div>
                    <div className="flex space-between btn-wrap">
                        <button className="disable-btn" onClick={() => setOpen(false)}>Cancel</button>
                        <button className="primary-btn" onClick={handleConfirmBid}>Conform</button>
                    </div>
               </div>
            </div>
        </div>
    );
}
