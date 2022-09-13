export const actionTypes = {
  ADD_STREAM_DETAILS: 'ADD_STREAM_DETAILS',
  ADD_USER: 'ADD_USER_TYPE',
  ADD_RTM_TOKEN: 'ADD_RTM_TOKEN',
  ADD_RTC_TOKEN: 'ADD_RTC_TOKEN',

  GET_STREAM_DETAILS: 'GET_STREAM_DETAILS',
  GET_USER: 'GET_USER_TYPE',
  GET_RTM_TOKEN: 'GET_RTM_TOKEN',
  GET_RTC_TOKEN: 'GET_RTC_TOKEN',

};

export function getStreamDetails(data) {
  return {
    type: actionTypes.GET_STREAM_DETAILS,
    data,
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

export function addStreamDetails() {
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



