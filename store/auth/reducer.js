import { actionTypes } from './action';

export const initState = {
    isLoggedIn: false,
    userId: "",
};

function reducer(state = initState, action) {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                ...{ userId: action.payload, isLoggedIn: true },
            };
            case actionTypes.LOGIN_REQUEST:
                return {
                    ...state,
                    ...{ isLoggedIn: true },
                };
        case actionTypes.LOGOUT:
            return {
                ...state,
                ...{ userId: "", isLoggedIn: false },
            };
        default:
            return state;
    }
}

export default reducer;
