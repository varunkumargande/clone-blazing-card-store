import React, { useState, useEffect, memo } from "react";

import StreamingBase from "./StreamingBase";
import { buyProduct } from "../../../api/stream/buyProductApi";
import { modalWarning } from "../../../api/intercept";
import {
  PaymentInfoModal,
  AddNewCardModal,
  AddAddressModal,
  OrderSuccessful,
} from "../../partials/Modal/Modal";
import { countryListApi } from "../../../api";
import { getStreamingShippmentDetail } from "../../../api/stream/shippmentApi";
import { UserAddAddress } from "../../../api";
import { editAddressApi } from "../../../api";
import { getStreamingCardDetail } from "../../../api/stream/cardApi";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { show } from "../../../store/toast/action";

function CenterDiv({
  productDetail,
  isPayment,
  openPayment,
  setOpen,
  handleLeftDiv,
  setIsBuyNowPaymentModal,
  isBuyNowPaymentModal,
  setShowLoginModal,
  userCount,
  streamNotification,
  liveAuctionDetails,
}) {
  const dispatch = useDispatch();

  const [openOptions, setOpenOptions] = React.useState(true);
  const [paymentForm, setPaymentFormOpen] = React.useState(false);
  const [shippmentForm, setShippmentFormOpen] = React.useState(false);
  const [addressLoader, setAddressLoader] = useState(false);
  const [paymentLoader, setPaymentLoader] = useState(false);
  const [paymentSuccessful, setPaymentSuccessful] = React.useState(false);
  const [shipIndex, setShipIndex] = React.useState(null);
  const [shipData, setShipData] = React.useState([]);

  const [cardIndex, setCardIndex] = useState(null);
  const [cardDetail, setCardDetail] = useState([]);
  const [orderId, setOrderId] = useState("");

  const router = useRouter();
  const streamUuid = router.query["uuid"];

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
    setAddressLoader(true);
    setPaymentLoader(true);
    countryListApi(setCountryData);
    getStreamingShippmentDetail(setAddressList, setAddressLoader);
    getStreamingCardDetail(setCardDetail, setPaymentLoader);
  }, []);

  const fetchCardDetail = () => {
    setPaymentLoader(true);
    getStreamingCardDetail(setCardDetail, setPaymentLoader);
  };

  const fetchShiipmentApi = () => {
    getStreamingShippmentDetail(setAddressList, setAddressLoader);
  };

  const handleSubmitBuyProduct = async () => {
    if (cardDetail.length != 0 && addressList.length != 0) {
      setPaymentLoader(true);
      const orderIdValue = await buyProduct(
        cardDetail[cardDetail.length - 1],
        addressList[addressList.length - 1],
        productDetail,
        openPayment,
        streamUuid,
        dispatch,
        setPaymentSuccessful,
        setPaymentLoader
      );
      setOrderId(orderIdValue);
    } else {
      dispatch(show({ message: "Please enter the details !", type: "error" }));
    }
  };

  const submitShipDetail = (data) => {
    setShipData(data);
    if (data.addressId) {
      setAddressLoader(true);
      editAddressApi(
        data,
        data.addressId,
        setAddressLoader,
        fetchShiipmentApi,
        dispatch
      );
      setShippmentFormOpen(false);
    } else {
      setAddressLoader(true);
      UserAddAddress(data, setAddressLoader, fetchShiipmentApi, dispatch);
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
        setShowLoginModal={setShowLoginModal}
        userCount={userCount}
        streamNotification={streamNotification}
        liveAuctionDetails={liveAuctionDetails}
      />
      {paymentSuccessful && (
        <OrderSuccessful
          message={`Order Placed Successfully!`}
          subMessage={`Order ID - ${orderId}`}
          setPaymentSuccessful={setPaymentSuccessful}
        />
      )}
      {isPayment && (
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
      )}
      {paymentForm && (
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
      )}
      {shippmentForm && (
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
      )}
    </div>
  );
}

export default memo(CenterDiv);
