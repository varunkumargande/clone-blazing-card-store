import axios from "axios";
import { show } from "../../store/toast/action";
import { notificationList } from "../../chatService";

export async function getChatNotification(setNotificationData) {
  let userId = JSON.parse(localStorage.getItem("chat-app-current-user"))?._id;
  const token = localStorage.getItem("blazingToken");

  const chatHeader = {
    Authorization: `Bearer ${token}`,
  };
  axios
    .get(`${notificationList}/${userId}`, {
      headers: chatHeader,
    })
    .then((resp) => {
      setNotificationData(resp?.data?.response);
    })
    .catch((err) => {});
}
