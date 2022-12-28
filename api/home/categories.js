import { categoryConstant } from "../../components/Constants";
import APIServices from "../../services";

export async function getInterestsApi(type, setResult) {
  const result = await APIServices.getAll(
    `category/homepage-category-list?type=${type}`
  );
  setResult(result);
}

export async function getSectionCardsApi(
  section,
  offset,
  updateCards,
  setTotal,
  setLoader
) {
  const result = await APIServices.getAll(
    section?.type === "subCategory"
      ? `stream/categories-stream?category_slug=${section.categorySlug}&subCategory_slug=${section.subCategorySlug}&type=allCategory&limit=${categoryConstant.LIVE_DATA.limit}&offset=${offset}`
      : `stream/stream-homePage?type=${categoryConstant.CATEGORY_DATA.type}&limit=${categoryConstant.LIVE_DATA.limit}&offset=${offset}&categoryId=${section.categoryId}`
  );
  if (result?.data?.data?.total) {
    updateCards(result?.data?.data?.data);
    setTotal(result?.data?.data?.total);
  } else if (result?.data?.data?.result) {
    updateCards(result?.data?.data?.result)
    setTotal(result?.data?.data?.isNextPage);
  }
  setLoader(false);
}
