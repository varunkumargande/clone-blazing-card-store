import React from "react";
import IconMasterCard from "../../Icons/IconMasterCard";
import IconTrack from "../../Icons/IconTrack";
import IconDownload from "../../Icons/IconDownload";
import { useSelector } from "react-redux";
export default function OrderDetails() {
  const orderDetail = useSelector((state) => state?.order?.orderDetail);
  const { cardDetails, productData, deliveryStatus, shippingDetails } = orderDetail ?? "";
  return (
    <>
      {orderDetail ? (
        <>
          <div className="order-list-wrap">
            <div className="order-list mb16">
              <div className="order-header flex flex-center space-between">
                <div className="order-head">
                  <strong>Order ID: {productData.orderProductPrefixId}</strong>
                </div>
              </div>
              <div className="order-body-wrapper">
                <div className="order-body flex space-between">
                  <div className="order-text flex">
                    <img
                      src={
                        productData?.productImage ?? "/static/images/card.png"
                      }
                      alt=""
                    />
                    <div className="order-details">
                      <div className="flex mb12">
                        <div className="order-title">{productData.name}</div>
                        <button className="status delivered">
                          {shippingDetails.orderStatus}
                        </button>
                      </div>
                      <div className="order-disc mb16">
                        {productData.description}
                      </div>
                      <div className="qty-bought-wrap flex">
                        <div className="qty">Qty: {productData.quantity}</div>
                        <span className="divide">|</span>
                        <div className="bought">
                          Bought By: {productData.sellType}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="billing-shipping-wrap flex space-between">
            <div className="billing-shipping wd50 box">
                <div className="heading">Shipping Information</div>
                <div className="body">
                  <div className="bodyText flex flex-center">
                    {shippingDetails?.shippingAddress1 +
                      ", " +
                      shippingDetails?.shippingAddress2 +
                      ", " +
                      shippingDetails?.shippingCity +
                      ", " +
                      shippingDetails?.shippingZone +
                      ", " +
                      shippingDetails?.shippingPostcode}
                  </div>
                </div>
              </div>
              <div className="billing-shipping wd50 box">
                <div className="heading">Billing Information</div>
                <div className="body">
                  <h5>Credit Card</h5>
                  <div className="bodyText flex flex-center">
                    <span className="mastr">
                      <IconMasterCard />
                    </span>{" "}
                    {cardDetails?.card?.brand} ending with{" "}
                    {cardDetails?.card?.last4}
                  </div>
                </div>
              </div>
              
            </div>
          </div>
          <div className="order-summery-wrap">
            <div className="order-summery box mb24">
              <div className="heading">Order Summary</div>
              <div className="order-value">
                <div className="flex space-between amount">
                  <div className="label">Subtotal (1 items)</div>
                  <div className="value">${productData?.subTotal}</div>
                </div>
                <div className="flex space-between amount">
                  <div className="label">Tax ({productData?.taxType}%)</div>
                  <div className="value">${productData?.taxValue}</div>
                </div>
                <div className="flex space-between amount">
                  <div className="label">Shipping</div>
                  <div className="value">${shippingDetails.shippingCharge}</div>
                </div>
              </div>
              <div className="total-order flex space-between flex-center">
                <div className="label">Total</div>
                <div className="value">${productData.total}</div>
              </div>
            </div>
            <div className="download-wrap flex space-between flex-center">
              <button className="border-btn flex flex-center justify-center">
                <IconTrack />
                Track
              </button>
              <button className="download flex flex-center justify-center">
                <IconDownload />
                Download
              </button>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
