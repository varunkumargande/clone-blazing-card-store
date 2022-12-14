import { useRouter } from "next/router";
import React, { useState } from "react";
import ProfileMethods from "../../../api/profile/ProfileMethods";
import CloudinaryImage from "../../CommonComponents/CloudinaryImage";
import {
  ImageTransformation,
  DefaultImagePath,
} from "../../Constants/imageConstants";
import DefaultServices from "../../Services/DefaultServices";
import { UnfollowModalMultiple } from "../Modal/Modal";

export default function Followers(props) {
  const { person, isFollower, setFollowing, setFollower, following, follower } =
    props;
  const [key, setKey] = useState(1);
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isOpenFollowUnfollow, setIsOpenFollowUnfollow] = useState(false);

  const getSessionUser = () => {
    const user = JSON.parse(localStorage.getItem("blazingUser"));
    return user;
  };
  const getPathname = () => {
    return router?.pathname;
  };
  const renderProfileName = () => {
    if (person) {
      let name = "";
      if (isFollower) {
        if (person.follower_first_name) {
          name += person.follower_first_name;
        }
        if (person.follower_last_name) {
          name += " " + person.follower_last_name;
        }
      } else {
        if (person.following_first_name) {
          name += person.following_first_name;
        }
        if (person.following_last_name) {
          name += " " + person.following_last_name;
        }
      }
      return name;
    }
    return null;
  };
  const handleFollowUnfollow = (profileId, isFollowed) => {
    const userId = getSessionUser().id;
    const pathname = getPathname();
    if (pathname && !!router?.query?.userId) {
      pathname = "/profile";
    } else if (router?.pathname === "/account/myprofile") {
      pathname = "/account/myprofile";
    }
    if (!!userId) {
      if (isFollowed) {
        setIsOpenFollowUnfollow(true);
      } else {
        ProfileMethods.FollowUser(
          userId,
          profileId,
          setFollowing,
          following,
          setIsOpenFollowUnfollow,
          pathname
        );
      }
    }
  };
  return (
    <>
      <div className="card-list flex flex-center">
        <div className="profile text-center">
          {DefaultServices?.GetFullImageURL(person, "vendor") !==
          DefaultImagePath.defaultImage ? (
            <CloudinaryImage
              imageUrl={DefaultServices?.GetFullImageURL(person, "vendor")}
              keyId={DefaultServices?.GetFullImageURL(person, "vendor")}
              transformation={ImageTransformation.followersCard}
              alternative={"Card"}
            />
          ) : (
            <span className="Image">
              <img
                onError={() => {
                  currentTarget.onerror = null;
                  currentTarget.src = "/static/images/profileImg.png";
                }}
                src={DefaultImagePath.defaultProfileImage}
                alt="Profile"
                className="error"
              />
            </span>
          )}
          {/* <img style={{ borderRadius:"50%" }} width="115" height="115" src={DefaultServices.GetFullImageURL(person, "vendor", "115", "115")} alt="Card" /> */}
          <div className="f-title">{renderProfileName()}</div>
          <div className="f-digi">
            @
            {person &&
              (isFollower
                ? person.follower_username
                : person.following_username)}
          </div>
          <div className="follow-button-wrapper">
            <button
              className={
                (!!person?.is_user_followed &&
                  !!person?.f_id &&
                  getPathname() === "/account/myprofile") ||
                person?.f_follower_id === getSessionUser()?.id
                  ? "disable primary-btn"
                  : "primary-btn"
              }
              onClick={(e) => {
                e.preventDefault();
                handleFollowUnfollow(
                  person?.following_id ?? person?.f_follower_id,
                  person?.is_user_followed
                );
              }}
            >
              {person?.is_user_followed === 1 ? "Following" : "Follow"}
            </button>
          </div>
        </div>
      </div>
      {isOpenFollowUnfollow && (
        <UnfollowModalMultiple
          profile={person}
          setIsOpenFollowUnfollow={setIsOpenFollowUnfollow}
          profileMethods={ProfileMethods}
          following={following}
          setFollowing={setFollowing}
          pathname={getPathname()}
        />
      )}
      {/* <div className="card-list flex flex-center">
                <div className="profile text-center">
                    <img src="/static/images/profile-large.svg" alt="Card" />
                    <div className="f-title">Stephen Curry</div>
                    <div className="f-digi">@felix.bronco</div>
                    <div className="follow-button-wrapper">
                        <button className="border-btn">Following</button>
                    </div>
                </div>
            </div> */}
    </>
  );
}
