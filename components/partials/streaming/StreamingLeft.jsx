import React from "react";
import Link from "next/link";

export default function StreamingLeft(){
    return(
        <div className="streaming-left">
            <div className="flex profile-wrapper">
                <div className="image"><img src="/static/images/profileImg.png" alt="profile" /></div>
                <div className="profile-wrap">
                    <div className="name">Marie Woodey</div>
                    <div className="followrs-count">129K Followers</div>
                </div>
                <div className="btn-wrap">
                    <button className="primary-btn">Follow</button>
                </div>
            </div>
            <div className="leftdata-wrapper">
                <h3 className="title">15 slabs and bounty</h3>
                <div className="tab-wrapper flex">
                    <div className="tab-link active">Auction</div>
                    <div className="tab-link">BuyNow</div>
                    <div className="tab-link">Sold</div>
                    <div className="tab-link">Purchased</div>
                </div>
                <div className="search">
                    <input type="text" placeholder="Search products..." />
                </div>
                {/* <div className="action-list leftdata-list">
                    <div className="product-count">65 Products</div>
                    <ul className="product-list">
                        <li className="pined">PSA SLAB #83</li>
                        <li>PSA SLAB #83</li>
                        <li>PSA SLAB #83</li>
                        <li>PSA SLAB #83</li>
                        <li>PSA SLAB #83</li>
                        <li>PSA SLAB #83</li>
                    </ul>  
                </div> */}
                <div className="buynow-list leftdata-list">
                    <div className="product-count">65 Products</div>
                    <div className="product-list">
                        <div className="flex flex-center space-between list">
                            <div className="left flex column">
                                <strong>PSA SLAB #81</strong>
                                <span>17 Available</span>
                            </div>
                            <div className="right">
                                <button className="border-btn">Buy Now</button>
                                <div className="piece text-center">$12/piece</div>
                            </div>
                        </div>
                        <div className="flex flex-center space-between list">
                            <div className="left flex column">
                                <strong>PSA SLAB #81</strong>
                                <span>17 Available</span>
                            </div>
                            <div className="right">
                                <button className="border-btn">Buy Now</button>
                                <div className="piece text-center">$12/piece</div>
                            </div>
                        </div>
                        <div className="flex flex-center space-between list">
                            <div className="left flex column">
                                <strong>PSA SLAB #81</strong>
                                <span>17 Available</span>
                            </div>
                            <div className="right">
                                <button className="border-btn selected">Buy Now</button>
                                <div className="piece text-center">$12/piece</div>
                            </div>
                        </div>
                        <div className="flex flex-center space-between list">
                            <div className="left flex column">
                                <strong>PSA SLAB #81</strong>
                                <span>17 Available</span>
                            </div>
                            <div className="right">
                                <button className="border-btn">Buy Now</button>
                                <div className="piece text-center">$12/piece</div>
                            </div>
                        </div>
                        <div className="flex flex-center space-between list">
                            <div className="left flex column">
                                <strong>PSA SLAB #81</strong>
                                <span>17 Available</span>
                            </div>
                            <div className="right">
                                <button className="border-btn selected">Buy Now</button>
                                <div className="piece text-center">$12/piece</div>
                            </div>
                        </div>
                    </div>  
                </div>
                {/* <div className="sold-list leftdata-list">
                    <div className="product-count">19 Products</div>
                    <div className="product-list">
                        <div className="flex space-between list-data">
                            <div className="left flex column">
                                <strong>PSA SLAB #81</strong>
                                <span>Sold to: <Link href="/"><a>phatdawg</a></Link></span>
                            </div>
                            <div className="right">
                                <div className="amount">For $25</div>
                            </div>
                        </div>
                        <div className="flex space-between list-data">
                            <div className="left flex column">
                                <strong>PSA SLAB #81</strong>
                                <span>Sold to: <Link href="/"><a>phatdawg</a></Link></span>
                            </div>
                            <div className="right">
                                <div className="amount">For $25</div>
                            </div>
                        </div>
                        <div className="flex space-between list-data">
                            <div className="left flex column">
                                <strong>PSA SLAB #81</strong>
                                <span>Sold to: <Link href="/"><a>phatdawg</a></Link></span>
                            </div>
                            <div className="right">
                                <div className="amount">For $25</div>
                            </div>
                        </div>
                        <div className="flex space-between list-data">
                            <div className="left flex column">
                                <strong>PSA SLAB #81</strong>
                                <span>Sold to: <Link href="/"><a>phatdawg</a></Link></span>
                            </div>
                            <div className="right">
                                <div className="amount">For $25</div>
                            </div>
                        </div>
                    </div>  
                </div> */}
                {/* <div className="purchased-list leftdata-list"> 
                    <div className="product-count">19 Products</div>
                    <div className="product-list">
                        <div className="flex space-between list-data">
                            <div className="left flex column">
                                <strong>PSA SLAB #81</strong>
                                <span>Purchased from <Link href="/"><a>phatdawg</a></Link></span>
                            </div>
                            <div className="right">
                                <div className="amount">For $25</div>
                            </div>
                        </div>
                        <div className="flex space-between list-data">
                            <div className="left flex column">
                                <strong>PSA SLAB #81</strong>
                                <span>Purchased from <Link href="/"><a>phatdawg</a></Link></span>
                            </div>
                            <div className="right">
                                <div className="amount">For $25</div>
                            </div>
                        </div>
                    </div>  
                </div> */}
            </div>
        </div>
    );
}