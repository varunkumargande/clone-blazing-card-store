import React, { useState } from "react";
import CardCarousel from "../carousel/CardCarousel";
import AccordionMenu from "../Category/AccordionMenu";

function Card() {
  return (
    <>
      <div className="contain1">
        <div className="filter">
          <span>Categories </span>
          <div className="line"></div>

          <div className="cat-1"></div>
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
    </>
  );
}

export default Card;
