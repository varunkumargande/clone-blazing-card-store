import React, { useState, useEffect } from "react";
import Router from "next/router";
import IconNoNotifications from "../../Icons/IconNoNotifications";
import NotificationMethods from "../../../api/notification/NotificationMethods";
import moment from "moment/moment";

const Notifications = (props) => {
  const { notifications, handleNotifications, setNotificationsUnreadCount } =
    props;

  // const OrderRecievedNotificationIcon = (notification) => {
  //   return <img src="/static/images/order-receive.svg" alt="bought" />;
  // };

  const GreetingNotificationIcon = (notification) => {
    return <img src="/static/images/bank-card-fill-new.svg" alt="bought" />;
  };

  const OrderConfirmationIcon = (notification) => {
    return <img src="/static/images/successfully.svg" alt="bought" />;
  };

  const FollowingNotificationIcon = (notification) => {
    return <img src="/static/images/bronco.svg" alt="bought" />;
  };

  const renderNotificationsIconsBasedOnType = (notification) => {
    if (notification.notify_type === "follow") {
      return FollowingNotificationIcon(notification);
    } else if (notification.notify_type === "orders") {
      return OrderConfirmationIcon(notification);
    } else if (notification.notify_type === "stream") {
      return GreetingNotificationIcon(notification);
    }
  };

  const updateElementAsRead = (data, index) => {
    const newData = [...notifications];
    newData[index].notify_seen = 1;
    setNotificationsUnreadCount(data.unreadcount);
    handleNotifications(newData);
  };

  const handleRead = (e, notification, index) => {
    e.preventDefault();
    if (notification.notify_seen === 0) {
      NotificationMethods.MARK_NOTIFICATION_AS_SEEN(
        notification.notify_id,
        (data) => {
          updateElementAsRead(data, index);
        }
      );
    }
    Router.push(notification.notify_url || "/");
  };

  const getTime = (dateTime) => {
    const currentTime = moment.utc(moment(new Date()).format("YYYY-MM-DD HH:mm:ss"));
    const createdTime = moment.utc(dateTime);
    const difference = moment.duration(currentTime.diff(createdTime));
    if(difference.days() > '2'){
      return createdTime.format("MMM D, YYYY, hh:mm:ss a");
    }
    return createdTime.fromNow();
  }
  const renderNotifications = () => {
    if (notifications && notifications.length > 0) {
      return notifications.map((notification, index) => (
        <div
          key={notification.notify_id}
          onClick={(e) => handleRead(e, notification, index)}
          className={`notifications-list flex ${
            notification.notify_seen === 1 && "active"
          }`}
        >
          <div className="cart-icon flex flex-center justify-content-center">
            {renderNotificationsIconsBasedOnType(notification)}
          </div>
          <div className="cart-description">
            <div className="text">{notification.notify_notification}</div>
            <span className="time flex flex-center">
              <img src="/static/images/time.svg" alt="bought" />
              {getTime(notification.notify_created_date)}
            </span>
          </div>
        </div>
      ));
    } else {
      return (
        <div className="noNotifications flex justify-center flex-center text-center column">
          <div className="image mb26">
            <IconNoNotifications />
          </div>
          <h3>No Notifications</h3>
        </div>
      );
    }
  };

  return <>{renderNotifications()}</>;
};

export default Notifications;
