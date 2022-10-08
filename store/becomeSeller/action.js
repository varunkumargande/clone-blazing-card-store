import { guideLinesApi, basicDteailsApi, shippingDetails, paymentDetailsApi, getDetails } from "../../api/becomeSeller";

export const actionTypes = {
  SUBMIT_GUIDELINES: "SUBMIT_GUIDELINES",
  ADD_BASIC_DETAILS: "ADD_BASIC_DETAILS",
  ADD_PAYMENT_DETAILS: "ADD_PAYMENT_DETAILS",
  ADD_SHIPPING_DETAILS: "ADD_SHIPPING_DETAILS",
  GET_SUBMIITED_DETAILS: "GET_SUBMIITED_DETAILS"
};


export const rulesAcknowledgement =  (payLoad, router) => {
  return async dispatch => {
    const result = await guideLinesApi(payLoad)
    if(result) {
      dispatch(addGuideLines(payLoad))
      router.push("/become-seller/basicDetails", undefined, {
        shallow: true,
      })
    }
  };
};
export const addBasicData =  (payLoad, router) => {
  return async dispatch => {
    const result = await basicDteailsApi(payLoad)
    if(result) {
      dispatch(addBasicDetails(payLoad))
      router.push("/become-seller/paymentDetails", undefined, {
        shallow: true,
      })
    }
  };
};
export const addPaymentData =  (payLoad, router) => {
  return async dispatch => {
    const result = await paymentDetailsApi(payLoad)
    if(result) {
      dispatch(addPaymentDetails(payLoad))
      router.push("/become-seller/shippingDetails", undefined, {
        shallow: true,
      })
    }
  };
};
export const addShippingData =  (payLoad, router) => {
  return async dispatch => {
    const result = await shippingDetails(payLoad)
    if(result) {
      dispatch(addShippingDetails(payLoad))
      router.push("/become-seller/submitted", undefined, {
        shallow: true,
      })
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



