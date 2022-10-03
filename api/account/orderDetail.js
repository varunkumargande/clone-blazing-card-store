import APIServices from '../../services'
import { getOrderDetails } from '../../store/order/action'


export async function orderDetailApi(dispatch, orderProductId) {
    const result=await APIServices.getAll('orders/order-detail?orderProductId='+orderProductId)
    if(result&&result.data&&result.data.data){
        dispatch(getOrderDetails(result.data.data))
    }else{
        modalWarning('error',result.data.message);
    }
}