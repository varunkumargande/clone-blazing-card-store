import React, { useEffect } from 'react';
import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import FooterDefault from '../../components/shared/footers/FooterDefault';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import NavigationList from '../../components/shared/navigation/NavigationList';
import ThemeChanger from '../../components/elements/color/themeControl';
import useNetwork from '../../components/reusable/NetworkCheck';
import Router, { useRouter } from "next/router";
import { useState } from 'react';
import dynamic from 'next/dynamic';
import Footer from '../../components/partials/LandingPage/Footer';
import IconBack from '../../components/Icons/IconBack';

const StreamingPage = (props, dispatch) => {
    const network = useNetwork()
    const Streaming = dynamic(() => import("../../components/elements/streaming"), {ssr: false})
    const [blogList, setBlogList] = useState([])
    const [windowWidth, setWindowWidth] = useState(0);
    const router = useRouter()
    let resizeWindow = () => {
      setWindowWidth(window.innerWidth);
    };
  
    useEffect(() => {
      resizeWindow();
      window.addEventListener("resize", resizeWindow);
      return () => window.removeEventListener("resize", resizeWindow);
    }, []);
    useEffect(() => {
        if (network === false) { Router.push('/network-error') }
    }, [])

    //go back to previous page
   const handleBackButton = () => {
    router.back()
   }

    return (
        <div className="streaming-screen">
            {windowWidth <= 1024 ? <div className="stream-top-header"><div className="edit-back" onClick={handleBackButton}><IconBack/></div></div> : <HeaderDefault />}
            <NavigationList />
            <ThemeChanger />
            <Streaming />
            <Footer />
        </div>
    );
};

export default StreamingPage;
