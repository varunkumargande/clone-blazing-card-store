import APIServices from "../../services";

export async function getCategoriesApi(type, setResult) {
  const result = await APIServices.getAll(
    `category/homepage-category-list?type=${type}`
  );
  setResult(result);
}
