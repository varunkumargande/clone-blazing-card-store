import React, { useState, useEffect, useRef } from "react";
import IconShareFacebook from "../../../../components/Icons/IconShareFacebook";
import IconShareTwitter from "../../../../components/Icons/IconShareTwitter";
import IconShareWhatsup from "../../../../components/Icons/IconShareWhatsup";
import { useDispatch, connect, useSelector } from "react-redux";
import Router from "next/router";
import Link from "next/link";
import {
    LineShareButton,
    LineIcon,
  } from 'next-share';

function ProfileCard(props) {
  const handleGoToEditProfile = () => {
    Router.push("/account/editprofile");
  };

  const [userDetail, setUserDetail] = useState();

  useEffect(() => {
    if (sessionStorage.getItem("spurtUser")) {
      setUserDetail(JSON.parse(sessionStorage.getItem("spurtUser")));
    }
  }, []);

  const handleProfileImage = () => {
    if (userDetail != null) {
      return (
        <>
          <img
            src={
              userDetail.avatar != null
                ? `https://blazing-card-backend-dev.kellton.net/api/media/image-resize?path=${profileData.avatarPath}&name=${profileData.avatar}&width=300&height=300`
                : "/static/images/profile-lg-image.png"
            }
            alt="ProfileImg"
          />
        </>
      );
    }
  };

  const handleUserName = () => {
    if (userDetail != null) {
      return (
        <>
          {userDetail.firstName} {userDetail.lastName}
          <span>{userDetail.username}</span>
        </>
      );
    }
  };

  const handleBio = () => {
    if (userDetail != null) {
      return (
        <>
          <p className="description">{userDetail.bio}</p>
        </>
      );
    }
  };

  const handleSocialLink = () => {
    if (userDetail != null) {
      return (
        <>
          <ul className="social-icons flex">
            <li>
              <a href={userDetail.twitterUrl}>
                {" "}
                <IconShareFacebook />{" "}
              </a>
            </li>
            <li>
              <a>
                {" "}
                <IconShareTwitter />
              </a>
            </li>
            {/* <li>
              {" "}
              <IconShareWhatsup />
            </li> */}
          </ul>
        </>
      );
    }
  };

  const handleGoToSociaLink = (link) => {
    window.location.href = link;
  };

  return (
    <>
      <aside className="aside-wrapper profile-aside">
        <div className="aside-container profile-container">
          <div className="profile-icon">{handleProfileImage()}</div>
          <div className="title flex column">{handleUserName()}</div>
          {/* <button className="primary-btn follow-btn">Follow</button> */}
          <button
            onClick={handleGoToEditProfile}
            className="border-btn edit-profile-btn"
          >
            Edit Profile
          </button>
          {handleBio()}
          <div className="social-icons-wrapper">
            <div className="social-border"></div>
            {handleSocialLink()}
          </div>
        </div>
      </aside>
    </>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(ProfileCard);
