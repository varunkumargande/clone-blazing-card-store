import { categoryConstant } from "../../components/Constants";
import APIServices from "../../services";

export async function getInterestsApi(type, setResult) {
  const result = await APIServices.getAll(
    `category/homepage-category-list?type=${type}`
  );
  setResult(result);
}

export async function getSectionCardsApi(id, type, offset, setResult, setLoader) {
  let url = (type === "category" && `&categoryId=${id}`);
  const result = await APIServices.getAll(
    `stream/stream-homePage?type=${categoryConstant.CATEGORY_DATA.type}&limit=${categoryConstant.LIVE_DATA.limit}&offset=${offset}${url}&hi`
  );
  setResult(result);
  setLoader(false);
}
