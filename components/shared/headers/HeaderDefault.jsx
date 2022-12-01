import React, { useState, useRef } from "react";
import Link from "next/link";
import Logo from "../../Icons/Logo";
import IconMessage from "../../Icons/IconMessage";
import IconNotification from "../../Icons/IconNotification";
import IconDropdown from "../../Icons/IconDropdown";
import IconProfile from "../../Icons/IconProfile";
import IconMyOrders from "../../Icons/IconMyOrders";
import IconLogout from "../../Icons/IconLogout";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "../../../i18n";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import Router from "next/router";
import { logOut } from "../../../store/auth/action";
import { searchRequest } from "../../../store/search/action";
import { stepState } from "../../Constants";
import CloudinaryImage from "../../CommonComponents/CloudinaryImage";
import { io } from "socket.io-client";
import { host } from "../../../chatService";
import {
  ImageTransformation,
  DefaultImagePath,
} from "../../Constants/imageConstants";
import Notifications from "../../partials/Notifications/Notifications";
import { useNotifications } from "../../../contexts/Notifications/Notifications";
import { TostMessage } from "../../../components/partials/ToastMessage/ToastMessage";
import { show } from "../../../store/toast/action";
import { setCurrentUrlInLocal } from "../../../utilities/utils";
import {
  saveCategoryName,
  saveSubCategoryName,
} from "../../../store/category/action";
import { vendorAuthApi } from "../../../api/auth/vendorAuth";

function HeaderDefault({ auth }) {
  const socket = useRef();
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [notificationDropdownActive, setNotificationDropdownActive] =
    useState(false);
  const [profile, setProfile] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  const [toggle, setToggle] = useState(false);
  const [isVendor, setVendor] = useState(false);

  let { pageName } = router.query;
  const {
    notifications,
    notificationsUnreadCount,
    setNotificationsUnreadCount,
  } = useNotifications();
  const [chatNotification, setChatNotification] = useState([]);

  const wrapperRef = useRef(null);
  const notificationWrapperRef = useRef(null);
  const toast = useSelector((state) => state?.toast?.toast);

  const handleOnClick = () => {
    setActive(!active);
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
    // if (socket.current) {
    //   socket.current.on("new-message-notification", (id) => {
    //     setChatNotification(id);
    //   });
    // }
  }, []);

  // useEffect(() => {
  //   if (!!localStorage.getItem("chat-app-current-user")) {
  //     socket.current = io(host);
  //   }
  // }, []);

  useEffect(() => {
    if (toggle) {
      handleStoreAndVendorToggle("seller");
    }
  }, [toggle]);

  /**
   * UseEffect will check if Buyer is a seller or not via notification
   */
  useEffect(() => {
    if(!isVendor && (notifications && notifications[0] && notifications[0]['notify_type'] == 'Vendor')) {
      setVendor(true);
    }
  }, [notifications])

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
          onError={() => {
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

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    dispatch(logOut());
    dispatch(
      show({
        message: "Successfully logged out",
        type: "success",
      })
    );
    Router.push("/");
  };

  const handleSearchValue = (e) => {
    dispatch(searchRequest(e.target.value));
  };

  const handeGoToChat = () => {
    // chatLogin();
    Router.push("/chat");
  };

  // =================== handle check user login toggle buttun ====================
  const handleCheckUserLoginForVendor = () => {
    if ((profile?.isVendor || isVendor) && auth?.isLoggedIn) {
      return (
        <>
          <label className="switch toggle-switch darkBlue">
            <input
              type="checkbox"
              onChange={(e) => {
                setToggle((prev) => !prev);
              }}
              className={toggle && "checked"}
              value={toggle}
              id="togBtn"
            />
            <span className="toogle-slide round">
              <span className="on">Seller</span>
              <span className="off">Store</span>
            </span>
          </label>
        </>
      );
    } else {
        return (
          <>
            {!stepState.includes(pageName) ? (
              <Link href={auth?.isLoggedIn ? "/become-seller/guidelines" : "/account/login"}>
                <a className="border-btn flex flex-center justify-center become">
                  Become a Seller
                </a>
              </Link>
            ) : null}
          </>
        );
    }
  };
  // ==============================================================================

  // user information

  // ==============================================================================

  // ======================= handle check vendor and store ========================
  const handleStoreAndVendorToggle = async () => {
    await vendorAuthApi(dispatch);
    setToggle(false);
  };
  // ==============================================================================
  // ======================= Onclick outside dropdown close ========================
  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setActive(false);
    }
    if (
      notificationWrapperRef.current &&
      !notificationWrapperRef.current.contains(event.target)
    ) {
      setNotificationDropdownActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  /**
   * go to home page
   */

  const handleGoToHomePage = (e) => {
    e.preventDefault();
    dispatch(saveCategoryName(null));
    dispatch(saveSubCategoryName(null));
    Router.push("/");
  };

  return (
    <header>
      <div className="inner-container flex flex-wrap flex-center space-between">
        <div className="left flex flex-wrap flex-center">
          <div className="logo">
            <a onClick={(e) => handleGoToHomePage(e)}>
              <Logo />
            </a>
          </div>
          {/* <div className="Search">
            <input
              type="search"
              id="search"
              name="search"
              onChange={(e) => handleSearchValue(e)}
            />
            <button className="search-btn" disabled>
              <IconSearch />
            </button>
          </div> */}
        </div>
        <div className="right flex flex-wrap flex-center">
          <div className="logedIn flex flex-center justify-right">
            {handleCheckUserLoginForVendor()}
            {auth.isLoggedIn ? (
              <>
                {/* <MessageButton name={"Message"} /> */}

                <button
                  className="message flex flex-center justify-center"
                  onClick={() => handeGoToChat()}
                >
                  <IconMessage />
                </button>
                <button
                  ref={notificationWrapperRef}
                  className={`profile Notification flex flex-center justify-center ${
                    notificationsUnreadCount && "active"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setNotificationDropdownActive((previous) => !previous);
                  }}
                >
                  <IconNotification />
                  <ul
                    className={
                      notificationDropdownActive
                        ? "dropDown active"
                        : "dropDown"
                    }
                  >
                    <div className="notification-wrapper title-wrap ">
                      <div className="head-title flex space-between flex-center">
                        <h1>Notifications</h1>
                      </div>
                      <Notifications
                        notifications={notifications.slice(0, 3)}
                        setNotificationsUnreadCount={
                          setNotificationsUnreadCount
                        }
                      />
                      {notifications.length > 3 && (
                        <li className="seeAll">
                          <Link href="/notifications">
                            <a>{`See All (${
                              notificationsUnreadCount || 0
                            } Unread)`}</a>
                          </Link>
                        </li>
                      )}
                    </div>
                  </ul>
                </button>
                <button
                  className="profile"
                  ref={wrapperRef}
                  onClick={handleOnClick}
                >
                  <span>
                    <span className="profileImage flex justify-center flex-center">
                      {renderProfileImage()}
                    </span>
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
                <button
                  className="border-btn flex flex-center justify-center ml24"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentUrlInLocal();
                    Router.push("/account/register");
                  }}
                >
                  <a>Sign up</a>
                </button>
                {/* </div> */}
              </>
            )}
          </div>
        </div>
      </div>
      {!!toast.message && <TostMessage data={toast}></TostMessage>}
    </header>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(HeaderDefault);
