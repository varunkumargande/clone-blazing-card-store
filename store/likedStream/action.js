export const actionTypes = {
  LIKED_REQUEST: "LIKED_REQUEST",
  REMOVE_LIKED_REQUEST: "REMOVE_LIKED_REQUEST",
  DISLIKED_REQUEST: "DISLIKED_REQUEST"
};

export function likedRequest(payload) {
  return { type: actionTypes.LIKED_REQUEST, payload: payload };
}

export function removeLikedRequest(payload) {
    return { type: actionTypes.REMOVE_LIKED_REQUEST, payload: payload };
  }

export function dislikedRequest(payload) {
  return { type: actionTypes.DISLIKED_REQUEST, payload: payload };
}