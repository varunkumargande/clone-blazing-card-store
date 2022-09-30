import React from "react";
import IconAddChat from "../../Icons/IconAddChat";
export default function ProfilePannel(){
    return(
        <div className="profile-wrapper">
            {/* <div className=" static-content flex justify-center flex-center column">
                <p>Send private messages, photos, or videos to a friend or seller.</p>
            </div> */}
            <div className="profile-title-wrap flex space-between flex-center">
                <div className="title"><span>2</span>New Message</div>
                <button className="btn-chat flex flex-center justify-center br50"><IconAddChat /></button>
            </div>
            <div className="profile-chat-list-wrap">
                <div className="profile-chat-list flex space-between">
                    <div className="profile-image-title flex flex-center">
                        <div className="image br50">
                            <img src="/static/images/profile-lg-image.png" alt="" />
                        </div>
                        <div className="profile-text">
                            <div className="name">Alexa Licester <span className="new"></span></div>
                            <div className="time">Just Now</div>
                        </div>
                    </div>
                    <div className="option">
                        <button className="three-dot flex flex-center justify-center column"><span></span><span></span><span></span></button>
                    </div>
                </div>
                <div className="profile-chat-list flex space-between">
                    <div className="profile-image-title flex flex-center">
                        <div className="image br50">
                            <img src="/static/images/profile-lg-image.png" alt="" />
                        </div>
                        <div className="profile-text">
                            <div className="name">Alexa Licester</div>
                            <div className="time">Just Now</div>
                        </div>
                    </div>
                    <div className="option">
                        <button className="three-dot flex flex-center justify-center column"><span></span><span></span><span></span></button>
                    </div>
                </div>
                <div className="profile-chat-list flex space-between">
                    <div className="profile-image-title flex flex-center">
                        <div className="image br50">
                            <img src="/static/images/profile-lg-image.png" alt="" />
                        </div>
                        <div className="profile-text">
                            <div className="name">Alexa Licester</div>
                            <div className="time">Just Now</div>
                        </div>
                    </div>
                    <div className="option">
                        <button className="three-dot flex flex-center justify-center column"><span></span><span></span><span></span></button>
                    </div>
                </div>
            </div>
        </div>
    );
}