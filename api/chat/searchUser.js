import axios from "axios";
import { searchUsers } from "../../chatService";
import { show } from "../../store/toast/action";

export async function searchUser(
  setUserData,
  setUserDataLoader,
  value,
  dispatch,
  setIsOpen
) {
  setUserDataLoader(true);
  const token = localStorage.getItem("blazingToken");
  let user = JSON.parse(localStorage.getItem("chat-app-current-user"));
  const chatHeader = {
    Authorization: `Bearer ${token}`,
  };
  const data = await axios
    .post(
      searchUsers,
      {
        slang: value,
        userId: user?._id,
      },
      {
        headers: chatHeader,
      }
    )
    .then((res) => {
      setUserData(res?.data?.response);
      setUserDataLoader(false);
    })
    .catch((err) => {
      dispatch(
        show({
          message: err.response?.data?.message,
          type: "error",
        })
      );
      setIsOpen(false);
      setUserDataLoader(false);
    });
}
