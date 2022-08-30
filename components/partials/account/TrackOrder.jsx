import React from 'react';
import { useEffect,useState } from 'react';
import AccountNav from '../../elements/AccountNav';
import {imageUrl} from '../../../api/url';
import { Steps} from 'antd';
import Link from 'next/link';
import { useTranslation } from '../../../i18n'
const { Step } = Steps;

function TrackOrderCustom({orderInfo}){
    const [currentDelivery,setCurrentDelivery]=useState(0)
    const { t } = useTranslation('common');
    useEffect(()=>{
        if(orderInfo && orderInfo.deliveryStatus && orderInfo.deliveryStatus.length!==0) {
            let deliveryArray = orderInfo && orderInfo.deliveryStatus.filter((order)=> order.createdDate !== "")
            setCurrentDelivery(deliveryArray.length)
        }
    },[orderInfo])

    return(
        <section className="cus-account-container">
            <div className="cus-account-subcontainer">
                <div className="cus-position-container">
                    <AccountNav keyValue={4}/>
                    <div className="cus-right-position">
                        <div className="to-container">
                            <div className="to-subContainer">
                                <div className="to-subcontainer-main-header">
                                    <h3>{t('Shared.TrackOrder')}</h3>
                                </div>
                                <div className="to-content-header">
                                    <h3>{t('trackOrder.trackingId')} </h3>
                                    <Link href="/account/order-details/[odid]" as={`/account/order-details/${orderInfo.orderProductId}`}><a>{t('account.OrderDetails')}</a></Link>
                                </div>
                                <div className="to-content-main">
                                    <div className="to-content-image">
                                        <img src={imageUrl+"?path="+orderInfo.containerName+"&name="+orderInfo.productImage+"&width=400&height=200"}/>
                                    </div>
                                    <div className="to-content-right">
                                        <div className="to-content-super-header">
                                            <h3>{orderInfo.productName}</h3>
                                            <h4>{orderInfo.currencySymbolLeft} {orderInfo.basePrice}</h4>
                                        </div>
                                        <div className="to-content-shipping">
                                            <h3>{t('account.ShippingAddress')}</h3>
                                            <h4>{orderInfo.shippingAddress1}</h4>
                                            <p>{orderInfo.shippingAddress2}</p>
                                            <p>{orderInfo.shippingCity}</p>
                                            <p>{orderInfo.shippingPostcode}</p>
                                        </div>
                                        <Steps current={currentDelivery} labelPlacement="vertical" style={{marginTop:"40px",flexWrap:"row",marginBottom:"40px"}}>
                                            {orderInfo && orderInfo.deliveryStatus&&orderInfo.deliveryStatus.map((order)=>(<Step description={order.name} />))}
                                        </Steps>
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

export default TrackOrderCustom;