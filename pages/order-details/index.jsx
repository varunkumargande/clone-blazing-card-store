import React, { useState, useEffect, useRef } from "react";
import IconSearch from "../../components/Icons/IconSearch";
import IconDropdown from "../../components/Icons/IconDropdown";
import OrderDetails from "../../components/partials/OrderDetails/OrderDetails";
import MobileHeader from "../../components/partials/LandingPage/MobileHeader";
import Footer from "../../components/partials/LandingPage/Footer";
import HeaderDefault from "../../components/shared/headers/HeaderDefault";
import IconBack from "../../components/Icons/IconBack";
import { useRouter } from "next/router";
import { orderDetailApi } from "../../api";
import moment from "moment";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useIsMobile } from "../../contexts/Devices/CurrentDevices";

export default function Orderdetails() {
  const router = useRouter();
  const orderId = router.query.id;
  const [active, setActive] = useState(false);
  const { isMobile } = useIsMobile();
  const wrapperRef = useRef(null);
  const dispatch = useDispatch();
  const orderDetail = useSelector((state) => state?.order?.orderDetail);

  useEffect(() => {
    orderDetailApi(dispatch, orderId);
  }, []);

  const handleOnClick = () => {
    setActive(!active);
  };
  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);
  const breadCrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "/ My orders",
      url: "/my-orders/",
    },
    {
      text: "/ Order Detail",
      url: `/order-details?id=${orderId}`,
    },
  ];

  const createBreadCrumb = () => {
    return (
      <>
        {breadCrumb.map((link) => (
          <li
            key={link.text}
            className={
              breadCrumb.indexOf(link) === breadCrumb.length - 1
                ? "current"
                : ""
            }
          >
            <Link href={link.url}>
              <a>{link.text}</a>
            </Link>
          </li>
        ))}
      </>
    );
  };
  return (
    <>
      {isMobile ? "" : <HeaderDefault />}
      <div className="myorder-wrapper">
        {isMobile ? (
          ""
        ) : (
          <section className="breadcrumbs-wrapper no-bg mb26">
            <ul className="breadcrumbs flex flex-center">
              {createBreadCrumb()}
            </ul>
          </section>
        )}
        <div className="heading-wrapper flex space-between flex-center mb16 border-btm">
          <h1>
            <button className="back" onClick={(e) => window.history.back()}>
              <IconBack />
            </button>
            Order Detail
          </h1>
          <div className="order-time-wrap flex flex-center">
            <div className="placed">
              Order Placed:{" "}
              {moment(orderDetail?.productData?.createdDate).format(
                "MMMM DD, YYYY"
              )}
            </div>
            <div className="delivered">Order Delivered: In Processing</div>
          </div>
        </div>
        <div className="orderdetails-wrapper flex space-between">
          <OrderDetails />
        </div>
      </div>
      <Footer />
    </>
  );
}
