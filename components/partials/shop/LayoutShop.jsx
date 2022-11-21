import React, { Component, useEffect, useRef } from "react";

import { connect, useSelector, useDispatch } from "react-redux";
import Product from "../../elements/products/Product";
import ProductWide from "../../elements/products/ProductWide";
import { Pagination, Collapse } from "antd";
import "antd/dist/antd.css";
import { useTranslation } from "../../../i18n";
import {
  getOrderBy,
} from "../../../store/product/action";
import { useState } from "react";
import { imageUrl } from "../../../api/url";
import Router, { useRouter } from "next/router";
import { Tabs } from "antd";
import { AppstoreOutlined, MenuOutlined } from "@ant-design/icons";

// import { GetattributeApi } from "../../../api/home/getattributeApi";
import { productListApi } from "../../../api";

const { TabPane } = Tabs;

const { Panel } = Collapse;
function LayoutShop({
  data,
  count,
  setOffset,
  setInitialLoad,
  loader,
  setLimit,
  limit,
  categoryInitial,
  defaultCallValueInitial,
  priceMin,
  maxPrice,
  orderBy,
  setProductData,
  offset,
  setLoader,
  priceToInitial,
  setCrumbArray,
  setSelectedCategoryId,
  priceFromInitial,
  manuId,
  crumbArray,
  currentvaluesof,
  reloadKey,
}) {
  const dispatch = useDispatch();

  const router = useRouter();
  let viewcurrentColor = useSelector((s) => s.palette.viewcurrentColor);
  let currentColor = useSelector((s) => s.palette.currentColor);
  const [listView, setListView] = useState(true);
  const [currentPage, setCurrentPage] = useState();
  const [metrailOpen, setmetrailOpen] = useState(false);
  const [getAttribute, setgetAttribute] = useState([]);
  const [checkeds, setchecked] = useState(false);
  const [attmanuIdArray, setAttManuIdArray] = useState([]);
  const [attmanuIdArr, setattmanuIdArr] = useState([]);
  const [triger, setTrigger] = useState(0);
  const [description, setdescription] = useState([]);

  const [state3, setState3] = useState([]);
  const [state4, setState4] = useState("");
  const [triggerss, settriggerss] = useState("");

  useEffect(() => {
    setAttManuIdArray([]);
  }, []);

  // useEffect(() => {

  //   if (getAttribute) {
  //     const getAtt =
  //       getAttribute &&
  //       getAttribute.map((setction) => {
  //         return setction.sectionType === 2
  //           ? setction.sectionItem.map((value, index) => {
  //               return { ...value, checked: false };
  //             })
  //           : "";
  //       });

  //     setdescription(getAtt);
  //   }

  // }, [getAttribute]);

  // useEffect(() => {
  //   if (categoryInitial) {
  //     GetattributeApi(categoryInitial, setgetAttribute);
  //   }
  // }, [categoryInitial]);

  const products = data;
  const total = "";
  const viewMode = listView;
  const myRef = useRef(null);
  const executeScroll = () => scrollToRef(myRef);

  let pageSizeCustom = Math.ceil(count / 18);
  const { t } = useTranslation("common");

  const handleChangeViewMode = (event) => {
    event.preventDefault();
    setListView(!listView);
  };

  useEffect(() => {
    setCurrentPage(offset / limit + 1);
  }, [triger, offset]);

  const handlePagination = (value) => {
    setOffset(Math.ceil((value - 1) * 18));
    setInitialLoad(true);
    executeScroll();

    setCurrentPage(value);
    if (categoryInitial !== "") {
      Router.push(
        {
          pathname: `/shop/[sid]`,
          query: {
            attribute: "",
            priceTo: maxPrice,
            brand: "",
            priceFrom: priceMin,
            variantValue: "",
            defaultCallValue: orderBy,

            offset: Math.ceil((value - 1) * 18),
            index: 0,
            categorySlug: categoryInitial,
          },
        },
        {
          pathname: `/shop/${categoryInitial}`,
          query: {
            attribute: "",
            priceTo: maxPrice,
            priceFrom: priceMin,
            brand: "",
            variantValue: "",
            defaultCallValue: orderBy,
            offset: Math.ceil((value - 1) * 18),

            index: 0,
            categorySlug: categoryInitial,
          },
        }
      );
    } else {
      Router.push(
        {
          pathname: `/shop/[sid]`,
          query: {
            attribute: "",
            priceTo: maxPrice,
            brand: "",
            priceFrom: priceMin,
            variantValue: "",
            defaultCallValue: orderBy,
            keyword: reloadKey,
            offset: Math.ceil((value - 1) * 18),
            index: 0,
            // categorySlug: categoryInitial,
          },
        },
        {
          pathname: `/shop/${reloadKey}`,
          query: {
            attribute: "",
            priceTo: maxPrice,
            priceFrom: priceMin,
            brand: "",
            variantValue: "",
            defaultCallValue: orderBy,
            offset: Math.ceil((value - 1) * 18),
            keyword: reloadKey,
            index: 0,
            // categorySlug: categoryInitial,
          },
        }
      );
    }

    window.scroll({ top: 0 });
  };

  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

  const sortFunction = (value) => {
    setInitialLoad(true);
    dispatch(getOrderBy(value));
    if (categoryInitial !== "") {
      router.push({
        pathname: `/shop/[sid]`,
        query: {
          sid: categoryInitial,
          attribute: "",
          priceTo: maxPrice,
          brand: "",
          priceFrom: priceMin,
          variantValue: "",
          defaultCallValue: value,

          offset: offset,
          index: 0,
          categorySlug: categoryInitial,
        },
      });
    } else {
      Router.push(
        {
          pathname: `/shop/[sid]`,
          query: {
            attribute: "",
            priceTo: maxPrice,
            brand: "",
            priceFrom: priceMin,
            variantValue: "",
            defaultCallValue: value,
            keyword: reloadKey,

            offset: offset,
            index: 0,
            // categorySlug: reloadKey,
          },
        },
        {
          pathname: `/shop/${reloadKey}`,
          query: {
            attribute: "",
            priceTo: maxPrice,
            priceFrom: priceMin,
            brand: "",
            variantValue: "",
            defaultCallValue: value,
            keyword: reloadKey,

            offset: offset,
            index: 0,
            // categorySlug: reloadKey,
          },
        }
      );
    }
  };

  const changesetchecked = (e, itemSlug) => {
    setchecked(true);

    const { name, checked } = e.target;
    setLoader(true);

    const temp =
      description &&
      description.map((value, index) => {
        return (
          value &&
          value.map((val, index) => {
            if (val.itemName === name) {
              return Object.assign({}, val, {
                checked,
              });
            }
            return val;
          })
        );
      });
    setdescription(temp);

    let manuSubArrays = attmanuIdArray;

    if (manuSubArrays.indexOf(e.target.value) !== -1) {
      manuSubArrays = manuSubArrays.filter(
        (manufactureId) => manufactureId != e.target.value
      );
    } else {
      manuSubArrays.push(e.target.value);
    }

    setAttManuIdArray(manuSubArrays);

    let manuSubArr = attmanuIdArr;
    if (manuSubArr.indexOf(itemSlug) !== -1) {
      manuSubArr = manuSubArr.filter((manufactId) => manufactId != itemSlug);
    } else {
      manuSubArr.push(itemSlug);
    }
    setattmanuIdArr(manuSubArr);

    productListApi(
      dispatch,
      setProductData,
      offset,
      setLoader,
      orderBy,
      priceFromInitial,
      "",
      categoryInitial,
      manuId,
      limit,
      priceToInitial,
      setSelectedCategoryId,
      setCrumbArray,
      manuSubArr
    );

    if (manuSubArr.length == 0) {
      setTrigger(triger + 1);
    }
  };
  const REmoveFUnc = (attit, index) => {
    setLoader(true);
    const temp =
      description &&
      description.map((value, index) => {
        return (
          value &&
          value.map((val, index) => {
            if (val.itemSlug === attit) {
              return Object.assign({}, val, {
                checked: false,
              });
            }
            return val;
          })
        );
      });
    setdescription(temp);
    attmanuIdArray.splice(index, 1);

    let manuSubArr = attmanuIdArr;

    manuSubArr.splice(index, 1);

    productListApi(
      dispatch,
      setProductData,
      offset,
      setLoader,
      orderBy,
      priceFromInitial,
      "",
      categoryInitial,
      manuId,
      limit,
      priceToInitial,
      setSelectedCategoryId,
      setCrumbArray,
      manuSubArr
    );

    if (manuSubArr.length == 0) {
      setTrigger(triger + 1);
    }
  };

  function itemRender(current, type, originalElement) {
    if (type === "prev") {
      return <a className="pagination-next-change-prev">Prev</a>;
    }
    if (type === "next") {
      return <a className="pagination-next-change">Next</a>;
    }
    return originalElement;
  }

  return (
    <div className="ps-shopping" ref={myRef} style={{ padding: "0 1rem" }}>
      <div className="ps-shopping__header">
        <div className="flex-tab-contain">
          <p>Sort By</p>
          <Tabs
            className={` .ant-tabs-tab-btn:focus, .ant-tabs-tab:hover, .ant-tabs-tab-btn:active, .ant-tabs-ink-bar  ${viewcurrentColor}`}
            defaultActiveKey={defaultCallValueInitial}
            onTabClick={sortFunction}
          >
            <TabPane tab="" key=""></TabPane>
            <TabPane tab="Price Low To High" key="ASC">
              {" "}
            </TabPane>
            <TabPane tab="Price High To Low" key="DESC">
              {" "}
            </TabPane>
          </Tabs>
        </div>
        <div className="ps-shopping__view">
          <ul className="ps-tab-list">
            <li>
              <a href="#" onClick={handleChangeViewMode}>
                {/* <img
                  src={
                    viewMode
                      ? "/static/img/list-view.svg"
                      : "/static/img/list-color.svg"
                  }
                /> */}
                {viewMode ? (
                  <MenuOutlined style={{ fontSize: "20px" }} />
                ) : (
                  <MenuOutlined
                    style={{ fontSize: "20px" }}
                    className={viewcurrentColor}
                  />
                )}
              </a>
            </li>
            <li>
              <a href="#" onClick={handleChangeViewMode}>
                {/* <img
                  src={
                    !viewMode
                      ? "/static/img/grid-view.svg"
                      : "/static/img/grid-blue.svg"
                  }
                /> */}

                {!viewMode ? (
                  <AppstoreOutlined style={{ fontSize: "20px" }} />
                ) : (
                  <AppstoreOutlined
                    style={{ fontSize: "20px" }}
                    className={viewcurrentColor}
                  />
                )}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* <div className="filters-drop-select">
        {getAttribute &&
          getAttribute.map((setction) => {
            return (
              <div>
                {setction && setction.sectionType == 2 ? (
                  <div>
                  
                      <Collapse
                      bordered={false}
                      defaultActiveKey={["1"]}
                     
                      showArrow={false} 
                    >
                       <Panel
                        header={
                         <a >{setction.sectionName} <img src="/static/img/arrow-down.svg" className="" /></a> 
                        
                        }
                        key=""
                        className="site-collapse-left-category-opnens-data"
                        showArrow={false} 
                      >
                      
                      <div className="filters-check flex">
                        {description &&
                          description.map((value, index) => {
                            return (
                              <>
                                {value &&
                                  value.map((attitems) => {
                                    return (
                                      <div>
                                        
                                         {setction.id==attitems.filterSectionId?<>
                                        
                                          <label className="ant-checkbox-wrapper">
                                          <span className="ant-checkbox">
                                            <Checkbox
                                              name={attitems.itemName}
                                              checked={attitems.checked}
                                              id={attitems.id}
                                              onClick={(e) =>
                                                changesetchecked(
                                                  e,
                                                  setction.sectionName +
                                                    "~" +
                                                    attitems.itemName
                                                )
                                              }
                                              value={attitems.itemSlug}
                                            >
                                              {attitems.itemName}
                                            </Checkbox>
                                          </span>
                                        </label>
                                         </>:""} 
                                        
                                      </div>
                                    );
                                  })}
                              </>
                            );
                          })}
                      </div>
                   
                       
                      </Panel>
                    </Collapse>
                    
                  </div>
                ) : (
                  ""
                )}
              </div>
            );
          })}
      </div>

      {checkeds ? (
        <div className="filters-result flex">
          {attmanuIdArray &&
            attmanuIdArray.map((attit, index) => (
              <span>
                {attit}
                <a
                  onClick={(e) =>
                    REmoveFUnc(attit, index)
                  }
                >
                  x
                </a>{" "}
              </span>
            ))}
        </div>
      ) : (
        ""
      )} */}

      {loader === false ? (
        <div className="ps-shopping__content">
          {products.length !== 0 ? (
            <div>
              {viewMode === true ? (
                <div className="ps-shopping-product">
                  <div className="row">
                    {products && products.length > 0
                      ? products &&
                        products.map((item) => (
                          <div
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 col-xs-12"
                            key={item.id}
                          >
                            <Product
                              crumbArray={crumbArray}
                              product={item}
                              image={
                                item.image && item.image.containerName !== "/"
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
                      : ""}
                  </div>
                </div>
              ) : (
                <div className="ps-shopping-product">
                  {products && products.length > 0
                    ? products &&
                      products.map((item) => (
                        <ProductWide
                          crumbArray={crumbArray}
                          product={item}
                          key={item.productId}
                          image={
                            item.image && item.image.containerName !== "/"
                              ? imageUrl +
                                "?path=" +
                                item.containerName +
                                "&name=" +
                                item.image +
                                "&width=200&height=600"
                              : "/static/img/no-image.png"
                          }
                        />
                      ))
                    : ""}
                </div>
              )}
              {/* className={`shop-product-pagination ${currentColor}` */}
              {pageSizeCustom > 1 && (
                <div className="shop-product-pagination">
                  <p>
                    Page {currentPage} of {pageSizeCustom}
                  </p>

                  <Pagination
                    total={count}
                    pageSize={18}
                    current={currentPage}
                    defaultCurrent={1}
                    itemRender={itemRender}
                    onChange={handlePagination}
                  />
                </div>
              )}
              {crumbArray &&
                crumbArray[crumbArray.length - 1].categoryDescription !=
                  null && (
                  <>
                    <Collapse
                      bordered={false}
                      defaultActiveKey={["1"]}
                      expandIconPosition="right"
                    >
                      <Panel
                        header={
                          <h4>
                            More About
                            {crumbArray[crumbArray.length - 1].categoryName}
                          </h4>
                        }
                        key=""
                        className="site-collapse-left-category-opnens"
                      >
                        <div
                          dangerouslySetInnerHTML={{
                            __html: crumbArray[
                              crumbArray.length - 1
                            ].categoryDescription
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
                              .replaceAll("&pound;", "£"),
                          }}
                        ></div>
                      </Panel>
                    </Collapse>
                  </>
                )}
            </div>
          ) : (
            <center>
              <p>No Results found</p>
            </center>
          )}
        </div>
      ) : (
        <center>
          <img
            src="/static/img/Loader/loader_blue.gif"
            width="100"
            height="100"
          />
        </center>
      )}
    </div>
  );
}

export default connect((state) => state.product)(LayoutShop);
