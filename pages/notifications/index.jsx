import React, { useEffect, useState } from 'react';
import NotificationMethods from '../../api/notification/NotificationMethods';
import Notifications from '../../components/partials/Notifications/Notifications';

const notifications = () => {
    const [notifications, setNotifications] = useState([]);
    useEffect(() => {
        NotificationMethods.GET_ALL_NOTIFICATION(setNotifications)
    }, [])
    
    return(
        <div className="notification-wrapper">
            <div className="head-title flex space-between flex-center">
                <h1>Notification</h1>
            </div>
            <Notifications notifications={notifications} />
         </div>
    );
}

export default notifications;