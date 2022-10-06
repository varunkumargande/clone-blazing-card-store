import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  addStreamProducts,
  streamProducts,
} from "../../../store/stream/action";
import { userFollowUnfollow } from "../../../api/stream/streams_api";
import { imageUrl } from "../../../api/url";

function LeftDiv({
  openPayment,
  productDetail,
  streamingDetails,
  auctionNotification,
  handleLeftDiv,
  isLeftDivOpen
}) {
  const TOGGLE_STATES = {
    AUCTION: "auction",
    BUYNOW: "buynow",
    PURCHASED: "purchased",
    SOLD: "sold",
  };
  
  const TOGGLES = ["Auction", "Buy now", "Purchased", "Sold"];
  const [toggleState, setToggleState] = useState(TOGGLE_STATES.AUCTION);
  const router = useRouter();
  const streamUuid = router.query["uuid"];
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
  const dispatch = useDispatch();
  const [followed, setFollowed] = useState(false);
  //to handle width of the screen and call methods accordingly
  const [windowWidth, setWindowWidth] = useState(0);
  let resizeWindow = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  // to initially show left div on desktop and hide on mobile screen
  useEffect(() => {
    windowWidth <= 1024 ? handleLeftDiv(false) : handleLeftDiv(true);
  }, [windowWidth]);

  const leftDivRef = useRef();

  //clicking somewhere except on product list panel will close the product list panel(mobile screen)
  useEffect(() => {
    if(windowWidth <= 1024){
    function handler(event) {
      if (!leftDivRef?.current?.contains(event.target) && !event.target.classList.contains("shops")) {
        handleLeftDiv(false);
      }
    }
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
    }
  }, [leftDivRef.current]);

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
          url = "#";
          break;
        case TOGGLE_STATES.SOLD:
          url = `stream/streamSoldProductList?streamuuid=${streamUuid}`;
          break;
      }
      dispatch(streamProducts(url));
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(err.response.status);
        console.log(error.response.header);
      } else {
        console.log(`Error: ${error.message}`);
      }
    }
  };

  // First fetching auction and buynow product details
  useEffect(() => {
    fetchProducts();
  }, [toggleState]);

  /**
   * Method to set tab type
   * @param {*} element
   */
  const setToggle = (element) => {
    dispatch(addStreamProducts({}));
    toggleTab(TOGGLE_STATES[element.split(" ").join("").toUpperCase()]);
  };

  /**
   * Method to toggle between product listing types
   * @returns
   */
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

  /**
   * Method Will initiate BuyNow process
   * @param {*} product
   */
  const handleBuyNow = (product) => {
    productDetail(product);
    openPayment(true);
  };

  /**
   * This Method will pined that particular product which is currently on auction
   * @param {*} productId
   * @returns
   */
  const getLiveAuctionClass = (productId) => {
    if (
      productId == auctionNotification?.product?.productId ||
      productId ==
        stream?.streamProducts?.AuctionDetails?.latestAuction?.productId
    ) {
      return "pined";
    }
    return "";
  };

  /**
   * Method will render all product listing
   * @returns JSX
   */
  const getProductList = () => {
    if (!stream?.streamProducts?.products) return null;
    return stream?.streamProducts?.products?.map((product) => {
      const productDetails = {
        productName: product?.name.toUpperCase() ?? "",
        productId: product?.product_id ?? "",
        customerName: product?.customerName ?? "",
        price: product?.price ?? "",
        quantity: product?.quantity ?? "",
        description: product?.description ?? "",
      };
      return (
        <>
          {toggleState == "auction" ? (
            <li className={getLiveAuctionClass(productDetails.productId)}>
              <strong>{productDetails.productName}</strong>
            </li>
          ) : toggleState == "buynow" ? (
            <div className="flex flex-center space-between list">
              <div className="left flex column">
                <strong>{productDetails.productName}</strong>
                <span>{productDetails.description}</span>
                <span>{productDetails.quantity} Available</span>
              </div>
              <div className="right">
                <button
                  className="border-btn"
                  onClick={() => handleBuyNow(product)}
                  disabled={isLoggedIn ? false : true}
                >
                  Buy Now
                </button>
                <div className="piece text-center">
                  ${productDetails.price}/piece
                </div>
              </div>
            </div>
          ) : toggleState == "sold" ? (
            <div className="flex space-between list-data">
              <div className="left flex column">
                <strong>{productDetails.productName}</strong>
                <span>
                  Sold to:{" "}
                  <Link href="#">
                    <a>{productDetails.customerName}</a>
                  </Link>
                </span>
              </div>
              <div className="right">
                <div className="amount">For ${productDetails.price}</div>
              </div>
            </div>
          ) : (
            <div className="flex space-between list-data">
              <div className="left flex column">
                <strong>{productDetails.productName}</strong>
                <span>
                  Purchased from{" "}
                  <Link href="/">
                    <a>phatdawg</a>
                  </Link>
                </span>
              </div>
              <div className="right">
                <div className="amount">For ${productDetails.price}</div>
              </div>
            </div>
          )}
        </>
      );
    });
  };

  const productCount =
    stream?.streamProducts?.products?.length > 0
      ? stream?.streamProducts?.products?.length
      : 0;

  const handleFollowUnfollow = async () => {
    if (stream?.streamPageData?.streamPageDteails?.isLoggedIn) {
      const data = {
        following_id: stream?.streamPageData?.streamPageDteails?.loggedInUserId,
        follower_id: stream?.streamPageData?.streamPageDteails?.sellerId,
      };
      const response = await userFollowUnfollow(data);
      if (response.status) {
        setFollowed(!followed);
      }
    }
  };

  const getImagePath = (type) => {
    if (
      stream?.streamData?.vendorDetails?.avatar_path &&
      stream?.streamData?.vendorDetails?.avatar &&
      type == "vendor"
    ) {
      return (
        imageUrl +
        "?path=" +
        stream?.streamData?.vendorDetails?.avatar_path +
        "&name=" +
        stream?.streamData?.vendorDetails?.avatar +
        "&width=50&height=50"
      );
    }
    return "/static/images/profileImg.png";
  };

  return (
    <div className="streaming-left">
      <div className="flex profile-wrapper">
        <div className="image">
          {/* <img src="/static/images/profileImg.png" alt="profile" /> */}
          <img
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "/static/images/profileImg.png";
            }}
            src={getImagePath("vendor")}
            alt="Card"
          />
        </div>
        <div className="profile-wrap">
          <div className="name">{vendorName}</div>
          <div className="followrs-count">129K Followers</div>
        </div>
        <div className="btn-wrap">
          <button onClick={handleFollowUnfollow} className="primary-btn">
            {followed ? "Unfollow" : "Follow"}
          </button>
        </div>
      </div>
      {
        isLeftDivOpen ? (
          <div className="leftdata-wrapper" ref={leftDivRef}>
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
        ) : (
          <></>
        )
       }
    </div>
  );
}

export default LeftDiv;
