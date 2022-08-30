export const actionTypes = {
    CHANGE_CURRENCY: 'CHANGE_CURRENCY',
    CHANGE_CURRENCY_SUCCESS: 'CHANGE_CURRENCY_SUCCESS',
    EDIT_ADDRESS_DETAIL:'EDIT_ADDRESS_DETAIL',
    FOOTER_PAGE_LIST:'FOOTER_PAGE_LIST',
    FOOTER_ADDRESS:'FOOTER_ADDRESS',
    SERVICE_LIST:'SERVICE_LIST',
    SERVICE_LIST_INFO:'SERVICE_LIST_INFO',
    MAINTENANCE_DETAIL:'MAINTENANCE_DETAIL',
};

export function changeCurrency(currency) {
    return { type: actionTypes.CHANGE_CURRENCY,payload:currency };
}

export function changeCurrencySuccess(currency) {
    return { type: actionTypes.CHANGE_CURRENCY_SUCCESS, currency };
}

export function editDetail(payload){
    return {type:actionTypes. EDIT_ADDRESS_DETAIL,payload:payload}
}

export function serviceDetail(payload){
    return {type:actionTypes.SERVICE_LIST,payload:payload}
}

export function serviceListInfoDet(payload){
    return {type:actionTypes.SERVICE_LIST_INFO,payload:payload}
}

export function footerPage(payload){
    return {type:actionTypes.FOOTER_PAGE_LIST ,payload:payload}
}

export function footerAddress(payload){
    return {type:actionTypes.FOOTER_ADDRESS,payload:payload}
}

export function maintenanceState(payload){
    return {type:actionTypes.MAINTENANCE_DETAIL,payload:payload}
}

// export function addressEditData(payload){
//     return {type:actionTypes.ADDRESS_EDIT_DATA,payload:payload}
// }