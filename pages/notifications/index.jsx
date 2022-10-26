import React, { useEffect, useState } from "react";
import Notifications from "../../components/partials/Notifications/Notifications";
import { useNotifications } from "../../contexts/Notifications/Notifications";
import HeaderDefault from "../../components/shared/headers/HeaderDefault";
import Footer from "../../components/partials/LandingPage/Footer";
import BackButton from "../../components/CommonComponents/BackButton";

const notifications = () => {
  const {
    notifications,
    handleNotifications,
    setNotificationsUnreadCount,
    fetchNext,
    viewMore,
    isFetching,
  } = useNotifications();
  const [windowWidth, setWindowWidth] = useState(0);
  let resizeWindow = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  return (
    <>
      {windowWidth <= 1024 ? (
        <div className="notification-title flex flex-center">
          <BackButton name={"Notification"} />
        </div>
      ) : (
        <HeaderDefault />
      )}
      <div className="notification-wrapper">
        {windowWidth <= 1024 ? (
          ""
        ) : (
          <div className="head-title flex space-between flex-center">
            <h1>Notification</h1>
          </div>
        )}
        <div className="notification-inner">
          <Notifications
            notifications={notifications}
            handleNotifications={handleNotifications}
            setNotificationsUnreadCount={setNotificationsUnreadCount}
          />
          {notifications && notifications.length > 0 && viewMore && (
            <div className="notifications-footer flex flex-center justify-center">
              <button
                disabled={isFetching}
                onClick={(e) => {
                  e.preventDefault();
                  fetchNext();
                }}
                className="view-all"
              >
                {isFetching ? "Loading ..." : "View More "}
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default notifications;
