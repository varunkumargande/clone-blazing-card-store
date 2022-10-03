import { actionTypes } from "./action";

let stepState = {
  guideLines : 'process',
  basicDetails: "",
  shippingDetails: "",
  paymentDetails: "",
  submitted: ""
}
export const initState = {
  guideLines: false,
  basicDetails: null,
  shippingDetails: null,
  paymentDetails: null,
  submittedDetails: null,
  stepContainer: stepState
};

function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.SUBMIT_GUIDELINES:
      return {
        ...state,
        ...{ guideLines: action.payload },
        ...{ stepContainer : {
          guideLines : 'completed',
          basicDetails: "process",
          paymentDetails: "",
          shippingDetails: "",
          submitted: ""
        } },
      };
    case actionTypes.ADD_BASIC_DETAILS:
      return {
        ...state,
        ...{ basicDetails: action.payload },
        ...{ stepContainer : {
          guideLines : 'completed',
          basicDetails: "completed",
          paymentDetails: "process",
          shippingDetails: "",
          submitted: ""
        } }
      }
    case actionTypes.ADD_SHIPPING_DETAILS:
      return {
        ...state,
        ...{ shippingDetails: action.payload },
        ...{ stepContainer : {
          guideLines : 'completed',
          basicDetails: "completed",
          paymentDetails: "completed",
          shippingDetails: "process",
          submitted: ""
        } }
      }
    case actionTypes.ADD_PAYMENT_DETAILS:
      return {
        ...state,
        ...{ paymentDetails: action.payload },
        ...{ stepContainer : {
          guideLines : 'completed',
          basicDetails: "completed",
          paymentDetails: "completed",
          shippingDetails: "completed",
          submitted: "process"
        } }
      }
      case actionTypes.GET_SUBMIITED_DETAILS:
        return {
          ...state,
          ...{ submittedDetails: action.payload },
        }
    // case actionTypes.GET_STREAM_DETAILS:
    //   return {
    //     ...state,
    //     ...{ streamdetails: action.payload }
    //   }
    default:
      return state;
  }
}

export default reducer;
