import React from 'react';
import { Tabs } from 'antd';
import { useTranslation } from '../../../../../i18n'
const { TabPane } = Tabs;
import PartialDescription from './PartialDescription';
import {useRef} from 'react';
//import {ConnectPlugin} from '../../../../connectPlugins'
import SpurtPartialSpecification from '../../../../partials/Attributes/PartialSpecification';
import PartialReview from './PartialReview';

function DefaultDescription({ratingInfo,product,forwardedRef}){

    const myDescription = useRef(1)
    const mySpecification = useRef(2)
    const myReview = useRef('div')
    const myQuesAndAnswer = useRef(4)
    const { t } = useTranslation('common');

    
    const tabChangeScroll = (current) =>{
             
        if(current === "1") {
            const id = 'description';
            const yOffset = -50; 
            const y = myDescription.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({top: y, behavior: 'smooth'});
            // myDescription.current.scrollIntoView()
            
        }
        if(current === "2") {
            const yOffset = -50; 
            const y = mySpecification.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({top: y, behavior: 'smooth'});
            // mySpecification.current.scrollIntoView()
        }
        if(current === "3") {
            const yOffset = -50; 
            const y = myReview.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({top: y, behavior: 'smooth'});
            // myReview.current.scrollIntoView()
        }
        if(current === "4") {
            const yOffset = -50; 
            const y = myQuesAndAnswer.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({top: y, behavior: 'smooth'});
            // myQuesAndAnswer.current.scrollIntoView()
        }
    }
         
        return (
            <div className='ps-product-desc' >
                <div className="ps-product__content ps-tab-root stick-tab-styling">
                    <Tabs defaultActiveKey='1' onTabClick={e=>tabChangeScroll(e)}>
                        <TabPane tab={t('account.Description')} key="1" >
                            <h1></h1><h1></h1>
                        </TabPane>
                     
                        <TabPane tab={t('products.Specifications')} key="2"><h1></h1></TabPane>
                        <TabPane tab={t('products.Review')} key="3"></TabPane>
                        <TabPane tab={t('products.CustomerQuestionsAnswer')} key="4"></TabPane>

                    </Tabs>
                </div>
               
                <h5 ref={myDescription} style={{paddingTop:"20px"}}>{t('account.Description')}</h5>
                <PartialDescription ratingInfo={ratingInfo} product={product}/>
                <h5 ref={mySpecification} ></h5> 
                <SpurtPartialSpecification productAttributes={product.productAttributes} />
                
                <div ref={forwardedRef}> </div>
                <h5 ref={myReview}  style={{paddingTop:"20px"}}>{t('products.Review')}</h5>
              
                <PartialReview ratingInfo={ratingInfo} />
               
                
               
                <h5 ref={myQuesAndAnswer} ></h5>

            </div>
        );
    
}

export default DefaultDescription;
