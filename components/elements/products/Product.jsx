import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { Modal } from 'antd';
import ProductDetailQuickView from '../detail/ProductDetailQuickView';
import { formatCurrency } from '../../../utilities/product-helper';
import { getCompareList } from '../../../store/compare/action';
import { addItemToWishlist } from '../../../store/wishlist/action';
import { imageUrl } from '../../../api/url';
import { AddWishlist } from '../../../api/wishlist/addWishlist';
import { priceHelpFunc } from '../../helper/priceHelper'
import { productCompareApi } from '../../../api/compare/productCompare';
import ProductWishList from './productWishList';
import Router, { useRouter } from 'next/router';
import toast from '../../../api/toast/index'
import { useTranslation } from '../../../i18n';

//import {ConnectPlugin} from '../../connectPlugins';
import ReviewRating from '../detail/modules/description/ReviewRating';
// import { useToast } from 'react-toastify';
// import { getHomeRevies } from '../../../store/product/action';





function Product({ product, image, currency,crumbArray }) {

    const [isQuickView, setIsQuickView] = useState(false)
    const [checkWishList, setCheckWishList] = useState(0)
    const [compareStatus, setCompareStatus] = useState(0)
    const [loadings, setloadings] = useState(false)
    const [compareTrues, setTrues] = useState(true)
    const [valueset, setValueset] = useState("")
    const dispatch = useDispatch()
    const router = useRouter()
    let currentColor = useSelector(s => s.palette.currentColor)
    let wishListData = useSelector(s => s.wishlist)
    let wishListStatus = wishListData && wishListData.wishlistItems.some((value) => value.productId === product.productId)
    const { t } = useTranslation('common');
    // const tot=useToast()

    // 

    const modalWarnings = (type, message) => {

        toast({ type: type, message: "Cannot add more than 3 product" });
    };



    const modalWarning = (type) => {
        
        toast({ type: type, message: "Successfully removed a product from compare", });
    };

    const handleAddItemToCart = (e, id, price, product) => {
        Router.push("/product/[pid]", `/product/${product.productSlug}`)

    };

    const handleAddItemToCompare = (e, productId) => {
        // toast.dismiss()
        let data = 0
        let dummy = ""
        if (localStorage.getItem("compareId") !== null) {
            let idArray = JSON.parse(localStorage.getItem("compareId"))
// useToast
            var index = idArray.indexOf(product.productId);

            if (index !== -1) {
                let localCompareId = JSON.parse(localStorage.getItem("compareId"))
                localCompareId.splice(index, 1);
                localStorage.setItem("compareId", JSON.stringify(localCompareId));
                setCompareStatus(1)
                dispatch(getCompareList(1))

                modalWarning('success')


            }
            else {
                idArray.push(productId)
                e.preventDefault();

                if (idArray && idArray.length > 3) {
                    modalWarnings('error');
                }
                else {

                    productCompareApi(idArray, data, dummy, dispatch, setCompareStatus, setloadings, compareTrues, setTrues)


                }


            }


        }
        else {
            let idArray = []
            let dummy = ""
            idArray.push(productId)
            e.preventDefault();



            if (idArray && idArray.length > 3) {
                modalWarnings('warning');
            }
            else {

                productCompareApi(idArray, data, dummy, dispatch, setCompareStatus, setloadings, compareTrues, setTrues)
            }


        }
    };





  

    const handleShowQuickView = (e) => {
        e.preventDefault();
        setIsQuickView(true)
    };

    const handleHideQuickView = (e) => {
        e.preventDefault();
        setIsQuickView(false)
    };

    const wishListFunction = () => {
        if (wishListData && wishListData.wishlistItems.length > 0) {
            let wishListStatus = wishListData.wishlistItems.some((value) => value.productId === product.productId)

            return wishListStatus ? 1 : 0;
        }
    }

    function compareCheckFunction() {
        let idArray = JSON.parse(localStorage.getItem("compareId"));

        if (idArray && idArray.length !== 0) {
            let compareCheck = idArray.some((value) => value === product.productId)
            
            return compareCheck
        }
    }

    useEffect(() => {
        if (wishListData && wishListData.wishlistItems.length > 0) {
            let wishListStatus = wishListData.wishlistItems.some((value) => value.productId === product.productId)
            setCheckWishList(wishListStatus ? 1 : 0)
        }
    }, [wishListData])

    useEffect(() => {
        setCompareStatus(0)
    }, [compareStatus])

    const categorySlug = router.query.categorySlug

 

    return (
        <div className="ps-product slider-product-container">


            {product.flag !== "" && <div className="cus-dis-tag"><img src="/static/img/discount-tag.png" /><span>{Math.round(Math.round(((product.price - product.pricerefer) * 100 / product.price)))}%</span></div>}
            <div className="wishlist-card">
                <ProductWishList productId={product.productId} wishListStatus={wishListFunction()} />
            </div>

            <div className="ps-product__thumbnail">
                {categorySlug === undefined ?
                    <Link href="/product/[pid]" as={`/product/${product.productSlug}`}>


                        <a>

                            <div className="product-container-whole-project" >

                                <img
                                    src={image}
                                    width="100%"
                                    height="100%"
                                    alt={product && product.name && product.name.length < 40 ? product.name : product && product.name && product.name.substring(0, 40) + "..."}

                                />
                            </div>


                        </a>
                    </Link> :
                    <Link href={{
                        pathname: `/product/[pid]`, query: {
                            categorySlug: categorySlug,
                        }
                    }}

                        as={{
                            pathname: `/product/${product.productSlug}`, query: {
                                categorySlug: categorySlug,
                            }
                        }}
                    >

                        <a>

                            <div className="product-container-whole-project" >

                                <img
                                    src={image}
                                    width="100%"
                                    height="100%"
                                    alt={product && product.name && product.name.length < 40 ? product.name : product && product.name && product.name.substring(0, 40) + "..."}

                                />
                            </div>


                        </a>
                    </Link>}
                {product.badge ? productBadge : ''}
            </div>
            <div className="ps-product__container">

                <div className="ps-product__content product-margin-left-right">
                    <Link
                        href="/product/[pid]"
                        as={`/product/${product.productSlug}`}>
                        <a className="ps-product__title">{product && product.name && product.name.length < 40 ? product.name : product && product.name && product.name.substring(0, 40) + "..."}</a>
                    </Link>

                    <ReviewRating product={product} />
                

                    {product.is_sale === true ? (
                        <p className="ps-product__price sale">
                            {currency ? currency.symbol : '$'}
                            {formatCurrency(product.price)}
                            <del className="ml-2">
                                {currency ? currency.symbol : '$'}
                                {formatCurrency(product.sale_price)}
                            </del>
                        </p>
                    ) : (
                        <div>
                            {product && product.flag === "" ? <p className="ps-product__price">

                                {product.pricerefer !== "" ?<>
                                {currency  ? currency.symbol : '$ '}{' '}
                                {priceHelpFunc(parseInt(product.pricerefer), product.taxType, product.taxValue, 0)} 
                                </> :
                                <>
                                {currency  ? currency.symbol : '$ '}{' '}
                                {product.price==null?<>
                                  {0}
                                </>:<>
                                {formatCurrency(priceHelpFunc(parseInt(product.price), JSON.parse(product.taxType), product.taxValue, 0))
                                    
                                }
                                </>

                                }
                               
                                    </>
}
                            </p> : <p className="ps-product__price">
                             
                                {product && product.flag === 1 && <span style={{ color: "grey", marginRight: "10px" }}><del>{currency ? currency.symbol : '$'} {priceHelpFunc(product.price, product.taxType,product.taxValue,"")}</del></span>}
                                {currency ? currency.symbol : '$'}{product.pricerefer !== "" ? priceHelpFunc(product.pricerefer, product.taxType, product.taxValue, "") : priceHelpFunc(product.price, product.taxType, product.taxValue, "")}
                            </p>}
                        </div>
                    )}
                </div>
                <div className="ps-product__content hover">
                    <Link
                        href="/product/[pid]"
                        as={`/product/${product.productSlug}`}>
                        <a className="ps-product__title">{product && product.name}</a>
                    </Link>
                    {product.is_sale === true ? (
                        <p className="ps-product__price sale">
                            {currency ? currency.symbol : '$'}
                            {formatCurrency(product.price)}
                            <del className="ml-2">
                                {currency ? currency.symbol : '$'}
                                {product.sale_price}
                            </del>
                        </p>
                    ) : (
                        <div>
                            {product && product.flag === "" ? <p className="ps-product__price">
                                {currency ? currency.symbol : '$'}
                                {formatCurrency(product.price)}
                            </p> : <p className="ps-product__price">
                                {'$'}
                                {product.pricerefer !== "" ? priceHelpFunc(product.pricerefer, product.taxType, product.taxValue, "") : priceHelpFunc(product.price, product.taxType, product.taxValue, "")}
                            </p>}
                        </div>
                    )}
                </div>
            </div>
            <div className="ps-product__actions">
                
                <a
                    // href="#"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Compare"
                    onClick={e => handleAddItemToCompare(e, product.productId)}>
                    {compareCheckFunction() ? <img src="/static/img/compare-icon.svg" alt="" style={{ width: "32px", height: "32px" }} /> : <img src="/static/img/compare-arrows.svg" alt="" style={{ width: "32px", height: "32px" }} />}
                </a>

                <a
                    // href="#"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Quick View"
                    onClick={handleShowQuickView}>
                    <img src="/static/img/eye.svg" alt="" style={{ width: "32px", height: "32px" }} />
                </a>

                <Link href="/product/[pid]" as={`/product/${product.productSlug}`}>

                    <a
                        data-toggle="tooltip"
                        data-placement="top"
                        className={`add-to-cart-btn ${currentColor}`}
                        title="Add to cart"
                        onClick={e => handleAddItemToCart(e, product.productId, product.price, product)}
                    >
                        
                        {t('Shared.AddToCart')}
                        
                    </a>
                </Link>
            </div>

            <Modal
                title={product.title}
                centered
                footer={null}
                width={1024}
                onCancel={handleHideQuickView}
                visible={isQuickView}>
                <ProductDetailQuickView product={product} crumbArray={crumbArray} image={product.image && product.image.containerName !== "/" ? imageUrl + "?path=" + product.containerName + "&name=" + product.image + "&width=573&height=673" : "/static/img/no-image.png"} compareCheckFunction={compareCheckFunction} handleAddItemToCompare={handleAddItemToCompare} wishListStatus={wishListFunction()} />
            </Modal>
        </div>
    );
}
const mapStateToProps = (state) => {
    return state.setting;
};
export default connect(mapStateToProps)(Product);
