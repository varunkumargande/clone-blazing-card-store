import APIServices from '../../services'
import { getProductRatingCount } from '../../store/product/action'
export async function productRatingCountStarApi(productId,setstarcoutid,dispatch) {
    
    // fetch(apiUrl + '/product-store/get-rating-statistics?productId='+productId, {
    //     method: 'GET',
    // })
    // .then(json => {
    //     if(json.data){
    //         
    //         setstarcoutid(json.data)

    //     }
            
    // })

    const result = await APIServices.getAll('product-store/get-rating-statistics?productId='+productId)

    if(result && result.data && result.data.data){
        
        setstarcoutid(result.data.data)
        dispatch(getProductRatingCount(result.data.data))

    }
}
