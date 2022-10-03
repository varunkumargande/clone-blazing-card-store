import APIServices from '../../services'
import { modalSuccess, modalWarning } from "../intercept";
import { getOrders } from '../../store/order/action';

export async function orderListApi(dispatch, searchVal="", filter="") {
    const result =await APIServices.getAll(`orders/order-list?keyword=${searchVal}&date=${filter}`)
    if(result && result.data && result.data.status ===1){
        dispatch(getOrders(result.data.data));   
    }else{
        modalWarning('error',result.data.message);
    }
}