import APIServices from '../../services'
import { addItemToWishlist } from '../../store/wishlist/action'
import { addItem } from '../../store/cart/action'
async function getProfileInfoApi(dispatch) {
        // await fetch(apiUrl+'/customer/get-profile', {
        //     method: 'GET',
        // })
        // .then(json => {
        //     if (json) {
         
        //         if (json.status === 1) {
        
        //             sessionStorage.setItem("spurtUser",JSON.stringify(json.data))
        //         }
                  
        //         }
        // })
        const result= await APIServices.getAll('customer/get-profile')
              if (result&&result.data) {
         
                if (result&&result.data&&result.data.status === 1) {
                   
                    sessionStorage.setItem("spurtUser",JSON.stringify(result.data.data))
                    // dispatch(addItem(1))
                }
                  
                }

}
export default getProfileInfoApi