import http from '../intercept';
import { GET_ALL_NOTIFICATION, NOTIFICATION_SEEN } from './NotificationEndpoints';

const getAllNotifications = (callback) => {
    http.get(GET_ALL_NOTIFICATION)
    .then((res) => {
        functionCallbackSetter(res, callback);
    })
    .catch((e) => {
        
    })
}

const markNotificationAsSeen = (notificationId, callback) => {
    http.get(NOTIFICATION_SEEN + '/' + notificationId)
    .then((res) => {
        functionCallbackSetter(res, callback, true);
    })
    .catch((e) => {
        
    })
}

const functionCallbackSetter = (response, callback, updateData = false) => {
    if (response && response.status == 200) {
        if (response.data.data) {
            if(updateData) {
                callback(Math.floor((Math.random() * 100) + 1));
            } else {
                callback(response.data.data);
            }
        } else {
            callback([]);
        }
    }
}

const NotificationMethods = {
    GET_ALL_NOTIFICATION : getAllNotifications,
    MARK_NOTIFICATION_AS_SEEN : markNotificationAsSeen
}

export default NotificationMethods;