import { getStreamDetails, getLiveDetails } from "../../store/stream/action";
import APIServices from "../../services";
import { categoryConstant } from "../../components/Constants/category";
import Router from "next/router";

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
  const result = await APIServices.getAll(
    `stream/stream-homePage?type=${categoryConstant.SCHEDULE_DATA.type}&limit=${categoryConstant.SCHEDULE_DATA.limit}`
  );
  if (result?.status === 200) dispatch(getStreamDetails(result?.data?.data));
}

export async function liveDetailApi(dispatch) {
  const result = await APIServices.getAll(
    `stream/stream-homePage?type=${categoryConstant.LIVE_DATA.type}&limit=${categoryConstant.LIVE_DATA.limit}`
  );
  if (result?.status === 200) dispatch(getLiveDetails(result?.data?.data));
}

export async function catStreamDetailApi(setCategories) {
  const result = await APIServices.getAll(
    `stream/stream-homePage?type=${categoryConstant.CATEGORY_DATA.type}`
  );
  if (result?.status === 200) setCategories(result?.data?.data);
}

export async function catSubStreamDetailApi(setCategories, id) {
  const result = await APIServices.getAll(
    `stream/stream-homePage?type=${categoryConstant?.SUB_CATEGORY_DATA.type}&categoryId=${id}`
  );
  if (result?.status === 200) setCategories(result?.data?.data);
}

/**
 * calling api based on category and sub category for see-all component
 */

export async function getStreamCategoryBasedApi(
  catName,
  subCatName,
  type,
  setStreamData
) {
  const result = await APIServices.getAll(
    `stream/categories-stream?category_slug=${catName}&subCategory_slug=${subCatName}&type=${type}`
  );
  if (result?.status === 200) {
    setStreamData(result?.data?.data?.result);
  } else {
    Router.push("/404");
  }
}

export async function getStreamSubCategoryBasedApi(
  type,
  catName,
  subCatName,
  setStreamData
) {
  const result = await APIServices.getAll(
    `stream/categories-stream?category_slug=${catName}&subCategory_slug=${subCatName}&type=${type}`
  );
  if (result?.status === 200) {
    setStreamData(result?.data?.data?.result);
  } else {
    Router.push("/404");
  }
}

/**
 * ====================================================================
 */
