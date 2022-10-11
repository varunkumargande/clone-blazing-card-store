import React, { useState, useEffect, useRef } from "react";
import Router, { useRouter } from "next/router";
import Header from "../../components/partials/LandingPage/Header";
import MobileHeader from "../../components/partials/LandingPage/MobileHeader";
import HeaderDefault from "../../components/shared/headers/HeaderDefault";
import IconLike from "../../components/Icons/IconLike";
import IconBack from "../../components/Icons/IconBack";
import Footer from "../../components/partials/LandingPage/Footer";
import IconShareFacebook from "../../components/Icons/IconShareFacebook"
import IconShareTwitter from "../../components/Icons/IconShareTwitter";
import IconShareWhatsup from "../../components/Icons/IconShareWhatsup";
import { useSelector, useDispatch } from "react-redux";

import { subcatstreamDetailApi } from "../../api/stream/subStreamDetail";
import ProfileMethods from "../../api/profile/ProfileMethods";
import PublicProfileConstants from "../../components/Constants/publicProfile";
import StreamCard from "../../components/elements/StreamCard";
import Followers from "../../components/partials/Profile/Followers";
import DefaultServices from "../../components/Services/DefaultServices";



export default function PublicProfile() {
    const router = useRouter();
    const [active, setActive] = useState(false);
    const [userId, setUserId] = useState(null);
    const [profile, setProfile] = useState(null);
    const [upcomingShows, setUpcomingShows] = useState([]);
    const [previousShows, setPreviousShows] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [likedShows, setLikedShows] = useState([]);
    const [tabs, setTabs] = useState(null);
    const [activeTab, setActiveTab] = useState(tabs && tabs.length > 0 ? tabs[0].key : "");

    const wrapperRef = useRef(null);

    const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setActive(false)
        }
    }

    const getAllBuyerDetails = () => {
        ProfileMethods.GetLikedStreams(userId, setLikedShows);
        ProfileMethods.GetUserFollowers(userId, setFollowers);
        ProfileMethods.GetUserFollowings(userId, setFollowing);
    }

    const getAllVendorDetails = () => {
        ProfileMethods.GetScheduledStreams(userId, setUpcomingShows)
        ProfileMethods.GetLikedStreams(userId, setLikedShows);
        ProfileMethods.GetPreviousStreams(userId, setPreviousShows)
        ProfileMethods.GetUserFollowers(userId, setFollowers);
        ProfileMethods.GetUserFollowings(userId, setFollowing);
    }

    useEffect(() => {
        
        if(router.query.userId) {
            
            setUserId(router.query.userId);
        }
    }, [router.query])

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, false)
        return () => {
            document.removeEventListener('click', handleClickOutside, false)
        }
    }, [])

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
    }, [profile])

    useEffect(() => {
        if (tabs && tabs.length > 0) {
            setActiveTab(tabs[0].key);
        }
    }, [tabs])

    const [windowWidth, setWindowWidth] = useState(0);
    let resizeWindow = () => {
        setWindowWidth(window.innerWidth);
    };

    const dispatch = useDispatch();
    useEffect(() => {
        subcatstreamDetailApi(dispatch)
    }, [])

    useEffect(() => {
        resizeWindow();
        window.addEventListener("resize", resizeWindow);
        return () => window.removeEventListener("resize", resizeWindow);
    }, []);

    const UpcomingShowsComponent = () => {
        if (upcomingShows) {
            if(upcomingShows.length > 0) {
                return (
                    <>
                        {upcomingShows.map((show, index) => (
                            <StreamCard detail={show} />
                        ))}
                    </>
                )
            } else {
                return <div className="no-record flex justify-center">No Data found</div>;
            }
        }
        return false;
    }

    const PreviousShowsComponent = () => {
        if (previousShows) {
            if(previousShows.length > 0) {
                return (
                    <>
                        {previousShows.map((show, index) => (
                            <StreamCard detail={show} />
                        ))}
                    </>
                )
            } else {
                return <div className="no-record flex justify-center">No Data found</div>;
            }
        }
        return false;
    }

    const LikedShowsComponent = () => {
        if (likedShows) {
            if(likedShows.length > 0) {
                return (
                    <>
                        {likedShows.map((show, index) => (
                            <StreamCard detail={show} />
                        ))}
                    </>
                )
            } else {
                return <div className="no-record flex justify-center">No Data found</div>;
            }
        }
        return false;
    }

    const ProfileComponent = (isForFollower) => {
        if (isForFollower) {
            if (followers) {
                if (followers.length > 0) {
                    return (
                        <>
                            {followers.map((details, index) => (
                                <Followers person={details} isFollower={isForFollower} />
                            ))}
                        </>
                    )
                } else {
                    return <div className="no-record flex justify-center">No Data found</div>;
                }
            }
        } else {
            if (following) {
                if (following.length > 0) {
                    return (
                        <>
                            {following.map((details, index) => (
                                <Followers person={details} isFollower={isForFollower} />
                            ))}
                        </>
                    )
                } else {
                    return <div className="no-record flex justify-center">No Data found</div>;
                }
            }
        }
        return false;
    }

    const renderTab = (tab, key) => {
        return (
            <div className="category-list" key={key}>
                <button onClick={() => { setActiveTab(tab.key); }} className={`title ${activeTab === tab.key && "active"}`}>{tab.title}({renderTabContentCount(tab.key)})</button>
            </div>
        )
    }

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
    }

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
    }

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
    }

    return (
        <div className="home-container profile-container-wrap">
            {windowWidth <= 1024 ? <div className="profile-title flex flex-center"><div className="edit-back"><IconBack /></div>Profile</div> : <HeaderDefault />}
            <section className="category-banner">
                <img src="/static/images/cover.png" alt="cover" />
            </section>
            <div className="card-wrapper">
                <section className="Live-wrapper card-inner">
                    <div className="inner-container">
                        <div className="aside-content-wrap profile-wrapper flex flex-start space-between">
                            <aside className="aside-wrapper profile-aside">
                                <div className="aside-container profile-container">
                                    <div className="profile-icon">
                                        <img width="124" height="124" style={{ borderRadius:"50%" }} src={DefaultServices.GetFullImageURL(profile, "profile", "124", "124")} alt="profileImg" />
                                    </div>
                                    <div className="title flex column">
                                        {renderProfileName()}
                                        <span>@{profile && (profile.username)}</span>
                                    </div>
                                    <div className="flex justify-center">
                                        <button className="primary-btn follow-btn">Follow</button>
                                        <button className="border-btn edit-profile-btn">Message</button>
                                    </div>
                                    {profile && profile.bio && (<p className="description">{profile.bio}</p>)}
                                    <div className="social-icons-wrapper">
                                        <div className="social-border"></div>
                                        <ul className="social-icons flex">
                                            {/* {profile && profile.facebookUrl && (<li><IconShareFacebook /></li>)}
                                            {profile && profile.twitterUrl && (<li><IconShareTwitter /></li>)} */}
                                            <li><IconShareFacebook /></li>
                                            <li><IconShareTwitter /></li>
                                            <li> <IconShareWhatsup /></li>
                                        </ul>
                                    </div>
                                </div>
                            </aside>
                            <div className="overflow-none">
                                <section className="category-wrapper cotegories-border mb35">
                                    <div className="overflow-wrap">
                                        <div className="Category-list-wrap inner-container flex">
                                            {tabs && (
                                                tabs.map((tab, index) => (renderTab(tab, index)))
                                            )}
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