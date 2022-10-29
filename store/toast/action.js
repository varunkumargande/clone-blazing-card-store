export const actionTypes = {
  SHOW_TOAST: "SHOW_TOAST",
  HIDE_TOAST: " HIDE_TOAST",
};

export function show(payload) {
  return {
    type: actionTypes.SHOW_TOAST,
    payload: payload,
  };
}

export function hide() {
  return {
    type: actionTypes.HIDE_TOAST,
  };
}
