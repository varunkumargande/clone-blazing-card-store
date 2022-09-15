import {  getProductCategories } from "../../store/product/action";
import APIServices from '../../services'
export async function categoryListApi(dispatch) {

    // fetch(apiUrl + '/list/category-list', {
    //     method: 'GET',
    // })
    // .then(json => {
    //     dispatch(getProductCategories(json.data)); 
          
    // })
    const result = await APIServices.getAll('list/category-list')

    if(result && result.data && result.data.data){
        dispatch(getProductCategories(result.data.data)); 
    }
}