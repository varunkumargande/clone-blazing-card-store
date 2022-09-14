import { actionTypes } from "./action";

export const initState = {
  appId: null,
  channel: null,
  userType: null,
  audience: null,
  rtcToken: null,
  rtmToken: null
};

function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.ADD_RTC_TOKEN:
      return {
        ...state,
        ...{ rtcToken: action.payload },
      };
    case actionTypes.ADD_RTM_TOKEN:
      return {
        ...state,
        ...{
          rtmToken: action.payload
        },
      };
    case actionTypes.GET_WISHLIST_LIST_ERROR:
      return {
        ...state,
        ...{ error: action.error },
      };
    case actionTypes.ADD_ITEM_WISHLISH:
      return {
        ...state,
        ...{ addwishlist: action.payload },
      };

    case actionTypes.WISHLIST_LOADING:
      return {
        ...state,
        ...{ wishLoad: action.payload },
      };
    case actionTypes.LANGUAGE_LOADING:
      return {
        ...state,
        ...{ langagechange: action.payload },
      };

    case actionTypes.LANGUAGE_LOADING_ONE_TIME:
      return {
        ...state,
        ...{ mainloadedone: action.payload },
      };

      case actionTypes.BANNER_MAIND_ONE_TIME:
        return {
          ...state,
          ...{ banners: action.payload },
        };

    default:
      return state;
  }
}

export default reducer;
