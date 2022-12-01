import axios from "axios";
import { show } from "../../store/toast/action";
import { friendList } from "../../chatService";
import useChatUser from "../../utilities/chatUser";

export async function getFriendList(setContacts, setUserCount, dispatch) {
  let user = JSON.parse(localStorage.getItem("chat-app-current-user"))?._id;
  const token = localStorage.getItem("blazingToken");
  let userData = {
    userId: user,
  };
  const chatHeader = {
    Authorization: `Bearer ${token}`,
  };
  await axios
    .post(friendList, userData, {
      headers: chatHeader,
    })
    .then((res) => {
      setContacts(res?.data?.response?.data);
      setUserCount(res?.data?.response?.userCount);
    })
    .catch((err) => {
      dispatch(
        show({
          message: err.response?.data?.message,
          type: "error",
        })
      );
    });
}
