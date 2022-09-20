import React, { useEffect, useState } from 'react';

import Newsletters from '../../components/partials/commons/Newletters';
import FooterDefault from '../../components/shared/footers/FooterDefault';
import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import BreadCrumb from '../../components/elements/BreadCrumb';
import UserInformation from '../../components/partials/account/UserInformation';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import NavigationList from '../../components/shared/navigation/NavigationList';
import ThemeChanger from '../../components/elements/color/themeControl';
import useNetwork from '../../components/reusable/NetworkCheck';
import  Router  from 'next/router';
import FooterFullwidth from '../../components/shared/footers/FooterFullwidth';

import MobileHeader from '../../components/shared/headers/MobileHeader';
import Category from '../../components/partials/LandingPage/Category';
import { categoryApi } from "../../api/category/category";
import { connect, useSelector, useDispatch } from 'react-redux';

const UserInformationPage = () => {
    const network=useNetwork()

    const [windowWidth, setWindowWidth] = useState(0);
    let resizeWindow = () => {
      setWindowWidth(window.innerWidth);
    };
    const categories = useSelector((state)=>state?.category?.categories)
    const dispatch = useDispatch();
    console.log("landing page", dispatch)
    useEffect(() => {
      resizeWindow();
      window.addEventListener("resize", resizeWindow);
      return () => window.removeEventListener("resize", resizeWindow);
    }, []);

    useEffect(()=>{
      console.log(categories,"landingpage")
      categoryApi(dispatch);
    },[])

    useEffect(()=>{
        if(network===false){ Router.push('/network-error')  }
    },[])

    const breadCrumb = [
        {
            text: 'Account',
            url: '/',
        },
        {
            text: 'Account Dashboard',
        },
    ];

    return (
        <div className="site-content">
           {windowWidth <= 1024 ? <MobileHeader/> : <HeaderDefault />}
            <ThemeChanger/>
            <div className="ps-page--my-account">
                <div style={{backgroundColor:"#f1f1f1",padding:"16px"}}>
                    <BreadCrumb breacrumb={breadCrumb} />
                </div>
                <UserInformation />
            </div>
            {/* <Newsletters layout="container" /> */}
            <FooterFullwidth />
        </div>
    );
};

export default UserInformationPage;
