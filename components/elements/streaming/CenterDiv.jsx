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
                <div class="volume">
                <input type="range" min="0" max="100" value="50" class="volume-range"/>
                <div class="icon">
                    <i class="fa fa-volume-up icon-size" aria-hidden="true"></i>
                </div>
                <div class="bar-hoverbox">
                    <div class="bar">
                    <div class="bar-fill"></div>
                </div>
                </div>
                </div>

                <div>
                    <button id="mute-button" className='curved-box' onClick={handleMuteButton}>Mute</button>
                </div>
            </div>
        </div>
    )
}

export default CenterDiv;