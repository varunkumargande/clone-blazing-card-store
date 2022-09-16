import { getStreamDetails } from "../../store/stream/action";
import APIServices from "../../services";

export async function streamDetailApi(dispatch) {
  const result = await APIServices.getAll("stream/getStream");
  if (result?.data?.status === 1)
    dispatch(getStreamDetails(result?.data?.data));
}


export async function getStreamData(uuid) {
    const url = `stream/getStream?uuid=${uuid}`;
    const response = await APIServices.getAll(url);
    if(response.data.data) {
      return response.data.data;
    }
}