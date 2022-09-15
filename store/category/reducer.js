import { actionTypes } from "./action";

export const initialState = {
  categories: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_CATEGORIES:
      return {
        ...state,
        ...{ categories: action.payload },
      };

    default:
      return state;
  }
}

export default reducer;
