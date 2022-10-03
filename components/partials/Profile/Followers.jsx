import React from "react";

export default function Followers(props) {
    const {
        person,
        isFollower
    } = props;
    const renderProfileName = () => {
        if (person) {
            let name = "";
            if(isFollower) {
                if (person.follower_first_name) {
                    name += person.follower_first_name;
                }
                if (person.follower_last_name) {
                    name += " " + person.follower_last_name;
                }
            } else {
                if (person.firstName) {
                    name += person.firstName;
                }
                if (person.lastName) {
                    name += " " + person.lastName;
                }
            }
            return name;
        }
        return null;
    }
    return(
        <>
            <div className="card-list flex flex-center">
                <div className="profile text-center">
                    <img src="/static/images/profile-large.svg" alt="Card" />
                    <div className="f-title">{renderProfileName()}</div>
                    <div className="f-digi">@{person.follower_username}</div>
                    <div className="follow-button-wrapper">
                        <button className="primary-btn">Follow</button>
                    </div>
                </div>
            </div>
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