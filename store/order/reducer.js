import { actionTypes } from './action';
export const initState = {
    orderList: null,
    orderDetail: null
  };

  function reducer(state = initState, action) {

    switch (action.type) {
      case actionTypes.GET_ORDERS:
        return {
          ...state,
          ...{ orderList: action.payload},
        };
        case actionTypes.GET_ORDER_DETAILS:
        return {
          ...state,
          ...{ orderDetail: action.payload},
        };
      default:
        return state;
    }
  }
  export default reducer;