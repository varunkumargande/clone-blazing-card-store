import React, { Component } from "react";

import Slider from "react-slick";
import NextArrow from "../../../elements/carousel/NextArrow";
import PrevArrow from "../../../elements/carousel/PrevArrow";
import Link from "next/link";
import { imageUrl } from "../../../../api/url";

function HomeBanner(data) {
  const carouselSetting = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="ps-home-banner ps-home-banner--1">
      <div className="ps-container">
        <div className="ps-section__left">
          <Slider {...carouselSetting} className="ps-carousel">
            {data.data.map((product) => (
              <div className="ps-banner" key={product.bannerId}>
                

                <a >
                  <a target="_blank">
                    <div className="home-banner-custom-img-contain">
                      <img
                        src={
                          imageUrl +
                          "?path=" +
                          product.imagePath +
                          "&name=" +
                          product.image +
                          "&width=1680&height=280"
                        }
                        // "/static/img/slider/home-1/slide-1.jpg"
                        alt="martfury"
                        // height="400px"
                        // width= "802px"
                        // style={{height:"400px",width:"802px"}}
                      ></img>
                    </div>
                  </a>
                </a>
              </div>
            ))}
          </Slider>
        </div>
        {/* <div className="ps-section__right">
                        <Link href={{ pathname: '/shop', query: { name: 'leangchhean' }}}>
                            <a className="ps-collection">
                                <img
                                    src="/static/img/slider/home-1/promotion-1.jpg"
                                    alt="martfury"
                                />
                            </a>
                        </Link>
                        <Link href="/shop">
                            <a className="ps-collection">
                                <img
                                    src="/static/img/slider/home-1/promotion-2.jpg"
                                    alt="martfury"
                                />
                            </a>
                        </Link>
                    </div> */}
      </div>
    </div>
  );
}

export default HomeBanner;
