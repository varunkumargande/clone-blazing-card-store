import React, { useState, useEffect } from "react";

import StreamingBase from "./StreamingBase";
import { buyProduct } from "../../../api/stream/buyProductApi";
import { modalSuccess, modalWarning } from "../../../api/intercept";
import {
  PaymentInfoModal,
  AddNewCardModal,
  AddAddressModal,
} from "../../partials/Modal/Modal";
import { countryListApi } from "../../../api";
import { getStreamingShippmentDetail } from "../../../api/stream/shippmentApi";
import { UserAddAddress } from "../../../api";
import { editShipAddressApi } from "../../../api";
import { editAddressApi } from "../../../api";
import { getStreamingCardDetail } from "../../../api/stream/cardApi";

function CenterDiv({
  productDetail,
  isPayment,
  openPayment,
  setOpen,
  handleLeftDiv,
  setIsBuyNowPaymentModal,
  isBuyNowPaymentModal
}) {
  const [openOptions, setOpenOptions] = React.useState(true);
  const [paymentForm, setPaymentFormOpen] = React.useState(false);
  const [shippmentForm, setShippmentFormOpen] = React.useState(false);
  const [addressLoader, setAddressLoader] = useState(false);
  const [paymentLoader, setPaymentLoader] = useState(false);
  const [shipIndex, setShipIndex] = React.useState(null);
  const [shipData, setShipData] = React.useState([]);

  const [cardIndex, setCardIndex] = useState(null);
  const [cardDetail, setCardDetail] = useState([]);
  
  const handlePaymentAndShippmentModal = () => {
    setOpen(true);
    setOpenOptions(true);
  };

  const handlePaymentMethod = () => {
    setPaymentFormOpen(true);
    fetchCardDetail();
  };

  const handleShippmentMethod = () => {
    setShippmentFormOpen(true);
  };
  const [addressList, setAddressList] = useState([]);
  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    setAddressLoader(true)
    setPaymentLoader(true)
    countryListApi(setCountryData);
    getStreamingShippmentDetail(setAddressList, setAddressLoader);
    getStreamingCardDetail(setCardDetail, setPaymentLoader);
  }, []);

  const fetchCardDetail = () => {
    setPaymentLoader(true)
    getStreamingCardDetail(setCardDetail, setPaymentLoader);
  };

  const fetchShiipmentApi = () => {
    getStreamingShippmentDetail(setAddressList, setAddressLoader);
  };

  const handleSubmitBuyProduct = () => {
    if (cardDetail.length != 0 && addressList.length != 0) {
      buyProduct(
        cardDetail[cardDetail.length - 1],
        addressList[addressList.length - 1],
        productDetail,
        openPayment
        // streamingDetails
      );
    } else {
      modalWarning(
        "error",
        "Please select your card detail and shippment address"
      );
    }
  };

  const submitShipDetail = (data) => {
    setShipData(data);
    if (data.addressId) {
      setAddressLoader(true)
      editAddressApi(data, data.addressId, setAddressLoader, fetchShiipmentApi);
      setShippmentFormOpen(false);
    } else {
      setAddressLoader(true)
      UserAddAddress(data, setAddressLoader, fetchShiipmentApi);
      setShippmentFormOpen(false);
    }
  };
  
  return (
    <div className="streaming-live disable">
      <StreamingBase
        openPayment={openPayment}
        addressList={addressList}
        cardDetail={cardDetail}
        handleLeftDiv={handleLeftDiv}
        setIsBuyNowPaymentModal={setIsBuyNowPaymentModal}
        isBuyNowPaymentModal={isBuyNowPaymentModal}
      />

      {isPayment ? (
        <>
          <PaymentInfoModal
            productDetail={productDetail}
            fetchShiipmentApi={fetchShiipmentApi}
            openPayment={openPayment}
            handlePaymentMethod={handlePaymentMethod}
            handleShippmentMethod={handleShippmentMethod}
            handleSubmitBuyProduct={handleSubmitBuyProduct}
            addressList={addressList}
            cardDetail={cardDetail}
            addressLoader={addressLoader}
            paymentLoader={paymentLoader}
            isBuyNowPaymentModal={isBuyNowPaymentModal}
          />
        </>
      ) : (
        <></>
      )}
      {paymentForm == true ? (
        <>
          <AddNewCardModal
          fetchCardDetail={fetchCardDetail}
            productDetail={productDetail}
            countryData={countryData}
            fetchShiipmentApi={fetchShiipmentApi}
            setCardDetail={setCardDetail}
            payDetail={cardDetail}
            cardIndex={setCardIndex}
            payIndex={cardIndex}
            close={setPaymentFormOpen}
            setPaymentLoader={setPaymentLoader}
          />
        </>
      ) : (
        <></>
      )}
      {shippmentForm ? (
        <>
          <AddAddressModal
            productDetail={productDetail}
            fetchShiipmentApi={fetchShiipmentApi}
            addressList={addressList}
            countryData={countryData}
            setShipIndex={setShipIndex}
            shipIndex={shipIndex}
            setShipData={setShipData}
            shipData={shipData}
            close={setShippmentFormOpen}
            setShip={submitShipDetail}
            addressLoader={addressLoader}
            setAddressList={setAddressList}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default CenterDiv;
