import React from 'react';
import Link from 'next/link';

function LeftDiv(){
    const tabs = ["Auction", "Buy now", "Giveaway", "Sold"]
    return(
        <div className='streaming-div-left'>
            <h1>STREAM NAME</h1>
            <div className='stream-nav' >
                {
                    tabs.map((value) => {
                        return <h5><Link href="#">{value}</Link></h5>
                    })
                }
            </div>
            <div className='product-quick-search'>
                <input type="text" className='form-control curved-box' placeholder='Search products...'/>
            </div>
            <div className='product-list'>
                0 products
            </div>
        </div>
    )
}

export default LeftDiv;