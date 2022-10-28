import React,{useState,useEffect} from "react";
// import Header from "../../components/partials/Landingpage/Header";
import MobileHeader from "../../components/partials/LandingPage/MobileHeader";
import StreamingLeft from "../../components/partials/streaming/StreamingLeft";
import StreamingLive from "../../components/partials/streaming/StreamingLive";
import StreamingRIght from "../../components/partials/streaming/StreamingRIght";
import HeaderDefault from "../../components/shared/headers/HeaderDefault";
// import Footer from "../../components/partials/Landingpage/Footer";
import {SuceesTostmessage,ErorrTostmessage} from '../../components/partials/ToastMessage/ToastMessage'
import IconBack from '../../components/Icons/IconBack';
export default function LiveStreaming(){
    const [windowWidth, setWindowWidth] = useState(0);
    let resizeWindow = () => {
      setWindowWidth(window.innerWidth);
    };
  
    useEffect(() => {
      resizeWindow();
      window.addEventListener("resize", resizeWindow);
      return () => window.removeEventListener("resize", resizeWindow);
    }, []);

    return(
        <>
            {windowWidth <= 1024 ? <div className="stream-top-header"><div className="edit-back"><IconBack/></div></div> : <HeaderDefault />}
            <div className="streaming-page flex space-between">
                <StreamingLeft />
                <StreamingLive />
                <StreamingRIght />
            </div>
            <SuceesTostmessage/>
            <ErorrTostmessage/>
        </>
    );
}