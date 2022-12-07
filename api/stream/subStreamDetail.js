import { getStreamDetails } from "../../store/stream/action";
import APIServices from "../../services";
import { categoryConstant, limit } from "../../components/Constants";

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

export async function streamDetailApi(
  setData,
  page,
  setTotal,
  setLoader,
  setSeeMoreLoader
) {
  const result = await APIServices.getAll(
    `stream/stream-homePage?type=${categoryConstant.SCHEDULE_DATA.type}&limit=${categoryConstant.SCHEDULE_DATA.limit}&offset=${page}&key=10980374eab848ac`
  );
  if (result?.status === 200) {
    setData((data) => data.concat(result?.data?.data?.data));
    setTotal(result?.data?.data?.total);
  }
  setSeeMoreLoader(false);
  setLoader(false);
}

export async function liveDetailApi(
  setData,
  page,
  setTotal,
  setLoader,
  setSeeMoreLoader
) {
  const result = await APIServices.getAll(
    `stream/stream-homePage?type=${categoryConstant.LIVE_DATA.type}&limit=${categoryConstant.LIVE_DATA.limit}&offset=${page}&key=10980374eab848ac`
  );
  if (result?.status === 200) {
    setData((data) => data.concat(result?.data?.data?.data));
    setTotal(result?.data?.data?.total);
  }
  setLoader(false);
  setSeeMoreLoader(false);
}

/**
 * fetching data based on categories for homepage
 */
export async function catStreamDetailApi(
  setData,
  page,
  catId,
  setApiCount,
  setLoader,
  data,
  setCategories,
  setSeeMoreLoader
) {
  const result = await APIServices.getAll(
    `stream/stream-homePage?type=${categoryConstant.CATEGORY_DATA.type}&limit=${categoryConstant.LIVE_DATA.limit}&offset=${page}&categoryId=${catId}&key=10980374eab848ac`
  );
  if (result?.status === 200) {
    if (!!result?.data?.data?.total) {
      // duplicating old data to newdata var
      const newData = { ...data };
      // duplicating old data sub data to sub data var
      const subData = { ...newData[catId] };
      // getting new sub data from api
      const newsubdata = result?.data?.data;
      // sub data's old data and new data from api is merged
      newData[catId] = { ...subData, ...newsubdata };
      // if old data exist then concatenate inside  else direcltly save new data
      if (data[catId]?.data) {
        newData[catId].data = data[catId].data.concat(newData[catId].data);
      }
      setData(newData);
    }
    if (result?.data?.data?.total === 0) {
      // remove category which has no data
      setCategories((categories) =>
        categories.filter((item) => {
          if (item.categoryId !== catId) {
            return item;
          }
        })
      );
    }
  }
  setLoader((loader) => ({ ...loader, [catId]: true }));
  setSeeMoreLoader(false);
  if (result?.status) {
    setApiCount((count) => count + 1);
  }
}

export async function catSubStreamDetailApi(
  setData,
  page,
  catId,
  data,
  setLoader,
  setApiCount,
  setSeeMoreLoader,
  isLoadMore
) {
  const result = await APIServices.getAll(
    `stream/stream-homePage?type=${categoryConstant?.SUB_CATEGORY_DATA.type}&subCategoryId=${catId}&offset=${page}&limit=${limit}`
  );

  if (result?.status === 200) {
    if (!!result?.data?.data?.total) {
      if (isLoadMore) {
        // duplicating old data to newdata var
        const newData = { ...data };
        // getting new sub data from api
        const newsubdata = result?.data?.data;
        // adding api reponse data to particular sub category
        newData[catId] = { ...newsubdata };
        if (data[catId]?.data) {
          newData[catId].data = data[catId].data.concat(newData[catId].data);
        }
        // if old data exist then concatenate inside  else direcltly save new data
        setData(newData);
      } else {
        data[catId] = {};
        data[catId] = result?.data?.data;
        setData(data);
      }
    }
  }

  setLoader((loader) => ({ ...loader, [catId]: true }));
  setSeeMoreLoader(false);

  if (result?.status) {
    setApiCount((count) => count + 1);
  }
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
  setStreamData,
  setLoader,
  offset
) {
  const result = await APIServices.getAll(
    `stream/categories-stream?category_slug=${catName}&subCategory_slug=${subCatName}&offset=${offset}&limit=${limit}&type=${type}&key:10980374eab848ac`
  );
  if (result?.status === 200) {
    setStreamData((data) => data.concat(result?.data?.data?.result));
  }
  setLoader(false);
}

export async function getStreamSubCategoryBasedApi(
  type,
  catName,
  subCatName,
  setStreamData,
  setLoader,
  offset,
  setSeeMoreLoader
) {
  const result = await APIServices.getAll(
    `stream/categories-stream?category_slug=${catName}&subCategory_slug=${subCatName}&type=${type}&offset=${offset}&limit=${limit}&key:10980374eab848ac`
  );
  if (result?.status === 200) {
    setStreamData((data) => data.concat(result?.data?.data?.result));
  }
  setLoader(false);
  setSeeMoreLoader(false);
}

/**
 * ====================================================================
 */
