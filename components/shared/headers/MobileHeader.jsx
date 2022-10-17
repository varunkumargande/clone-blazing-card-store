import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Logo from "../../Icons/Logo";
import IconSearch from "../../Icons/IconSearch";
import IconMenu from "../../Icons/IconMenu";
import IconClose from "../../Icons/IconClose";
import IconCategoryDrop from '../../Icons/IconCategoryDrop';
import IconProfile from "../../Icons/IconProfile";
import IconMyOrders from "../../Icons/IconMyOrders";
import IconSettings from "../../Icons/IconSettings";
import IconMessageMobile from "../../Icons/IconMessageMobile";
import IconLogoutMobile from "../../Icons/IconLogoutMobile";
import IconNotificationMobile from "../../Icons/IconNotificationMobile";
import { useTranslation } from "../../../i18n";
import { categoryListApi } from "../../../api";
import { useRouter } from "next/router";
import { login } from '../../../store/auth/action';
import { connect } from 'react-redux';
import Router from 'next/router';
import { modalSuccess } from "../../../api/intercept";
import { logOut } from '../../../store/auth/action';
import { useSelector, useDispatch } from "react-redux";

function MobileHeader({ auth }) {
    const [active, setActive] = useState(false);
    const [mobActive, mobSetActive] = useState(false);
    const wrapperRef = useRef(null);
    const dispatch = useDispatch();
    const { t } = useTranslation("common");
    const authFunc = () => {
        if (sessionStorage.getItem("spurtToken") !== null) {
            dispatch(login())
        }
    }

    useEffect(() => {
        categoryListApi(dispatch);
        authFunc()
        // getServiceApi(dispatch);
    }, []);

    const handleOnClick = () => {
        setActive(!active);
    };
    const handleMobOnClick = () => {
        mobSetActive(!mobActive);
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


    const handleLogout = e => {
        e.preventDefault();
        sessionStorage.clear()
        dispatch(logOut());
        Router.push("/")
        modalSuccess('success', "successfully logged out")
    };


    return (
        <div className="mobile-header">
            <div className="mobile-inner flex flex-wrap flex-center space-between">
                <div className="left flex flex-wrap flex-center">
                    <button className="menu" onClick={handleMobOnClick}><IconMenu /></button>
                    <div className="logo">
                        <Link href="/"><a><Logo /></a></Link>
                    </div>
                </div>
                <div className="right flex flex-wrap flex-center">
                    {auth.isLoggedIn ? "" : (
                        <>
                            <Link href="/account/login"><a className="primary-btn flex flex-center justify-center ml24">Sign In</a></Link>
                        </>
                    )}

                </div>
            </div>
            <div className="search-wrap flex space-between flex-top">
                <div className="Search">
                    <input type="search" id="search" name="search" />
                    <button className="search-btn"><IconSearch /></button>
                </div>
                {/* <div className="category-btn-wrap">
                    <button className="category-btn flex flex-center justify-center" onClick={handleOnClick} ref={wrapperRef}><IconCategoryDrop /></button>
                    <div className={active ? "dropDown active" : "dropDown"}>
                        <h4>Sort By</h4>
                        <ul>
                            <li className="active">Creator</li>
                            <li>Athelete</li>
                            <li>Artist</li>
                        </ul>
                    </div>
                </div> */}
            </div>

            {/* Menu open html */}
            <div className={mobActive ? "menu-open active" : "menu-open"}>
                <div className="mobile-inner flex flex-wrap flex-center space-between">
                    <div className="left flex flex-wrap flex-center">
                        <div className="logo">
                            <Link href="/"><a><Logo /></a></Link>
                        </div>
                    </div>
                    <div className="right flex flex-wrap flex-center">
                        <button className="close" onClick={handleMobOnClick}><IconClose /></button>
                    </div>
                </div>
                <div className="menu-overflow">
                    <div className="search-wrap flex space-between flex-top">
                        <div className="Search">
                            <input type="search" id="search" name="search" />
                            <button className="search-btn"><IconSearch /></button>
                        </div>
                        {/* <div className="category-btn-wrap">
                            <button className="category-btn flex flex-center justify-center" onClick={handleOnClick} ref={wrapperRef}><IconCategoryDrop /></button>
                        </div> */}
                    </div>
                    {auth.isLoggedIn ? (
                        <>
                            <div className="text-center become-seller border-btn">
                                <span>Want to sell? </span> <Link href="/"><a>Become a Seller</a></Link>
                            </div>
                            <div className="mob-navigation mb32">
                                <ul>
                                    <li><Link href="/account/myprofile"><a><IconProfile /><span>My Profile</span></a></Link></li>
                                    <li><Link href="/my-orders"><a><IconMyOrders /><span>{t('OrderHistory')}</span></a></Link></li>
                                    <li><Link href="/"><a className="message"><IconMessageMobile/><span>Message</span></a></Link></li>
                                    <li><Link href="/"><a className="notification"><IconNotificationMobile/><span>Notification</span></a></Link></li>
                                </ul>
                            </div>
                            <div className="LogOut"><Link href="#"><a className="primary-btn flex flex-center justify-center active" onClick={e => handleLogout(e)}><IconLogoutMobile />Logout</a></Link></div>
                        </>
                    ):(
                        <>
                            <div className="flex flex-wrap btn-wrapper column">
                                <Link href="/account/login"><a className="primary-btn flex flex-center justify-center">Sign In</a></Link>
                                <Link href="/account/register"><a className="border-btn flex flex-center justify-center">Sign up</a></Link>
                            </div>
                            <div className="or flex flex-center justify-center"><span>Or</span></div>
                            <div className="text-center become-seller">
                                Want to sell? <Link href=""><a>Become a Seller</a></Link>
                            </div>
                        </>
                    )}
                </div>
            </div>

        </div>
    );
}

const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps)(MobileHeader);