import { useState } from "react";
//import {ConnectPlugin}   from "../../connectPlugins";
import Product from "../../elements/products/Product";
import { imageUrl } from "../../../api/url";
import PartialReview from "../../elements/detail/modules/description/PartialReview";
import { Tabs } from "antd";
import DateRev from "../account/modules/DateReview";
import { useTranslation } from "../../../i18n";
import { Pagination } from "antd";
import { vendorproducreviewApi } from "../../../api";
import VendorRatingReviews from "./VendorRatingReviews";
const { TabPane } = Tabs;

export default function VendorDetailShow({
  vendorInfo,
  vendorProduct,
  vendorLoading,
  ratingInfo,
  count,
  setOffset,
  setvendoreviews,
  vendorId,
}) {
  const { t } = useTranslation("common");

  return vendorLoading === false ? (
    <div className="vendor-complete-wrapper">
      <div className="vendor-detail-content-wrapper">
        <div className="vendor-detail-img-left">
          {vendorInfo &&
          vendorInfo.companyCoverImage !== null &&
          vendorInfo &&
          vendorInfo.companyCoverImagePath ? (
            <>
              <img
                src={
                  imageUrl +
                  "?path=" +
                  vendorInfo.companyCoverImagePath +
                  "&name=" +
                  vendorInfo.companyCoverImage +
                  "&width=500&height=543"
                }
              ></img>
            </>
          ) : (
            <>
              <img src="/static/img/vendor-banner.jpg"></img>
            </>
          )}
        </div>
      </div>
      <div className="card-containers">
        <Tabs type="card">
          <TabPane tab="About" key="1">
            {vendorInfo && Object.keys(vendorInfo).length >= 0 ? (
              <>
                {vendorInfo &&
                vendorInfo.companyLogoPath !== null &&
                vendorInfo &&
                vendorInfo.companyLogo != null &&
                vendorInfo &&
                vendorInfo.companyDescription !== "" ? (
                  <>
                    <div
                      className="vendor-content-left"
                      style={{ display: "flex" }}
                    >
                      <div className="displefelxone">
                        <img
                          src={
                            imageUrl +
                            "?path=" +
                            vendorInfo.companyLogoPath +
                            "&name=" +
                            vendorInfo.companyLogo +
                            "&width=304&height=543"
                          }
                        ></img>
                      </div>
                      <div className="displyonehta">
                        <h1>About {vendorInfo.companyName}</h1>

                        {vendorInfo && vendorInfo.companyDescription && (
                          <p>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: vendorInfo.companyDescription
                                  .replaceAll("&amp;", "&")
                                  .replaceAll("&lt;", "<")
                                  .replaceAll("&gt;", ">")
                                  .replaceAll("&quot;", '"')
                                  .replaceAll("&#39;", "'")
                                  .replaceAll("&sbquo;", "‚")
                                  .replaceAll("&#61;", "=")
                                  .replaceAll("&#45;", "-")
                                  .replaceAll("&hellip;", "…")
                                  .replaceAll("&commat;", "@")
                                  .replaceAll("&copy;", "©")
                                  .replaceAll("&#35;", "#")
                                  .replaceAll("&ldquo;", "“")
                                  .replaceAll("&rsquo;", "’")
                                  .replaceAll("&lsquo;", "‘")
                                  .replaceAll("&trade;", "™")
                                  .replaceAll("&reg;", "®")
                                  .replaceAll("&ndash;", "–")
                                  .replaceAll("&eacute;", "é")
                                  .replaceAll("&euro;", "€")
                                  .replaceAll("&pound;", "£")
                                  .replace(/<[^>]+>/g, ""),
                              }}
                            ></div>
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        textAlign: "center",
                        justifyContent: "center",
                      }}
                    >
                      <h3 style={{ padding: "50px" }}>NO DATA FOUND</h3>
                    </div>
                  </>
                )}
              </>
            ) : (
              <div>NO DATA FOUND</div>
            )}
          </TabPane>
          <TabPane tab="Products" key="2">
            <div className="ps-shopping">
              <div className="ps-shopping__content">
                <div className="ps-shopping-product">
                  <div className="row">
                    {vendorProduct && vendorProduct.length > 0 ? (
                      vendorProduct &&
                      vendorProduct.map((item) => (
                        <div
                          className="col-xl-2 col-lg-4 col-md-4 col-sm-6 col-6 "
                          key={item.id}
                        >
                          <Product
                            product={item}
                            image={
                              item && item.containerName !== "/"
                                ? imageUrl +
                                  "?path=" +
                                  item.containerName +
                                  "&name=" +
                                  item.image +
                                  "&width=200&height=600"
                                : "/static/img/no-image.png"
                            }
                          />
                        </div>
                      ))
                    ) : (
                      <div>NO DATA FOUND</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane tab="Reviews" key="3">
            <VendorRatingReviews vendorId={vendorId} />
            {/* {ConnectPlugin.BlazingVendorRatingReviews&&<ConnectPlugin.BlazingVendorRatingReviews vendorId={vendorId} />} */}
          </TabPane>
        </Tabs>
      </div>
    </div>
  ) : (
    <div className="ps-page--product">
      <div className="ps-container">
        <center>
          <img
            src="/static/img/Loader/loader_blue.gif"
            width="100"
            height="100"
          />
        </center>
      </div>
    </div>
  );
}
