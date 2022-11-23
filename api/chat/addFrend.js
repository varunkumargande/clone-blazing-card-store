import { addFriend } from "../../chatService";
import axios from "axios";
import { show } from "../../store/toast/action";
import useChatUser from "../../hooks/useChatUser";

export async function addChatFrend(
  friendId,
  fetchUserData,
  setIsOpen,
  socket,
  dispatch
) {
  socket.current.emit("add-friend", {
    userId: JSON.parse(localStorage.getItem("chat-app-current-user"))?._id,
    friendId: friendId,
  });

  const jsonData = {
    userId: JSON.parse(localStorage.getItem("chat-app-current-user"))?._id,
    friendId: friendId,
  };

  const token = localStorage.getItem("blazingToken");
  const chatHeader = {
    Authorization: `Bearer ${token}`,
  };
  await axios
    .post(addFriend, jsonData, {
      headers: chatHeader,
    })
    .then((res) => {
      fetchUserData();
      setIsOpen(false);
    })
    .catch((err) => {
      dispatch(
        show({
          message: err.response?.data?.message,
          type: "error",
        })
      );
      setIsOpen(false);
    });
}
