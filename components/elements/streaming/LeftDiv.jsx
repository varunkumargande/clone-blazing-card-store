import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  getProducts,
  getCardDetails,
  getAddress,
  buyProduct,
} from "../../../api/stream/streams_api";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess } from "../../../store/auth/action";
import { useRouter } from "next/router";
import Link from "next/link";

function LeftDiv({
  open,
  setOpen,
  addPayInfo,
  addShippInfo,
  setCustomerId,
  streamDetails,
  openPayment,
  productDetail,
  streamingDetails,
  auctionNotification,
  setCurrentAuction
}) {
  const TOGGLE_STATES = {
    AUCTION: "auction",
    BUYNOW: "buynow",
    PURCHASED: "purchased",
    SOLD: "sold",
  };
  const TOGGLES = ["Auction", "Buy now", "Purchased", "Sold"];

  const [isLoading, setIsLoading] = useState(true);
  const [productListing, setProductListing] = useState([]);

  // User State
  const [user, setUser] = useState();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");

  // Card Data State
  const [cardData, setCardData] = useState({});
  const [card, setCard] = useState({});
  const [address, setAddress] = useState({});

  // Shipping Data State
  const [addressData, setAddressData] = useState([]);

  const [token, setToken] = useState("");
  const [toggleState, setToggleState] = useState(TOGGLE_STATES.AUCTION);

  const router = useRouter();
  const streamUuid = router.query["uuid"];

  const POST_ORDER = "";
  const stream = useSelector((state) => state.stream);
  const isLoggedIn = stream?.streamPageData?.streamPageDteails?.isLoggedIn;
  const vendorName =
    streamingDetails?.vendorDetails?.first_name +
    " " +
    streamingDetails?.vendorDetails?.last_name;
  const streamTitle = streamingDetails?.title;

  // Handle Tabs Change Functionality
  const toggleTab = (index) => {
    setToggleState(index);
  };

  /**
   * Method to get All products of a stream
   */
  const fetchProducts = async () => {
    try {
      const url = "";
      switch (toggleState) {
        case TOGGLE_STATES.AUCTION:
          url = `stream/streamProductList?streamuuid=${streamUuid}&sellType=auction`;
          break;
        case TOGGLE_STATES.BUYNOW:
          url = `stream/streamProductList?streamuuid=${streamUuid}&sellType=buy_now`;
          break;
        case TOGGLE_STATES.PURCHASED:
          url = `stream/streamProductList?streamuuid=${streamUuid}&sellType=auction`;
          break;
        case TOGGLE_STATES.SOLD:
          url = `stream/streamSoldProductList?streamuuid=${1234343453654645}`;
          break;
      }
      const data = await getProducts(url);
      if(data){
      setProductListing(data.products);
      setCurrentAuction(data.latest_auction);
      setIsLoading(false);
      }
      
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(err.response.status);
        console.log(error.response.header);
        setIsLoading(false);
      } else {
        console.log(`Error: ${error.message}`);
        setIsLoading(false);
      }
    }
  };

  // First fetching auction and buynow product details
  useEffect(() => {
    fetchProducts();
  }, [toggleState]);

  // If user successfully added payment info and shipping info then will close the pop-up and move towards payment
  // useEffect(() => {
  //   if (addPayInfo && addShippInfo) {
  //     setOpen(false);
  //     alert("Moving towards payment");
  //   }
  // }, [addPayInfo, addShippInfo]);
  const setToggle = (element) => {
    setProductListing([]);
    toggleTab(TOGGLE_STATES[element.split(" ").join("").toUpperCase()]);
  };
  const getToggles = () => {
    return TOGGLES.map((element) => {
      return (
        <>
          <div
            key={`tabs-${element}`}
            className={
              toggleState ===
              TOGGLE_STATES[element.split(" ").join("").toUpperCase()]
                ? "tab-link active"
                : "tab-link"
            }
            onClick={() => setToggle(element)}
          >
            {" "}
            {element}
          </div>
        </>
      );
    });
  };

  useEffect(() => {
    getProductList()
  }, [])


  const handleBuyNow = (product) => {
    productDetail(product);
    openPayment(true);
  };

  const getProductList = () => {
    return productListing?.map((product) => {
      let productName = product?.name.toUpperCase();
      let productid = product?.product_id;
      return (
        <>
          {toggleState == "auction" ? (
            <li className={ productid == auctionNotification?.product?.productId ? "pined " : ""}>
              <strong>{product?.name}</strong>
            </li>
          ) : toggleState == "buynow" ? (
            <div className="flex flex-center space-between list">
              <div className="left flex column">
                <strong>{productName}</strong>
                {/* <span>17 Available</span> */}
              </div>
              <div className="right">
                <button
                  className="border-btn"
                  onClick={() => handleBuyNow(product)}
                  disabled={isLoggedIn ? false : true}
                >
                  Buy Now
                </button>
              </div>
            </div>
          ) : toggleState == "sold" ? (
            <div className="flex space-between list-data">
              <div className="left flex column">
                <strong>{productName}</strong>
                <span>
                  Sold to:{" "}
                  <Link href="/">
                    <a>phatdawg</a>
                  </Link>
                </span>
              </div>
              <div className="right">
                <div className="amount">For $25</div>
              </div>
            </div>
          ) : (
            <div className="flex space-between list-data">
              <div className="left flex column">
                <strong>{productName}</strong>
                <span>
                  Purchased from{" "}
                  <Link href="/">
                    <a>phatdawg</a>
                  </Link>
                </span>
              </div>
              <div className="right">
                <div className="amount">For $25</div>
              </div>
            </div>
          )}
        </>
      );
    });
  };

  const productCount = productListing?.length > 0 ? productListing?.length : 0;
  return (
    <div className="streaming-left">
      <div className="flex profile-wrapper">
        <div className="image">
          <img src="/static/images/profileImg.png" alt="profile" />
        </div>
        <div className="profile-wrap">
          <div className="name">{vendorName}</div>
          <div className="followrs-count">129K Followers</div>
        </div>
        <div className="btn-wrap">
          <button className="primary-btn">Follow</button>
        </div>
      </div>
      <div className="leftdata-wrapper">
        <h3 className="title">{streamTitle}</h3>
        <div className="tab-wrapper flex">{getToggles()}</div>
        <div className="search">
          <input type="text" placeholder="Search products..." />
        </div>
          <div className={`${toggleState}-list leftdata-list`}>
            <div className="product-count">{productCount} Products</div>
            <ul className="product-list">{getProductList()}</ul>
          </div>
      </div>
    </div>
  );
}

export default LeftDiv;
