import { getCategories } from "../../store/category/action";
import APIServices from '../../services'

export async function categoryApi(dispatch) {

   
    const result = await APIServices.getAll('homepage-category-list')
            dispatch(getCategories(result))
           
           
        
}