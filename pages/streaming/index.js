import React, { useEffect } from 'react';
import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import FooterDefault from '../../components/shared/footers/FooterDefault';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import NavigationList from '../../components/shared/navigation/NavigationList';
import ThemeChanger from '../../components/elements/color/themeControl';
import useNetwork from '../../components/reusable/NetworkCheck';
import Router from "next/router";
import { useState } from 'react';

import Streaming from '../../components/elements/streaming';


const StreamingPage = (props, dispatch) => {
    const network = useNetwork()
    const [blogList, setBlogList] = useState([])

    useEffect(() => {
        if (network === false) { Router.push('/network-error') }
    }, [])
   

    return (
        <div className="site-content">
            <HeaderDefault />
            <HeaderMobile />
            <NavigationList />
            <ThemeChanger />
            <Streaming />
            <FooterDefault />
        </div>
    );
};

export default StreamingPage;
