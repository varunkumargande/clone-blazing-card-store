import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import { connect } from "react-redux";
import NotificationMethods from "../../api/notification/NotificationMethods";
import { notificationBaseUrl } from "../../api/url";
import useEventSocket from "../../hooks/useEventSocket";

export const NotificationsContext = createContext();

// This context will handle all notifications related stuff globally
export function NotificationsProvider(props) {
  const [notifications, setNotifications] = useState([]);
  const [notificationsUnreadCount, setNotificationsUnreadCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(15);
  const [lastSetDataIds, setLastSetDataIds] = useState([]);
  const [viewMore, setViewMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const { data } = useEventSocket(
    typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("blazingUser")) &&
      `${notificationBaseUrl}notify-${String(
        JSON.parse(localStorage.getItem("blazingUser")).id
      )}`
  );

  const handleNotifications = (newData) => {
    setNotifications(newData);
  };

  useEffect(() => {
    if (data) {
      const newData = [...notifications];
      const datum = { ...data };
      datum["notify_type"] = data.type;
      datum["notify_seen"] = data.isSeen;
      datum["notify_id"] = data.notificationId;
      datum["notify_url"] = data.url;
      datum["notify_notification"] = data.notification;
      datum["notify_created_date"] = data.createdDate;
      newData.unshift(datum);
      setNotifications(newData);
      setNotificationsUnreadCount(data.count);
    }
  }, [data]);

  const handleNotificationsData = (datum) => {
    if (datum.length === 0) {
      setViewMore(false);
    }
    const ids = datum.map((data) => data.notify_id);
    const new_datum = datum.filter((data) => {
      if (!lastSetDataIds.includes(data.notify_id)) {
        return data;
      }
    });
    setLastSetDataIds(ids);
    setNotifications([...notifications, ...new_datum]);
    setIsFetching(false);
  };

  const fetchNext = () => {
    setIsFetching(true);
    setOffset(offset + limit);
  };

  useEffect(() => {
    if (props.auth.isLoggedIn) {
      NotificationMethods.GET_ALL_NOTIFICATION(
        limit,
        offset,
        handleNotificationsData
      );
      NotificationMethods.NOTIFICATION_UNREAD_COUNT((data) =>
        setNotificationsUnreadCount(data.count)
      );
    } else {
      setNotifications([]);
      setNotificationsUnreadCount(0);
      setOffset(0);
      setLimit(15);
      setLastSetDataIds([]);
      setViewMore(true);
      setIsFetching(false);
    }
  }, [offset, props.auth.isLoggedIn]);

  const contextValue = useMemo(
    () => ({
      notifications,
      notificationsUnreadCount,
      handleNotifications,
      setNotificationsUnreadCount,
      fetchNext,
      viewMore,
      isFetching,
    }),
    [
      notifications,
      notificationsUnreadCount,
      handleNotifications,
      setNotificationsUnreadCount,
      fetchNext,
      viewMore,
      isFetching,
    ]
  );

  return <NotificationsContext.Provider {...props} value={contextValue} />;
}

export function useNotifications() {
  return useContext(NotificationsContext);
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(NotificationsProvider);
