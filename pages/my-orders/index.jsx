import React, { useState, useEffect, useRef } from "react";
import IconSearch from "../../components/Icons/IconSearch";
import IconDropdown from "../../components/Icons/IconDropdown";
import MyOrders from "../../components/partials/MyOrders/MyOrders";
import MobileHeader from "../../components/partials/LandingPage/MobileHeader";
import Footer from "../../components/partials/LandingPage/Footer";
import HeaderDefault from "../../components/shared/headers/HeaderDefault";
import { orderListApi } from "../../api";
import { useDispatch } from 'react-redux';
export default function Myorders() {
  const [searchVal, setSearchVal] = useState("");
  const [active, setActive] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const wrapperRef = useRef(null);
  const dispatch = useDispatch();
  let resizeWindow = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
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

    return(
        <>
            {windowWidth <= 1024 ? <MobileHeader/> : <HeaderDefault />}
            <div className="myorder-wrapper">
                <section className="breadcrumbs-wrapper no-bg mb26">
                    <ul className="breadcrumbs flex flex-center">
                        <li>Home</li>/
                        <li className="current">My Orders</li>
                    </ul>
                </section>
                <div className="heading-wrapper flex space-between flex-center mb16">
                    <h1>My Orders</h1>
                    <div className="search-wrapper flex flex-center">
                        <div className="Search">
                            <input type="search" id="search" name="search" placeholder="Search by order "/>
                            <button className="search-btn"><IconSearch /></button>
                        </div>
                        <div className="dropdwn-wrapper">
                            <button className="dropdown" onClick={handleOnClick} ref={wrapperRef}>Recennt <IconDropdown /></button>
                            <ul className={active ? "dropdwnList active" : "dropdwnList"}>
                                <li>Last months</li>
                                <li>Last 3 months</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="orderlist-wrapper">
                    <MyOrders />
                </div>
            </div>
            <div className="dropdwn-wrapper">
              <button
                className="dropdown"
                onClick={handleOnClick}
                ref={wrapperRef}
              >
                All <IconDropdown />
              </button>
              <ul className={active ? "dropdwnList active" : "dropdwnList"}>
                <li>Crads</li>
                <li>Pokemon</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="orderlist-wrapper">
          <MyOrders />
        </div>
      </div>
      <Footer />
    </>
  );
}
