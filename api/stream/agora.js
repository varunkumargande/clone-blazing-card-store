import Axios from "axios";
import { modalSuccess } from "../intercept";
import { agora } from "../url";

async function getToken(url) {

  const http = Axios.create({
    baseURL: agora,
    headers: {
      "Content-type": "application/json",
    },
  });

  const result = await http.get(url)

  if (result && result.data && result.data) {
    modalSuccess("success", result.data.message);
    return result.data;
  }

}

export { getToken };
