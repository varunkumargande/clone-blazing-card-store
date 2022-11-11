import React, { useEffect, useState } from "react";
import IconReturn from "../../Icons/IconReturn";
import IconRiightAngle from "../../Icons/IconRiightAngle";
import IconClose from "../../Icons/IconClose";
import { orderListApi } from "../../../api";
import { connect, useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Link from "next/link";
import Router from "next/router";

export default function MyOrders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state?.order?.orderList);

  useEffect(() => {
    orderListApi(dispatch);
  }, []);

  const handleOrderDetails = (id) => {
    Router.push(`/order-details?id=${id}`)
  }
  return (
    <>
      {orders && orders?.length === 0 ? (
        <>
          <p>No order found</p>
        </>
      ) : (
        <>
          {orders?.map((order) => (
            <React.Fragment key={order?.orderId+"myorders"}>
            <div className="order-list mb12">
              <div className="order-header flex flex-center space-between">
                <div className="order-head">
                  <strong>Order ID: {order.orderProductPrefixId}</strong>
                  <span className="divide">|</span>
                  <span className="placed">
                    Order Placed: { moment(order.createdDate).format("MMMM DD, YYYY")}
                  </span>
                </div>
                <div className="btn-wrap">
                  <a
                    href={order?.trackingUrl}
                    target="_blank"
                  >
                    <button
                      className={`primary-btn ${(!order?.trackingUrl) && 'disable-opacity'}`}
                      disabled={!order?.trackingUrl}
                    >
                      Track Now
                    </button>
                  </a>
                </div>
              </div>
              <div className="order-body flex space-between">
                <div className="order-text flex">
                  <div className="order-details">
                    <div className="flex mb12">
                      <div className="order-title">{order.productName}</div>
                      <button className="status shipped">
                        {order.orderStatusName}
                      </button>
                    </div>
                    <div className="order-disc mb16">
                      {order.productDescription}
                    </div>
                    <div className="qty-bought-wrap flex">
                      <div className="qty">Qty: {order.quantity}</div>
                      <span className="divide">|</span>
                      <div className="bought">Bought By: {order.productSellType}</div>
                    </div>
                  </div>
                </div>
                <div className="amount">$ {order.total}</div>
              </div>
              <div className="order-footer flex flex-center space-between">
                <div className="order-status flex flex-center">
                  {/* ToDo: Return Order will be implemented in future. */}
                  {/* <IconReturn />
                  Return Order */}
                </div>
                <div className="order-detail link">
                <button onClick={e => handleOrderDetails(order.orderProductId)}>Order Details</button>
                  <IconRiightAngle />
                </div>
              </div>
            </div>
            </React.Fragment>
          ))}
        </>
      )}
    </>
  );
}

