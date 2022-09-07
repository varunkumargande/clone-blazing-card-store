import React from 'react';
import Link from 'next/link';
import StreamingBase from './StreamingBase';

function CenterDiv(){
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
            <StreamingBase />
        </div>
    )
}

export default CenterDiv;