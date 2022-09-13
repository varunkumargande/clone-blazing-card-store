import React, { useState } from "react";
import CardCarousel from "../carousel/CardCarousel";
import AccordionMenu from "../category/AccordionMenu";
import Filter from "./Filter";
import StreamCard from "./StreamCard";

function Card() {
  return (
    <>
      <div>
        <div className="contain1">
          <div className="filter">
            <span>category </span>
            <div className="line"></div>

            <div className="cat-1"></div>
            {/* <Filter /> */}
            <AccordionMenu />
          </div>
          <div className="card-container">
            <div className="cardItem-1">
              <div className="btn-group">
                <div>
                  <a href="#">Live shows</a> <a>scheduled</a>
                </div>
                <a href="#">Auction</a>
              </div>
              <CardCarousel />
            </div>
            <div className="cardItem-1">
              <div className="btn-group">
                <div>
                  <a href="#">Pokemon</a>
                </div>
              </div>
              <CardCarousel />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
