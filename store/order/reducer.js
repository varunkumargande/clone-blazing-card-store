import { actionTypes } from './action';
export const initState = {
    orderList: null
  };

  function reducer(state = initState, action) {

    switch (action.type) {
      case actionTypes.GET_ORDERS:
        return {
          ...state,
          ...{ orderList: action.payload},
        };
      default:
        return state;
    }
  }
  export default reducer;