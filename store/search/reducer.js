import { actionTypes } from "./action";

export const initState = {
  searchValue: "",
};

function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.SEARCH_REQUEST:
      return {
        ...state,
      };
    default:
      return state;
  }
}

export default reducer;
