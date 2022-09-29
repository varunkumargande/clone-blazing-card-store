export const actionTypes = {
    GET_ORDERS: 'GET_ORDERS',
  };

  export function getOrders(payload) {
    return { 
        type: actionTypes.GET_ORDERS, 
        payload:payload 
    };
}
  