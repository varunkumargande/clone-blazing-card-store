import React from 'react'
import CategoryCard from '../../components/elements/carousel/CategoryCard'
import AccordionMenu from '../../components/elements/Category/AccordionMenu'
import HeaderHome from '../../components/shared/headers/HeaderHome'
import HeaderMobile from '../../components/shared/headers/HeaderMobile'

function category() {
  return (
    <>
        <HeaderHome />
        <HeaderMobile />
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
            <CategoryCard />
          </div>
        </div>
      </div>
        
    </>
  )
}

export default category