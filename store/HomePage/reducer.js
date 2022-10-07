import { object } from "prop-types";
import { actionTypes } from "./action";

let stepState = {
  guidelines : 'process',
  basicDetails: "",
  paymentDetails: "",
  shippingDetails: "",
  submitted: ""
}
export const initState = {
  guidelines: false,
  basicDetails: null,
  shippingDetails: null,
  paymentDetails: null,
  submittedDetails: null,
  stepContainer: stepState,
  isguidelinesSubmitted: false,
  isBasicDetailsSubmitted: false,
  isPaymentDetailsSubmitted: false,
  isShippingDetailsSubmitted: false,
};

const getStepState = (lastStep) => {
  switch (lastStep) {
    case 1:
      return {
        guidelines : 'completed',
        basicDetails: "process",
        paymentDetails: "",
        shippingDetails: "",
        submitted: ""
      }
      case 2:
        return {
          guidelines : 'completed',
          basicDetails: "completed",
          paymentDetails: "process",
          shippingDetails: "",
          submitted: ""
        }
      case 3:
        return {
          guidelines : 'completed',
          basicDetails: "compelted",
          paymentDetails: "completed",
          shippingDetails: "process",
          submitted: ""
        }
      break;
      case 4:
        return {
          guidelines : 'completed',
          basicDetails: "completed",
          paymentDetails: "completed",
          shippingDetails: "completed",
          submitted: "process"
        }
      break;
    default:
        return stepState;
      break;
  }
}

function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.SUBMIT_GUIDELINES:
      return {
        ...state,
        ...{ guidelines: !!action.payload },
        ...{isguidelinesSubmitted: !!action.payload},
        ...{ stepContainer : {
          guidelines : 'completed',
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
        ...{isBasicDetailsSubmitted: true},
        ...{ stepContainer : {
          guidelines : 'completed',
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
        ...{isShippingDetailsSubmitted: true},
        ...{ stepContainer : {
          guidelines : 'completed',
          basicDetails: "completed",
          paymentDetails: "completed",
          shippingDetails: "Completed",
          submitted: "process"
        } }
      }
    case actionTypes.ADD_PAYMENT_DETAILS:
      return {
        ...state,
        ...{ paymentDetails: action.payload },
        ...{isPaymentDetailsSubmitted: true},
        ...{ stepContainer : {
          guidelines : 'completed',
          basicDetails: "completed",
          paymentDetails: "completed",
          shippingDetails: "process",
          submitted: ""
        } }
      }
      case actionTypes.GET_SUBMIITED_DETAILS:
        return {
          ...state,
          ...{ guidelines: !!action.payload?.isAgree },
          ...{ basicDetails: action.payload?.basicDetails !== {} ? action.payload?.basicDetails : null},
          ...{ paymentDetails: action.payload?.paymentDetails !== {} ? action.payload?.paymentDetails : null},
          ...{ shippingDetails: action.payload?.shippingDetails !== {} ? action.payload?.shippingDetails : null},
          ...{ submittedDetails: action.payload },
          ...{ stepContainer : getStepState(action.payload?.steps)}

        }
    default:
      return state;
  }
}

export default reducer;
