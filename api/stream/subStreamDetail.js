import { getStreamDetails, getLiveDetails } from "../../store/stream/action";
import APIServices from "../../services";
import { categoryConstant } from "../../components/Constants/category";

export async function substreamDetailApi(
  dispatch,
  category_id,
  subCategory_id
) {
  const result = await APIServices.getAll(
    `stream/getStream?category_id=${category_id}&subCategory_id=${subCategory_id}`
  );
  if (result?.data?.status === 1)
    dispatch(getStreamDetails(result?.data?.data));
}

export async function streamDetailApi(dispatch) {
  const result = await APIServices.create(
    `stream/stream-homePage`,
    categoryConstant.SCHEDULE_DATA
  );
  if (result?.status === 200) dispatch(getStreamDetails(result?.data?.data));
}

export async function liveDetailApi(dispatch) {
  const result = await APIServices.create(
    `stream/stream-homePage`,
    categoryConstant.LIVE_DATA
  );
  if (result?.status === 200) dispatch(getLiveDetails(result?.data?.data));
}

export async function catStreamDetailApi(setCategories) {
  const result = await APIServices.create(
    `stream/stream-homePage`,
    categoryConstant.CATEGORY_DATA
  );
  if (result?.status === 200) setCategories(result?.data?.data);
}

export async function catSubStreamDetailApi(setCategories, id) {
  const result = await APIServices.create(
    `stream/stream-homePage`,
    categoryConstant.SUB_CATEGORY_DATA
  );
  if (result?.status === 200) setCategories(result?.data?.data);
}
