import React, { useState, useEffect } from "react";

import StreamingBase from "./StreamingBase";
import { buyProduct } from "../../../api/stream/buyProductApi";
import { modalSuccess, modalWarning } from "../../../api/intercept"
import {PaymentInfoModal, AddNewCardModal, AddAddressModal} from "../../partials/Modal/Modal";
import { countryListApi } from "../../../api";
import { getStreamingShippmentDetail } from "../../../api/stream/shippmentApi";
import { UserAddAddress } from "../../../api";
import { editShipAddressApi } from "../../../api";
import { getStreamingCardDetail } from "../../../api/stream/cardApi";

function CenterDiv({
  productDetail,
  isPayment,
  openPayment,
  setOpen,
}) {
  const [openOptions, setOpenOptions] = React.useState(true);
  const [paymentForm, setPaymentFormOpen] = React.useState(false);
  const [shippmentForm, setShippmentFormOpen] = React.useState(false);

  const [shipIndex, setShipIndex] = React.useState(null);
  const [shipData, setShipData] = React.useState([]);
  
  const [cardIndex, setCardIndex] = useState(null)
  const [cardDetail, setCardDetail] = useState([])
  const [payLoader, setPayLoader] = useState(true)

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
      getStreamingCardDetail(setCardDetail, setPayLoader)
  }, [])

  const fetchCardDetail = () => {
    getStreamingCardDetail(setCardDetail, setPayLoader)
  }


  const fetchShiipmentApi = () =>{
    getStreamingShippmentDetail(setAddressList)
  }

  const handleSubmitBuyProduct = () => {
    // console.log(cardDetail)
    if(cardDetail.length != 0 && addressList.length != 0){
      buyProduct(cardDetail[cardDetail.length-1], addressList[addressList.length-1], productDetail, openPayment, streamingDetails)
    }else{  
      modalWarning("error", "Please select your card detail and shippment address")
    }
  }

  const submitShipDetail = (data) => {
    setShipData(data)
    if(data.addressId){
      editShipAddressApi(data, fetchShiipmentApi, setShippmentFormOpen)

    }else{
      UserAddAddress(data.address1,data.address2,data.city,data.country,data.state, data.postcode, "1", data.fullName)
    }
  }

  return (
      <div className="streaming-live disable">
        
        <StreamingBase
        openPayment={openPayment}
        addressList={addressList}
        cardDetail={cardDetail}
      />

        {isPayment ? (
          <>
          <PaymentInfoModal productDetail={productDetail} fetchShiipmentApi={fetchShiipmentApi} openPayment={openPayment} handlePaymentMethod={handlePaymentMethod} handleShippmentMethod={handleShippmentMethod} handleSubmitBuyProduct={handleSubmitBuyProduct} addressList={addressList} cardDetail={cardDetail}/>
          </>
        ) : (
          <>
          </>
        )}
        {paymentForm == true ? (
          <>
            <AddNewCardModal productDetail={productDetail} countryData={countryData} fetchShiipmentApi={fetchShiipmentApi} setCardDetail={setCardDetail} payDetail={cardDetail} cardIndex={setCardIndex} payIndex={cardIndex} close={setPaymentFormOpen} />
          </>
        ) : (
          <>
          </>
        )}
        {shippmentForm ? (
          <>
            <AddAddressModal productDetail={productDetail} fetchShiipmentApi={fetchShiipmentApi} addressList={addressList} countryData={countryData} setShipIndex={setShipIndex} shipIndex={shipIndex} setShipData={setShipData} shipData={shipData}  close={setShippmentFormOpen} setShip={submitShipDetail} />
          </>
        ) : (
          <>
          </>
        )}
      </div>
  );
}

export default CenterDiv;