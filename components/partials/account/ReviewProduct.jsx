import React from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import { useEffect,useState } from 'react';
import AccountNav from '../../elements/AccountNav';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {imageUrl} from '../../../api/url';
import  Router from 'next/router';
import { Rate } from 'antd';
import {UserAddRating} from '../../../api';
import { useTranslation } from '../../../i18n'
import {modalSuccess, modalWarning} from "../../../api/intercept";
function ReviewComp ({orderDetailInfo,revLoader}){
    const [rateValue,setRateValue]=useState(0)
    const [review,setReview]=useState("")
    const [rateValid,setRateValid] = useState("")
    const [revValid,setRevValid] = useState("")
    const [submit,setSubmit] = useState(0)
    const { t } = useTranslation('common');
    const valid = () => {
        let validObj = {rateCheck:true,revCheck:true}
        if(rateValue === 0) {
            setRateValid("Please give rating for this product")
            validObj.rateCheck = false;
        } else {
            setRateValid("")
            validObj.rateCheck = true;
        }

        if(review.length === 0){
            setRevValid("Please type any review about this product")
            validObj.revCheck = false;
        } else {
            setRevValid("")
            validObj.revCheck = true;
        }

        if(validObj.rateCheck && validObj.revCheck) {
            return true
        } else {
            return false
        }
    }

    useEffect(()=>{
        if(submit) {
            valid()
        }
    },[rateValue,review])

    const handleReviewSubmit = (productId,orderProductId) =>{
      
        setSubmit(1)
        if(valid()) {
            UserAddRating(productId,orderProductId,review,rateValue)
            
        }
    }
   

    return(
        <section className="cus-account-container">
        <div className="cus-account-subcontainer">
            <div className="cus-position-container">
                <AccountNav keyValue={4}/>
                <div className="cus-right-position"> 
                <div className="rep-container">
                    <div className="rep-header-container">
                        <h3>{t('account.ReviewthisProduct')}  </h3>
                       
                    </div>
                    <div className="rep-det-container">
                        <div className="rep-main-det-container">
                        <div className="rep-img-container">
                            <img src={imageUrl+"?path="+orderDetailInfo.containerName+"&name="+orderDetailInfo.productImage+"&width=300&height=300"}/>
                            <h4>{orderDetailInfo.productName}</h4>
                            <h5>{orderDetailInfo.currencySymbolLeft} {orderDetailInfo.basePrice}</h5>
                        </div>
                        <div className="rep-maindet-container">
                            <div className="rep-rate-container">
                                <h3>{t('account.ReviewthisProduct')} </h3>
                                <Rate value={rateValue} onChange={value=>setRateValue(value)}/>
                                {submit===1 && rateValid!=="" && <p className="error-span">{rateValid}</p>}
                            </div>
                            <div className="rep-rev-container">
                                <h3>{t('account.ReviewthisProduct')} </h3>
                                <textarea rows="10" cols="85" placeholder={t('account.Description')} value={review} onChange={e=>setReview(e.target.value)} style={{border:submit===1 && revValid!==""&& "1px solid red"}}/>
                                {submit===1 && revValid!=="" && <span className="error-span">{revValid}</span>}
                            </div>
                            <div className="rep-rev-button-container">
                                <button onClick={e=>handleReviewSubmit(orderDetailInfo.productId,orderDetailInfo.orderProductId)}> {t('account.Submit')} </button>

                            </div>
                        </div>
                        </div>
                    </div>
                </div>

                </div>
            </div>
        </div>
        </section>
    )
}

export default ReviewComp;