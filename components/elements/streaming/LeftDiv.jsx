import React, { memo, useMemo } from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import {
  getProducts,
  userFollowUnfollow,
} from "../../../api/stream/streams_api";
import CloudinaryImage from "../../CommonComponents/CloudinaryImage";
import { ImageTransformation } from "../../Constants/imageTransformation";
import DefaultServices from "../../Services/DefaultServices";
import { SignUPGoogle } from "../../partials/Modal/Modal";
import { useIsMobile } from "../../../contexts/Devices/CurrentDevices";
import { DefaultImagePath } from "../../Constants/defaultImage";

function LeftDiv({
  setShowLoginModal,
  openPayment,
  productDetail,
  streamingDetails,
  auctionNotification,
  handleLeftDiv,
  isLeftDivOpen,
  setIsBuyNowPaymentModal,
  auctionCallBack,
}) {
  const TOGGLE_STATES = {
    AUCTION: "auction",
    BUYNOW: "buynow",
    SOLD: "sold",
    PURCHASED: "purchased",
  };
  const router = useRouter();
  const { isMobile } = useIsMobile();

  const TOGGLES = ["Auction", "Buy Now", "Sold", "Purchased"];
  const [toggleState, setToggleState] = useState(TOGGLE_STATES.AUCTION);
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
  const [followed, setFollowed] = useState(false);
  const [filterKeyword, setFilterKeyword] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showUnFollowModal, setShowUnFollowModal] = useState(false);
  const [noOfFollower, setNoOfFollower] = useState(0);
  //to handle width of the screen and call methods accordingly

  const [showLogin, setShowLogin] = useState(false);

  const initialStreamingData = {
    auction: [],
    buynow: [],
    sold: [],
    purchased: [],
  };
  const [streamProducts, setStreamProducts] = useState(initialStreamingData);
  const [streamProductsFetched, setStreamProductsFetched] = useState(false);

  // to initially show left div on desktop and hide on mobile screen
  useEffect(() => {
    if (isMobile && isLeftDivOpen) {
      handleLeftDiv(false);
    } else if (!isLeftDivOpen) {
      handleLeftDiv(true);
    }
  }, [isMobile]);

  useEffect(() => {
    if (!!streamingDetails?.isFollow) {
      setFollowed(!!streamingDetails?.isFollow);
    }
  }, [streamingDetails?.isFollow]);

  useEffect(() => {
    if (!!stream?.streamData?.vendorDetails?.follower_count) {
      setNoOfFollower(stream?.streamData?.vendorDetails?.follower_count);
    }
  }, [stream?.streamData?.vendorDetails?.follower_count]);

  /**
   * Method to get All products of a stream
   */
  const fetchProducts = async () => {
    try {
      let url = "";
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
      const result = await getProducts(url);
      if (result?.products) {
        // dispatch(addStreamProducts(result))
        const datum = { ...streamProducts };
        datum[toggleState] = result;
        setStreamProducts(datum);
        setStreamProductsFetched(true);
        if (toggleState == TOGGLE_STATES.AUCTION) {
          auctionCallBack(datum[toggleState]?.AuctionDetails);
        }
      }
      setFilterKeyword("");
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
  const updateCurrentToggleValue = (element) => {
    // setStreamProducts([]);
    // dispatch(addStreamProducts({}));
    toggleTab(TOGGLE_STATES[element.split(" ").join("").toUpperCase()]);
    setFilterKeyword("");
    setFilteredProducts([]);
  };

  /**
   * Method to toggle between product listing types
   * @returns
   */
  const getToggles = () => {
    return TOGGLES.map((element) => (
      <div
        key={`tabs-${element}`}
        className={
          toggleState ===
          TOGGLE_STATES[element.split(" ").join("").toUpperCase()]
            ? "tab-link active"
            : "tab-link"
        }
        onClick={(e) => {
          e.preventDefault();
          updateCurrentToggleValue(element);
        }}
      >
        {element}
      </div>
    ));
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
   * This Method will pinned that particular product which is currently on auction
   * @param {*} productId
   * @returns
   */
  const getLiveAuctionClass = (productId) => {
    if (
      productId == auctionNotification?.product?.productId ||
      productId ==
        streamProducts[toggleState]?.AuctionDetails?.latestAuction?.productId
    ) {
      return "pinned";
    }
    return "";
  };

  const handleProductCount = useMemo(() => {
    if (filteredProducts?.length === 0 && !!filterKeyword) {
      return 0;
    } else {
      return (
        filteredProducts?.length ||
        streamProducts[toggleState]?.products?.length ||
        0
      );
    }
  }, [filteredProducts?.length, streamProducts[toggleState]?.products?.length]);

  const showProductListSkimmer = () => {
    return new Array(4).fill(0).map((_, index) => (
      <li key={`dummy-left-div-streaming-${index}`}>
        <strong>
          <Skeleton
            baseColor="#dddbdb66"
            highlightColor="#cdcccc"
            width={`100%`}
          />
        </strong>
      </li>
    ));
  };

  /**
   * Method will render all product listing
   * @returns JSX
   */
  const showProductList = () => {
    let productList = [];
    if (streamProducts && streamProducts[toggleState]?.products?.length) {
      productList = [...streamProducts[toggleState]?.products];
    }
    if (filteredProducts?.length || !!filterKeyword) {
      productList = filteredProducts;
    }
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
                  onClick={(e) => {
                    e.preventDefault();
                    handleBuyNow(product);
                  }}
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
                    <a></a>
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

  const handleProfileClick = () => {
    router.push(
      "/profile?userId=" + stream?.streamData?.vendorDetails?.vendor_id
    );
  };

  const UnfollowModal = () => {
    const vendorDetails = stream?.streamData?.vendorDetails;
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
            <div className="profile-id">
              Want to unfollow @{vendorDetails?.username}?
            </div>
            <div className="btn-wrap follow-btn-wrap flex justify-center">
              <button
                className="border-btn"
                onClick={(e) => {
                  e.preventDefault();
                  setShowUnFollowModal(false);
                }}
              >
                Cancel
              </button>
              <button
                className="primary-btn"
                onClick={(e) => {
                  e.preventDefault();
                  handleFollowUnfollow(e, true);
                }}
              >
                Unfollow
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const handleSearchProduct = (event) => {
    const products = [...streamProducts[toggleState]?.products];
    setFilterKeyword(event.target.value.toLowerCase());
    if (products?.length > 0) {
      const filtered = products.filter((element) => {
        return element.name
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      });
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
      setFilterKeyword("");
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
          {stream?.streamData?.vendorDetails ? (
            DefaultServices?.GetFullImageURL(
              stream?.streamData?.vendorDetails,
              "vendor"
            ) !== DefaultImagePath.defaultImage ? (
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
              <img
                onError={() => {
                  currentTarget.onerror = null;
                  currentTarget.src = "/static/images/profileImg.png";
                }}
                height={20}
                width={14}
                src={DefaultImagePath.defaultProfileImage}
                alt="Profile"
              />
            )
          ) : (
            <Skeleton
              className="border"
              circle
              width={32}
              height={32}
              baseColor="#dddbdb66"
              highlightColor="#cdcccc"
            />
          )}
        </div>
        <div
          className="profile-wrap"
          onClick={(e) => {
            e.preventDefault();
            handleProfileClick();
          }}
        >
          <div className="name">
            {streamingDetails?.vendorDetails ? (
              vendorName
            ) : (
              <Skeleton
                baseColor="#dddbdb66"
                highlightColor="#cdcccc"
                width={`150px`}
              />
            )}
          </div>
          <div className="followrs-count">{noOfFollower} Followers</div>
        </div>
        <div className="btn-wrap">
          {followed ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                handleFollowUnfollow();
              }}
              className="following primary-btn"
            >
              Following
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                handleFollowUnfollow();
              }}
              className="primary-btn"
            >
              Follow
            </button>
          )}
        </div>
      </div>
      {isLeftDivOpen ? (
        <div  className="leftdata-wrapper">
        <div className="leftdata-inner"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <h3 className="title text-capitalize">
            {streamTitle || (
              <Skeleton
                baseColor="#dddbdb66"
                highlightColor="#cdcccc"
                width={`100px`}
              />
            )}
          </h3>
          <div className="tab-wrapper flex">{getToggles()}</div>
          <div className="search">
            <input
              type="text"
              placeholder="Search products..."
              value={filterKeyword}
              onChange={handleSearchProduct}
            />
          </div>
          <div className={`${toggleState}-list leftdata-list`}>
            <div className="product-count">
              {!streamProductsFetched ? (
                <Skeleton
                  baseColor="#dddbdb66"
                  highlightColor="#cdcccc"
                  width={`100px`}
                />
              ) : handleProductCount <= 1 ? (
                `${handleProductCount} Product`
              ) : (
                `${handleProductCount} Products`
              )}
            </div>
            <ul className="product-list">
              {streamProductsFetched
                ? showProductList()
                : showProductListSkimmer()}
            </ul>
          </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default memo(LeftDiv);
