import { actionTypes } from "./action";

export const initialState = {
  categories: [],
  categoryName: null,
  subCategoryName: "all"
};

function reducer(state = initialState, action) {
  switch (action.type) {
    
    case actionTypes.GET_CATEGORIES:
      return {
        ...state,
        ...{ categories: action.payload },
    };

    case actionTypes.SAVE_CATEGORY:
      return {
        ...state,
        ...{ categoryName: action.payload },
    };

    case actionTypes.SAVE_SUB_CATEGORY:
      return {
        ...state,
        ...{ subCategoryName: action.payload },
    };
    
    default:
      return state;
  }
}

export default reducer;
