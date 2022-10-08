import { actionTypes } from "./action";

export const initState = {
  likedData: [],
  dislikedData:[]
};

function reducer(state = initState, action) {
  console.log(action.payload)
  switch (action.type) {
    case actionTypes.LIKED_REQUEST:
      return {
        ...state,
        likedData:[...state.likedData, action.payload],
      };
      case actionTypes.REMOVE_LIKED_REQUEST:
      return {
        ...state,
        likedData:[...state.likedData.filter((item, index) => item !== action.payload)],
      };
    case actionTypes.DISLIKED_REQUEST:
      return {
        ...state,
        dislikedData:[...state.dislikedData, action.payload],
      };
    default:
      return state;
  }
}

export default reducer;
