import { guideLinesApi, basicDteailsApi, shippingDetails, paymentDetailsApi, getDetails } from "../../api/becomeSeller";
import { getErrorMessage } from "../../utilities/common-helpers";
import { show } from "../toast/action";

export const actionTypes = {
  SUBMIT_GUIDELINES: "SUBMIT_GUIDELINES",
  ADD_BASIC_DETAILS: "ADD_BASIC_DETAILS",
  ADD_PAYMENT_DETAILS: "ADD_PAYMENT_DETAILS",
  ADD_SHIPPING_DETAILS: "ADD_SHIPPING_DETAILS",
  GET_SUBMIITED_DETAILS: "GET_SUBMIITED_DETAILS",
  CLEAR_STATE: "CLEAR_STATE",
  SET_CLEAR_STATE: "SET_CLEAR_STATE"
};


export const rulesAcknowledgement =  (payLoad, router) => {
  return async dispatch => {
    const result = await guideLinesApi(payLoad)
    if(result && result?.data?.status ===1) {
      dispatch(addGuideLines(payLoad))
      router.push("/become-seller/basicDetails", undefined, {
        shallow: true,
      })
    } else {
      const message = getErrorMessage(result);
      dispatch(show({ message, type: "error" }));
    }
  };
};
export const addBasicData =  (payLoad, router) => {
  return async dispatch => {
    const result = await basicDteailsApi(payLoad)
    if(result && result?.data?.status === 1) {
      dispatch(addBasicDetails(payLoad))
      router.push("/become-seller/paymentDetails", undefined, {
        shallow: true,
      })
    } else {
      const message = getErrorMessage(result);
      dispatch(show({ message, type: "error" }));
    }
  };
};
export const addPaymentData =  (payLoad, router) => {
  return async dispatch => {
    const result = await paymentDetailsApi(payLoad)
    if (result && result?.data?.data?.status === 1) {
      dispatch(addPaymentDetails(payLoad))
      router.push("/become-seller/shippingDetails", undefined, {
        shallow: true,
      })
    } else {
      const message = getErrorMessage(result);
      dispatch(show({ message, type: "error" }));
    }
  };
};
export const addShippingData =  (payLoad, router) => {
  return async dispatch => {
    const result = await shippingDetails(payLoad)
    if (result && result?.data?.status === 1) {
      dispatch(addShippingDetails(payLoad))
      router.push("/become-seller/submitted", undefined, {
        shallow: true,
      })
    } else {
      const message = getErrorMessage(result);
      dispatch(show({ message, type: "error" }));
    }
  };
};

export function getBecomeSellerInfo() {
  return async dispatch => {
    const result = await getDetails()
    if(result) {

      dispatch(addPreviousData(result))
    }
  };
};

export function addBasicDetails(payload) {
  return {
    type: actionTypes.ADD_BASIC_DETAILS,
    payload:payload,
};
}

export function addPaymentDetails(payload) {
  return {
    type: actionTypes.ADD_PAYMENT_DETAILS,
    payload:payload,
};
}

export function addShippingDetails(payload) {
  return {
    type: actionTypes.ADD_SHIPPING_DETAILS,
    payload:payload,
};
}

export function addGuideLines(payload) {
  return {
    type: actionTypes.SUBMIT_GUIDELINES,
    payload:payload,
};
}
 
export function addPreviousData(payload) {
  return {
    type: actionTypes.GET_SUBMIITED_DETAILS,
    payload:payload,
};
}

export function clearState(){
  return {
    type: actionTypes.CLEAR_STATE
  }
}

export function setClearState(){
  return {
    type: actionTypes.SET_CLEAR_STATE
  }
}