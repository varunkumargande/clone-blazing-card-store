import React, { useEffect, useState } from "react";
import Notifications from "../../components/partials/Notifications/Notifications";
import { useNotifications } from "../../contexts/Notifications/Notifications";
import HeaderDefault from "../../components/shared/headers/HeaderDefault";
import Footer from "../../components/partials/LandingPage/Footer";
import BackButton from "../../components/CommonComponents/BackButton";
import { useIsMobile } from "../../contexts/Devices/CurrentDevices";
import Error from "../_error";

const notifications = () => {
  const {
    notifications,
    handleNotifications,
    setNotificationsUnreadCount,
    fetchNext,
    viewMore,
    isFetching,
  } = useNotifications();

  const { isMobile } = useIsMobile();

  const [errorCode, setErrorcode] = useState(0);

  useEffect(() => {
    if (!localStorage.getItem("blazingUser")) {
      setErrorcode(404);
    }
  }, []);

  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  return (
    <>
      {isMobile ? (
        <div className="notification-title flex flex-center">
          <BackButton name={"Notification"} />
        </div>
      ) : (
        <HeaderDefault />
      )}
      <div className="notification-wrapper">
        {isMobile ? (
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
