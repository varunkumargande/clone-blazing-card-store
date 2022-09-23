import React, { useState, useEffect, useRef } from "react";
import IconShareFacebook from "../../../../components/Icons/IconShareFacebook"
import IconShareTwitter from "../../../../components/Icons/IconShareTwitter";
import IconShareWhatsup from "../../../../components/Icons/IconShareWhatsup";
import { useDispatch, connect, useSelector } from 'react-redux';

function ProfileCard(props) {

    const [userDetail, setUserDetail] = useState()

    useEffect(()=>{
        if(sessionStorage.getItem("spurtUser")){
            setUserDetail(JSON.parse(sessionStorage.getItem("spurtUser"))) 
        }
    },[])

    return (
        <>
            <aside className="aside-wrapper profile-aside">
                <div className="aside-container profile-container">
                    <div className="profile-icon">
                        <img src="/static/images/profile-large.svg" alt="profileImg" />
                    </div>
                    <div className="title flex column">
                        {userDetail.firstName != null ? userDetail.firstName : ""} {userDetail.lastName != null ? userDetail.lastName : ""}
                        <span>{userDetail.username != null ? userDetail.username : ""}</span>
                    </div>
                    {/* <button className="primary-btn follow-btn">Follow</button> */}
                    <button className="border-btn edit-profile-btn">Edit Profile</button>
                    <p className="description"> 
                        Add our new 'Hire Me' section to your profile to let
                        visitors know that you're looking for new opportunities.
                        Add our new 'Hire Me' section to your profile to let visitors
                        know that you're looking.
                    </p>
                    <div className="social-icons-wrapper">
                        <div className="social-border"></div>
                        <ul className="social-icons flex">
                            <li><IconShareFacebook /></li>
                            <li><IconShareTwitter /></li>
                            <li> <IconShareWhatsup /></li>
                        </ul>
                    </div>
                </div>
            </aside>
        </>
    );
}

const mapStateToProps=state=>{
    return state;

}

export default connect(mapStateToProps)(ProfileCard);