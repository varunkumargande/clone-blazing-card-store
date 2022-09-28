import React, {useEffect, useState } from 'react';

import Slider from 'react-slick';
import { connect } from 'react-redux';
import Product from '../../elements/products/Product';
import NextArrow from '../../elements/carousel/NextArrow';
import PrevArrow from '../../elements/carousel/PrevArrow';
import { imageUrl } from '../../../api/url';
import { useTranslation } from '../../../i18n';
import { RelatedProductApi } from '../../../api/product/RelatedProductApi';

function SpurtRelatedProduct({slugName,boxed}){
    const [relatedProduct, setRelatedProduct] = useState([]);
    const { t } = useTranslation("common");


    useEffect(()=>{
        RelatedProductApi(slugName,setRelatedProduct)
    },[slugName])
    

 
        const carouselStandard1 = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 50,
        slidesToShow: 5,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    //     const { boxed } = this.props;
      

       
            
    //     const {t} = this.props
  


            
            return (
               <>
               {
                relatedProduct&&relatedProduct.length !== 0?<>
              
                <div
                    className={`ps-section--default ps-related-products ${
                        boxed === true ? 'boxed' : ''
                    }`}>
                    <div className="ps-section__header">
                       
                        <h3>{t('products.RelatedProducts')}</h3>
                    </div>
                    <div className="ps-section__content">
                        <Slider {...carouselStandard1}RelatedProduct infinite={relatedProduct.length < 7 ? false : true}
                                className="ps-carousel" >
                            {relatedProduct&&relatedProduct.map(item => {
                                return (
                                    <Product product={item} image={item&&item.containerName!=="/"? imageUrl+"?path="+item.containerName+"&name="+item.image+"&width=300&height=200": "/static/img/no-image.png"}/>
                                );
                            })} 
                        </Slider>
                    </div>
                   
                </div>
                </>:<>
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

                </>
                 }
                </>
            );
        

    }


export default connect(state => state.collection)(SpurtRelatedProduct);

