import React from "react";
import IconSpeaker from '../../Icons/IconSpeaker';
import IconShare from '../../Icons/IconShare';
import IconHeart from '../../Icons/IconHeart';
import IconDoller from '../../Icons/IconDoller';
import IconEye from '../../Icons/IconEye';
import { CustomBidModal } from "../Modal/Modal";

export default function StreamingLive(){
    return(
        <div className="streaming-live disable">
            <div className="stream-image-video">
                <img src="/static/images/stream-image.jpg" alt="stream" />
            </div>
            <div className="inner-wrapper">  {/*add className disable when want {disable}*/}
                <div className="stream-header flex space-between">
                    <div className="head-title">PSA SLAB #83</div>
                    <div className="tme-wrap flex flex-center justify-center"><IconEye /><span>1.2K</span> <button className="live">Live</button></div>
                    {/* <div className="tme-wrap end flex flex-center justify-center"><span>1.2K</span></div> */}
                </div>
                <div className="video-icon">
                    <button className="flex flex-center justify-center br50"><IconSpeaker/></button>
                    <button className="flex flex-center justify-center br50"><IconShare/></button>
                    <button className="flex flex-center justify-center br50"><IconHeart/></button>
                    <button className="flex flex-center justify-center br50"><IconDoller/></button>
                </div>
                {/*Auction end Html*/}
                {/* <div className="auction-end-text text-center">     
                    <h3>Live Stream Ended</h3>
                    <p>The live video has ended you can <br/>no longer to view</p>
                </div> */}
                {/* winner profile*/}
                {/* <div className="winner-profile flex flex-center">
                    <div className="pf br50"><img src="/static/images/profile.png" alt="" /></div>
                    ad_marie <span> &nbsp; is winner 🎉</span>
                </div> */}
                <div className="stream-footer flex flex-center space-between">
                    <div className="left">
                        <div className="time-left">Time left - 0m 15s</div>
                        <div className="bid-status flex flex-center">Current Bid - $110 + Ship/Tax <span className="flex flex-center justify-center br50">i</span></div>
                    </div>
                    {/* <div className="btn-wrap flex space-between">
                        <button className="border-btn">Custom Bid</button>
                        <button className="primary-btn">Bid US $28</button>
                    </div> */}
                    <div className="auction-end">
                        <button className="primary-btn disable" onClick={CustomBidModal}>Auction Ended</button>
                    </div>
                </div>
            </div>
        </div>
    );
}