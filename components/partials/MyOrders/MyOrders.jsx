import React from "react";
import IconReturn from "../../Icons/IconReturn";
import IconRiightAngle from "../../Icons/IconRiightAngle";
import IconClose from "../../Icons/IconClose";
export default function MyOrders(){
    return(
        <>
            <div className="order-list mb12">
                <div className="order-header flex flex-center space-between">
                    <div className="order-head">
                        <strong>Order ID: TL02749303</strong><span className="divide">|</span>
                        <span className="placed">Order Placed: August 22, 2022</span>
                    </div>
                    <div className="btn-wrap">
                        <button className="primary-btn">Track Now</button>
                    </div>
                </div>
                <div className="order-body flex space-between">
                    <div className="order-text flex">
                        {/* <img src="/static/images/card.png" alt="" /> */}
                        <div className="order-details">
                            <div className="flex mb12">
                                <div className="order-title">Pokemon Cards</div>
                                <button className="status shipped">Shipped</button>
                            </div>
                            <div className="order-disc mb16">Get Free Shipping On Your First Order. Giving Away Spots From Our Mystery Pull Game</div>
                            <div className="qty-bought-wrap flex">
                                <div className="qty">Qty: 1</div><span className="divide">|</span>
                                <div className="bought">Bought By: Auction</div>
                            </div>
                        </div>
                    </div>
                    <div className="amount">$750</div>
                </div>
                <div className="order-footer flex flex-center space-between">
                    <div className="order-status flex flex-center"><IconReturn />Return Order</div>
                    <div className="order-detail link">Order Details<IconRiightAngle /></div>
                </div>
            </div>
            <div className="order-list">
                <div className="order-header flex flex-center space-between">
                    <div className="order-head">
                        <strong>Order ID: TL02749303</strong><span className="divide">|</span>
                        <span className="placed">Order Placed: August 22, 2022</span>
                    </div>
                    <div className="btn-wrap">
                        <button className="primary-btn">Track Now</button>
                    </div>
                </div>
                <div className="order-body flex space-between">
                    <div className="order-text flex">
                        {/* <img src="/static/images/card.png" alt="" /> */}
                        <div className="order-details">
                            <div className="flex mb12">
                                <div className="order-title">Pokemon Cards</div>
                                <button className="status processing">Processing</button>
                            </div>
                            <div className="order-disc mb16">Get Free Shipping On Your First Order. Giving Away Spots From Our Mystery Pull Game</div>
                            <div className="qty-bought-wrap flex">
                                <div className="qty">Qty: 1</div><span className="divide">|</span>
                                <div className="bought">Bought By: Auction</div>
                            </div>
                        </div>
                    </div>
                    <div className="amount">$750</div>
                </div>
                <div className="order-footer flex flex-center space-between">
                    <div className="order-status flex flex-center"><IconClose />Cancel Order</div>
                    <div className="order-detail link">Order Details<IconRiightAngle /></div>
                </div>
            </div>
        </>
    );
}