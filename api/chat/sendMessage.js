import axios from "axios";
import { show } from "../../store/toast/action";
import { sendMessageRoute } from "../../chatService";

export async function sendMessage(data) {
  const token = localStorage.getItem("blazingToken");
  await axios.post(sendMessageRoute, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
