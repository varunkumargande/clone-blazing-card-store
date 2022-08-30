import React, { useEffect } from 'react';

import Newsletters from '../../components/partials/commons/Newletters';
import FooterDefault from '../../components/shared/footers/FooterDefault';
import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import BreadCrumb from '../../components/elements/BreadCrumb';
import Checkout from '../../components/partials/account/Checkout';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import NavigationList from '../../components/shared/navigation/NavigationList';
import ThemeChanger from '../../components/elements/color/themeControl';
import  Router  from 'next/router';
import useNetwork from '../../components/reusable/NetworkCheck';
import FooterFullwidth from '../../components/shared/footers/FooterFullwidth';

const OrderTrackingPage = () => {
    const network=useNetwork()
  
    useEffect(()=>{
        if(network===false){ Router.push('/network-error')  }
    },[])

    

    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Shopping Cart',
            url: '/account/shopping-cart',
        },
        {
            text: 'Checkout Information',
        },
    ];
    return (
        <div className="site-content">
            <HeaderDefault />
            <HeaderMobile />
            <NavigationList />
            <ThemeChanger/>
            <div className="ps-page--simple">
                {/* <BreadCrumb breacrumb={breadCrumb} /> */}
                <Checkout />
            </div>
            {/* <Newsletters layout="container" /> */}
            <FooterFullwidth />
        </div>
    );
};

export default OrderTrackingPage;
