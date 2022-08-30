import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Link from "next/link";
import Slider from "react-slick";

import { useTranslation } from "react-i18next";
import Product from "../../../elements/products/Product";
import NextArrow from "../../../elements/carousel/NextArrow";
import PrevArrow from "../../../elements/carousel/PrevArrow";
import { imageUrl } from "../../../../api/url";
function TopSelling({ collections, collectionSlug, data, coreData }) {
  let viewcurrentColor = useSelector((s) => s.palette.viewcurrentColor);


  const carouselFullwidth = {
    dots: false,
    infinite: false,
    className: "center",
    speed: 50,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    lazyload: true,
    responsive: [
      {
        breakpoint: 1750,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          dots: false,
          arrows: true,
          infinite: false,
        },
      },

      {
        breakpoint: 1366,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
          arrows: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: true,
          infinite: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: true,
          infinite: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
          arrows: true,
          infinite: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          dots: false,
          arrows: true,
          infinite: false,
        },
      },
    ],
  };

  const { t } = useTranslation("common");
 
  return (
    <div className="ps-product-list ps-garden-kitchen">
      <div className="ps-container">
        <div className="ps-section__header">
          <div className="ps-block__left">
            <h3>{coreData.widgetTitle}</h3>
          </div>
        </div>
        <div className="ps-section__content pscontentarrow">
          {data && data.length > 4 ? (
            <>
              <Link
                href="/widgetDetails/[widget]"
                as={`/widgetDetails/${coreData.widgetId}`}
              >
                <a
                  className={viewcurrentColor}
                  style={{
                    display: "flex",
                    justifyContent: "right",
                    right: "150px",
                  }}
                >
                  View All
                </a>
              </Link>
              <Slider
                {...carouselFullwidth}
                className="ps-carousel outside today-slider"
              >
                {data &&
                  data.map((product) => (
                    <div className="item" key={product.productId}>
                      <Product
                        product={product}
                        image={
                          product.image && product.image.containerName !== "/"
                            ? imageUrl +
                              "?path=" +
                              product.containerName +
                              "&name=" +
                              product.image +
                              "&width=400&height=200"
                            : "/static/img/no-image.png"
                        }
                      />
                    </div>
                  ))}
              </Slider>
            </>
          ) : (
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-4 col-xs-12">
              <div className="product-flow-refurbished">
                {data &&
                  data.map((product) => (
                    <div className="col-xl-3 col-lg-3">
                      <Product
                        product={product}
                        image={
                          product.image && product.image.containerName !== "/"
                            ? imageUrl +
                              "?path=" +
                              product.containerName +
                              "&name=" +
                              product.image +
                              "&width=400&height=200"
                            : "/static/img/no-image.png"
                        }
                      />
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default connect((state) => state.collection)(TopSelling);
