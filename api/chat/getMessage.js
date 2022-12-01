import axios from "axios";
import { show } from "../../store/toast/action";
import { recieveMessageRoute } from "../../chatService";

export async function getMessage(setMessages, contacts, index) {
  const data = JSON.parse(localStorage.getItem("chat-app-current-user"));
  const token = localStorage.getItem("blazingToken");
  await axios
    .post(
      recieveMessageRoute,
      {
        from: data?._id,
        to: contacts[index]?._id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      setMessages(response.data.response);
    })
    .catch((err) => {});
}
