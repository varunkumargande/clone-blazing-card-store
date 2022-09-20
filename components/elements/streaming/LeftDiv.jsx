import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { getProducts, getCardDetails, getAddress, buyProduct } from "../../../api/stream/streams_api";
import { useSelector, useDispatch } from 'react-redux'
import { loginSuccess } from '../../../store/auth/action'
import { useRouter } from "next/router";

function LeftDiv({ open, setOpen, addPayInfo, addShippInfo, setCustomerId, streamDetails, openPayment, productDetail, streamingDetails }) {
  const TOGGLE_STATES = {
    AUCTION: "auction",
    BUYNOW: "buynow",
    GIVEAWAY: "giveaway",
    SOLD: "sold",
  };

  const TOGGLES = ["Auction", "Buy now", "Giveaway", "Sold"];

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
  const stream = useSelector((state) => state.stream)
  const isLoggedIn = stream?.streamPageData?.streamPageDteails?.isLoggedIn


  // using selector to get userId from redux
  // const dispatch = useDispatch()
  // dispatch(loginSuccess(user?.id));
  // let user_id = useSelector((s) => s.auth.userId);
  // console.log(`User ID is ${user_id}`);


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
          url =
            `stream/streamProductList?streamuuid=${streamUuid}&sellType=auction`;
          break;
        case TOGGLE_STATES.BUYNOW:
          url =
            `stream/streamProductList?streamuuid=${streamUuid}&sellType=buy_now`;
          break;
        case TOGGLE_STATES.GIVEAWAY:
          url =
            `stream/streamProductList?streamuuid=${streamUuid}&sellType=auction`;
          break;
        case TOGGLE_STATES.SOLD:
          url =
            `stream/streamSoldProductList?streamuuid=${streamUuid}`;
          break;
      }
      const data = await getProducts(url);
      setProductListing(data);
      setIsLoading(false);
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


  /**
   * Method to get All saved cards of a user
   */
  const fetchCardDetails = async () => {
    try {
      const data = await getCardDetails(userId, "customer-card-details/listCard")

      setAddress(data[0].billing_details);
      setCard(data[0].card);
      setCustomerId(data[0].customer);
      setToken(data[0].customer);
      setCardData(data[0]);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(err.response.status);
        console.log(error.response.header);
        // setIsLoading(false);
      } else {
        console.log(`Error: ${error.message}`);
        // setIsLoading(false)
      }
    }
  };

  // Get user address details
  const fetchAddress = async () => {
    try {
      const data = await getAddress(userId);
      setAddressData(data);

    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.header);

      } else {
        console.log(`Error: ${error.message}`);

      }
    }
  };

  // Posting user details to payment api
  const postOrderDetails = async (product) => {
    let orderBody = {
      shippingLastName: "",
      shippingCity: "noida",
      shippingPostCode: "201301",
      shippingCompany: "Arjun",
      shippingFirstName: "Arjun",
      shippingZone: "UP",
      gstNo: "",
      phoneNumber: "7291936496",
      shippingAddressFormat: "",
      shippingAddress_1: "noida sect 1",
      shippingAddress_2: "noida sect 1",
      emailId: "arjun.singh@kellton.com",
      shippingCountryId: 99,
      productDetails: [
        {
          productId: product.product_id,
          quantity: product.quantity.toString(),
          price: product.price,
          basePrice: product.price,
          model: product.name,
          name: product.name,
          productVarientOptionId: "",
          taxType: null,
          taxValue: null,
          varientName: "",
          skuName: product.sku,
          vendorId: 0,
        },
      ],
      paymentMethod: 6,
      paymentAddress_1: "noida sect 1",
      paymentAddress_2: "noida sect 1",
      paymentCity: "noida",
      paymentCompany: "Arjun",
      paymentCountryId: 99,
      paymentFirstName: "Arjun",
      paymentLastName: "",
      paymentPostCode: "201301",
      paymentZone: "UP",
      couponCode: "",
      couponData: "",
      couponDiscountAmount: "",
      password: "",
      customerStripeRefId: cardData.id,
      paymentMethodId: cardData.id,
    };
    try {
      const res = await buyProduct(orderBody);
      console.log(res);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(err.response.status);
        console.log(error.response.header);
        // setIsLoading(false);
      } else {
        console.log(`Error: ${error.message}`);
        // setIsLoading(false)
      }
    }
  };


  // Handle Buy_now Item
  const handleClick = async (product) => {
    fetchCardDetails();
    fetchAddress();
  };

  // First fetching auction and buynow product details
  useEffect(() => {
    fetchProducts();
    // postOrderDetails();
  }, [toggleState]);



  // If user successfully added payment info and shipping info then will close the pop-up and move towards payment
  useEffect(() => {
    if (addPayInfo && addShippInfo) {
      setOpen(false);
      alert("Moving towards payment");
    }
  }, [addPayInfo, addShippInfo]);

  const getToggles = () => {
    return TOGGLES.map((element) => {
      return (
        <>
          <h5>
            {/* <Link href="streaming/#"> */}
            <span key={`tabs-${element}`}
              className={
                toggleState ===
                  TOGGLE_STATES[element.split(" ").join("").toUpperCase()]
                  ? "tabs active-tabs"
                  : "tabs"
              }
              onClick={() =>
                toggleTab(
                  TOGGLE_STATES[element.split(" ").join("").toUpperCase()]
                )
              }
            >
              {" "}
              {element}
            </span>
            {/* </Link> */}
          </h5>
        </>
      );
    });
  };

  const handleBuyNow =(product)=>{
    productDetail(product)
    openPayment(true)
  }

  const getProductList = () => {
    return productListing?.map((product) => {
      return (
        <>
          <div key={product?.productId}>
            <li>
              {product?.name}
               {isLoggedIn ? 
              toggleState == "buynow" ? <span><button className="btn btn-primary" onClick={() => handleBuyNow(product)}>Buy now</button></span> : <></> :
              toggleState == "buynow" ? <span><button className="btn btn-secondary" onClick={() => handleBuyNow(product)} >Buy now</button></span> : <></>
              }

            </li>
            <hr />
          </div>
        </>
      )
    }
    );
  };

  return (
    <div className="streaming-div-left">
      <h1>{streamingDetails?.title}</h1>
      <button onClick={() => openPayment(true)}> Buy </button>
      <div className="stream-nav">{getToggles()}</div>

      <div className="product-quick-search">
        <input
          type="text"
          className="form-control curved-box"
          placeholder="Search products..."
        />
      </div>
      <div className="product-list content-tabs">
        <div className={toggleState ? "content  active-content" : "content"}>
          {isLoading ? <p>Loading products...</p> : <></>}
          {isLoading === false && productListing?.length === 0 ? (
            <p>0 products</p>
          ) : (
            getProductList()
          )}
        </div>
      </div>
    </div>
  );
}

export default LeftDiv;

