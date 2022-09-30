import React,{useState,useEffect} from "react";
import Header from "../../components/partials/LandingPage/Header";
import MobileHeader from "../../components/partials/LandingPage/MobileHeader";
import Footer from "../../components/partials/LandingPage/Footer";
import { useSelector } from "react-redux";
import Link from "next/link";
import IconBack from '../../components/Icons/IconBack';
import ProfileInformation from "../../components/partials/EditProfile/ProfileInformation";
import PaymentDetails from "../../components/partials/EditProfile/PaymentCard";
import NoCard from "../../components/partials/EditProfile/NoCard";
import PaymentCard from "../../components/partials/EditProfile/PaymentCard";
import ChangePassword from "../../components/partials/EditProfile/ChangePassword";
import ShippingInformation from "../../components/partials/EditProfile/ShippingInformation";


export default function categoryStream(){

    const [windowWidth, setWindowWidth] = useState(0);
    let resizeWindow = () => {
      setWindowWidth(window.innerWidth);
    };
  
    const streamDetail= useSelector((state)=>state?.stream?.streamdetails?.stream)
    useEffect(() => {
      resizeWindow();
      window.addEventListener("resize", resizeWindow);
      return () => window.removeEventListener("resize", resizeWindow);
    }, []);

    return(
        <div className="Edit-profile">
            {windowWidth <= 1024 ? <MobileHeader/> : <Header />}
            <div className="edit-inner-container">
                <div className="edit-inner">
                    <section className="breadcrumbs-wrapper no-bg mb32">
                        <ul className="breadcrumbs flex flex-center">
                            <li>Home</li>/
                            <li className="current">Live</li>
                        </ul>
                    </section>
                    <h1 className="flex mb32"><div className="edit-back"><IconBack/></div>Edit Profile</h1>
                    <div className="tab-link-wrap flex mb32">
                        <div className="tab-link">
                            <button className="title" id="profile-info">Profile Information</button>
                        </div>
                        <div className="tab-link">
                            <button className="title active" id="change-pass">Change Password</button>
                        </div>
                        <div className="tab-link" id="shipping-info">
                            <button className="title">Shipping Information</button>
                        </div>
                        <div className="tab-link">
                            <button className="title" id="payment-detail">Payment Details</button>
                        </div>
                    </div>
                    {/* <ProfileInformation/> */}
                    {/* <ChangePassword/> */}
                    {/* <ShippingInformation/> */}
                    {/* <PaymentDetails/> */}
                    {/* <NoCard/> */}
                    <PaymentCard/>
                </div>
                
            </div>
            
            <Footer />
        </div>
    );
}