import React,{useState,useEffect} from "react";
import Header from "../../components/partials/LandingPage/Header";
import MobileHeader from "../../components/partials/LandingPage/MobileHeader";
import LeftPannel from '../../components/partials/sellerSteps/LeftPannel';
import ImportantGuidelines from '../../components/partials/sellerSteps/ImportantGuidelines';
import Footer from "../../components/partials/LandingPage/Footer";

export default function Steps(){
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
            {windowWidth <= 1024 ? <MobileHeader/> : <Header />}
            <section className="steps-wrapper flex">
               <div className="step-left"><LeftPannel /></div> 
               <div className="step-right"><ImportantGuidelines/></div> 
            </section>
            <Footer/>
        </>
    );
}