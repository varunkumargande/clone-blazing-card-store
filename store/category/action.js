export const actionTypes = {
  GET_CATEGORIES: "GET_CATEGORIES",
  SAVE_CATEGORY: "SAVE_CATEGORY",
  SAVE_SUB_CATEGORY: "SAVE_SUB_CATEGORY",
  SAVE_CATEGORY_ID: "SAVE_CATEGORY_ID",
  REMOVE_CATEGORY_ID: "REMOVE_CATEGORY_ID",
  SAVE_TYPE: "SAVE_TYPE",
};

export function getCategories(payload) {
  return { type: actionTypes.GET_CATEGORIES, payload: payload };
}

export function saveCategoryName(payload) {
  return { type: actionTypes.SAVE_CATEGORY, payload: payload };
}

export function saveSubCategoryName(payload) {
  return { type: actionTypes.SAVE_SUB_CATEGORY, payload: payload };
}

export function saveCategoryId(payload) {
  return { type: actionTypes.SAVE_CATEGORY_ID, payload: payload };
}

export function savePageType(payload) {
  return { type: actionTypes.SAVE_TYPE, payload: payload };
}
