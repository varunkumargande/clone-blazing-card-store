import React, { useEffect, useState } from 'react';
import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import BreadCrumb from '../../components/elements/BreadCrumb';
import NavigationList from '../../components/shared/navigation/NavigationList';
import ThemeChanger from '../../components/elements/color/themeControl';
import FooterFullwidth from '../../components/shared/footers/FooterFullwidth';
import MyOrderComp from '../../components/partials/account/OrderMy';
import { useRouter } from 'next/router';

import { connect, useSelector, useDispatch } from 'react-redux';
import MobileHeader from '../../components/shared/headers/MobileHeader';
import Category from '../../components/partials/LandingPage/Category';
import { categoryApi } from "../../api/category/category";

const breadCrumb = [
    {
        text: 'Account',
    },
    {
        text: 'Order History',
    },
];

const MyOrders = ({ auth, compare }) => {
    const router=useRouter()

    const [windowWidth, setWindowWidth] = useState(0);
    let resizeWindow = () => {
      setWindowWidth(window.innerWidth);
    };
    const categories = useSelector((state)=>state?.category?.categories)
    const dispatch = useDispatch();
    useEffect(() => {
      resizeWindow();
      window.addEventListener("resize", resizeWindow);
      return () => window.removeEventListener("resize", resizeWindow);
    }, []);

    useEffect(()=>{
      categoryApi(dispatch);
    },[])


    useEffect(()=>{
        if(auth.isLoggedIn == false){
            router.push("/account/login")
        }
    },[])

    return(
        <div className="site-content">
            {windowWidth <= 1024 ? <MobileHeader/> : <HeaderDefault />}
            <ThemeChanger/>
            <div className="ps-page--my-account">
                <div style={{backgroundColor:"#f1f1f1",padding:"16px 0px"}}>
                    <BreadCrumb breacrumb={breadCrumb} />
                </div>
                <MyOrderComp/>
            </div>  
            <FooterFullwidth/>
        </div>
    )
}
const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps)(MyOrders);
