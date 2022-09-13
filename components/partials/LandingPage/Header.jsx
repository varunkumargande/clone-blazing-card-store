import React from "react";
import Link from "next/link";
import Logo from "../../Icons/Logo";
import IconMessage from "../../Icons/IconMessage";
import IconNotification from "../../Icons/IconNotification";
import IconDropdown from "../../Icons/IconDropdown";
export default function Header(){
    return(
        <header>
            <div className="inner-container flex flex-wrap flex-center space-between">
                <div className="left flex flex-wrap flex-center">
                    <div className="logo">
                        <Link href="/"><a><Logo /></a></Link>
                    </div>
                    <div className="Search">
                        <input type="search" id="search" name="search" />
                    </div>
                </div>
                <div className="right flex flex-wrap flex-center">
                    <div className="logedIn flex flex-center">
                        <label className="switch toggle-switch darkBlue">
                            <input type="checkbox" id="togBtn" />
                            <span className="toogle-slide round">
                                <span className="on">
                                    Store
                                </span>
                                <span className="off">
                                    Seller
                                </span>
                            </span>
                        </label>
                        <button className="message"><IconMessage /></button>
                        <button className="Notification"><IconNotification /></button>
                        <button className="profile"><img src="/static/images/profile.png" alt="Profile" /><IconDropdown /></button>
                    </div>
                    {/* <div className="withoutLogedIn flex flex-center">
                        <Link href="/"><a>Become a Seller</a></Link>
                        <button className="signIn border-btn">Sign In</button>
                        <button className="signUp primary-btn">Sign Up</button>                        
                    </div> */}
                </div>
            </div>
        </header>
    );
}