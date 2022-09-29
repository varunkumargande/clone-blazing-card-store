import React from "react";
export default function Followers(){
    return(
        <>
            <div className="card-list flex flex-center">
                <div className="profile text-center">
                    <img src="/static/images/profile-large.svg" alt="Card" />
                    <div className="f-title">Alejandro Bronco Felix</div>
                    <div className="f-digi">@felix.bronco</div>
                    <div className="follow-button-wrapper">
                        <button className="primary-btn">Follow</button>
                    </div>
                </div>
            </div>
            <div className="card-list flex flex-center">
                <div className="profile text-center">
                    <img src="/static/images/profile-large.svg" alt="Card" />
                    <div className="f-title">Stephen Curry</div>
                    <div className="f-digi">@felix.bronco</div>
                    <div className="follow-button-wrapper">
                        <button className="border-btn">Following</button>
                    </div>
                </div>
            </div>
        </>
    );
}