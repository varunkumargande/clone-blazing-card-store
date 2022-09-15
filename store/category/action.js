export const actionTypes = {
  GET_CATEGORIES: "GET_CATEGORIES",
};

export function getCategories(payload) {
  return { type: actionTypes.GET_CATEGORIES, payload: payload };
}
