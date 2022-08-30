import APIServices from '../../services'
import { Bannermainloaded } from '../../store/wishlist/action'
export async function homeBannerApi(dispatch) {
    // return await fetch(apiUrl+'/list/banner-list', {
    //     method: 'GET',
    // })
    // .then(json => {
    //     setBanner(json.data)
    // })

    const result = await APIServices.getAll('list/banner-list')
    if(result && result.data && result.data.data){
        // setBanner(result.data.data)
        dispatch(Bannermainloaded(result.data.data))
        
    }
} 

