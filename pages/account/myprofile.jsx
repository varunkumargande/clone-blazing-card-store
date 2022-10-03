import React, { useState, useEffect, useRef } from "react";
import MobileHeader from "../../components/partials/LandingPage/MobileHeader";
import IconLike from "../../components/Icons/IconLike";
import Footer from "../../components/partials/LandingPage/Footer";
import { useSelector, useDispatch } from "react-redux";
import { subcatstreamDetailApi } from "../../api/stream/subStreamDetail";
import HeaderDefault from "../../components/shared/headers/HeaderDefault";
import Router from "next/router";
// import all sub component from components/partials/account/myprofile
import ProfileBanner from "../../components/partials/account/myprofile/banner";
import ProfileCard from "../../components/partials/account/myprofile/profileCard";
import ProfileHeader from "../../components/partials/account/myprofile/profileHeader";
import StreamCard from "../../components/elements/StreamCard";
// ===================================================================

export default function MyProfile() {
  const [activeTab, setActiveTab] = useState({
    type: "buyer",
    slug: "LIKES",
  });

  const [profileBar, setProfileBar] = useState([
    {
      slug: "LIKES",
      name: "Likes Shows",
    },
    {
      slug: "FOLLOWERS",
      name: "Followers",
    },
    {
      slug: "FOLLOWING",
      name: "Following",
    },
  ]);

  const [sellerBar, setSellerBar] = useState([
    {
      slug: "UPCOMING",
      name: "Upcoming Shows",
    },
    {
      slug: "PREVIOUS",
      name: "Previous Shows",
    },
    {
      slug: "FOLLOWERS",
      name: "Followers",
    },
    {
      slug: "FOLLOWING",
      name: "Following",
    },
  ]);

  const [active, setActive] = useState(false);
  const wrapperRef = useRef(null);
  const handleOnClick = () => {
    setActive(!active);
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

  const [windowWidth, setWindowWidth] = useState(0);
  let resizeWindow = () => {
    setWindowWidth(window.innerWidth);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    subcatstreamDetailApi(dispatch);
  }, []);

  const streamDetail = useSelector(
    (state) => state?.stream?.streamdetails?.stream
  );

  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  useEffect(() => {
    if(sessionStorage.getItem("spurtUser") == null)  {
        Router.push("/")
    }
  }, []);

  const getStreamCards = () => {
    return streamDetail?.scheduled?.map((detail) => {
      return <StreamCard detail={detail} />;
    });
  };

  const handleCardList = () => {
    
  };

  return (
    <div className="home-container">
      {windowWidth <= 1024 ? <MobileHeader /> : <HeaderDefault />}
      <ProfileBanner />
      <div className="card-wrapper">
        <section className="Live-wrapper card-inner">
          <div className="inner-container">
            <div className="aside-content-wrap profile-wrapper flex flex-start space-between">
              <ProfileCard />
              <div className="overflow-none">
                <ProfileHeader
                  profileBar={profileBar}
                  setProfileBar={setProfileBar}
                  isSeller={false}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  sellerBar={sellerBar}
                  setSellerBar={setSellerBar}
                />
                <div className="card-wrap flex inner-container">
                  {/*  */}
                  {/* {handleCardList()} */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
