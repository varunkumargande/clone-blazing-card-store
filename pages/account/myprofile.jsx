import React, { useState, useEffect, useRef } from "react";
import Footer from "../../components/partials/LandingPage/Footer";
import HeaderDefault from "../../components/shared/headers/HeaderDefault";
import Router, { useRouter } from "next/router";
import IconShareFacebook from "../../components/Icons/IconShareFacebook";
import IconShareTwitter from "../../components/Icons/IconShareTwitter";
import IconShareWhatsup from "../../components/Icons/IconShareWhatsup";
import StreamCard from "../../components/elements/StreamCard";
import ProfileMethods from "../../api/profile/ProfileMethods";
import { connect, useSelector } from "react-redux";
import PublicProfileConstants from "../../components/Constants/publicProfile";
import Link from "next/link";
import Followers from "../../components/partials/Profile/Followers";
import CloudinaryImage from "../../components/CommonComponents/CloudinaryImage";
import { ImageTransformation } from "../../components/Constants/imageTransformation";
import BackButton from "../../components/CommonComponents/BackButton";
import { useIsMobile } from "../../contexts/Devices/CurrentDevices";
import { DefaultImagePath } from "../../components/Constants/defaultImage";

function MyProfile(props) {
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [active, setActive] = useState(false);
  const [userId, setUserId] = useState(null);
  const [profile, setProfile] = useState(null);
  const [upcomingShows, setUpcomingShows] = useState([]);
  const [previousShows, setPreviousShows] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [likedShows, setLikedShows] = useState([]);
  const [tabs, setTabs] = useState(null);

  const [activeTab, setActiveTab] = useState(
    tabs && tabs.length > 0 ? tabs[0].key : ""
  );
  const wrapperRef = useRef(null);
  const dislikedStreams = useSelector(
    (state) => state?.likeDislikeStream?.dislikedData
  );

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setActive(false);
    }
  };
  const [isOpenFollowUnfollow, setIsOpenFollowUnfollow] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("blazingUser"));
    setUserId(userData?.id);
    setProfile(userData);
  }, []);

  useEffect(() => {
    let currentLikedShows = likedShows;
    dislikedStreams.map((streamID) => {
      currentLikedShows = currentLikedShows.filter(
        (show) => show.uuid !== streamID
      );
    });
    setLikedShows(currentLikedShows);
  }, [dislikedStreams]);

  const getSessionUser = () => {
    const user = JSON.parse(localStorage.getItem("blazingUser"));
    return user;
  };

  const getAllBuyerDetails = () => {
    const loggedInUserId = getSessionUser().id;
    ProfileMethods.GetLikedStreams(userId, setLikedShows, setLoader);
    ProfileMethods.GetUserFollowers(userId, setFollowers, loggedInUserId);
    ProfileMethods.GetUserFollowings(userId, setFollowing, loggedInUserId);
  };

  const getAllVendorDetails = () => {
    const loggedInUserId = getSessionUser().id;
    ProfileMethods.GetScheduledStreams(userId, setUpcomingShows);
    ProfileMethods.GetLikedStreams(userId, setLikedShows, setLoader);
    ProfileMethods.GetPreviousStreams(userId, setPreviousShows);
    ProfileMethods.GetUserFollowers(userId, setFollowers, loggedInUserId);
    ProfileMethods.GetUserFollowings(userId, setFollowing, loggedInUserId);
  };

  useEffect(() => {
    if (router.query.userId) {
      setUserId(router.query.userId);
    }
  }, [router.query]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  useEffect(() => {
    if (userId) {
      ProfileMethods.GetPublicProfile(userId, setProfile);
    }
  }, [userId]);

  useEffect(() => {
    if (profile) {
      if (profile.isVendor) {
        setTabs(PublicProfileConstants.VendorTabs);
        getAllVendorDetails();
      } else {
        setTabs(PublicProfileConstants.BuyerTabs);
        getAllBuyerDetails();
      }
    }
  }, [profile]);

  useEffect(() => {
    if (tabs && tabs.length > 0) {
      setActiveTab(tabs[0].key);
    }
  }, [tabs]);

  const { isMobile } = useIsMobile();

  const UpcomingShowsComponent = () => {
    if (upcomingShows) {
      if (upcomingShows.length > 0) {
        return (
          <>
            {upcomingShows.map((show, index) => (
                <StreamCard detail={show} key={`upcoming-myprofile-${show?.id}`}/>
            ))}
          </>
        );
      } else {
        return (
          <div className="no-record flex justify-center">No Data found</div>
        );
      }
    }
    return false;
  };

  const PreviousShowsComponent = () => {
    if (previousShows) {
      if (previousShows.length > 0) {
        return (
          <>
            {previousShows.map((show, index) => (
                <StreamCard detail={show} key={`previousshows-myprofile-${show?.id}`}/>
            ))}
          </>
        );
      } else {
        return (
          <div className="no-record flex justify-center">No Data found</div>
        );
      }
    }
    return false;
  };

  const LikedShowsComponent = () => {
    if (likedShows) {
      if (likedShows.length > 0) {
        return likedShows.map((show) => <StreamCard detail={show} />);
      } else {
        return (
          <div className="no-record flex justify-center">No Data found</div>
        );
      }
    }
    return false;
  };

  const ProfileComponent = (isForFollower) => {
    if (isForFollower) {
      if (followers) {
        if (followers.length > 0) {
          return (
            <>
              {followers.map((details, index) => (
                <React.Fragment
                  key={`follower-myprofile-${index}-${details?.id}`}
                >
                  <Followers
                    person={details}
                    isFollower={isForFollower}
                    setIsOpenFollowUnfollow={setIsOpenFollowUnfollow}
                    setFollowing={setFollowers}
                    following={followers}
                  />
                </React.Fragment>
              ))}
            </>
          );
        } else {
          return (
            <div className="no-record flex justify-center">No Data found</div>
          );
        }
      }
    } else {
      if (following) {
        if (following.length > 0) {
          return (
            <>
              {following.map((details, index) => (
                <React.Fragment
                  key={`following-myprofile-${index}-${details?.id}`}
                >
                  <Followers
                    person={details}
                    isFollower={isForFollower}
                    setIsOpenFollowUnfollow={setIsOpenFollowUnfollow}
                    setFollowing={setFollowing}
                    following={following}
                  />
                </React.Fragment>
              ))}
            </>
          );
        } else {
          return (
            <div className="no-record flex justify-center">No Data found</div>
          );
        }
      }
    }
    return false;
  };

  const renderTab = (tab, key) => {
    const loggedInUserId = getSessionUser().id;
    return (
      <div className="category-list" key={key}>
        <button
          onClick={(e) => {
            e.preventDefault();
            setActiveTab(tab.key);
            if (tab.key === "followers") {
              ProfileMethods.GetUserFollowers(
                userId,
                setFollowers,
                loggedInUserId
              );
            } else if (tab.key === "following") {
              ProfileMethods.GetUserFollowings(
                userId,
                setFollowing,
                loggedInUserId
              );
            }
          }}
          className={`title ${activeTab === tab.key && "active"}`}
        >
          {tab.title}({renderTabContentCount(tab.key)})
        </button>
      </div>
    );
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "upcoming-shows":
        return UpcomingShowsComponent();
      case "previous-shows":
        return PreviousShowsComponent();
      case "upcoming-shows":
        return UpcomingShowsComponent();
      case "followers":
        return ProfileComponent(true);
      case "following":
        return ProfileComponent(false);
      case "liked-shows":
        return LikedShowsComponent();
      default:
        return null;
    }
  };

  const renderTabContentCount = (tab) => {
    switch (tab) {
      case "upcoming-shows":
        return upcomingShows.length;
      case "previous-shows":
        return previousShows.length;
      case "followers":
        return followers.length;
      case "following":
        return following.length;
      case "liked-shows":
        return likedShows.length;
      default:
        return null;
    }
  };

  const renderProfileName = () => {
    if (profile) {
      let name = "";
      if (profile.firstName) {
        name += profile.firstName;
      }
      if (profile.lastName) {
        name += " " + profile.lastName;
      }
      return name;
    }
    return null;
  };

  const handleRoutingToEditProfile = () => {
    Router.push("/account/editprofile");
  };

  const handleProfileImage = () => {
    if (!!profile?.avatarPath && !!profile?.avatar) {
      return (
        <>
          <CloudinaryImage
            imageUrl={`${profile.avatarPath}/${profile.avatar}`}
            keyId={`${profile.avatarPath}/${profile.avatar}`}
            transformation={ImageTransformation.profilePageImage}
            alternative="profileImg"
          />

          {/* ToDo: Need to remove old image code. Keeping it right now for reference  */}
          {/* <img
            style={{ borderRadius: "50%" }}
            width="123"
            height="123"
            src={
              imageUrl +
              "?path=" +
              profile.avatarPath +
              "&name=/" +
              profile.avatar +
              "&width=500&height=500"
            }
            alt="profileImg"
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
          src={DefaultImagePath.defaultProfileImage}
          alt="Profile"
          className="error"
        />
      );
    }
  };

  return (
    <div className="home-container profile-container-wrap">
      {isMobile ? (
        <div className="profile-title flex flex-center">
          <BackButton name={"Profile"} />
        </div>
      ) : (
        <HeaderDefault />
      )}
      <section className="category-banner">
        <img src="/static/images/cover.png" alt="cover" />
      </section>
      <div className="card-wrapper">
        <section className="Live-wrapper card-inner">
          <div className="inner-container">
            <div className="aside-content-wrap profile-wrapper flex flex-start space-between">
              <aside className="aside-wrapper profile-aside">
                <div className="aside-container profile-container">
                  <div className="profile-icon">{handleProfileImage()}</div>
                  <div className="title flex column">
                    {renderProfileName()}
                    <span>@{profile && profile?.username}</span>
                  </div>
                  <div className="flex justify-center">
                    <button
                      className="border-btn edit-profile-btn"
                      onClick={() => handleRoutingToEditProfile()}
                    >
                      Edit Profile
                    </button>
                  </div>
                  {profile && profile?.bio && (
                    <p className="description">{profile?.bio}</p>
                  )}
                  <div className="social-icons-wrapper">
                    <div className="social-border"></div>
                    <ul className="social-icons flex">
                      {profile?.facebookUrl && (
                        <li>
                          <Link href={profile?.facebookUrl}>
                            <a
                              target={profile?.facebookUrl ? "_blank" : "_self"}
                              rel="noopener noreferrer"
                            >
                              <IconShareFacebook />
                            </a>
                          </Link>
                        </li>
                      )}
                      {profile?.twitterUrl && (
                        <li>
                          <Link href={profile?.twitterUrl}>
                            <a
                              target={profile?.twitterUrl ? "_blank" : "_self"}
                              rel="noopener noreferrer"
                            >
                              <IconShareTwitter />
                            </a>
                          </Link>
                        </li>
                      )}
                      {profile?.mobileNumber && (
                        <li>
                          <Link
                            href={`https://api.whatsapp.com/send?phone=${profile.mobileNumber}`}
                          >
                            <a
                              target={
                                profile?.mobileNumber ? "_blank" : "_self"
                              }
                              rel="noopener noreferrer"
                            >
                              <IconShareWhatsup />
                            </a>
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </aside>
              <div className="overflow-none">
                <section className="category-wrapper cotegories-border mb35">
                  <div className="overflow-wrap">
                    <div className="Category-list-wrap inner-container flex">
                      {tabs && tabs.map((tab, index) => renderTab(tab, index))}
                    </div>
                  </div>
                </section>
                <div className="card-wrap flex inner-container">
                  {renderActiveTabContent()}
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

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(MyProfile);
