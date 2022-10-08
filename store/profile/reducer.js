import { actionTypes } from "./action";

export const initState = {
    profile: null
};

function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.GET_PROFILE_REQUEST:
      return {
        ...state,
        ...{ profile: action.payload },
      };
    default:
      return state;
  }
}

export default reducer;
