import React from "react";
import ProfilePannel from "../../components/partials/Messages/ProfilePannel";
import ChatPannel from "../../components/partials/Messages/ChatPannel";

export default function Messages(){
    return( 
        <div className="messages-wrapper">
            <h1>Messages</h1>
            <div className="flex space-between message-inner">
                <ProfilePannel/>
                <ChatPannel/>
            </div>
        </div>
    );
}