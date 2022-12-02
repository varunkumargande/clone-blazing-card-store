import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Logo from "../../Icons/Logo";
import IconSearch from "../../Icons/IconSearch";
import IconMenu from "../../Icons/IconMenu";
import IconClose from "../../Icons/IconClose";
import IconProfile from "../../Icons/IconProfile";
import IconMyOrders from "../../Icons/IconMyOrders";
import IconMessageMobile from "../../Icons/IconMessageMobile";
import IconLogoutMobile from "../../Icons/IconLogoutMobile";
import IconNotificationMobile from "../../Icons/IconNotificationMobile";
import { useTranslation } from "../../../i18n";
import { connect } from "react-redux";
import Router from "next/router";
import { modalSuccess } from "../../../api/intercept";
import { logOut } from "../../../store/auth/action";
import { useDispatch } from "react-redux";
import CloudinaryImage from "../../CommonComponents/CloudinaryImage";
import { DefaultImagePath, ImageTransformation} from "../../Constants/imageConstants";
import { setCurrentUrlInLocal } from "../../../utilities/utils";
import { vendorAuthApi } from "../../../api/auth/vendorAuth";
import { useNotifications } from "../../../contexts/Notifications/Notifications";

function MobileHeader({ auth }) {
  const [active, setActive] = useState(false);
  const [mobActive, mobSetActive] = useState(false);
  const [profile, setProfile] = useState(false);
  const [toggle, setToggle] = useState(false);
  const wrapperRef = useRef(null);
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  const [isVendor, setVendor] = useState(false);

  const {
    notifications,
    notificationsUnreadCount,
  } = useNotifications();

  const handleStoreAndVendorToggle = async () => {
    await vendorAuthApi();
    setToggle(false);
  };

  useEffect(() => {
    if (toggle) {
      handleStoreAndVendorToggle("seller");
    }
  }, [toggle]);

  useEffect(() => {
    let profileInterval = setInterval(() => {
      let profileData = localStorage.getItem("blazingUser");
      if (profileData) {
        profileData = JSON.parse(profileData);
        setProfile(profileData);
        clearInterval(profileInterval);
      }
    }, 10);
  }, []);

  /**
   * UseEffect will check if Buyer is a seller or not via notification
   */
  useEffect(() => {
    if(!isVendor && (notifications && notifications[0] && notifications[0]['notify_type'] == 'Vendor')) {
      setVendor(true);
    }
  }, [notifications])


  const handleMobOnClick = () => {
    mobSetActive(!mobActive);
  };
  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setActive(false);
    }
  };
  
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    dispatch(logOut());
    Router.push("/");
    modalSuccess("success", "successfully logged out");
  };

  useEffect(() => {
    let profileInterval = setInterval(() => {
      let profileData = localStorage.getItem("blazingUser");
      if (profileData) {
        profileData = JSON.parse(profileData);
        setProfile(profileData);
        clearInterval(profileInterval);
      }
    }, 10);
  }, []);
  useEffect(() => {
    if (profile) {
      renderProfileImage();
    }
  }, [profile]);
  const renderProfileImage = () => {
    if (!!profile?.avatarPath && !!profile?.avatar) {
      return (
        <>
          <CloudinaryImage
            imageUrl={`${profile.avatarPath}/${profile.avatar}`}
            keyId={`${profile.avatarPath}/${profile.avatar}`}
            transformation={ImageTransformation.ProfileImage}
            alternative="/static/images/profileImg.png"
          />

          {/* ToDo: Need to remove old image code. Keeping it right now for reference  */}
          {/* <img
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = "/static/images/profileImg.png";
                }}
                src={
                    imageUrl +
                    "?path=" +
                    profile.avatarPath +
                    "&name=/" +
                    profile.avatar +
                    "&width=100&height=100"
                }
                alt="Profile"
                /> */}
        </>
      );
    } else {
      return (
        <img
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = "/static/images/profileImg.png";
          }}
          height={20}
          width={15}
          src={DefaultImagePath.defaultProfileImage}
          alt="Profile"
          className="error"
        />
      );
    }
  };

  // =================== handle check user login toggle buttun ====================
  const handleCheckUserLoginForVendor = () => {
    if ((profile?.isVendor || isVendor) && auth?.isLoggedIn) {
      return (
        <>
          <div className="text-center become-seller flex flex-center justify-center become-toggle">
            <label className="switch toggle-switch darkBlue">
              <input
                type="checkbox"
                onChange={(e) => {
                  setToggle((prev) => !prev);
                }}
                className={toggle && 'checked'}
                value={toggle}
                id="togBtn"
              />
              <span className="toogle-slide round">
                <span className="on">Seller</span>
                <span className="off">Store</span>
              </span>
            </label>
          </div>
        </>
      );
    } else {
        return (
          <>
            <div className="text-center become-seller border-btn">
              Want to sell?
              <Link href={auth?.isLoggedIn ? "/become-seller/guidelines" : "/account/login"}>
                <a className="flex flex-center justify-center become">
                  Become a Seller
                </a>
              </Link>
            </div>
          </>
        );
    }
  };
  // ==============================================================================

  return (
    <div className="mobile-header">
      <div className="mobile-inner flex flex-wrap flex-center space-between">
        <div className="left flex flex-wrap flex-center">
          <button className="menu" onClick={handleMobOnClick}>
            <IconMenu />
          </button>
          <div className="logo">
            <Link href="/">
              <a>
                <Logo />
              </a>
            </Link>
          </div>
        </div>
        <div className="right flex flex-wrap flex-center">
          {auth.isLoggedIn ? (
            <Link href="/account/myprofile">
              <button className="profileImage flex justify-center flex-center">{renderProfileImage()}</button>
            </Link>
          ) : (
            <>
              <button
                className="primary-btn flex flex-center justify-center ml24"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentUrlInLocal();
                  Router.push("/account/login");
                }}
              >
                <a>Sign In</a>
              </button>
            </>
          )}
        </div>
      </div>
      {/* <div className="search-wrap flex space-between flex-top">
        <div className="Search">
          <input type="search" id="search" name="search" />
          <button className="search-btn">
            <IconSearch />
          </button>
        </div>
        <div className="category-btn-wrap">
            <button className="category-btn flex flex-center justify-center" onClick={handleOnClick} ref={wrapperRef}><IconCategoryDrop /></button>
            <div className={active ? "dropDown active" : "dropDown"}>
                <h4>Sort By</h4>
                <ul>
                    <li className="active">Creator</li>
                    <li>Athelete</li>
                    <li>Artist</li>
                </ul>
            </div>
        </div>
      </div> */}

      {/* Menu open html */}
      <div className={mobActive ? "menu-open active" : "menu-open"}>
        <div className="mobile-inner flex flex-wrap flex-center space-between">
          <div className="left flex flex-wrap flex-center">
            <div className="logo">
              <Link href="/">
                <a>
                  <Logo />
                </a>
              </Link>
            </div>
          </div>
          <div className="right flex flex-wrap flex-center">
            <button className="close" onClick={handleMobOnClick}>
              <IconClose />
            </button>
          </div>
        </div>
        <div className="menu-overflow">
          {/* <div className="search-wrap flex space-between flex-top">
            <div className="Search">
              <input type="search" id="search" name="search" />
              <button className="search-btn">
                <IconSearch />
              </button>
            </div>
            <div className="category-btn-wrap">
                <button className="category-btn flex flex-center justify-center" onClick={handleOnClick} ref={wrapperRef}><IconCategoryDrop /></button>
            </div>
          </div> */}

          {auth.isLoggedIn ? (
            <>
              <div className="mob-navigation mb32">
                {handleCheckUserLoginForVendor()}
                <ul>
                  <li>
                    <Link href="/account/myprofile">
                      <a>
                        <IconProfile />
                        <span>My Profile</span>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/my-orders">
                      <a>
                        <IconMyOrders />
                        <span>{t("OrderHistory")}</span>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <a
                      className="message"
                      onClick={(event) => {
                        event.preventDefault();
                        Router.push("/chat");
                      }}
                    >
                      <IconMessageMobile />
                      <span>Message</span>
                    </a>
                  </li>
                  <li>
                    <Link href="/notifications">
                      <a className={`notification ${
                    notificationsUnreadCount && "active"
                  }`}>
                        <IconNotificationMobile />
                        <span>Notification</span>
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="LogOut">
                <Link href="#">
                  <a
                    className="primary-btn flex flex-center justify-center active"
                    onClick={(e) => handleLogout(e)}
                  >
                    <IconLogoutMobile />
                    Logout
                  </a>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-wrap btn-wrapper column">
                <button
                  className="border-btn flex flex-center justify-center"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentUrlInLocal();
                    Router.push("/account/login");
                  }}
                >
                  <a>Sign In</a>
                </button>
                <button
                  className="primary-btn flex flex-center justify-center"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentUrlInLocal();
                    Router.push("/account/register");
                  }}
                >
                  <a>Sign up</a>
                </button>
              </div>
              <div className="or flex flex-center justify-center">
                <span>Or</span>
              </div>
              {handleCheckUserLoginForVendor()}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(MobileHeader);
