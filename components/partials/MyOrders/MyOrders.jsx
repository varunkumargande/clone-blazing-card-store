import React, { useEffect, useState } from "react";
import IconReturn from "../../Icons/IconReturn";
import IconRiightAngle from "../../Icons/IconRiightAngle";
import IconClose from "../../Icons/IconClose";
import { orderListApi } from "../../../api";
import { connect, useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Link from "next/link";

export default function MyOrders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state?.order?.orderList);

  useEffect(() => {
    orderListApi(dispatch);
  }, []);

  return (
    <>
      {orders && orders?.length === 0 ? (
        <>
          <p>No order found</p>
        </>
      ) : (
        <>
          {orders?.map((order) => (
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
                  <button className="primary-btn">Track Now</button>
                </div>
              </div>
              <div className="order-body flex space-between">
                <div className="order-text flex">
                  <img src="/static/images/card.png" alt="" />
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
                  <IconReturn />
                  Return Order
                </div>
                <div className="order-detail link">
                <Link href={`order-details?id=${order.orderProductId}`}>Order Details </Link>
                  <IconRiightAngle />
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}

