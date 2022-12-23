import { categoryConstant } from "../../components/Constants";
import APIServices from "../../services";

export async function getInterestsApi(type, setResult) {
  const result = await APIServices.getAll(
    `category/homepage-category-list?type=${type}`
  );
  setResult(result);
}

export async function getSectionCardsApi(
  id,
  type,
  offset,
  updateCards,
  setTotal,
  setLoader
) {
  let url = type === "category" && `&categoryId=${id}`;
  const result = await APIServices.getAll(
    `stream/stream-homePage?type=${categoryConstant.CATEGORY_DATA.type}&limit=${categoryConstant.LIVE_DATA.limit}&offset=${offset}${url}`
  );
  if (result?.data?.data?.total) {
    updateCards(result?.data?.data?.data);
    setTotal(result?.data?.data?.total);
  }
  setLoader(false);
}
