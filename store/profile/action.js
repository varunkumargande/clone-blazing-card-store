export const actionTypes = {
    GET_PROFILE_REQUEST: 'GET_PROFILE_REQUEST',
};

export function getProfile(payload) {
    return { type: actionTypes.GET_PROFILE_REQUEST, payload: payload };
  }

