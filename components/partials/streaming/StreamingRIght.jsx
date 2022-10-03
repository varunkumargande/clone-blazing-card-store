import React from "react";
import IconChat from "../../Icons/IconChat";
export default function StreamingRIght(){
    return(
        <div className="streaming-right">
            <div className="chat-wrap">
                <div className="chat-inner-wrap flex column justify-right">
                    <div className="flex flex-center chat">
                        <div className="chat-img br50"><img src="/static/images/profile.png" alt="profile" /></div>
                        <div className="chat-text-wrap">
                            <div className="name">shaliene_woodley</div>
                            <div className="chat">yes! yes! yes! yes! yes! yes!</div>
                        </div>
                    </div>
                    <div className="flex flex-center chat">
                        <div className="chat-img br50"><img src="/static/images/profile.png" alt="profile" /></div>
                        <div className="chat-text-wrap">
                            <div className="name">shaliene_woodley</div>
                            <div className="chat">yes! yes! yes! yes! yes! yes!</div>
                        </div>
                    </div>
                    <div className="flex flex-center chat">
                        <div className="chat-img br50"><img src="/static/images/profile.png" alt="profile" /></div>
                        <div className="chat-text-wrap">
                            <div className="name">shaliene_woodley</div>
                            <div className="chat">yes! yes! yes! yes! yes! yes!</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="input-chat">
                <input type="text" placeholder="Search products..." />
                <button className="chat-btn flex flex-center justify-center br50"><IconChat/></button>
            </div>
        </div>
    );
}