import React,{useState,useEffect} from "react";
import Header from "../../components/partials/Landingpage/Header";
import MobileHeader from "../../components/partials/LandingPage/MobileHeader";
import Category from "../../components/partials/Landingpage/Category";
import LiveShow from "../../components/partials/Landingpage/LiveShow";
import ScheduledShow from "../../components/partials/Landingpage/ScheduledShow";
import Pokeman from "../../components/partials/Landingpage/Pokeman";
import Jewellery from "../../components/partials/Landingpage/Jewellery";
import Footer from "../../components/partials/LandingPage/Footer";

export default function landingpage(){
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
        <div className="home-container">
            {windowWidth <= 1024 ? <MobileHeader/> : <Header />}
            <Category />
            <div className="card-wrapper">
                <LiveShow />
                <ScheduledShow />
                <Pokeman />
                <Jewellery />
            </div>
            <Footer />
        </div>
    );
}