import React from "react";
import IconChat from "../../Icons/IconChat";
import IconGallery from "../../Icons/IconGallery";
export default function ChatPannel(){
    return(
        <div className="right-pannel">
            {/* <div className=" static-content flex justify-center flex-center column">
                <p>No message found</p>
                <button className="primary-btn">New Message</button>
            </div> */}
            <div className="profile-header-title flex flex-center">
                <div className="image">
                    <img src="/static/images/profile-lg-image.png" alt="" />
                </div>
                <div className="profile-text">
                    <div className="name">Alexa Licester <span className="new"></span></div>
                    <div className="time">Just Now</div>
                </div>
            </div>
            <div className="chat-box-wrap">
                <div className="chat-box flex justify-right column">
                    <div className="chat-wrap left">
                        <div className="chat">
                            Hello
                        </div>
                        <div className="time">
                            9:23 PM
                        </div>
                    </div>
                    <div className="chat-wrap right">
                        <div className="chat">
                            Hello
                        </div>
                        <div className="time">
                            9:23 PM
                        </div>
                    </div>
                </div>
            </div>
            <div className="input-chat flex space-between flex-center">
                <input type="text" placeholder="Start conversation..." />
                <button className="g-btn"><IconGallery/></button>
                <button className="chat-btn flex flex-center justify-center br50"><IconChat/></button>
            </div>
        </div>
    );
}