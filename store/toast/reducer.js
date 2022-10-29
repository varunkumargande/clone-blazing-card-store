import { actionTypes } from "./action";
export const initState = {
  toast: {
    message: null,
    type: null,
  },
};

function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.SHOW_TOAST:
      return {
        ...state,
        ...{
          toast: action.payload,
        },
      };

    case actionTypes.HIDE_TOAST:
      return {
        ...state,
        ...{ toast: { message: null, type: null } },
      };
    default:
      return state;
  }
}

export default reducer;
