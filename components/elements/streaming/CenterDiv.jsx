import React from 'react';
import Link from 'next/link';

function CenterDiv(){
    const handleMuteButton = ()=>{
        console.log("here");
    }
   
    return(
        <div className='streaming-div-center'>
            <div className='seller-info'>
                <div id="seller-name">
                    Seller's name
                </div>
                <div id="seller-rating">
                    <span>
                        4.96  169 Ratings
                    </span>
                </div>
                <div id="followers">
                     1,214 Followers
                </div>
                <button id='follow-button' className='curved-box'>
                    Follow
                </button>            
            </div>
            <div className='social-presence'>
                <div>
                    <span id="link-address" >
                        <input placeholder="www.blazingcard.com/" className='curved-box'></input>    
                    </span>
                    <span id="copy-link">
                        <button className='curved-box'>Copy</button>
                    </span>
                </div>
                <div id="social-links">
                    Share to
                </div>
            </div>
            <div className='streaming-base'>
                <span>
                    38
                </span>
                <div className='stream-wrapper'>
                    <div className='overlay'>
                        <div className='product-info'>
                            <div id="winning-buyer-info">
                                winner won!
                            </div>
                            <div id='product-name'>
                                Product name
                            </div>
                            <div id="shipping-details">
                                Shipping and tax
                            </div>
                        </div>
                        <div className='video-info'>
                            <div className="volume">
                                <input type="range" min="0" max="100" value="50" className="volume-range"/>
                                 {/* <div class="icon">
                                    <i class="fa fa-volume-up icon-size" aria-hidden="true"></i>
                                </div> */}
                                <div className="bar-hoverbox">
                                    <div classame="bar">
                                        <div classame="bar-fill"></div>
                                    </div>
                                </div>
                                <div>
                                    <button id="mute-button" className='curved-box' onClick={handleMuteButton}>Mute</button>
                                </div>
                            </div>
                            <div id="pay-button">
                                <button className=' curved-box'>$</button>
                                <div>Pay</div>
                            </div>
                            <div id='amount'>
                                $25
                            </div>
                            <div id="timer">
                                00:00
                            </div>
                        </div>
                    </div>
                    <div id='auction'>
                        <button className='curved-box'>Auction ended</button>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default CenterDiv;