import React from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import ThumbnailQuickView from './modules/thumbnail/ThumbnailQuickView';
import InformationQuickView from './modules/information/InformationQuickView';

const ProductDetailQuickView = ({ product,image,wishListStatus,crumbArray,compareCheckFunction,handleAddItemToCompare }) => (
    <div className="ps-product--detail ps-product--quickview">
        <div className="ps-product__header">
            
            <ThumbnailQuickView product={product} image={image} wishListStatus={wishListStatus}/>
            <InformationQuickView product={product} crumbArray={crumbArray} compareCheckFunction={compareCheckFunction} handleAddItemToCompare={handleAddItemToCompare}  />
        </div>
    </div>
);

export default ProductDetailQuickView;
