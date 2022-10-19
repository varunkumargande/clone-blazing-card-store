import React,{useState,useEffect} from "react";
import Footer from "../../components/partials/LandingPage/Footer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import HeaderDefault from "../../components/shared/headers/HeaderDefault";
import MobileHeader from "../../components/shared/headers/MobileHeader";

export default function landingpage(){
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

    return(
        <div className="home-container">
            {windowWidth <= 1024 ? <MobileHeader/> : <HeaderDefault />}
            <section className="static-container">
              <h1>PRIVACY POLICY</h1>
              <div className="last-update">Last updated November 29, 2021</div>
              <div className="static-inner-container">
                <p>Trend Live. (“trend live,” the “Company,” “we” and “us”) provides a marketplace to bring together collectors and enthusiasts and make it easy and safe to connect, buy and sell. This Privacy Policy is designed to help you understand how we collect, use, and share your personal information and to help you understand and exercise your privacy rights.</p>
              </div>
            </section>
            <Footer />
        </div>
    );
}