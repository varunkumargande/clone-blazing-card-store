import Axios from "axios";
import { modalSuccess } from "../intercept";
import { apiUrl } from "../url";

async function getStreamData(streamUuid) {
  let user = null;
  if (localStorage.getItem("blazingUser")) {
    user = JSON.parse(localStorage.getItem("blazingUser"));
  }
  const http = Axios.create({
    baseURL: apiUrl,
    headers: {
      "Content-type": "application/json",
    },
  });
  let url = `stream/getStream?uuid=${streamUuid}`;
  if (user) {
    url += "&user_id=" + user.id;
  }

  const result = await http.get(url);

  if (result && result.data && result.data) {
    modalSuccess("success", result.data.message);
    if (!!result.data?.data?.null) {
      return result.data?.data?.null[0];
    } else {
      return result.data?.data;
    }
  }
}

export { getStreamData };
