import APIServices from '../../services'
import { getOrderDetails } from '../../store/order/action'
import { modalWarning } from '../intercept';

export async function orderDetailApi(dispatch, orderProductId) {
    const result=await APIServices.getAll('orders/order-detail?orderProductId='+orderProductId)
    if(result&&result.data&&result.data.data){
        dispatch(getOrderDetails(result.data.data))
    }else{
        modalWarning('error',result.data.message);
    }
}

/**
 * @method: submitReview
 * @description: method used to call submit review api.
 */
export const submitReview = async (data) => {
    return await APIServices.create('orders/add-order-rating', data)
}