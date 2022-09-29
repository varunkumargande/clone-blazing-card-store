export const actionTypes = {
    GET_ORDERS: 'GET_ORDERS',
  };

  export function getOrders(payload) {
    console.log("payload", payload)
    return { 
        type: actionTypes.GET_ORDERS, 
        payload:payload 
    };
}
  