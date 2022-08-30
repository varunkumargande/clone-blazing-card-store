import { actionTypes } from './action';

export const initialState = {
    currency: {
        symbol: '$',
        text: 'USD',
        
    },
    editDetail:{},
    footerDet:{},
    footerPage:[],
    servicelist:[],
    seviceInfo:[],
    maintenance:0
    
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.CHANGE_CURRENCY:
            return {
                ...state,
                ...{ currency: action.payload },
            };
            case actionTypes.EDIT_ADDRESS_DETAIL:
                return {
                    ...state,
                    ...{ editDetail: action.payload},
                };
            case actionTypes.FOOTER_PAGE_LIST:
                return {
                    ...state,
                    ...{ footerDet: action.payload},
                };
            case actionTypes.FOOTER_ADDRESS:
                return {
                        ...state,
                    ...{ footerPage: action.payload},
                };
            case actionTypes.SERVICE_LIST:
                return {
                        ...state,
                    ...{ servicelist: action.payload},
                };
            case actionTypes.SERVICE_LIST_INFO:
                return {
                        ...state,
                    ...{ seviceInfo: action.payload},
                    }; 
            case actionTypes.MAINTENANCE_DETAIL:
                return {
                        ...state,
                    ...{ maintenance: action.payload},
                    };       
        default:
            return state;
    }
}

export default reducer;
