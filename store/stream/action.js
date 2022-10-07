import { getStreamData } from "../../api/stream/stream";
import { getProducts } from "../../api/stream/streams_api";

export const actionTypes = {
  ADD_STREAM_DETAILS: 'ADD_STREAM_DETAILS',
  ADD_USER: 'ADD_USER_TYPE',
  ADD_RTM_TOKEN: 'ADD_RTM_TOKEN',
  ADD_RTC_TOKEN: 'ADD_RTC_TOKEN',
  ADD_STREAM_PRODUCTS:'ADD_STREAM_PRODUCTS',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',

  GET_STREAM_DETAILS: 'GET_STREAM_DETAILS',
  GET_USER: 'GET_USER_TYPE',
  GET_RTM_TOKEN: 'GET_RTM_TOKEN',
  GET_RTC_TOKEN: 'GET_RTC_TOKEN',

};


export const streamData =  (streamUuid) => {
  return async dispatch => {
    const result = await getStreamData(streamUuid)
    if(result) {
      dispatch(addStreamDetails(result))
    }
  };
};

export const streamProducts = (url) => {
  return async dispatch => {
    const result = await getProducts(url)
    if(result) {
      dispatch(addStreamProducts(result))
      return result;
    }
  };
}

export const addStreamProducts = (payload) => {
  return {
    type: actionTypes.ADD_STREAM_PRODUCTS,
    payload:payload,
};
}

export function getStreamDetails(payload) {
  return {
    type: actionTypes.GET_STREAM_DETAILS,
    payload:payload,
};
}

export function getUserType(data) {
  return {
      type: actionTypes.GET_USER,
      data,
  };
}

export function getRtmToken(data) {
  return {
    type: actionTypes.GET_RTM_TOKEN,
    data,
};
}

export function getRtcToken(data) {
  return {
    type: actionTypes.GET_RTC_TOKEN,
    data,
};
}

export function addStreamDetails(payload) {
  return {
    type: actionTypes.ADD_STREAM_DETAILS,
    payload:payload,
};
}

export function addUserType(payload) {
  return {
    type: actionTypes.ADD_USER,
    payload:payload,
};
}
export function addRtmToken(payload) {
  return {
    type: actionTypes.ADD_RTM_TOKEN,
    payload:payload,
};
} 

export function addRtcToken(payload) {
  return {
      type: actionTypes.ADD_RTC_TOKEN,
      payload:payload,
  };
} 

export function addNotification(payload) {
  return {
      type: actionTypes.ADD_NOTIFICATION,
      payload:payload,
  };
} 



