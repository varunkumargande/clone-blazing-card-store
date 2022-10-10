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
import { login } from "../../../store/auth/action";
import { connect } from "react-redux";
import Router from "next/router";
import { modalSuccess } from "../../../api/intercept";
import { logOut } from "../../../store/auth/action";
import { searchRequest } from "../../../store/search/action";
import { imageUrl } from "../../../api/url";
import MessageButton from "../../elements/MessageButton";
import { stepState } from "../../Constants/becomeSeller";

function HeaderDefault({ auth }, props) {
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [profile, setProfile] = useState(false);
  let category = useSelector((s) => s.product);
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  let currentColor = useSelector((s) => s.palette.currentColor);
  const [fname, setFname] = useState("");
  const [aimg, setAimg] = useState("");
  const [email, setEmail] = useState("");
  let { pageName } = router.query;
  const authFunc = () => {
    if (sessionStorage.getItem("spurtToken") !== null) {
      dispatch(login());
    }
  };

  const stage = useSelector((state) => state?.becomeSeller?.currentState);

  const handleOnClick = () => {
    setActive(!active);
  };

  useEffect(() => {
    categoryListApi(dispatch);
    authFunc();
    // getServiceApi(dispatch);
  }, []);

  useEffect(() => {
    let userData = JSON.parse(sessionStorage.getItem("spurtUser"));
    setProfile(userData);
  }, []);

  useEffect(() => {
    if (profile) {
      handleProfileImage();
    }
  }, [profile]);

  const handleProfileImage = () => {
    if (profile) {
      return (
        <>
          <img
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = "/static/images/profileImg.png";
            }}
            src={
              imageUrl +
              "?path=" +
              profile.avatarPath +
              "&name=" +
              profile.avatar +
              "&width=500&height=500"
            }
            alt="Profile"
          />
        </>
      );
    } else {
      return <img onError={({ currentTarget }) => {
        currentTarget.onerror = null;
        currentTarget.src = "/static/images/profileImg.png";
      }} src={"/static/img/no-image-new.svg"} alt="Profile" />;
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    dispatch(logOut());
    Router.push("/");
    window.location.href = "/";
    modalSuccess("success", "successfully logged out");
  };

  const handleChangePageToHome = () => {
    window.location.href = "/";
  };

  const handleSearchValue = (e) => {
    dispatch(searchRequest(e.target.value));
  };

  const handeGoToChat = () => {
    Router.push("/chat")
  }

  return (
    <header>
      <div className="inner-container flex flex-wrap flex-center space-between">
        <div className="left flex flex-wrap flex-center">
          <div className="logo">
            <a onClick={handleChangePageToHome}>
              <Logo />
            </a>
          </div>

          <div className="Search">
            <input
              type="search"
              id="search"
              name="search"
              onChange={(e) => handleSearchValue(e)}
            />
            <button className="search-btn" disabled>
              <IconSearch />
            </button>
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

            {/* {!stepState.includes(pageName) ? (
              <>
                <Link
                  href={
                    auth.isLoggedIn
                      ? "/account/login"
                      : `/become-seller/${stepState[stage]}`
                  }
                >
                  <a className="border-btn flex flex-center justify-center become">
                    Become a Seller
                  </a>
                </Link>
              </>
            ) : null} */}

            {auth.isLoggedIn ? (
              <>
                {/* <MessageButton name={"Message"} /> */}
                {!stepState.includes(pageName) ? (
                  <Link href="/become-seller/guidelines">
                    <a className="border-btn flex flex-center justify-center become">
                      Become a Seller
                    </a>
                  </Link>
                ) : null}
                <button className="message flex flex-center justify-center" onClick={() => handeGoToChat()}>
                  
                    <IconMessage />
                  
                </button>
                <button className="Notification flex flex-center justify-center">
                  <IconNotification />
                </button>
                <button className="profile">
                  <span onClick={handleOnClick}>

                    <span className="profileImage">
                      {handleProfileImage()}
                    </span>
                    {/* {userData != null ? (
                      <>
                        {userData.avatar != null && userData.avatarPath != null ? (
                          <>
                            <img
                              src={
                                imageUrl +
                                "?path=" +
                                userData.avatarPath +
                                "&name=" +
                                userData.avatar +
                                "&width=500&height=500"
                              }
                              alt="Profile"
                            />
                          </>
                        ) : (
                          <>
                            <img src={"/static/img/no-image.png"} />
                          </>
                        )}
                      </>
                    ) : (
                      ""
                    )} */}

                    <IconDropdown />
                  </span>

                  <ul className={active ? "dropDown active" : "dropDown"}>
                    <li>
                      <Link href="/account/myprofile">
                        <a className="active">
                          <span>
                            <IconProfile />
                            My Profile
                          </span>
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/my-orders">
                        <a className="active">
                          <span>
                            <IconMyOrders />
                            {t("OrderHistory")}
                          </span>
                        </a>
                      </Link>
                    </li>
                    {/* <li>
                      <Link href="/account/dashboard"><a className="active">
                        <span><IconSettings />{t('AccountSettings')}</span></a>
                      </Link>
                    </li> */}

                    <li onClick={(e) => handleLogout(e)}>
                      <IconLogout />
                      Logout
                    </li>
                  </ul>
                </button>
              </>
            ) : (
              <>
                {/* <div className="withotLogedIn flex flex-center justify-right"> */}
                {!stepState.includes(pageName) ? (
                  <Link href="/account/login">
                    <a className="flex flex-center justify-center become Link">
                      Become a Seller
                    </a>
                  </Link>
                ) : null}
                <Link href="account/login">
                  <a className="primary-btn flex flex-center justify-center ml24">
                    Sign In
                  </a>
                </Link>
                <Link href="account/register">
                  <a className="border-btn flex flex-center justify-center ml24">
                    Sign up
                  </a>
                </Link>
                {/* </div> */}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(HeaderDefault);
