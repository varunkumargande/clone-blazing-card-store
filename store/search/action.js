export const actionTypes = {
    SEARCH_REQUEST: 'SEARCH_REQUEST',
};



export function search() {
    return { type: actionTypes.LOGIN_REQUEST};
}

export function searchRequest(payload) {
    return { 
        type: actionTypes.SEARCH_REQUEST,
        payload:payload
    };
}
