import React, { useState, useRef } from "react";
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
import { chatLogin } from "../../../api";
import { getBecomeSellerInfo } from "../../../store/becomeSeller/action";
import CloudinaryImage from "../../CommonComponents/CloudinaryImage";
import { ImageTransformation } from "../../Constants/imageTransformation";
import useSessionstorage from "../../elements/sessionStorageHook/useSessionstorage";
import Notifications from "../../partials/Notifications/Notifications";
import { useNotifications } from "../../../contexts/Notifications/Notifications";
import { vendorAuth } from "../../../store/vendorAuth/action";
import { TostMessage } from "../../../components/partials/ToastMessage/ToastMessage";
import { show } from "../../../store/toast/action";
import { categoryApi } from "../../../api";

function HeaderDefault({ auth }) {
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [notificationDropdownActive, setNotificationDropdownActive] =
    useState(false);
  const [profile, setProfile] = useState(false);
  let category = useSelector((s) => s.product);
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  let currentColor = useSelector((s) => s.palette.currentColor);
  const [fname, setFname] = useState("");
  const [aimg, setAimg] = useState("");
  const [email, setEmail] = useState("");
  const [toggle, setToggle] = useState(false);

  let { pageName } = router.query;

  const { notifications, notificationsUnreadCount } = useNotifications();

  const wrapperRef = useRef(null);
  const notificationWrapperRef = useRef(null);
  // ================= user data ===================
  const userData = useSessionstorage();
  // ===============================================

  const authFunc = () => {
    if (sessionStorage.getItem("blazingToken") !== null) {
      dispatch(login());
    }
  };

  const stage = useSelector((state) => state?.becomeSeller?.currentState) ?? 0;
  const submittedDetails = useSelector(
    (state) => state?.becomeSeller?.submittedDetails
  );
  const toast = useSelector((state) => state?.toast?.toast);

  const handleOnClick = () => {
    setActive(!active);
  };

  useEffect(() => {
    categoryApi(dispatch);
    authFunc();
    // getServiceApi(dispatch);
  }, []);

  useEffect(() => {
    let profileInterval = setInterval(() => {
      let profileData = sessionStorage.getItem("blazingUser");
      if (profileData) {
        profileData = JSON.parse(profileData);
        setProfile(profileData);
        clearInterval(profileInterval);
      }
    }, 10);
  }, []);

  useEffect(() => {
    if (profile) {
      handleProfileImage();
    }
  }, [profile]);

  useEffect(() => {
    if (toggle) {
      handleStoreAndVendorToggle("seller");
    }
  }, [toggle]);

  const handleProfileImage = () => {
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
          src={"/static/img/no-image-new.svg"}
          alt="Profile"
        />
      );
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    dispatch(logOut());
    dispatch(
      show({
        message: "Successfully logged out",
        type: "success",
      })
    );
    Router.push("/");
    window.location.href = "/";
  };

  const handleChangePageToHome = () => {
    window.location.href = "/";
  };

  const handleSearchValue = (e) => {
    dispatch(searchRequest(e.target.value));
  };

  const handeGoToChat = () => {
    chatLogin();
  };

  // =================== handle check user login toggle buttun ====================
  const handleCheckUserLoginForVendor = () => {
    if (profile?.isVendor && auth?.isLoggedIn) {
      return (
        <>
          <label className="switch toggle-switch darkBlue">
            <input
              type="checkbox"
              onChange={(e) => {
                setToggle((prev) => !prev);
              }}
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
      if (auth?.isLoggedIn) {
        return (
          <>
            {!stepState.includes(pageName) ? (
              <Link href="/become-seller/guidelines">
                <a className="border-btn flex flex-center justify-center become">
                  Become a Seller
                </a>
              </Link>
            ) : null}
          </>
        );
      } else {
        return (
          <>
            {!stepState.includes(pageName) ? (
              <Link href="/account/login">
                <a className="flex flex-center justify-center become Link">
                  Become a Seller
                </a>
              </Link>
            ) : null}
          </>
        );
      }
    }
  };
  // ==============================================================================

  // user information

  // ==============================================================================

  // ======================= handle check vendor and store ========================
  const handleStoreAndVendorToggle = () => {
    dispatch(vendorAuth());
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

  return (
    <header>
      <div className="inner-container flex flex-wrap flex-center space-between">
        <div className="left flex flex-wrap flex-center">
          <div className="logo">
            <a onClick={handleChangePageToHome}>
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
                        <h1>Notification</h1>
                      </div>
                      <Notifications
                        notifications={notifications.slice(0, 3)}
                      />
                      {notifications.length > 3 && (
                        <li className="seeAll">
                          <Link href="/notifications">
                            <a>{`See All (${notificationsUnreadCount} Unread)`}</a>
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
                    <span className="profileImage">{handleProfileImage()}</span>
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
      {!!toast.message && <TostMessage data={toast}></TostMessage>}
    </header>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(HeaderDefault);
