import APIServices from '../../services'
import { modalSuccess, modalWarning } from "../intercept";
import { getOrders } from '../../store/order/action';

export async function orderListApi(dispatch) {
    console.log("isinde orderlist")
    const result =await APIServices.getAll('orders/order-list')
    if(result && result.data && result.data.status ===1){
        dispatch(getOrders(result.data.data));   
    }else{
        modalWarning('error',result.data.message);
    }
}