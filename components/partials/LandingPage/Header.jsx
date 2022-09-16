import React,{useState,useEffect,useRef} from "react";
import Link from "next/link";
import Logo from "../../Icons/Logo";
import IconMessage from "../../Icons/IconMessage";
import IconNotification from "../../Icons/IconNotification";
import IconDropdown from "../../Icons/IconDropdown";
import IconSearch from "../../Icons/IconSearch";
export default function Header(){
    const [active, setActive] = useState(false);
    const wrapperRef = useRef(null);
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
        <header>
            <div className="inner-container flex flex-wrap flex-center space-between">
                <div className="left flex flex-wrap flex-center">
                    <div className="logo">
                        <Link href="/"><a><Logo /></a></Link>
                    </div>
                    <div className="Search">
                        <input type="search" id="search" name="search" />
                        <button className="search-btn"><IconSearch /></button>
                    </div>
                </div>
                <div className="right flex flex-wrap flex-center">
                    <div className="logedIn flex flex-center justify-right">
                        {/* <label className="switch toggle-switch darkBlue">
                            <input type="checkbox" id="togBtn" />
                            <span className="toogle-slide round">
                                <span className="on">
                                    Store
                                </span>
                                <span className="off">
                                    Seller
                                </span>
                            </span>
                        </label> */}
                        
                        <Link href="/"><a className="border-btn flex flex-center justify-center become">Become a Seller</a></Link>
                        <button className="message flex flex-center justify-center"><IconMessage /></button>
                        <button className="Notification flex flex-center justify-center"><IconNotification /></button>
                        <button className="profile">
                            <span onClick={handleOnClick} ref={wrapperRef}><img src="/static/images/profile.png" alt="Profile" /><IconDropdown /></span>
                            <ul  className= {active ? "dropDown active" : "dropDown"} >
                                <li className="active">Logout</li>
                            </ul>
                        </button>
                    </div>
                    {/* <div className="withotLogedIn flex flex-center justify-right">
                        <Link href="/"><a className="link">Become a Seller</a></Link>
                        <Link href="/login"><a className="primary-btn flex flex-center justify-center ml24">Sign In</a></Link>
                        <Link href="/signup"><a className="border-btn flex flex-center justify-center ml24">Sign up</a></Link>
                    </div> */}
                </div>
            </div>
        </header>
    );
}