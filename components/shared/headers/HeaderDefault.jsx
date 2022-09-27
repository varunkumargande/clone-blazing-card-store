import React, { useState } from "react";
import Link from "next/link";
import Logo from "../../Icons/Logo";
import IconMessage from "../../Icons/IconMessage";
import IconNotification from "../../Icons/IconNotification";
import IconDropdown from "../../Icons/IconDropdown";
import IconProfile from "../../Icons/IconProfile";
import IconMyOrders from "../../Icons/IconMyOrders";
import IconSettings from "../../Icons/IconSettings";
import IconLogout from "../../Icons/IconLogout";
import IconSearch from "../../Icons/IconSearch";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "../../../i18n";
import { categoryListApi } from "../../../api";
import { useRouter } from "next/router";
import { login } from '../../../store/auth/action';
import { connect } from 'react-redux';
import Router from 'next/router';
import { modalSuccess } from "../../../api/intercept";
import { logOut } from '../../../store/auth/action';
import { imageUrl } from '../../../api/url';

function HeaderDefault({ auth }) {
  const router = useRouter();
  const [active, setActive] = useState(false);
  let category = useSelector((s) => s.product);
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  let currentColor = useSelector((s) => s.palette.currentColor);
  const [fname, setFname] = useState("")
  const [aimg, setAimg] = useState("")
  const [email, setEmail] = useState("")

  const authFunc = () => {
    if (sessionStorage.getItem("spurtToken") !== null) {
      dispatch(login())
    }
  }

  const handleOnClick = () => {
    setActive(!active);
  };

  useEffect(() => {
    categoryListApi(dispatch);
    authFunc()
    // getServiceApi(dispatch);
  }, []);


  useEffect(() => {
    let userData = JSON.parse(sessionStorage.getItem("spurtUser"))
    if (userData != null) {
      setFname(JSON.parse(sessionStorage.getItem("spurtUser")).firstName)
      setEmail(JSON.parse(sessionStorage.getItem("spurtUser")).email)
      JSON.parse(sessionStorage.getItem("spurtUser")).avatar ? setAimg(imageUrl + "?path=" + JSON.parse(sessionStorage.getItem("spurtUser")).avatarPath + "&name=" + JSON.parse(sessionStorage.getItem("spurtUser")).avatar + "&width=500&height=500") : setAimg("/static/img/no-image.png")
    }
  }, [])

  const handleLogout = e => {
    e.preventDefault();
    sessionStorage.clear()
    dispatch(logOut());
    Router.push("/")
    modalSuccess('success', "successfully logged out")
  };

  console.log(aimg)

  return (
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
            <Link href=""><a className="border-btn flex flex-center justify-center become">Become a Seller</a></Link>

            {auth.isLoggedIn ? (
              <>
                <button className="message flex flex-center justify-center"><IconMessage /></button>
                <button className="Notification flex flex-center justify-center"><IconNotification /></button>
                <button className="profile">
                  <span onClick={handleOnClick}><img src={aimg} alt="Profile" /><IconDropdown /></span>
                  <ul className={active ? "dropDown active" : "dropDown"} >
                    <li>
                      <Link href="/"><a className="active">
                        <span><IconProfile />My Profile</span></a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/account/myorders"><a className="active">
                        <span><IconMyOrders />{t('OrderHistory')}</span></a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/account/dashboard"><a className="active">
                        <span><IconSettings />{t('AccountSettings')}</span></a>
                      </Link>
                    </li>

                    <li onClick={e => handleLogout(e)}><IconLogout />Logout</li>
                  </ul>
                </button>
              </>
            ) : (
              <>
                {/* <div className="withotLogedIn flex flex-center justify-right"> */}
                <Link href="account/login"><a className="primary-btn flex flex-center justify-center ml24">Sign In</a></Link>
                <Link href="account/register"><a className="border-btn flex flex-center justify-center ml24">Sign up</a></Link>
                {/* </div> */}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}


const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(HeaderDefault);
