import { getStreamDetails } from "../../store/stream/action";
import APIServices from "../../services";
import { data } from "jquery";

export async function substreamDetailApi(dispatch,category_id,subCategory_id) {
  const result = await APIServices.getAll(`stream/getStream?category_id=${category_id}&subCategory_id=${subCategory_id}`);
  if (result?.data?.status === 1)
    dispatch(getStreamDetails(result?.data?.data));
    
}

export async function subcatstreamDetailApi(dispatch,category_id) {
  const result = await APIServices.getAll(`stream/stream-homePage`);
  if (result?.data?.status === 1)
    dispatch(getStreamDetails(result?.data?.data));
    console.log(result)
    
}