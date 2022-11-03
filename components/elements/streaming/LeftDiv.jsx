import React, { useRef, memo } from "react";
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
import CloudinaryImage from "../../CommonComponents/CloudinaryImage";
import { ImageTransformation } from "../../Constants/imageTransformation";
import DefaultServices from "../../Services/DefaultServices";
import { SignUPGoogle } from "../../partials/Modal/Modal";

function LeftDiv({
  setShowLoginModal,
  openPayment,
  productDetail,
  streamingDetails,
  auctionNotification,
  handleLeftDiv,
  isLeftDivOpen,
  setIsBuyNowPaymentModal,
}) {
  const TOGGLE_STATES = {
    AUCTION: "auction",
    BUYNOW: "buynow",
    SOLD: "sold",
    PURCHASED: "purchased",
  };

  const TOGGLES = ["Auction", "Buy Now", "Sold", "Purchased"];
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
  const [followed, setFollowed] = useState(
    streamingDetails.isFollow ? streamingDetails.isFollow : false
  );
  const [flterKeyword, setFilterKeyword] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [showUnFollowModal, setShowUnFollowModal] = useState(false);
  const [noOfFollower, setNoOfFollower] = useState(
    stream?.streamData?.vendorDetails?.follower_count ?? 0
  );
  //to handle width of the screen and call methods accordingly
  const [windowWidth, setWindowWidth] = useState(0);
  const [showLogin, setShowLogin] = useState(false);

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
    if (windowWidth <= 1024 && isLeftDivOpen) {
      handleLeftDiv(false);
    } else if (!isLeftDivOpen) {
      handleLeftDiv(true);
    }
  }, [windowWidth]);

  // const leftDivRef = useRef();
  const filterKeyword = useRef();
  //clicking somewhere except on product list panel will close the product list panel(mobile screen)
  // useEffect(() => {
  //   if (windowWidth <= 1024) {
  //     function handler(event) {
  //       if (
  //         !leftDivRef?.current?.contains(event.target) &&
  //         !event.target.classList.contains("shops")
  //       ) {
  //         handleLeftDiv(false);
  //       }
  //     }
  //     window.addEventListener("click", handler);
  //     return () => window.removeEventListener("click", handler);
  //   }
  // }, [leftDivRef.current]);

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
      } else {
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
    filterKeyword.current.value = null;
    setFilteredProducts(null);
  };

  /**
   * Method to toggle between product listing types
   * @returns
   */
  const getToggles = () => {
    return TOGGLES.map((element) => {
      return (
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
          {element}
        </div>
      );
    });
  };

  /**
   * Method Will initiate BuyNow process
   * @param {*} product
   */
  const handleBuyNow = (product) => {
    if (isLoggedIn) {
      productDetail(product);
      setIsBuyNowPaymentModal(true);
      openPayment(true);
    } else {
      setShowLogin(true);
    }
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
  const handleProductCount =
    filteredProducts?.length ?? stream?.streamProducts?.products?.length ?? 0;

  /**
   * Method will render all product listing
   * @returns JSX
   */
  const getProductList = () => {
    const productList = filteredProducts ?? stream?.streamProducts?.products;
    if (!productList) return null;
    return productList?.map((product) => {
      const productDetails = {
        productName: product?.name.toUpperCase() ?? "",
        productId: product?.product_id ?? "",
        customerName: product?.customerName ?? "",
        price: product?.price ?? "",
        quantity: product?.quantity ?? "",
        description: product?.description ?? "",
      };
      return (
        <React.Fragment key={productDetails?.productId}>
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
        </React.Fragment>
      );
    });
  };

  const handleFollowUnfollow = async (_, isFromModal = false) => {
    if (stream?.streamPageData?.streamPageDteails?.isLoggedIn) {
      if (followed && !isFromModal) {
        setShowUnFollowModal(true);
      } else {
        const data = {
          following_id: stream?.streamPageData?.streamPageDteails?.sellerId,
          follower_id:
            stream?.streamPageData?.streamPageDteails?.loggedInUserId,
        };
        const response = await userFollowUnfollow(data);
        if (response.status) {
          setNoOfFollower(response?.data?.followerCount);
          setFollowed(!followed);
          setShowUnFollowModal(false);
        }
      }
    } else {
      setShowLoginModal(true);
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
  const handleProfileClick = () => {
    router.push(
      "/profile?userId=" + stream?.streamData?.vendorDetails?.vendor_id
    );
  };

  const UnfollowModal = () => {
    const vendorDetails = stream?.streamData?.vendorDetails;
    const vendorName = vendorDetails?.username;
    return (
      <div className="modalOverlay flex justify-center flex-center">
        <div className="modal">
          <div className="modal-body text-center">
            <div className="profile-icon">
              {stream?.streamData?.vendorDetails ? (
                <CloudinaryImage
                  imageUrl={DefaultServices?.GetFullImageURL(
                    stream?.streamData?.vendorDetails,
                    "vendor"
                  )}
                  keyId={DefaultServices?.GetFullImageURL(
                    stream?.streamData?.vendorDetails,
                    "vendor"
                  )}
                  transformation={ImageTransformation.streamPageProfile}
                  alternative={"Card"}
                />
              ) : (
                <img src="/static/images/profile-large.svg" alt="" />
              )}
            </div>
            <div className="profile-id">Want to unfollow @{vendorName}?</div>
            <div className="btn-wrap follow-btn-wrap flex justify-center">
              <button
                className="border-btn"
                onClick={() => setShowUnFollowModal(false)}
              >
                Cancel
              </button>
              <button
                className="primary-btn"
                onClick={(_) => handleFollowUnfollow(_, true)}
              >
                Unfollow
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const handleSearchProduct = (e) => {
    const products = stream?.streamProducts?.products;
    if (products?.length > 0) {
      const filtered = products.filter((element) => {
        return element.name
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  };

  return (
    <div className="streaming-left">
      {showLogin && (
        <SignUPGoogle
          customMsg={
            "In order to buy a product in the stream, you need to sign up or log in."
          }
          onDismiss={(e) => {
            e.preventDefault();
            setShowLogin(false);
          }}
        />
      )}
      {showUnFollowModal && UnfollowModal()}
      <div className="flex profile-wrapper">
        <div className="image">
          {/* <img src="/static/images/profileImg.png" alt="profile" /> */}
          <CloudinaryImage
            imageUrl={DefaultServices?.GetFullImageURL(
              stream?.streamData?.vendorDetails,
              "vendor"
            )}
            keyId={DefaultServices?.GetFullImageURL(
              stream?.streamData?.vendorDetails,
              "vendor"
            )}
            transformation={ImageTransformation.streamPageProfile}
            alternative={"Card"}
          />
          {/* <img
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "/static/images/profileImg.png";
            }}
            src={getImagePath("vendor")}
            alt="Card"
          /> */}
        </div>
        <div className="profile-wrap" onClick={handleProfileClick}>
          <div className="name">{vendorName}</div>
          <div className="followrs-count">{noOfFollower} Followers</div>
        </div>
        <div className="btn-wrap">
          {followed ? (
            <button
              onClick={handleFollowUnfollow}
              className="following primary-btn"
            >
              Following
            </button>
          ) : (
            <button onClick={handleFollowUnfollow} className="primary-btn">
              Follow
            </button>
          )}
        </div>
      </div>
      {isLeftDivOpen ? (
        <div
          className="leftdata-wrapper"
          onClick={(e) => e.stopPropagation()}
          // ref={leftDivRef}
        >
          <h3 className="title">{streamTitle}</h3>
          <div className="tab-wrapper flex">{getToggles()}</div>
          <div className="search">
            <input
              type="text"
              placeholder="Search products..."
              value={flterKeyword}
              ref={filterKeyword}
              onChange={(e) => handleSearchProduct(e)}
            />
          </div>
          <div className={`${toggleState}-list leftdata-list`}>
            <div className="product-count">{handleProductCount} Products</div>
            <ul className="product-list">{getProductList()}</ul>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default memo(LeftDiv);

