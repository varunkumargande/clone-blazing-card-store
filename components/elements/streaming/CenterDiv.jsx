import React, { useState, useEffect } from "react";
import { Col, Row } from "antd";
import PaymentCard from "./Payment/PaymentCard";
import ShippmentCard from "./Payment/ShippmentCard";
import StreamingBase from "./StreamingBase";
import { buyProduct } from "../../../api/stream/buyProductApi";
import { modalSuccess, modalWarning } from "../../../api/intercept";
import {
  PaymentInfoMOdal,
  AddNewCardModal,
  AddAddressModal,
} from "../../partials/Modal/Modal";

function CenterDiv({
  productDetail,
  isPayment,
  openPayment,
  setOpen,
  streamingDetails,
  auctionNotification,
  bidNotification,
  winnerNotification
}) {
  const [openOptions, setOpenOptions] = React.useState(true);
  const [paymentForm, setPaymentFormOpen] = React.useState(false);
  const [shippmentForm, setShippmentFormOpen] = React.useState(false);

  const [shipIndex, setShipIndex] = React.useState(null);
  const [shipData, setShipData] = React.useState(null);

  const [cardIndex, setCardIndex] = useState(null);
  const [cardDetail, setCardDetail] = useState(null);

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
    if (cardDetail != null && shipData != null) {
      buyProduct(cardDetail, shipData, productDetail);
    } else {
      setOpen(true);
      modalWarning(
        "error",
        "Please select your card detail and shippment address"
      );
    }
  };

  const submitShipDetail = (data) => {
    setShipData(data)
    modalSuccess("success", "Shippment Detail added")
  }

  return (
    <div className="streaming-live disable">
      <StreamingBase
        auctionNotification={auctionNotification}
        bidNotification={bidNotification}
        winnerNotification={winnerNotification}
      />
      {isPayment ? (
        <>
          <PaymentInfoMOdal
            openPayment={openPayment}
            handlePaymentMethod={handlePaymentMethod}
            handleShippmentMethod={handleShippmentMethod}
            handleSubmitBuyProduct={handleSubmitBuyProduct}
          />
          {/* <div className="payment_popup">
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
            </div>  */}
        </>
      ) : (
        <></>
      )}
      {paymentForm == true ? (
        <>
          <PaymentCard
            cardDetail={setCardDetail}
            payDetail={cardDetail}
            cardIndex={setCardIndex}
            payIndex={cardIndex}
            close={setPaymentFormOpen}
          />
        </>
      ) : (
        <></>
      )}
      {shippmentForm ? (
        <>
          <ShippmentCard
            setShipIndex={setShipIndex}
            shipIndex={shipIndex}
            setShipData={setShipData}
            shipData={shipData}
            close={setShippmentFormOpen}
            setShip={submitShipDetail}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default CenterDiv;
