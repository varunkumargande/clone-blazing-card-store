import React,{useState,useEffect,useRef} from "react";
import IconSearch from '../../components/Icons/IconSearch';
import IconDropdown from '../../components/Icons/IconDropdown';
import OrderDetails from "../../components/partials/OrderDetails/OrderDetails";
import MobileHeader from "../../components/partials/LandingPage/MobileHeader";
import Footer from "../../components/partials/LandingPage/Footer";
import HeaderDefault from "../../components/shared/headers/HeaderDefault";
import IconBack from '../../components/Icons/IconBack';

export default function Orderdetails(){
    const [active, setActive] = useState(false);
    const [windowWidth, setWindowWidth] = useState(0);
    const wrapperRef = useRef(null);
    let resizeWindow = () => {
      setWindowWidth(window.innerWidth);
    };
    useEffect(() => {
      resizeWindow();
      window.addEventListener("resize", resizeWindow);
      return () => window.removeEventListener("resize", resizeWindow);
    }, []);
    
    const handleOnClick = () => {
        setActive(!active);
    };
    const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setActive(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, false)
        return () => {
            document.removeEventListener('click', handleClickOutside, false)
        }
    }, [])

    return(
        <>
            {windowWidth <= 1024 ? "" : <HeaderDefault />}
            <div className="myorder-wrapper">
                
                {windowWidth <= 1024 ? 
                "" 
                : <section className="breadcrumbs-wrapper no-bg mb26">
                    <ul className="breadcrumbs flex flex-center">
                        <li>Home</li>/
                        <li>My Orders</li>/
                        <li className="current">Order Detail</li>
                    </ul>
                </section>}
                <div className="heading-wrapper flex space-between flex-center mb16 border-btm">
                    <h1><button className="back"><IconBack/></button>Order Detail</h1>
                    <div className="order-time-wrap flex flex-center">
                        <div className="placed">
                             Order Placed: August 22, 2022
                        </div>
                        <div className="delivered">
                            Order Delivered: August 22, 2022
                        </div>
                    </div>
                </div>
                <div className="orderdetails-wrapper flex space-between">
                    <OrderDetails />
                </div>
            </div>
            <Footer/>
        </>
    );
}