import React, { useState } from 'react';
import { connect } from 'react-redux';
import ThumbnailDefault from './modules/thumbnail/ThumbnailDefault';
import DefaultDescription from './modules/description/DefaultDescription';
//import {ConnectPlugin} from '../../connectPlugins'
import QuestionandAnswer from '../../partials/QuestionAndAnswer/QuestionandAnswer';

const ProductDetailFullwidth = (props) => {

        const { singleProduct } = props.singleProduct;
        const productId =props.singleProduct.productId

  return (
    <div>
      {singleProduct !== null && typeof singleProduct !== 'Array'?
        <div className="ps-product--detail ps-product--fullwidth">
          <>
                    
                 <div className="ps-product__header" style={{maxHeight:"575px"}}>
                        
                         <ThumbnailDefault product={props.singleProduct} setvarientdefultid={props.setvarientdefultid} varientdefultid={props.varientdefultid}/>
                         
                   </div>
                    <DefaultDescription ratingInfo={props.ratingInfo} product={props.singleProduct} forwardedRef={props.forwardedRef}/>
                
                   
                    <QuestionandAnswer productId={productId} />
                    </>   
                 
             </div>
               :<p>No Data</p> }
    </div>
  )
}

const mapStateToProps = state => {
    return state.product;
};

export default connect(mapStateToProps)(ProductDetailFullwidth);
