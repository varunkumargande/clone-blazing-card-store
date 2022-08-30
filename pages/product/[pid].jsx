import React, { useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import Router, { useRouter } from "next/router";
import ProductDetailFullwidth from "../../components/elements/detail/ProductDetailFullwidth";
import NavigationList from "../../components/shared/navigation/NavigationList";
import HeaderMobileProduct from "../../components/shared/header-mobile/HeaderMobileProduct";
import {
  getProductsById,
  getProductByLoading,
  getvarientproducthidefun,
  getsliderimageclicks,
  getQuantymin,
} from "../../store/product/action";
import { getProductDetApi } from "../../api";
// import { relatedProductListApi } from "../../api";
import { productRatingApi } from "../../api";
import { useState } from "react";


// import { questionsApi } from '../../api/product/question';
import ThemeChanger from "../../components/elements/color/themeControl";
import useNetwork from "../../components/reusable/NetworkCheck";
import InformationDefault from "../../components/elements/detail/modules/information/InformationDefault";
import FooterFullwidth from "../../components/shared/footers/FooterFullwidth";
import HeaderDefault from "../../components/shared/headers/HeaderDefault";
import Link from "next/link";
import { apiUrl } from "../../api/url";
import { useTranslation } from "../../i18n";
import SpurtRelatedProduct from '../../components/partials/RelatedProduct/RelatedProduct'

const ProductDefaultPage = ({ query }) => {
  const [ratingInfo, setRatingInfo] = useState();
  const [banner, setBanner] = useState();
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [priceChartInfo, setPriceChartInfo] = useState([]);
  const [questionInfo, setQuestionInfo] = useState([]);
  const [breadCategory, setBreadCategory] = useState([]);
  const [varientdefultid, setvarientdefultid] = useState([]);
  const [starcoutid, setstarcoutid] = useState("");
  const [breadCrumbarray, setbreadCrumbarray] = useState([]);

  // const [relateClick,setRelateClick]=useState(0)
  const scrollToRef = (ref) => {
    const yOffset = -50;
    window.scrollTo(0, ref.current.offsetTop);
  };
  const authSelect = useSelector((s) => s.auth);
  const myRef = useRef(null);
  const scrollTo = () => scrollToRef(myRef);

  const dispatch = useDispatch();
  let productDetail = useSelector((s) => s.product);
  let productLoadInitiate = useSelector((s) => s.product.productLoading);

  const { t } = useTranslation("common");
  const network = useNetwork();
  let serveUdweu = apiUrl;

  useEffect(() => {
    dispatch(getsliderimageclicks([]))
    
    if (network === false) {
      Router.push("/network-error");
    }
  }, []);

  const router = useRouter();
  const pid = router.query.pid;

  useEffect(() => {
    dispatch(getProductByLoading(true));
    dispatch(getvarientproducthidefun(false))
    // const { query } = this.props;
    if (pid === undefined) {
      Router.push("/page/page-404");
    }

    if (pid) {
      const collectionsParams = [
        "customer_bought",
        "shop-recommend-items",
        "widget_same_brand",
      ];

      getProductDetApi(
        pid,
        pid.categorySlug,
        dispatch,
        setPriceChartInfo,
        setQuestionInfo,
        setBreadCategory,
        setstarcoutid
      );

      dispatch(getProductsById(pid));
      // dispatch(getCollections(collectionsParams));
      // relatedProductListApi(pid, setRelatedProduct);
      productRatingApi(pid, setRatingInfo, dispatch);
      // homeBannerApi(setBanner);
    }
   
    Router.events.on("routeChangeStart", (url) => {
      const nextPid = url.split("/").pop();
      if (nextPid !== "" && isNaN(parseInt(nextPid)) === false) {
        dispatch(getProductByLoading(true));
        dispatch(getvarientproducthidefun(false))
        getProductDetApi(
          nextPid,
          dispatch,
          setPriceChartInfo,
          setQuestionInfo,
          setBreadCategory,
          setstarcoutid
        );
        dispatch(getProductsById(nextPid));

        // relatedProductListApi(nextPid, setRelatedProduct);
        productRatingApi(nextPid, setRatingInfo, dispatch);
        // homeBannerApi(setBanner);
      }
    });
  }, [pid]);

  // render() {
  const singleProduct = useSelector((s) => s.product.singleProduct);

  const breadCrumb = [
    {
      text: breadCategory && breadCategory.length !== 0 && breadCrumbarray,
      href: {
        pathname: `/shop/[sid]`,
        query: {
          attribute: "",
          priceTo: 30000,
          brand: "",
          variantValue: "",
          defaultCallValue: "ASC",
          offset: 0,
          index: 0,
          categorySlug:
            breadCategory &&
            breadCategory.length !== 0 &&
            breadCategory[0].categorySlug,
          categoryId:
            breadCategory &&
            breadCategory.length !== 0 &&
            breadCategory[0].categoryId,
        },
      },

      as: {
        pathname: `/shop/${
          breadCategory &&
          breadCategory.length !== 0 &&
          breadCategory[0].categorySlug
        }`,
        query: {
          attribute: "",
          priceTo: 30000,
          brand: "",
          variantValue: "",
          defaultCallValue: "ASC",
          offset: 0,
          index: 0,
          categorySlug:
            breadCategory &&
            breadCategory.length !== 0 &&
            breadCategory[0].categorySlug,
          categoryId:
            breadCategory &&
            breadCategory.length !== 0 &&
            breadCategory[0].categoryId,
        },
      },
    },
  ];

  function valuePass() {
    let mainArray = [];
    let local = breadCategory;
    let IterObj = {};
    IterObj.categoryName = singleProduct && singleProduct.name;
    local.push(IterObj);
    setbreadCrumbarray(local);
  }
  useEffect(() => {
    if (breadCategory.length > 0) {
      valuePass();
    }
  }, [breadCategory]);

  useEffect(() => {
   
    if (showModal) {
      document.body.classList.add("scroll-block-home");
    } else {
      document.body.classList.remove("scroll-block-home");
    }
  }, [showModal]);

  return (
    <div className="layout--product">
      <HeaderDefault />
      <HeaderMobileProduct />
      <NavigationList />
      <ThemeChanger />
      {/* <QuotationPop
        showModal={showModal}
        setShowModal={setShowModal}
        
      /> */}
      <div style={{ backgroundColor: "#f1f3f6", padding: "16px" }}>
        <div
          style={{
            backgroundColor: "#fff",
            paddingLeft: "10px",
            marginBottom: "16px",
          }}
        >
          <div className="ps-breadcrumb">
            {breadCrumb[0].text === false ? (
              <ul className="breadcrumb">
                <li>{singleProduct.name}</li>
              </ul>
            ) : (
              <>
                {breadCrumb &&
                  breadCrumb.map((value, index) => (
                    <div className="fullwidth">
                      <Link href={value.href} as={value.as}>
                        <ul className="breadcrumb">
                          {value.text &&
                            value.text?.map((val, index) => (
                              <React.Fragment>
                                <li key={index}>
                                  <a>{val.categoryName}</a>
                                </li>
                              </React.Fragment>
                            ))}
                        </ul>
                      </Link>
                    </div>
                  ))}
              </>
            )}
          </div>
        </div>
        {productDetail.productLoading === false ? (
          <div className="ps-page--product">
            <div className="ps-container">
              <div className="ps-page__container">
                <div className="ps-page__left">
                  <ProductDetailFullwidth
                    ratingInfo={ratingInfo}
                    setShowModal={setShowModal}
                    setShowPriceModal={setShowPriceModal}
                    questionInfo={questionInfo}
                    setvarientdefultid={setvarientdefultid}
                    varientdefultid={varientdefultid}
                    forwardedRef={myRef}
                  />
                </div>

                <div className="ps-page__right">
                  <InformationDefault
                    showModal={showModal}
                    product={singleProduct}
                    setShowModal={setShowModal}
                    setShowPriceModal={setShowPriceModal}
                    priceChartInfo={priceChartInfo}
                    showPriceModal={showPriceModal}
                    isLoggedIn={authSelect.isLoggedIn}
                    setvarientdefultid={setvarientdefultid}
                    varientdefultid={varientdefultid}
                    scrollTo={scrollTo}
                    starcoutid={starcoutid}
                    Productslug={pid}
                    productdata={productDetail && productDetail.singleProduct}
                  />
                </div>
              </div>
              {/* {relatedProduct && relatedProduct.length === 0 ? (
                <div>
                  <div className="ps-section__header">
                    <h3>{t("products.RelatedProducts")}</h3>
                  </div>
                  <div className="ps-section__content">
                    <p style={{ padding: "10em" }}>
                      {t("products.NoRelatedProductFound")}
                    </p>
                  </div>
                </div>
              ) : ( */}
              {/* <SpurtRelatedProduct /> */}
              <SpurtRelatedProduct slugName={pid}/>
               
              
            </div>
          </div>
        ) : (
          <div className="ps-page--product">
            <div className="ps-container">
              <div style={{ paddingTop: "100px", paddingBottom: "200px" }}>
                <center>
                  <img
                    src="/static/img/spurt-original-loader.gif"
                    style={{ height: "100px", width: "100px" }}
                  />
                </center>
              </div>
            </div>
          </div>
        )}
      </div>

      <FooterFullwidth />
    </div>
  );
  // }
};

export default ProductDefaultPage;
