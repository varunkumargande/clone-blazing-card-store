import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
//import {ConnectPlugin} from '../../connectPlugins';
import {
  addItemToWishlist,
  wishListLoading,
} from "../../../store/wishlist/action";
import Link from "next/link";
import { useEffect } from "react";
import { wishListApi } from "../../../api";
import { delWishApi } from "../../../api";
import { imageUrl } from "../../../api/url";
import Router from "next/router";
import { priceHelpFunc } from "../../helper/priceHelper";
import Head from "next/head";
import { useTranslation } from "../../../i18n";
import CompareRatingReviews from "../../elements/detail/modules/description/CompareRatingReview";


function Wishlist(props) {
  const [wishlistData, setWishListApi] = useState([]);
  const [delstatus, setDelStatus] = useState(0);
  const [initialLoad, setInitialLoad] = useState(true);
  const { t } = useTranslation("common");
  const dispatch = useDispatch();


  const wishApiCall = () => {
    dispatch(wishListLoading(true));
    wishListApi(setWishListApi, dispatch, setInitialLoad);
  };

  useEffect(() => {
    setDelStatus(0);
    wishApiCall();
  }, [delstatus]);



  const handleRemoveWishListItem = (e, productId) => {
    e.preventDefault();
    delWishApi(productId, setDelStatus);
    dispatch(addItemToWishlist(1));
  };

  const handleCartAddRedirect = (e, productSlug) => {
    Router.push("/product/[pid]", `/product/${productSlug}`);
  };

  return (
    <div className="compare-container-main">
      <Head>
        <title>Wishlist</title>
      </Head>

    
      {initialLoad ? (
        <div className="ps-page--product">
        <div className="ps-container">
            <div style={{ paddingTop: "100px", paddingBottom: "200px" }}>
                <center><img src="/static/img/spurt-original-loader.gif" style={{ height: "100px", width: "100px" }} /></center>
            </div>
        </div>

    </div>
      ) : (
        <>
          {wishlistData && wishlistData.length === 0 ? (
            <div className="wishlist-subcontainer-custom">
              <div className="wishList-load-contain">
                <div className="wishList-load-subcontainer">
                  <img src="/static/img/wishlist-empty-img.svg" />
                  <h3>{t("Wishlist.EmptyWishlist")}</h3>
                  <p>{t("Wishlist.item")}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="wishlist-subcontainer-custom">
              {wishlistData &&
                wishlistData.map((product) => (
                  <div className="wish-contains-fdsf">
                    <div className="wish-card-conatainer">
                      <img
                        src={
                          imageUrl +
                          "?path=" +
                          product.containerName +
                          "&name=" +
                          product.image +
                          "&width=500&height=500"
                        }
                      />
                    </div>
                    <div className="wish-card-main-details">
                      <div className="wish-card-title">
                        <h3>
                          <div>
                            <Link
                              href="/product/[pid]"
                              as={`/product/${product.productSlug}`}
                            >
                              <a>{product.name}</a>
                            </Link>
                          </div>
                        </h3>
                        <CompareRatingReviews product={product}  />
                      
                       
                        <h2>
                          <div>
                            ${" "}
                            {product.pricerefer !== ""
                              ? priceHelpFunc(
                                  JSON.parse(product.pricerefer),
                                  JSON.parse(product.taxType),
                                  product.taxValue,
                                  ""
                                )
                              : priceHelpFunc(
                                  JSON.parse(product.price),
                                  JSON.parse(product.taxType),
                                  product.taxValue,
                                  ""
                                )}{" "}
                          </div>
                        </h2>
                      </div>
                      <div className="wish-card-button">
                        <button
                          onClick={(e) =>
                            handleCartAddRedirect(e, product.productSlug)
                          }
                        >
                          <img
                            src="/static/img/cart-blue.svg"
                            style={{ marginRight: "10px" }}
                          />
                          {t("Wishlist.Addtocart")}
                        </button>
                        <button
                          onClick={(e) =>
                            handleRemoveWishListItem(e, product.productId)
                          }
                        >
                          <img
                            src="/static/img/trash.svg"
                            style={{ marginRight: "10px" }}
                          />
                          {t("Wishlist.Clear")}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
const mapStateToProps = (state) => {
  return state.wishlist;
};
export default connect(mapStateToProps)(Wishlist);
