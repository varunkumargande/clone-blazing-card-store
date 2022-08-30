import React from 'react';
//import {ConnectPlugin} from '../../../../connectPlugins';
import { useEffect , useRef} from 'react';
import { useState } from 'react';
import DateRev from '../../../../partials/account/modules/DateReview';
import { imageUrl } from '../../../../../api/url';
import { useTranslation } from '../../../../../i18n'
function PartialReview({ ratingInfo}) {
    
const { t } = useTranslation('common');

    return (
        <>
        { ratingInfo && ratingInfo.length !== 0 ?
             <div className="row">
                 
                 
                 <div className=" "  >
                     <form className="ps-form--review reviewsides" action="/" method="get">
                        
                         {ratingInfo && ratingInfo.map((customer, index) => {
                             return (
 
                                 <div key={index} className='review-list-item-content flex'>
                                    
                                     <div className='rlic-img'>
                                         {customer.avatar !==null?<>
                                             <img src={imageUrl + "?path=" + customer.avatarPath + "&name=" + customer.avatar + "&width=1900&height=1000"} />
                                         </>:<>
                                         {
                                             <h1 className='profileImage'>
                                                 {customer.firstName.charAt(0)}
                                             </h1>
                                         }
                                                                         </>
                                         }
                                         
                                     </div>
                                     <div className='rlic-content'>
                                         <h4>{customer.firstName}</h4>
                                         <div className="custom-product-rate-rev-subcontainer">
                                             <p>{customer.rating}</p>
                                             <i className="fa fa-star"></i>
                                         </div>
                                        
                                         {customer.review !== null && <div>
                                             <p className='rlic-msg'>{customer.review}</p>
 
                                             <h5 ><DateRev dateCarry={customer && customer.createdDate}  /></h5>
                                    
                            </div>}
                                 </div>
                     </div>
                     )})}
              
             </form>
             </div >
         </div >
         : <div className=" "><p>{t('products.NoReviewFound')}</p></div>
                                         }</>
 )
}

export default PartialReview;