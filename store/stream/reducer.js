import { actionTypes, streamData } from "./action";
import StreamDetailModel from "../../components/model/streamModel";
export const initState = {
  streamData: null,
  streamdetails: null,
  streamPageData: null,
  streamProducts: null,
  streamNotification: {
    auction: null,
    bid: null,
    win: null
  }
};

function reducer(state = initState, action) {

  switch (action.type) {
    case actionTypes.ADD_STREAM_DETAILS:
      return {
        ...state,
        ...{ streamData: action.payload, streamPageData: new StreamDetailModel(action.payload) },
      };
    case actionTypes.GET_STREAM_DETAILS:
      return {
        ...state,
        ...{ streamdetails: action.payload }
      }
    case actionTypes.GET_LIVE_DETAILS:
      return {
        ...state,
        ...{ liveDetails: action.payload }
      }
    case actionTypes.ADD_STREAM_PRODUCTS:
      return {
        ...state,
        ...{ streamProducts: action.payload }
      }
    case actionTypes.ADD_NOTIFICATION:
      return {
        ...state,
        ...{ streamNotification: notificationType(action.payload) }
      }
    case actionTypes.CLEAR_STATE: 
      return{
        state
      }
    default:
      return state;
  }
}

function notificationType(data) {
  let response = {
    auction: null,
    bid: null,
    win: null
  }
  switch (data.type) {
    case 'auction':
        response.auction = data.value
        break;
    case 'bid':
      response.bid = data.value
      break;
    case 'win':
      response.win = data.value
      break;
  }
  return response;
}

export default reducer;
