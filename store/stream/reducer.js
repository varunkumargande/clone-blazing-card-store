import { actionTypes, streamData } from "./action";
import StreamDetailModel from "../../components/model/streamModel";
export const initState = {
  streamData: null,
  streamdetails: null,
  streamPageData: null,
  streamProducts: null
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
        ...{ streamdetails: action.payload  }
      }
    case actionTypes.ADD_STREAM_PRODUCTS:
      return {
        ...state,
        ...{ streamProducts: action.payload  }
      }
    default:
      return state;
  }
}

export default reducer;
