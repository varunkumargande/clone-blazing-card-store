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

export async function streamDetailApi(setData, page, setTotal, setLoader) {
  const result = await APIServices.getAll(
    `stream/stream-homePage?type=${categoryConstant.SCHEDULE_DATA.type}&limit=${categoryConstant.SCHEDULE_DATA.limit}&offset=${page}&key=10980374eab848ac`
  );
  if (result?.status === 200) {
    setData((data) => data.concat(result?.data?.data?.data));
    setTotal(result?.data?.data?.total);
  }
  setLoader(false);
}

export async function liveDetailApi(setData, page, setTotal, setLoader) {
  const result = await APIServices.getAll(
    `stream/stream-homePage?type=${categoryConstant.LIVE_DATA.type}&limit=${categoryConstant.LIVE_DATA.limit}&offset=${page}&key=10980374eab848ac`
  );
  if (result?.status === 200) {
    setData((data) => data.concat(result?.data?.data?.data));
    setTotal(result?.data?.data?.total);
  }
  setLoader(false);
}

/**
 * fetching data based on categories for homepage
 */
export async function catStreamDetailApi(
  setData,
  page,
  setTotal,
  catId,
  setApiCount,
  setLoader,
  loader,
  data
) {
  const result = await APIServices.getAll(
    `stream/stream-homePage?type=${categoryConstant.CATEGORY_DATA.type}&limit=${categoryConstant.LIVE_DATA.limit}&offset=${page}&categoryId=${catId}&key=10980374eab848ac`
  );
  if (result?.status === 200) {
    console.log({ [catId]: result?.data?.data})
    // // console.log(Object.keys(result?.data?.data?.data)[0])
    setData((data) => ({ ...data, [catId]: result?.data?.data }));
  }
  setLoader((loader) => ({ ...loader, [catId]: true }));
  setApiCount((count) => count + 1);
}

export async function catSubStreamDetailApi(setData, page, catId) {
  const result = await APIServices.getAll(
    `stream/stream-homePage?type=${categoryConstant?.SUB_CATEGORY_DATA.type}&categoryId=${catId}&offset=${page}&limit=${categoryConstant.LIVE_DATA.limit}&key:10980374eab848ac`
  );
  if (result?.status === 200) setData(result?.data?.data);
}
/**
 * *************************************************************************************************
 */

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
