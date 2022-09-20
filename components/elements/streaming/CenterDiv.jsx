import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Col, Row } from "antd";
import PaymentCard from "./Payment/PaymentCard";
import ShippmentCard from "./Payment/ShippmentCard";
import StreamingBase from "./StreamingBase";
import { useSelector } from "react-redux";
import { buyProduct } from "../../../api/stream/buyProductApi";
import { modalSuccess, modalWarning } from "../../../api/intercept";

function CenterDiv({
  productDetail,
  isPayment,
  openPayment,
  open,
  setOpen,
  streamingDetails,
  setAddShippInfo,
  setAddPayInfo,
  customerId,
}) {
  const [openOptions, setOpenOptions] = React.useState(true);
  const [paymentForm, setPaymentFormOpen] = React.useState(false);
  const [shippmentForm, setShippmentFormOpen] = React.useState(false);
  const [paymentData, setPaymentData] = React.useState(null);
  
  const [shipIndex, setShipIndex] = React.useState(null);
  const [shipData, setShipData] = React.useState(null);
  
  const [cardIndex, setCardIndex] = useState(null)
  const [cardDetail, setCardDetail] = useState(null)


  const handlePaymentAndShippmentModal = () => {
    setOpen(true);
    setOpenOptions(true);
  };

  const handlePaymentMethod = () => {
    setPaymentFormOpen(true);
  };

  const handleShippmentMethod = () => {
    setShippmentFormOpen(true);
  };

  const handleSubmitBuyProduct = () => {
    if (paymentData != null && shipData != null) {
      buyProduct(paymentData, shipData, productDetail)
    } else {
      setOpen(true);
      modalWarning("error", "Please select your card detail and shippment address")
    }
  }

  const submitShipDetail = (data) => {
    setShipData(data)
    modalSuccess("success", "Shippment Detail added")
  }

  return (

    <div className="streaming-div-center">
      <div className="seller-info">
        <div id="seller-name">{streamingDetails?.vendorDetails ? streamingDetails?.vendorDetails?.username : 'Seller'}</div>
        <div id="seller-rating">
          <span>4.96 169 Ratings</span>
        </div>
        <div id="followers">1,214 Followers</div>
        <button id="follow-button" className="curved-box">
          Follow
        </button>
      </div>
      <div className="social-presence">
        <div>
          <span id="link-address">
            <input
              value="www.blazingcard.com"
              readOnly={true}
              className="curved-box"
            ></input>
          </span>
          <span id="copy-link">
            <button className="curved-box">Copy</button>
          </span>
        </div>
      </div>
      <div className="streaming-base">
        <StreamingBase />

        {/* <span className='span'>
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
                                <input type="range" min="0" max="100" value="50" className="volume-range" />
                                <div class="icon">
                                    <i class="fa fa-volume-up icon-size" aria-hidden="true"></i>
                                </div>
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
                </div> */}

        {isPayment ? (
          <>
            <div className="payment_popup">
              <div>
                <Row>
                  <Col span={14}>
                    <h3 className='payment_header'>Payment Info</h3>
                  </Col>
                  <Col span={1} push={7}>
                    <button className='payment_close' onClick={() => openPayment(false)}>X</button>
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
                          <button className='option_event' onClick={handlePaymentMethod}> - </button>
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
                          <button className='option_event' onClick={handleShippmentMethod}> - </button>
                        </Col>
                      </Row>
                    </div>
                    <div>
                      <Row>
                        <Col span={12} align="left">
                          {cardDetail != null && shipData != null ? (
                            <>
                              <button type="submit" onClick={handleSubmitBuyProduct} className='payment_submit'>Pay</button>
                            </>
                          ) : (
                            <>
                            </>
                          )}
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
            <PaymentCard cardDetail={setCardDetail} payDetail={cardDetail} cardIndex={setCardIndex} payIndex={cardIndex} close={setPaymentFormOpen} payData={paymentData} />
          </>
        ) : (
          <>
          </>
        )}
        {shippmentForm ? (
          <>
            <ShippmentCard setShipIndex={setShipIndex} shipIndex={shipIndex} setShipData={setShipData} shipData={shipData}  close={setShippmentFormOpen} setShip={submitShipDetail} />
          </>
        ) : (
          <>
          </>
        )}
      </div>
    </div>
  );
}

export default CenterDiv;
