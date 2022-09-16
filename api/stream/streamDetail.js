import { getStreamDetails } from "../../store/stream/action";
import APIServices from "../../services";

export async function streamDetailApi(dispatch) {
  const result = await APIServices.getAll("stream/getStream");
  if (result?.data?.status === 1)
    dispatch(getStreamDetails(result?.data?.data));
    
}
