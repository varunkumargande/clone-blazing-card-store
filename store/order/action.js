export const actionTypes = {
    GET_ORDERS: 'GET_ORDERS',
    GET_ORDER_DETAILS: 'GET_ORDER_DETAILS'
  };

  export function getOrders(payload) {
    return { 
        type: actionTypes.GET_ORDERS, 
        payload:payload 
    };
}
  
export function getOrderDetails(payload) {
  return { 
      type: actionTypes.GET_ORDER_DETAILS, 
      payload:payload 
  };
}