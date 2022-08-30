import axios from "axios"
import { getCollections } from "../../store/collection/action"
import APIServices from '../../services'
export async function featuredApi(dispatch) {
    //To fetch posts in newsfeed
        // await fetch(apiUrl+'/product-store/featureproduct-list', {
        //     method: 'GET',  
        // })
        // .then(json => {
        //     dispatch(getCollections(json.data)) 
        // })


        const result = await APIServices.getAll('product-store/featureproduct-list')

      
        if(result && result.data&&result.data.data){
            dispatch(getCollections(result.data.data)) 
        }
    }
