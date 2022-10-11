import React from 'react';
//import {ConnectPlugin} from '../../../../connectPlugins';
import Slider from 'react-slick';
import Lightbox from 'react-image-lightbox';
import ThumbnailImage from '../elements/ThumbnailImage';
import { useState } from 'react';
import { useEffect } from 'react';
import { imageUrl } from '../../../../../api/url';
import { useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import {videoUrl } from '../../../../../api/url';

function ThumbnailDefault({product,setvarientdefultid}){
    const varientdefultid = useSelector((s) => s.product.sliderdataimage);
const [galleryCarousel,setGalleryCarousel]=useState(null)
const [variantCarousel,setVariantCarousel]=useState(null)
const [photoIndex,setPhotoIndex]=useState(0)
const [playerVideo, setPlayerVideo] = useState(true)
const [imagesliders,setimagesliders]=useState()
const [isOpen,setIsOpen]=useState(false)
let slider1=""
let slider2=""
let arrarpus=[]


useEffect(()=>{
    setPlayerVideo(true)
    setimagesliders([])
    setimagesliders(varientdefultid)
},[varientdefultid])
       
  
    const handleOpenLightbox = (e, imageIndex) => {
        e.preventDefault();
        setIsOpen(true)
        setPhotoIndex(imageIndex)

        
    }; 

    useEffect(()=> {
        setVariantCarousel(slider2)
        setGalleryCarousel(slider1)
        
    },[slider1,slider2])
  
    
        const gallerySetting = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            nextArrow: <></>,
            prevArrow: <></>,
        };

        const variantSetting = {
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 4,
                        dots: false,
                        arrows: false,
                        vertical: false,
                        infinite: false,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 4,
                        dots: false,
                        arrows: false,
                        vertical: false,
                        infinite: false,
                    },
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 4,
                        dots: false,
                        arrows: false,
                        vertical: false,
                        infinite: false,
                    },
                },
            ],
        };
        // 
        const productImages = [];
        const varientdefultidtt=[]
        // if(varientdefultid.length>0){
               
            
        //     varientdefultidtt.push(varientdefultid[varientdefultid.length - 1])
        //        varientdefultidtt.push(product.productImage[product.productImage.length - 1])

             
        // }
       if(varientdefultid&&varientdefultid.length>0){
       
        varientdefultid&&varientdefultid.map(variant=>{
            productImages.push(imageUrl+"?path="+variant.containerName+"&name="+variant.image+"&width=500&height=500");
        })
       
       }
        

        
      
        // product&&product.productImage&&product.productImage.map(variant => {

         
            
        //         if(varientdefultid.length>0){

                    
        //         }else{
        //             productImages.push(imageUrl+"?path="+variant.containerName+"&name="+variant.image+"&width=500&height=500");

        //         }
               

            
                


        // });

        const tamnailmethods=(variant)=>{

            setimagesliders([])
            

            arrarpus.push(variant)
         
             
             
            if(arrarpus){
                setimagesliders(arrarpus)
            }
            


            setPlayerVideo(true)
        }
       
        
        return (
            <div className="ps-product__thumbnail" data-vertical="true">
                <figure><>
               
                   
                    <div className="ps-wrapper " >
                        {playerVideo===true?<>
                        {/* {imagesliders&&imagesliders&&<> */}
                        
                        {/* </>} */}
                       
                        <Slider
                            {...gallerySetting}
                            // ref={slider => (setGalleryCarousel(slider))}
                            // asNavFor={variantCarousel}
                            className="ps-product__gallery ps-carousel inside">
                            {/* {imagesliders&&imagesliders.map((variant, index) => ( */}
                                <div className="item" >
                                    <a
                                        href="#"
                                        className="product-detail-image-anchor"
                                        onClick={e =>
                                            handleOpenLightbox(e,0)
                                        }>
                                         
                                        {imagesliders&&imagesliders&&imagesliders[0]&&<>

                                            <img src={imageUrl+"?path="+imagesliders[0].containerName+"&name="+imagesliders[0].image+"&width=500&height=500"} alt="martfury-image" style={{height:"390px",width:"100%",objectFit:"contain"}}/>
                                        </>}
                                            
                                          {/* </>} */}
                                           
                                       
                                    </a>
                                </div>
                            {/* ))} */}
                        </Slider></>:
                        <><div className='videorapper'>
                            {product.productVideo.type ===1?<><ReactPlayer width="100%"
      height="100%" url={`${videoUrl }?path=${product.productVideo.path}&name=${product.productVideo.name}`} controls={true} /></>:<>
    
      <iframe width="320" height="240" frameborder="0"  allowfullscreen="allowfullscreen" src={product.productVideo.path}title="description"></iframe>

      </>}
                            </div></>}
                       
                    </div>
              
                    </>
                </figure>
                <>
               
                {/* {(galleryCarousel !==null && galleryCarousel!=="")} */}
                
                <div className='slllld'>
                   <div className='video1'> <>
                   
                   <Slider
                    // asNavFor={galleryCarousel}
                    // ref={slider => (setVariantCarousel(slider))}
                    // swipeToSlide={true}
                    // arrows={false}
                    slidesToShow={productImages.length}
                    vertical={true}
                    focusOnSelect={false}
                    {...variantSetting}
                    className="ps-product__variants"
                    >
                       
                    {varientdefultid&&varientdefultid.map(variant => (
                        <div className="item"  key={variant.productId} onClick={e=>tamnailmethods(variant)} >
                            
                            
                             <ThumbnailImage  url={imageUrl+"?path="+variant.containerName+"&name="+variant.image+"&width=600&height=600"} type={"small"}/>

                        </div>
                        
                    ))} 
             
                </Slider>
                   </>
                   </div> 
                   {product&&product.productVideo&&product.productVideo.type !==null&&product&&product.productVideo&&product.productVideo.path !==null&&<div className='video2'>  <img src="/static/img/vp (1).png" onClick={e=>setPlayerVideo(false)} /></div> }
                   
                </div>
                {/* <a onClick={e=>setPlayerVideo(false)}>chanfeview</a> */}
              
                </>
              
                {isOpen && (
                    
                    <Lightbox
                        mainSrc={productImages[photoIndex]}
                        nextSrc={
                            productImages[
                                (photoIndex + 1) % productImages.length
                            ]
                        }
                        prevSrc={
                            productImages[
                                (photoIndex + productImages.length - 1) %
                                    productImages.length
                            ]
                        }
                        onCloseRequest={() => setIsOpen(false)}
                        onMovePrevRequest={() =>
                            setPhotoIndex((photoIndex + productImages.length - 1) %
                            productImages.length,)
                            // this.setState({
                            //     photoIndex:
                            //         (photoIndex + productImages.length - 1) %
                            //         productImages.length,
                            // })
                        }
                        onMoveNextRequest={() =>
                            setPhotoIndex((photoIndex + 1) % productImages.length)
                            // this.setState({
                            //     photoIndex:
                            //         (photoIndex + 1) % productImages.length,
                            // })
                        }
                    />
                )}
            </div>
        );
    // }
}

export default ThumbnailDefault;