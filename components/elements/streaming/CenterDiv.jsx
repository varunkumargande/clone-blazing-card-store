import React, { useState, useEffect } from "react";
import { Col, Row } from "antd";
import PaymentCard from "./Payment/PaymentCard";
import ShippmentCard from "./Payment/ShippmentCard";
import StreamingBase from "./StreamingBase";
import { buyProduct } from "../../../api/stream/buyProductApi";
import { modalSuccess, modalWarning } from "../../../api/intercept"
import {PaymentInfoModal, AddNewCardModal, AddAddressModal} from "../../partials/Modal/Modal";
import { countryListApi } from "../../../api";
import { getStreamingShippmentDetail } from "../../../api/stream/shippmentApi";

function CenterDiv({
  productDetail,
  isPayment,
  openPayment,
  setOpen,
  streamingDetails,
}) {
  const [openOptions, setOpenOptions] = React.useState(true);
  const [paymentForm, setPaymentFormOpen] = React.useState(false);
  const [shippmentForm, setShippmentFormOpen] = React.useState(false);
  
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
  const [addressList, setAddressList] = useState([])
  const [countryData, setCountryData] = useState([])

  useEffect(() => {
      countryListApi(setCountryData);
      getStreamingShippmentDetail(setAddressList)
  }, [])

  const handleSubmitBuyProduct = () => {
    if (cardDetail != null && shipData != null) {
      buyProduct(cardDetail, shipData, productDetail)
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
      <div className="streaming-live disable">
        <StreamingBase />
        {isPayment ? (
          <>
          <PaymentInfoModal openPayment={openPayment} handlePaymentMethod={handlePaymentMethod} handleShippmentMethod={handleShippmentMethod} handleSubmitBuyProduct={handleSubmitBuyProduct}/>
          </>
        ) : (
          <>
          </>
        )}
        {paymentForm == true ? (
          <>
            <AddNewCardModal cardDetail={setCardDetail} payDetail={cardDetail} cardIndex={setCardIndex} payIndex={cardIndex} close={setPaymentFormOpen} />
          </>
        ) : (
          <>
          </>
        )}
        {shippmentForm ? (
          <>
            <AddAddressModal addressList={addressList} countryData={countryData} setShipIndex={setShipIndex} shipIndex={shipIndex} setShipData={setShipData} shipData={shipData}  close={setShippmentFormOpen} setShip={submitShipDetail} />
          </>
        ) : (
          <>
          </>
        )}
      </div>
  );
}

export default CenterDiv;
