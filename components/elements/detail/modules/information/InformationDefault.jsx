import React, { useRef } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import {
  addItem,
  increaseItemQty,
  decreaseItemQty,
} from "../../../../../store/cart/action";
import { useState } from "react";
import { addToCartApi } from "../../../../../api/cart/addToCart";
import { cartAdd } from "../../../../helper/cartHelper";
import { pinCodeApi } from "../../../../../api/product/pincodeAvail";
import { priceHelpFunc } from "../../../../helper/priceHelper";
import { useEffect } from "react";
import Router from "next/router";
import { useTranslation } from "../../../../../i18n";
import { modalSuccess } from "../../../../../api/intercept";
import toast from "../../../../../api/toast/index";
import Head from "next/head";
import { displayWhenclose } from "../../../../../store/colorPalette/action";
import { formatCurrency } from "../../../../../utilities/product-helper";
import CartPopup from "../../../../shared/headers/modules/CartPopUp";
import {
  getHomeRevies,
  getOptionRevies,
  getQuantymin,
  getsliderimageclicks,
} from "../../../../../store/product/action";
import SpurtQuotationPop from "../../../../partials/Quotation/QuoteModal";
import ProductReviewRatingviews from "../description/ProductReviewRating";
import SpurtVarientComponent from "../../../../partials/product/VarientComponent";
// import { commonproductcountApi } from "../../../../../addOns/CommonVendorProduct/commonproductcountApi";

function InformationDefault({
  showModal,
  product,
  setShowModal,
  setShowPriceModal,
  priceChartInfo,
  showPriceModal,
  isLoggedIn,
  // varientdefultid,
  scrollTo,
  starcoutid,
  Productslug,
  productdata,
}) {
  //  let product=useSelector((s) => s.setting).currency;
  const varproduct = useSelector((s) => s.product.singleProduct);


  const availableProductStatus = useSelector((s) => s.product.hidefunavailable);
  const quantity = useSelector((s) => s.product.qut);
  console.log(quantity, "qutmin");

  const [colorTheme, setColorTheme] = useState();
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  // const [quantity, setQuantity] = useState(1);
  const [pin, setPin] = useState("");
  const [pinInfo, setPinInfo] = useState("");
  const [checkStatus, setCheckStatus] = useState("");
  const [availValue, setAvailValue] = useState("");
  const [priceAdded, setPriceAdded] = useState("");
  const [productsPrice, setProductsPrice] = useState(product.price);
  const [samplePriceRefer] = useState(product.pricerefer);
  const [optionStateArray, setOptionStateArray] = useState([]);
  const [arrayReload, setArrayReload] = useState(0);
  const [optionName, setOptionName] = useState();
  const [productOptionValueId, setProductOptionId] = useState([]);
  const [productOptionIdRefer, setProductOptionIdRefer] = useState([]);
  const [productVarientDetail, setProductVarientDetail] = useState({});
  const [buttonLoader, setButtonLoader] = useState(false);
  const [variantNameArray, setVariantNameArray] = useState([]);
  const [showMiniCart, setShowMiniCart] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [skuNumber, setSkuNumber] = useState("");
  const [opentlet, setopentlet] = useState("");
  // const [availableProductStatus, SetavailableProductStatus] = useState(false);
  // product.skuName=skuNumber
  const [varName, setVarName] = useState("");
  const [imagedataload, setalldataload] = useState([]);
  const [varId, setVarId] = useState("");

  let currentColor = useSelector((s) => s.palette.currentColor);
  let authCheck = useSelector((s) => s.auth);
  let removeFromCart = useSelector((s) => s.cart.removeproduct);
  let reloadCart = useSelector((s) => s.cart.addproduct);
  let currency = useSelector((s) => s.setting).currency;
  product.initialPrice = productsPrice;
  const varientdefultid = useSelector((s) => s.product.sliderdataimage);

  // product.skuName=skuNumber
  let optionArray = [];
  const myReview = useRef();
  const tirevalue = product;
  const res = {};
  product &&
    product.productImage &&
    product.productImage.forEach((obj) => {
      res["name"] = obj.image;
      res["containerName"] = obj.containerName;
    });

  useEffect(() => {
    dispatch(getQuantymin(1));
    varproduct.processImage = product.productImage;
    if (product.minQuantityAllowedCart !== null && product.hasStock !== 0) {
      console.log(varproduct, "varproduct.minQuantityAllowedCart");
      if (
        varproduct.productvarientList &&
        varproduct.productvarientList.length !== 0
      ) {
        if (varproduct.minQuantityAllowedCart !== null) {
          dispatch(getQuantymin(varproduct.minQuantityAllowedCart));
        } else {
          dispatch(getQuantymin(1));
        }

        // setQuantity(varproduct.minQuantityAllowedCart);
      } else {
        dispatch(getQuantymin(product.minQuantityAllowedCart));

        // setQuantity(product.minQuantityAllowedCart);
      }
    }
  }, [varproduct]);

  useEffect(() => {
    dispatch(getsliderimageclicks(product && product.productImage));
  }, []);

  // useEffect(() => {
  //   if(varproduct.productvarientList &&
  //     varproduct.productvarientList.length !== 0){
  //       console.log(product.skuName,'product.skuName')
  //       setQuantity(qutmin)
  //       // product.skuName=varproduct.skuName
  //     }

  // }, [qutmin]);

  useEffect(() => {
    if (
      varproduct.productvarientList &&
      varproduct.productvarientList.length !== 0
    ) {
      console.log(product.skuName, "product.skuName");
      setSkuNumber(varproduct.skuName);
      // product.skuName=varproduct.skuName
    } else {
      console.log(product.skuName, "product.skuName");
      setSkuNumber(product.skuName);
    }
  }, [varproduct.skuName]);

  useEffect(() => {
    // setSkuNumber(product.skuName)
    dispatch(getHomeRevies(varproduct.vendorId));
  }, []);

  useEffect(() => {
    setCartData(JSON.parse(sessionStorage.getItem("cartItem")));
  }, [reloadCart, removeFromCart]);

  useEffect(() => {
    if (showMiniCart) {
      document.body.classList.add("scroll-block-home");
    } else {
      document.body.classList.remove("scroll-block-home");
    }
  }, [showMiniCart]);

  useEffect(() => {
    setalldataload(product.productImage);
  }, []);

  const quantityTier = () => {
    product.productTirePrices.sort(function (a, b) {
      return a.quantity - b.quantity;
    });

    var min = product.productTirePrices[0];
    var min2 = product.productTirePrices[1];
    var min3 = product.productTirePrices[2];
    var min4 = product.productTirePrices[3];
    dispatch(getQuantymin(quantity + 1));
    // setQuantity(quantity + 1);

    if (product && product.productTirePrices.length === 4) {
      if (quantity + 1 >= min.quantity && quantity + 1 < min2.quantity) {
        product.price = min.price;
        product.pricerefer = min.price;
      }

      if (quantity + 1 >= min2.quantity && quantity + 1 < min3.quantity) {
        product.price = min2.price;
        product.pricerefer = min.price;
      }

      if (quantity + 1 >= min3.quantity && quantity + 1 < min4.quantity) {
        product.price = min3.price;
        product.pricerefer = min.price;
      }

      if (quantity + 1 >= min4.quantity) {
        product.price = min4.price;
        product.pricerefer = min.price;
      }
    }
    if (product && product.productTirePrices.length === 3) {
      if (quantity + 1 >= min.quantity && quantity + 1 < min2.quantity) {
        product.price = min.price;
        product.pricerefer = min.price;
      }

      if (quantity + 1 >= min2.quantity && quantity + 1 < min3.quantity) {
        product.price = min2.price;
        product.pricerefer = min.price;
      }

      if (quantity + 1 >= min3.quantity) {
        product.price = min3.price;
      }
    }
    if (product && product.productTirePrices.length === 2) {
      if (quantity + 1 >= min.quantity && quantity + 1 < min2.quantity) {
        product.price = min.price;
        product.pricerefer = min.price;
      }

      if (quantity + 1 >= min2.quantity) {
        product.price = min2.price;
        product.pricerefer = min.price;
      }
    }
    if (product && product.productTirePrices.length === 1) {
      if (quantity + 1 >= min.quantity) {
        product.price = min.price;
        product.pricerefer = min.price;
      }
    }
  };

  const quantityDecrementTier = () => {
    product.productTirePrices.sort(function (a, b) {
      return a.quantity - b.quantity;
    });

    var min = product.productTirePrices[0];
    var min2 = product.productTirePrices[1];
    var min3 = product.productTirePrices[2];
    var min4 = product.productTirePrices[3];
    dispatch(getQuantymin(quantity - 1));
    // setQuantity(quantity - 1);

    if (product && product.productTirePrices.length === 4) {
      if (quantity + 1 >= min.quantity && quantity + 1 < min2.quantity) {
        product.price = min.price;
        product.pricerefer = min.price;
      }

      if (quantity + 1 >= min2.quantity && quantity + 1 < min3.quantity) {
        product.price = min2.price;
        product.pricerefer = min2.price;
      }

      if (quantity + 1 >= min3.quantity && quantity + 1 < min4.quantity) {
        product.price = min3.price;
        product.pricerefer = min3.price;
      }

      if (quantity + 1 >= min4.quantity) {
        product.price = min4.price;
        product.pricerefer = min4.price;
      }

      if (quantity + 1 >= min3.quantity) {
        product.price = min3.price;
        product.pricerefer = min3.price;
      }

      if (quantity - 1 >= min.quantity && quantity - 1 < min2.quantity) {
        product.price = min.price;
        product.pricerefer = min.price;
      }

      if (quantity - 1 >= min2.quantity) {
        product.price = min2.price;
        product.pricerefer = min2.price;
      }
      if (quantity - 1 < min.quantity) {
        product.price = productsPrice;
        product.pricerefer = samplePriceRefer;
      }
    }
    if (product && product.productTirePrices.length === 3) {
      if (quantity + 1 >= min.quantity && quantity + 1 < min2.quantity) {
        product.price = min.price;
        product.pricerefer = min.price;
      }

      if (quantity + 1 >= min2.quantity && quantity + 1 < min3.quantity) {
        // product.price=productsPrice
        product.price = min2.price;
        product.pricerefer = min2.price;
      }

      if (quantity + 1 >= min3.quantity) {
        product.price = min3.price;
        product.pricerefer = min3.price;
      }

      if (quantity - 1 >= min.quantity && quantity - 1 < min2.quantity) {
        product.price = min.price;
        product.pricerefer = min.price;
      }

      if (quantity - 1 >= min2.quantity) {
        // product.price=productsPrice
        product.price = min2.price;
        product.pricerefer = min2.price;
      }
      if (quantity - 1 < min.quantity) {
        product.price = productsPrice;
        product.pricerefer = samplePriceRefer;
      }
    }
    if (product && product.productTirePrices.length === 2) {
      if (quantity - 1 >= min.quantity && quantity - 1 < min2.quantity) {
        product.price = min.price;
        product.pricerefer = min.price;
      }

      if (quantity - 1 >= min2.quantity) {
        // product.price=productsPrice
        product.price = min2.price;
        product.pricerefer = min2.price;
      }
      if (quantity - 1 < min.quantity) {
        product.price = productsPrice;
        product.pricerefer = samplePriceRefer;
      }
    }
    if (product && product.productTirePrices.length === 1) {
      if (quantity - 1 >= min.quantity) {
        product.price = min.price;
        product.pricerefer = min.price;
      } else {
        product.price = product.initialPrice;
        product.pricerefer = samplePriceRefer;
      }
    }
  };

  const modalWarningLimit = (type) => {
    toast({ type: type, message: "You have reached maximum quantity limit" });
  };

  const handleAddItemToCart = (e, id, price, product) => {
    e.preventDefault();
    setButtonLoader(true);
    dispatch(displayWhenclose("none"));

    if (varproduct.skuName !== undefined) {
      product.skuName = skuNumber;
      product.productImage = [];
    }
    if (authCheck.isLoggedIn) {
      if (product.flag === "") {
        addToCartApi(
          id,
          priceHelpFunc(
            JSON.parse(product.price),
            product.taxType,
            product.taxValue,
            availValue
          ),
          quantity,
          optionName,
          productOptionValueId,
          setButtonLoader,
          product.skuName,
          "new",
          product.variantId,
          product.variantName
        );
      } else {
        let upPrice = parseFloat(price) + parseFloat(availValue);
        addToCartApi(
          id,
          priceHelpFunc(
            product.pricerefer,
            product.taxType,
            product.taxValue,
            availValue
          ),
          quantity,
          optionName,
          productOptionValueId,
          setButtonLoader,
          product.skuName,
          "new",
          product.variantId,
          product.variantName
        );
      }
    } else {
      modalSuccess("success", `Thank you ${product.name} is added to cart`);
    }
    product.availValue = availValue;
    product.initialPrice = varproduct.price;
    product.productImage = varproduct.processImage;
    // product.productImage=res
    product.optionIdArrayValue = productOptionValueId;
    product.optionName = JSON.stringify(optionName);
    product.variantName = varproduct.variantName;
    if (varproduct.skuName !== undefined) {
      product.price = parseFloat(varproduct.price);
    }
    //

    // product.skuName=varproduct.skuName
    // product.skuName=varproduct.skuName
    // console.log(optionName, "availValueavailValue");
    // console.log(res,'availValueavailValue')
    // console.log(product, quantity, availValue, "availValueavailValue");
    cartAdd(product, quantity, availValue);

    dispatch(addItem(1));

    setShowMiniCart(true);
  };

  const handleBuyAddItemToCart = (e, id, price, product) => {
    e.preventDefault();
    setButtonLoader(true);
    if (varproduct.skuName !== undefined) {
      product.skuName = skuNumber;
    }
    if (authCheck.isLoggedIn) {
      if (product.flag === "") {
        addToCartApi(
          id,
          priceHelpFunc(product.price, product.taxType, product.taxValue, ""),
          quantity,
          optionName,
          productOptionValueId,
          setButtonLoader,
          product.skuName,
          "new",
          product.variantId,
          product.variantName
        );
      } else {
        let upPrice = parseFloat(price) + parseFloat(availValue);
        addToCartApi(
          id,
          priceHelpFunc(
            product.pricerefer,
            product.taxType,
            product.taxValue,
            ""
          ),
          quantity,
          optionName,
          productOptionValueId,
          setButtonLoader,
          product.skuName,
          "new",
          product.variantId,
          product.variantName
        );
      }
    } else {
      modalSuccess("success", ` ${product.name} is added to cart`);
    }

    product.availValue = availValue;
    product.initialPrice = productsPrice;
    product.productImage = varproduct.processImage;
    // product.processImage = res;
    // product.skuName=varproduct.skuName
    product.optionIdArrayValue = productOptionValueId;
    product.selectedOption = optionStateArray;
    product.optionName = JSON.stringify(optionName);
    product.variantName = varproduct.variantName;
    if (varproduct.skuName !== undefined) {
      product.price = varproduct.price;
      product.skuName = skuNumber;
    }

    cartAdd(product, quantity, availValue);
    // if(varproduct.skuName !==undefined){
    //   product.skuName=skuNumber
    // }

    dispatch(addItem(1));
    // setAvailValue(0)
    product.price = parseFloat(productsPrice);
    Router.push("/account/checkout");
  };

  const handleIncreaseItemQty = (e, product) => {
    if (
      varproduct.productvarientList &&
      varproduct.productvarientList.length !== 0
    ) {
      product.maxQuantityAllowedCart = varproduct.maxQuantityAllowedCart;
    }

    if (product.hasStock === 1) {
      if (product.hasTirePrice === 1) {
        product.productTirePrices.map((tieres, index) => {
          if (tieres.quantity <= quantity + 1) {
            // console.log(tieres.quantity,'tieres');
            setopentlet(tieres);
            product.price = priceHelpFunc(
              JSON.parse(tieres.price),
              product.taxType,
              product.taxValue,
              ""
            );
          }
        });

        if (product.maxQuantityAllowedCart !== null) {
          if (product.maxQuantityAllowedCart >= quantity + 1) {
            quantityTier();
          } else {
            modalWarningLimit("error");
          }
        } else {
          quantityTier();
        }
      } else {
        if (product.maxQuantityAllowedCart !== null) {
          if (product.maxQuantityAllowedCart >= quantity + 1) {
            quantityTier();
          } else {
            modalWarningLimit("error");
          }
        } else {
          quantityTier();
        }
      }
    } else {
      if (product.hasTirePrice === 1) {
        //  product.productvarientList.map(()=>{

        //  })
        product.productTirePrices.map((tieres, index) => {
          if (tieres.quantity <= quantity + 1) {
            // console.log(tieres.quantity,'tieres');
            setopentlet(tieres);
            product.price = priceHelpFunc(
              JSON.parse(tieres.price),
              product.taxType,
              product.taxValue,
              ""
            );
          }
        });
        if (product.maxQuantityAllowedCart !== null) {
          if (
            product.maxQuantityAllowedCart >= quantity + 1 ||
            product.hasStock != 1
          ) {
            dispatch(increaseItemQty(product));
            dispatch(addItem(1));
            dispatch(getQuantymin(quantity + 1));
            // setQuantity(quantity + 1);
          } else {
            modalWarningLimit("error");
          }
        } else {
          dispatch(increaseItemQty(product));
          dispatch(addItem(1));
          dispatch(getQuantymin(quantity + 1));
          // setQuantity(quantity + 1);
        }
      } else {
        if (product.maxQuantityAllowedCart !== null) {
          if (
            product.maxQuantityAllowedCart >= quantity + 1 ||
            product.hasStock != 1
          ) {
            dispatch(increaseItemQty(product));
            dispatch(addItem(1));
            // setQuantity(quantity + 1);
            dispatch(getQuantymin(quantity + 1));
          } else {
            modalWarningLimit("error");
          }
        } else {
          dispatch(increaseItemQty(product));
          dispatch(addItem(1));
          // setQuantity(quantity + 1);
          dispatch(getQuantymin(quantity + 1));
        }
      }
    }
  };

  const handleDecreaseItemQty = (e) => {
    if (
      varproduct.productvarientList &&
      varproduct.productvarientList.length !== 0
    ) {
      product.minQuantityAllowedCart = varproduct.minQuantityAllowedCart;
    }

    if (product.hasStock === 1) {
      if (product.minQuantityAllowedCart === null) {
        quantity > 1 && quantityDecrementTier();
      } else {
        if (quantity - 1 >= product.minQuantityAllowedCart) {
          quantity > 1 && quantityDecrementTier();
        }
      }
    } else {
      if (product.minQuantityAllowedCart !== null && product.hasStock !== 0) {
        if (quantity - 1 >= product.minQuantityAllowedCart) {
          quantity > 1 && dispatch(getQuantymin(quantity - 1));
          // setQuantity(quantity - 1);
          dispatch(decreaseItemQty(product));
          dispatch(addItem(1));
        } else {
        }
      } else {
        quantity > 1 && dispatch(getQuantymin(quantity - 1));
        // setQuantity(quantity - 1);
        dispatch(decreaseItemQty(product));
        dispatch(addItem(1));
      }
    }
  };

  const pinCodeCheck = (id) => {
    if (pin.length !== 0) {
      pinCodeApi(id, pin, setPinInfo, setCheckStatus);
    }
  };

  useEffect(() => {
    setArrayReload(0);

    const len = optionStateArray && optionStateArray.length;

    let detailArray = [];
    let valueArray = [];
    for (var i = 0; i < len; i++) {
      detailArray.push(parseFloat(optionStateArray[i].price));
      valueArray.push(optionStateArray[i].optionValueName);
    }
    var sum = detailArray.reduce(function (a, b) {
      return a + b;
    }, 0);
    setAvailValue(sum);
    const productTransApi = {
      totalOptions: sum,
      options: product.productOption,
      optionValueArray: valueArray,
    };
    setOptionName(productTransApi);
    dispatch(getOptionRevies(productTransApi));
  }, [arrayReload]);

  const handleBackOrder = (product) => {
    let productUpdated = product;

    product.quantity = quantity;
    productUpdated.quantityUpdated = quantity;
    product.productOptions = optionStateArray;

    sessionStorage.setItem("backOrderLocal", JSON.stringify(productUpdated));
    Router.push("/account/stock-checkout");
  };

  const handleChartClick = (e) => {
    e.preventDefault();
    setShowPriceModal(!showPriceModal);
  };

  const Seeallcustomer = () => {
    const yOffset = -50;
    const y =
      myReview.current.getBoundingClientRect().top +
      window.pageYOffset +
      yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const commonRouterpage = () => {
    Router.push("/commonVendorpage");
  };
  return (
    <div className="product-sticky-detail">
      <Head>
        <title>{product.metaTagTitle}</title>
      </Head>

      <CartPopup
        showMiniCart={showMiniCart}
        setShowMiniCart={setShowMiniCart}
        cartData={cartData}
      />
      {availableProductStatus === false ? (
        <>
          {console.log(skuNumber, "23423423423423")}
          <p>
            SKU:
            {skuNumber && skuNumber !== undefined ? skuNumber : product.skuName}
          </p>
        </>
      ) : (
        <>
          <p>SKU:</p>
        </>
      )}

      <h2>{product.name}</h2>

      {product.vendorName && (
        <>
          {product.vendorId !== "" && product.vendorName !== null ? (
            <>
              <p>
                Seller :
                <span>
                  {" "}
                  <Link
                    href={{
                      pathname: "/vendor-detail/productquestion",
                      query: {
                        productId: product.vendorId,
                        vendorpre: product.vendorPrefixId,
                      },
                    }}
                  >
                    <a style={{ color: "blue" }}>{product.vendorName}</a>
                  </Link>
                </span>{" "}
              </p>
            </>
          ) : (
            <p>
              Seller :<span>Admin</span>{" "}
            </p>
          )}
        </>
      )}
      <div className="product-quant-price-container">
        <div className="product-quant-price-subcontainer">
          {availableProductStatus === false ? (
            <p>
              <img
                src="/static/img/tick-green.svg"
                className="product-avail-out"
              />
              {t("products.Available")}
            </p>
          ) : (
            <p style={{ fontSize: "15px" }}>Not Available</p>
          )}
          <div className="product-quant-price-maincontainer">
            <div className="custom-product-price">
              {varproduct.productvarientList &&
              varproduct.productvarientList.length !== 0 ? (
                <>
                  {availableProductStatus === false ? (
                    <>
                      {/* {console.log(Object.keys(varproduct.selectedVariant).length,'2323varproduct')} */}
                      {varproduct.productvarientList.map((produt) => (
                        <>
                          {console.log(
                            varproduct.variantName,
                            "534",
                            produt.varientName
                          )}
                          {varproduct.variantName == produt.varientName ? (
                            <>
                              <h3>
                                {product.hasTirePrice === 1 ? (
                                  <>
                                    {
                                      // product.productTirePrices.map(
                                      //   (tieres, index) =>

                                      opentlet.quantity <= quantity ? (
                                        <>
                                          {currency
                                            ? currency.symbol + " "
                                            : "$ "}
                                          {priceHelpFunc(
                                            JSON.parse(opentlet.price),
                                            product.taxType,
                                            product.taxValue,
                                            ""
                                          )}
                                        </>
                                      ) : (
                                        <>
                                          {currency
                                            ? currency.symbol + " "
                                            : "$ "}

                                          {produt.pricerefer ? (
                                            <>
                                              {produt.pricerefer !== ""
                                                ? formatCurrency(
                                                    priceHelpFunc(
                                                      produt.pricerefer,
                                                      product.taxType,
                                                      product.taxValue,
                                                      availValue
                                                    )
                                                  )
                                                : formatCurrency(
                                                    priceHelpFunc(
                                                      produt.price,
                                                      product.taxType,
                                                      product.taxValue,
                                                      availValue
                                                    )
                                                  )}
                                            </>
                                          ) : (
                                            <>
                                              {formatCurrency(
                                                priceHelpFunc(
                                                  produt.price,
                                                  product.taxType,
                                                  product.taxValue,
                                                  availValue
                                                )
                                              )}
                                            </>
                                          )}
                                        </>
                                      )
                                      // )
                                    }
                                  </>
                                ) : (
                                  <>
                                    {currency ? currency.symbol + " " : "$ "}
                                    {/* sfdsdasd */}
                                    {produt.pricerefer ? (
                                      <>
                                        {produt.pricerefer !== ""
                                          ? formatCurrency(
                                              priceHelpFunc(
                                                produt.pricerefer,
                                                product.taxType,
                                                product.taxValue,
                                                availValue
                                              )
                                            )
                                          : formatCurrency(
                                              priceHelpFunc(
                                                produt.price,
                                                product.taxType,
                                                product.taxValue,
                                                availValue
                                              )
                                            )}
                                      </>
                                    ) : (
                                      <>
                                        {formatCurrency(
                                          priceHelpFunc(
                                            produt.price,
                                            product.taxType,
                                            product.taxValue,
                                            availValue
                                          )
                                        )}
                                      </>
                                    )}
                                  </>
                                )}
                              </h3>
                              {produt.pricerefer && (
                                <>
                                  {produt.pricerefer !== "" && (
                                    <span>
                                      {currency ? currency.symbol + " " : "$ "}{" "}
                                      {priceHelpFunc(
                                        parseInt(produt.price),
                                        product.taxType,
                                        product.taxValue,
                                        ""
                                      )}
                                    </span>
                                  )}
                                </>
                              )}

                              {produt.flag ? (
                                <>
                                  {produt.flag !== "" && (
                                    <p>
                                      {Math.abs(
                                        Math.round(
                                          ((produt.price - produt.pricerefer) *
                                            100) /
                                            produt.price
                                        )
                                      )}
                                      % off
                                    </p>
                                  )}
                                </>
                              ) : (
                                ""
                              )}
                            </>
                          ) : (
                            <></>
                          )}
                        </>
                      ))}
                    </>
                  ) : (
                    // sfsdfsdfsdfsdfsd
                    ""
                  )}
                </>
              ) : (
                <>
                  {console.log(product.price, "4324ffsd")}
                  {product.hasTirePrice === 1 ? (
                    <>
                      {opentlet.quantity <= quantity ? (
                        <>
                          <h3>
                            {currency ? currency.symbol + " " : "$ "}
                            {priceHelpFunc(
                              JSON.parse(opentlet.price),
                              product.taxType,
                              product.taxValue,
                              ""
                            )}
                          </h3>
                        </>
                      ) : (
                        <>
                          <h3>
                            {currency ? currency.symbol + " " : "$ "}
                            {product.pricerefer !== ""
                              ? formatCurrency(
                                  priceHelpFunc(
                                    product.pricerefer,
                                    product.taxType,
                                    product.taxValue,
                                    availValue
                                  )
                                )
                              : formatCurrency(
                                  priceHelpFunc(
                                    product.price,
                                    product.taxType,
                                    product.taxValue,
                                    availValue
                                  )
                                )}
                          </h3>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <h3>
                        {currency ? currency.symbol + " " : "$ "}

                        {product.pricerefer !== ""
                          ? formatCurrency(
                              priceHelpFunc(
                                product.pricerefer,
                                product.taxType,
                                product.taxValue,
                                availValue
                              )
                            )
                          : formatCurrency(
                              priceHelpFunc(
                                product.price,
                                product.taxType,
                                product.taxValue,
                                availValue
                              )
                            )}
                      </h3>
                      {product.pricerefer !== "" && (
                        <span>
                          {currency ? currency.symbol + " " : "$ "}{" "}
                          {priceHelpFunc(
                            product.price,
                            product.taxType,
                            product.taxValue,
                            availValue
                          )}
                        </span>
                      )}
                      {product.flag !== "" && (
                        <p>
                          {Math.abs(
                            Math.round(
                              ((product.price - product.pricerefer) * 100) /
                                product.price
                            )
                          )}
                          % off
                        </p>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
            {availableProductStatus === false ? (
              <>
                <div className="custom-product-quant">
                  <span>{t("account.Quantity")}:</span>
                  <div className="custom-product-box">
                    <button onClick={(e) => handleDecreaseItemQty(e, product)}>
                      -
                    </button>
                    {console.log(quantity, "555555")}

                    <span>{quantity}</span>
                    <button onClick={(e) => handleIncreaseItemQty(e, product)}>
                      +
                    </button>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      {availableProductStatus === false ? (
        <>
        <ProductReviewRatingviews  product={product} starcout={starcoutid} />
          
        </>
      ) : (
        ""
      )}

      {availableProductStatus === false ? (
        <>
          {product.hasTirePrice === 1 &&
            product.productTirePrices.length !== 0 && (
              <>
                <div className="custom-tier-proddet">
                  <a onClick={(e) => handleChartClick(e)}>
                    {t("products.TirePriceChart")}
                  </a>
                </div>
                {showPriceModal && (
                  <table className="custom-tier-price-table product-table-underline">
                    <tr>
                      <th style={{ width: "100px" }}>
                        {t("account.Quantity")}
                      </th>
                      <th>per unit</th>
                      <th>price</th>
                    </tr>
                    {product.productTirePrices.map((price, index) => {
                      return (
                        <>
                          <tr key={index}>
                            <td style={{ width: "100px" }}>{price.quantity}</td>
                            <td>
                              {/* ( */}
                              {/* per unit ={" "} */}
                              {currency ? currency.symbol + " " : "$ "}
                              {price.price}
                              {/* ) */}
                            </td>
                            <td>
                              {currency ? currency.symbol + " " : "$ "}
                              {price.quantity * price.price}
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </table>
                )}
              </>
            )}
        </>
      ) : (
        ""
      )}

    

      {product.pincodeBasedDelivery === 1 && (
        <div className="custom-shipping-input-container">
          <p>{t("products.CheckLocation")}</p>
          <div className="custom-shipping-input-subcontainer">
            <input
              placeholder="Enter a pin-code eg. 600034"
              type="number"
              value={pin}
              onChange={(e) =>
                e.target.value.length < 8 && setPin(e.target.value)
              }
            />
            <button onClick={(e) => pinCodeCheck(product.productId)}>
              Check
            </button>
          </div>
          {checkStatus === "success" && (
            <div className="delivery-truck-container">
              <img src="/static/img/delivery-truck.svg" alt="" />
              Delivery Available
            </div>
          )}
        </div>
      )}
      <>
      <SpurtVarientComponent />
       
      </>
      {availableProductStatus === false ? (
        <>
          {product.pincodeBasedDelivery === 1 && checkStatus === "success" && (
            <div className="">
              {product.hasStock === 1 &&
                product.stockStatus === "outOfStock" && <h2>Out of Stock</h2>}
              {product.stockStatus !== "outOfStock" && (
                <>
                  <button
                    // className="custom-product-addToCart"
                    className={`custom-product-addToCart ${currentColor}`}
                    onClick={(e) =>
                      handleAddItemToCart(
                        e,
                        product.productId,
                        product.price,
                        product
                      )
                    }
                    // disabled={buttonLoader === true ? "disabled" : ""}
                  >
                    <img src="/static/img/cart-icon.svg" />
                    {t("products.AddToCart")}
                  </button>
                  <button
                    className="custom-product-buynow"
                    onClick={(e) =>
                      handleBuyAddItemToCart(
                        e,
                        product.productId,
                        product.price,
                        product
                      )
                    }
                  >
                    <img src="/static/img/power.svg" />
                    {t("products.BuyNow")}
                  </button>
                </>
              )}
              {/* {product.enableBackOrders !== 1 && (
                <button
                  className="custom-product-buynow"
                  onClick={(e) =>
                    handleBuyAddItemToCart(
                      e,
                      product.productId,
                      product.price,
                      product
                    )
                  }
                >
                  <img src="/static/img/power.svg" />
                  {t("products.BuyNow")}
                </button>
              )} */}
              {product.hasStock === 1 &&
                product.stockStatus === "outOfStock" &&
                product.enableBackOrders === 1 && (
                  <button
                    className="custom-product-buynow"
                    onClick={(e) => handleBackOrder(product)}
                  >
                    {t("products.OrderNow")}
                  </button>
                )}
            </div>
          )}

          {product.pincodeBasedDelivery !== 1 && (
            <div className="custom-product-detail-btn">
              {product.stockStatus === "outOfStock" && (
                <h2>{t("products.OutofStock")}</h2>
              )}
              {product.stockStatus !== "outOfStock" && (
                <button
                  // className="custom-product-addToCart"
                  className={`custom-product-addToCart ${currentColor}`}
                  onClick={(e) =>
                    handleAddItemToCart(
                      e,
                      product.productId,
                      product.price,
                      product
                    )
                  }
                  // disabled={buttonLoader === true ? "disabled" : ""}
                >
                  <img src="/static/img/cart-icon.svg" />
                  {t("products.AddToCart")}
                </button>
              )}

              {product.stockStatus === "inStock" ? (
                <button
                  className="custom-product-buynow"
                  onClick={(e) =>
                    handleBuyAddItemToCart(
                      e,
                      product.productId,
                      product.price,
                      product
                    )
                  }
                >
                  <img src="/static/img/power.svg" />
                  {t("products.BuyNow")}
                </button>
              ) : (
                ""
              )}

              {product.enableBackOrders === 1 &&
                product.stockStatus === "outOfStock" && (
                  <button
                    className="custom-product-buynow"
                    onClick={(e) => handleBackOrder(product)}
                  >
                    {t("products.OrderNow")}
                  </button>
                )}
            </div>
          )}
          <SpurtQuotationPop product={product} />
        
        </>
      ) : (
        " "
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return state.setting;
};

export default connect(mapStateToProps)(InformationDefault);
