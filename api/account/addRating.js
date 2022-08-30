import  Router  from "next/router";
import { modalSuccess } from "../intercept";
import APIServices from '../../services'
export async function UserAddRating(productId,orderProductId,review,rateValue) {
    // fetch(apiUrl+'/product-store/add-rating', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //         "productId": productId,
    //         "orderProductId": orderProductId,
    //         "reviews": review,
    //         "rating": rateValue, 
    //     })
    // })
    // .then(json => {
    //     if (json) {
    //         if (json.status===1) {
               
    //             Router.push('/account/myorders');
    //             modalSuccess('success',json.message)
    //         }
    //     }
    // })
    const data = JSON.stringify({
        productId: productId,
            orderProductId: orderProductId,
            reviews: review,
            rating: rateValue,
    })
  
    const result =await APIServices.create('orders/add-rating',data)
    
    if (result && result.data && result.data.status === 1) {
  

                Router.push('/account/myorders');
                modalSuccess('success',result.data.message)
    }else{
        
    }

}