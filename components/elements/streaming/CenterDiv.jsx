import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import { Col, Row } from 'antd';
import PaymentCard from "./Payment/PaymentCard"
import ShippmentCard from './Payment/ShippmentCard';

function CenterDiv({open, setOpen, setAddShippInfo, setAddPayInfo, customerId}){
    
   
    const [openOptions, setOpenOptions] = React.useState(true)
    const [paymentForm, setPaymentFormOpen] = React.useState(false)
    const [shippmentForm, setShippmentFormOpen] = React.useState(false)


    const handleMuteButton = ()=>{
        console.log("here");
    }

    
    const handlePaymentAndShippmentModal = () => {
        setOpen(true)
        setOpenOptions(true)
    }

    const handlePaymentMethod = () => {
        setPaymentFormOpen(true)
    }

    const handleShippmentMethod = () => {
        setShippmentFormOpen(true)
    }

    // const handleMuteButton = () => {
    //     console.log("here");
    // }

   
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
                        <input value='www.blazingcard.com' readOnly={true} className='curved-box'></input>    
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
                                <input type="range" min="0" max="100" onChange={handleMuteButton}  value="50" className="volume-range"/>
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
                            <div id='amount' onClick={handlePaymentAndShippmentModal}>
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

                {open ? (
                    <>
                        <div className="payment_popup">
                            <div>
                                <Row>
                                    <Col span={14}>
                                        <h3 className='payment_header'>Payment Info</h3>
                                    </Col>
                                    <Col span={1} push={7}>
                                        <button className='payment_close' onClick={() => setOpen(false)}>X</button>
                                    </Col>
                                </Row>
                            </div>
                            {openOptions ? (
                                <>
                                    <div>
                                        <div>
                                            <Row>
                                                <Col span={9}>
                                                    <h4 className='option-payment'>Payment</h4>
                                                </Col>
                                                <Col span={12} push={7}>
                                                    <button className='option_event' onClick={handlePaymentMethod}> > </button>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div align="center">
                                            <div class="nav-bar" />
                                        </div>

                                        <div>
                                            <Row>
                                                <Col span={10}>
                                                    <h4 className='option-shippment'>Shippment</h4>
                                                </Col>
                                                <Col span={10} push={7}>
                                                    <button className='option_event' onClick={handleShippmentMethod}> > </button>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                </>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                    </>
                )}

                {paymentForm == true ? (
                    <>
                        <PaymentCard close={setPaymentFormOpen} setPaymentFormOpen={setPaymentFormOpen} setAddPayInfo={setAddPayInfo} customerId={customerId}/>
                    </>
                ) : (
                    <>
                    </>
                )}

                {shippmentForm ? (
                    <>
                        <ShippmentCard close={setShippmentFormOpen} setShippmentFormOpen={setShippmentFormOpen} setAddShippInfo={setAddShippInfo} />
                    </>
                ) : (
                    <>
                    </>
                )}

                
            </div>
        </div>
    )
}

export default CenterDiv;