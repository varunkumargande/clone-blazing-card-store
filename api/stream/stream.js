import Axios from "axios";
import { modalSuccess } from "../intercept";
import { apiUrl } from "../url";

async function getStreamData(streamUuid) {

  const http = Axios.create({
    baseURL: apiUrl,
    headers: {
      "Content-type": "application/json",
    },
  });
  const url = `stream/getStream?uuid=${streamUuid}`

  const result = await http.get(url)

  if (result && result.data && result.data) {
    console.log(result.data, 'API DATA')
    modalSuccess("success", result.data.message);
    console.log(result.data?.data?.null, 'yeh wala mera hai ===========&&&&&&&&&&&&&&&')
    if(!!result.data?.data?.null) {
      return result.data?.data?.null[0];
    }else {
      return result.data?.data;
    }
    
  }

}

export { getStreamData };
