import React from 'react';
import Notifications from '../../components/partials/Notifications/Notifications';

export default function notifications(){
    return(
        <div className="notification-wrapper">
            <div className="head-title flex space-between flex-center">
                <h1>Notification</h1>
                <div className="unread">Show All Unread</div>
            </div>
            <Notifications />
         </div>
    );
}