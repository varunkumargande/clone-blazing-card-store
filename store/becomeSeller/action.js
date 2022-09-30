export const actionTypes = {
  UPDATE_START_DETAILS: "UPDATE_START_DETAILS",
  UPDATE_START_DETAILS: "UPDATE_START_DETAILS", 
};


export const streamData =  (streamUuid) => {
  return async dispatch => {
    const result = await getStreamData(streamUuid)
    if(result) {
      dispatch(addStreamDetails(result))
    }
  };
};

export function getStreamDetails(payload) {
  return {
    type: actionTypes.GET_STREAM_DETAILS,
    payload:payload,
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
 



