import { addFriend } from "../../chatService";
import axios from "axios";
import { show } from "../../store/toast/action";
import useChatUser from "../../utilities/chatUser";

export async function addChatFrend(
  friendId,
  fetchUserData,
  setIsOpen,
  socket,
  dispatch,
  currentChatUserId
) {
  socket.current.emit("add-friend", {
    userId: currentChatUserId,
    friendId: friendId,
  });

  const jsonData = {
    userId: currentChatUserId,
    friendId: friendId,
  };
  const token = localStorage.getItem("blazingToken");
  const chatHeader = {
    Authorization: `Bearer ${token}`,
  };
  await axios
    .post(
      addFriend,
      {
        userId: currentChatUserId,
        friendId: friendId,
      },
      {
        headers: chatHeader,
      }
    )
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
